import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import FlaqContainer from './src/components/common/flaqui/FlaqContainer';
import FlaqText from './src/components/common/flaqui/FlaqText';
import {MyTabs} from './src/navigation';

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  console.log(useColorScheme());
  // const {} = useColorScheme();

  return (
    <FlaqContainer>
      <FlaqText type="primary" weight="bold">
        hello
      </FlaqText>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </FlaqContainer>
  );
};

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
