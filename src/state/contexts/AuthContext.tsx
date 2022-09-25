/* eslint-disable react-hooks/exhaustive-deps */
import React, {createContext, Dispatch, useEffect, useState} from 'react';

type InitialStateType = {
  accessToken: string;
  email: string;
};

export const initialState = {
  accessToken: '131',
  email: 'ankitnegi@gmail.com',
};

export const AuthContext = createContext<{
  auth: InitialStateType;
  setAuth: React.Dispatch<React.SetStateAction<InitialStateType>>;
}>({auth: initialState, setAuth: () => {}});

const AuthProvider = ({children}: {children: any}) => {
  const [auth, setAuth] = useState(initialState);

  useEffect(() => {
    console.log('AUTH CHANGED');
  }, [auth]);

  return (
    <AuthContext.Provider value={{auth, setAuth}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
