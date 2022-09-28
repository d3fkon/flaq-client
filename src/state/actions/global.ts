import {Update} from '../../../App';
import {AccountStatus, initialState} from '../contexts/GlobalContext';

export const setAccountStatus = (status: AccountStatus) => {
  return {
    type: 'SET_ACCOUNT_STATUS',
    payload: status,
  };
};

export const setUpdate = (update: Update) => {
  return {
    type: 'SET_UPDATE',
    payload: update,
  };
};

export const setAuth = (auth: typeof initialState.auth) => {
  return {
    type: 'SET_AUTH',
    payload: auth,
  };
};

export const clearData = () => {
  return {
    type: 'CLEAR_DATA',
    payload: '',
  };
};
