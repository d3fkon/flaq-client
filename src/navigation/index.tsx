import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeStack from './Home';

const Navigation = () => {
  const renderContent = () => {
    return <HomeStack />;
    // switch (state.accountStatus) {
    //   case AccountStatus.UPDATE:
    //     return <UpdateStack />;
    // case AccountStatus.LOADING:
    //   return <LoadingStack />;
    // case AccountStatus.NEW:
    //   return <SignUpStack />;
    // case AccountStatus.SIGNED_UP:
    //   return <OnboardingStack />;
    // case AccountStatus.EXISITING:
    //   return <AuthStack />;
    // case AccountStatus.ACTIVE:
    //   return <WalletStack />;
    // case AccountStatus.RETRIEVE:
    //   return <RetrieveStack />;
    // case AccountStatus.RECOVERY:
    //   return <RecoverStack />;
    // default:
    //   return <SignUpStack />;
    // }
  };

  return <NavigationContainer>{renderContent()}</NavigationContainer>;
};

export default Navigation;
