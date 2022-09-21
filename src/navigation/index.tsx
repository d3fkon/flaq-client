import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeStack from './Home';
import AuthStack from './Auth';
import {AccountStatus, GlobalContext} from '../state/contexts/GlobalContext';
import UpdateStack from './Update';

const Navigation = () => {
  const {state} = useContext(GlobalContext);

  const renderContent = () => {
    console.log('RENDERING');
    switch (state.accountStatus) {
      case AccountStatus.UPDATE: {
        return <UpdateStack />;
      }
      case AccountStatus.NEW: {
        return <AuthStack />;
      }
      case AccountStatus.EXISITING: {
        return <HomeStack />;
      }
      default: {
        return <HomeStack />;
      }
    }
  };

  return <NavigationContainer>{renderContent()}</NavigationContainer>;
};

export default Navigation;
