import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Loading from '../screens/UpdateLoading';

type UpdateStackParamList = {
  Loading: undefined;
};

const Stack = createNativeStackNavigator<UpdateStackParamList>();
const UpdateStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Loading"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Loading" component={Loading} />
    </Stack.Navigator>
  );
};

export default UpdateStack;
