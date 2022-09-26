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

type InitialStateType = {
  accountStatus: AccountStatus;
  auth: {
    email: string;
    accessToken: string;
  };
};

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

export const initialState = {
  accountStatus: AccountStatus.LOADING,
  auth: {
    email: '',
    accessToken: '',
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
  updating: boolean;
}) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  const init = useCallback(async () => {
    if (updating) {
      dispatch(setAccountStatus(AccountStatus.UPDATE));
      return;
    }
    /*** GETDATA */
    const accessToken = await StorageGetItem('x-access-token');
    const email = await StorageGetItem('email');
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
