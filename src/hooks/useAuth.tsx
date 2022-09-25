import {useContext, useDebugValue} from 'react';
import {GlobalContext} from '../state/contexts/GlobalContext';

const useAuth = () => {
  return useContext(GlobalContext);
};

export default useAuth;
