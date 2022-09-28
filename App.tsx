import React, {useEffect, useState} from 'react';
import Navigation from './src/navigation';
import codePush from 'react-native-code-push';
import GlobalProvider from './src/state/contexts/GlobalContext';
import FlashMessage from 'react-native-flash-message';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Platform, SafeAreaView} from 'react-native';

export const statusArray = [
  'UP_TO_DATE',
  'UPDATE_INSTALLED',
  'UPDATE_IGNORED',
  'UNKNOWN_ERROR',
  'SYNC_IN_PROGRESS',
  'CHECKING_FOR_UPDATE',
  'AWAITING_USER_ACTION',
  'DOWNLOADING_PACKAGE',
  'INSTALLING_UPDATE',
];

export enum StatusEnum {
  UP_TO_DATE = 'UP_TO_DATE',
  UPDATE_INSTALLED = 'UPDATE_INSTALLED',
  UPDATE_IGNORED = 'UPDATE_IGNORED',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  SYNC_IN_PROGRESS = 'SYNC_IN_PROGRESS',
  CHECKING_FOR_UPDATE = 'CHECKING_FOR_UPDATE',
  AWAITING_USER_ACTION = 'AWAITING_USER_ACTION',
  DOWNLOADING_PACKAGE = 'DOWNLOADING_PACKAGE',
  INSTALLING_UPDATE = 'INSTALLING_UPDATE',
}

let CodePushOptions = {
  checkFrequency: codePush.CheckFrequency.MANUAL,
  updateDialog: {
    title: 'a new update is available!',
  },
};

export type Update = {
  loading: boolean;
  status: StatusEnum;
  progress: number;
};

const queryClient = new QueryClient();

let App = () => {
  const [updating, setUpdating] = useState<Update>({
    loading: true,
    status: StatusEnum.CHECKING_FOR_UPDATE,
    progress: 0,
  });

  const update = async () => {
    setUpdating(prev => ({
      ...prev,
      loading: true,
    }));
    try {
      await codePush.sync(
        {
          installMode: codePush.InstallMode.IMMEDIATE,
          updateDialog: {
            appendReleaseDescription: true,
            title: 'a new update is available!',
          },
        },
        status => {
          setUpdating(prev => ({
            ...prev,
            status: statusArray[status] as StatusEnum,
          }));
        },
        download => {
          setUpdating(prev => ({
            ...prev,
            progress: Math.round(
              (download.receivedBytes / download.totalBytes) * 100,
            ),
          }));
        },
      );
    } catch (e) {
      console.log('ERROR DURING UPDATE', e);
    }
    setUpdating(prev => ({
      ...prev,
      loading: false,
    }));
  };

  useEffect(() => {
    update();
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
