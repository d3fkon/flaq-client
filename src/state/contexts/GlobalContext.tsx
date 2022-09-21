/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  Dispatch,
  useCallback,
  useEffect,
  useReducer,
} from 'react';
import {clearData, setAccountStatus, setUser} from '../actions/global';
import globalReducer from '../reducers/global';
import {StorageClearAll, StorageGetItem} from '../../utils/storage';

type InitialStateType = {
  accountStatus: AccountStatus;
};

export enum AccountStatus {
  LOADING = 'LOADING',
  EXISITING = 'EXISITING',
  RECOVERY = 'RECOVERY',
  NEW = 'NEW',
  ACTIVE = 'ACTIVE',
  SIGNED_UP = 'SIGNED_UP',
  LOGGED_ID = 'LOGGED_ID',
  RETRIEVE = 'RETRIEVE',
  UPDATE = 'UPDATE',
}

export enum AppState {
  SIGNUP = 'SIGNUP',
  GDRIVE = 'GDRIVE',
  ONBOARDED = 'ONBOARDED',
  RECOVERY = 'RECOVERY',
  TESTING = 'TESTING',
}

export const initialState = {
  accountStatus: AccountStatus.LOADING,
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
  /** valid recover mode */

  const init = useCallback(async () => {
    if (updating) {
      dispatch(setAccountStatus(AccountStatus.UPDATE));
      return;
    }
    /*** GETDATA */
    // const appstate = await StorageGetItem('appstate');
    // const storeduser = await StorageGetItem('user');
    // console.log('appstate', appstate);
    // console.log('storeduser', storeduser);
    // await StorageClearAll();
    // await StorageSetItem('appstate', AppState.ONBOARDED);
    /** NEW USER */
    // await StorageClearAll();
    // dispatch(clearData());
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
