import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeStack from './Home';
import AuthStack from './Auth';

const Navigation = () => {
  const renderContent = () => {
    const state: 'auth' | 'home' =
      (Math.random() * 100) % 2 === 0 ? 'auth' : 'home';
    switch (state) {
      case 'auth': {
        return <AuthStack />;
      }
      case 'home': {
        return <HomeStack />;
      }
    }
  };

  return <NavigationContainer>{renderContent()}</NavigationContainer>;
};

export default Navigation;
