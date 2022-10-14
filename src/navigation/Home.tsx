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
import TipScreen from '../screens/TipScreen';

export type ExploreStackParamList = {
  Level: {level: string} | undefined;
  Explore: undefined;
  Chapter: {
    campaignId: string;
    level: string;
    levelId: number;
    walletAddress: string;
  };
  WebView: {uri: string};
  Tip: {walletAddress: string};
};

export type TabParamList = {
  Home: undefined;
  ExploreStack: undefined;
  NewsStack: undefined;
};

export type NewsParamList = {
  News: undefined;
  WebView: {uri: string};
};

const TabStack = createBottomTabNavigator<TabParamList>();
const ExploreStack = createNativeStackNavigator<ExploreStackParamList>();
const NewsStack = createNativeStackNavigator<NewsParamList>();

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
      case 'NewsStack':
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
        <ExploreStack.Screen
          options={{
            presentation: 'modal',
          }}
          name="Tip"
          component={TipScreen}
        />
      </ExploreStack.Navigator>
    );
  };

  const NewsScreenStack = () => {
    return (
      <NewsStack.Navigator
        initialRouteName="News"
        screenOptions={{
          headerShown: false,
        }}>
        <NewsStack.Screen name="News" component={NewsScreen} />
        <NewsStack.Screen name="WebView" component={WebViewScreen} />
      </NewsStack.Navigator>
    );
  };

  return (
    <TabStack.Navigator
      initialRouteName="Home"
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
      <TabStack.Screen name="NewsStack" component={NewsScreenStack} />
    </TabStack.Navigator>
  );
};

export default HomeStack;
