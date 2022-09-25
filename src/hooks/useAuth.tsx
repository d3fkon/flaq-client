import {useContext, useDebugValue} from 'react';
import {AuthContext} from '../state/contexts/AuthContext';

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
