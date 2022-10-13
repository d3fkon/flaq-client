import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

/** local imports */
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import WebViewScreen from '../screens/WebViewScreen';

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  WebView: {uri: string};
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="WebView" component={WebViewScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
