import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

/** local imports */
import ExploreScreen from '../screens/ExploreScreen';
import {Colors} from '../utils/colors';
import HomeScreen from '../screens/HomeScreen';
import NewsScreen from '../screens/NewsScreen';
import LevelScreen from '../screens/LevelScreen';
import ChapterScreen from '../screens/ChapterScreen';
import {RouteProp} from '@react-navigation/native';
import WebViewScreen from '../screens/WebViewScreen';

export type ExploreStackParamList = {
  Level: {level: string} | undefined;
  Explore: undefined;
  Chapter: {campaignId: string; level: string};
  WebView: {uri: string};
};

export type TabParamList = {
  Home: undefined;
  ExploreStack: undefined;
  News: undefined;
};

const TabStack = createBottomTabNavigator<TabParamList>();
const ExploreStack = createNativeStackNavigator<ExploreStackParamList>();

const HomeStack = () => {
  const renderTabIcon = (
    route: RouteProp<TabParamList, keyof TabParamList>,
    focused: boolean,
    color: string,
    size: number,
  ) => {
    let iconName = 'home';
    switch (route.name) {
      case 'Home':
        return <AntDesign name="home" size={size} color={color} />;
      case 'ExploreStack':
        return <Entypo name="compass" size={size} color={color} />;
      case 'News':
        return <Feather name="book-open" size={size} color={color} />;
      default:
        return <AntDesign name={iconName} size={size} color={color} />;
    }
  };

  const ExploreScreenStack = () => {
    return (
      <ExploreStack.Navigator
        initialRouteName="Explore"
        screenOptions={{
          headerShown: false,
        }}>
        <ExploreStack.Screen name="Explore" component={ExploreScreen} />
        <ExploreStack.Screen name="Level" component={LevelScreen} />
        <ExploreStack.Screen name="Chapter" component={ChapterScreen} />
        <ExploreStack.Screen name="WebView" component={WebViewScreen} />
      </ExploreStack.Navigator>
    );
  };

  return (
    <TabStack.Navigator
      initialRouteName="ExploreStack"
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
          paddingTop: 12,
          paddingBottom: 24,
          height: 80,
          borderTopColor: Colors.background.transparent,
        },
      })}>
      <TabStack.Screen name="Home" component={ExploreScreenStack} />
      {/* <TabStack.Screen name="ExploreStack" component={ExploreScreenStack} /> */}
      <TabStack.Screen name="News" component={NewsScreen} />
    </TabStack.Navigator>
  );
};

export default HomeStack;
