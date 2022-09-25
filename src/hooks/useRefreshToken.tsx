import axios from '../apis/axios';
import {setAuth} from '../state/actions/global';
import {StorageGetItem, StorageSetItem} from '../utils/storage';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const {state, dispatch} = useAuth();

  const refresh = async () => {
    console.log('REFRESHING');
    const refreshToken = await StorageGetItem('x-refresh-token');
    const response = await axios.post('/auth/token/refresh', {
      refreshToken,
    });
    await StorageSetItem('x-refresh-token', response.data.accessToken);
    dispatch(setAuth({...state.auth, accessToken: response.data.accessToken}));
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
