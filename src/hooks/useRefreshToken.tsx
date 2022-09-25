import axios from '../apis/axios';
import {StorageGetItem, StorageSetItem} from '../utils/storage';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const {setAuth} = useAuth();

  const refresh = async () => {
    console.log('REFRESHING');
    const refreshToken = await StorageGetItem('x-refresh-token');
    const response = await axios.post('/auth/token/refresh', {
      refreshToken,
    });
    await StorageSetItem('x-refresh-token', response.data.accessToken);
    setAuth(prev => {
      return {...prev, accessToken: response.data.accessToken};
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
