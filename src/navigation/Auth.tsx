import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

/** local imports */
import LoginScreen from '../screens/LoginScreen';
import LevelScreen from '../screens/LevelScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ChapterScreen from '../screens/ChapterScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
