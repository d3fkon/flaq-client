import React, {useEffect, useState} from 'react';
import Navigation from './src/navigation';
import codePush from 'react-native-code-push';
import GlobalProvider from './src/state/contexts/GlobalContext';
import FlashMessage from 'react-native-flash-message';

let CodePushOptions = {
  checkFrequency: codePush.CheckFrequency.MANUAL,
  updateDialog: {
    title: 'a new update is available!',
  },
};

let App = () => {
  const [updating, setUpdating] = useState(true);

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
    update();
  }, []);

  return (
    <GlobalProvider updating={updating}>
      <Navigation />
      <FlashMessage position={'top'} />
    </GlobalProvider>
  );
};

App = codePush(CodePushOptions)(App);

export default App;
