import React, {useEffect, useState} from 'react';
import Navigation from './src/navigation';
import codePush from 'react-native-code-push';
import GlobalProvider from './src/state/contexts/GlobalContext';
import FlashMessage from 'react-native-flash-message';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Platform, SafeAreaView} from 'react-native';

let CodePushOptions = {
  checkFrequency: codePush.CheckFrequency.MANUAL,
  updateDialog: {
    title: 'a new update is available!',
  },
};

const queryClient = new QueryClient();

let App = () => {
  const [updating, setUpdating] = useState(false);

  const update = async () => {
    setUpdating(true);
    try {
      await codePush.sync({
        installMode: codePush.InstallMode.IMMEDIATE,
        updateDialog: {
          appendReleaseDescription: true,
          title: 'a new update is available!',
        },
      });
      setUpdating(false);
    } catch (e) {
      setUpdating(false);
      console.log('ERROR DURING UPDATE', e);
    }
  };

  useEffect(() => {
    // update();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalProvider updating={updating}>
        <Navigation />
        <FlashMessage
          position={'top'}
          statusBarHeight={Platform.OS === 'ios' ? 40 : 0}
        />
      </GlobalProvider>
    </QueryClientProvider>
  );
};

App = codePush(CodePushOptions)(App);

export default App;
