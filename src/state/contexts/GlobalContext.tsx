/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  Dispatch,
  useCallback,
  useEffect,
  useReducer,
} from 'react';
import {setAccountStatus, setAuth} from '../actions/global';
import globalReducer from '../reducers/global';
import {StorageGetItem} from '../../utils/storage';
import {Update} from '../../../App';

type InitialStateType = {
  accountStatus: AccountStatus;
  updateStatus?: Update;
  auth: {
    email: string;
    accessToken: string;
  };
  lang: 'eng' | 'hn';
};

export enum StatusEnum {
  UP_TO_DATE = 'UP_TO_DATE',
  UPDATE_INSTALLED = 'UPDATE_INSTALLED',
  UPDATE_IGNORED = 'UPDATE_IGNORED',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  SYNC_IN_PROGRESS = 'SYNC_IN_PROGRESS',
  CHECKING_FOR_UPDATE = 'CHECKING_FOR_UPDATE',
  AWAITING_USER_ACTION = 'AWAITING_USER_ACTION',
  DOWNLOADING_PACKAGE = 'DOWNLOADING_PACKAGE',
  INSTALLING_UPDATE = 'INSTALLING_UPDATE',
}

export enum AccountStatus {
  LOADING = 'LOADING',
  EXISITING = 'EXISITING',
  NEW = 'NEW',
  ACTIVE = 'ACTIVE',
  SIGNED_UP = 'SIGNED_UP',
  LOGGED_ID = 'LOGGED_ID',
  UPDATE = 'UPDATE',
}

export enum AppState {
  SIGNUP = 'SIGNUP',
  GDRIVE = 'GDRIVE',
  ONBOARDED = 'ONBOARDED',
  TESTING = 'TESTING',
}

export const initialState: InitialStateType = {
  accountStatus: AccountStatus.LOADING,
  auth: {
    email: '',
    accessToken: '',
  },
  lang: 'eng',
  updateStatus: {
    loading: false,
    status: StatusEnum.CHECKING_FOR_UPDATE,
    progress: 0,
  },
};

export const GlobalContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<any>;
}>({state: initialState, dispatch: () => {}});

const GlobalProvider = ({
  children,
  updating,
}: {
  children: any;
  updating: Update;
}) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  const init = useCallback(async () => {
    if (updating.loading) {
      dispatch(setAccountStatus(AccountStatus.UPDATE));
      return;
    }
    /*** GETDATA */
    const accessToken = await StorageGetItem('x-access-token');
    const email = await StorageGetItem('email');
    const lang = await StorageGetItem('lang');
    dispatch(setAuth({email, accessToken}));
    dispatch(setAuth({email, accessToken}));
    if (accessToken) {
      dispatch(setAccountStatus(AccountStatus.EXISITING));
      return;
    }
    console.log('COMING HERE');
    dispatch(setAccountStatus(AccountStatus.NEW));
  }, [updating]);

  useEffect(() => {
    init();
  }, [updating]);

  return (
    <GlobalContext.Provider value={{state, dispatch}}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
