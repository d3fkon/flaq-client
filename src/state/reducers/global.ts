import {initialState} from '../contexts/GlobalContext';

const reducer = (state: any, action: {type: string; payload: any}) => {
  const {type, payload} = action;
  switch (type) {
    case 'SET_AUTH':
      return {
        ...state,
        auth: payload,
      };
    case 'SET_LANG':
      return {
        ...state,
        lang: payload,
      };
    case 'SET_UPDATE':
      return {
        ...state,
        updateStatus: payload,
      };
    case 'SET_ACCOUNT_STATUS':
      return {
        ...state,
        accountStatus: payload,
      };
    case 'CLEAR_DATA':
      return {...initialState};
    default:
      return state;
  }
};

export default reducer;
