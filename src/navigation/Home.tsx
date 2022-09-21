import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

/** local imports */
import LoginScreen from '../screens/LoginScreen';
import ExploreScreen from '../screens/ExploreScreen';
import {Colors} from '../utils/colors';
import HomeScreen from '../screens/HomeScreen';
import NewsScreen from '../screens/NewsScreen';
import LevelScreen from '../screens/LevelScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ChapterScreen from '../screens/ChapterScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  const renderTabIcon = (
    route: any,
    focused: boolean,
    color: string,
    size: number,
  ) => {
    let iconName = 'home';
    switch (route.name) {
      case 'Home':
        return <AntDesign name="home" size={size} color={color} />;
      case 'Explore':
        return <Entypo name="compass" size={size} color={color} />;
      case 'News':
        return <Feather name="book-open" size={size} color={color} />;
      default:
        return <AntDesign name={iconName} size={size} color={color} />;
    }
  };

  const Tabs = () => {
    return (
      <Tab.Navigator
        initialRouteName="Explore"
        screenOptions={({route}) => ({
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused, color, size}) =>
            renderTabIcon(route, focused, color, size),
          tabBarActiveTintColor: Colors.background.lightest,
          tabBarInactiveTintColor: Colors.background.light,
          tabBarActiveBackgroundColor: Colors.background.darkest,
          tabBarItemStyle: {
            borderRadius: 20,
          },
          tabBarStyle: {
            paddingHorizontal: 24,
            backgroundColor: Colors.background.dark,
            paddingVertical: 12,
            borderTopColor: Colors.background.transparent,
          },
        })}>
        <Tab.Screen name={'Home'} component={HomeScreen} />
        <Tab.Screen name={'Explore'} component={ExploreScreen} />
        <Tab.Screen name={'News'} component={NewsScreen} />
      </Tab.Navigator>
    );
  };

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Level" component={LevelScreen} />
      <Stack.Screen name="Chapter" component={ChapterScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
