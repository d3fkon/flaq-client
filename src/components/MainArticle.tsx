import {TouchableOpacity, Image, View, Linking} from 'react-native';
import React from 'react';
import {Colors} from '../utils/colors';
import FlaqText from './common/flaqui/FlaqText';
import LinearGradient from 'react-native-linear-gradient';
import {Article} from '../screens/LevelScreen';
import {showMessage} from 'react-native-flash-message';
import {CompositeScreenProps, useNavigation} from '@react-navigation/native';
import {ExploreStackParamList, TabParamList} from '../navigation/Home';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

export type ChapterScreenProps = CompositeScreenProps<
  NativeStackScreenProps<ExploreStackParamList, 'Chapter'>,
  BottomTabScreenProps<TabParamList>
>;

const MainArticle = ({data}: {data: Article}) => {
  const navigation = useNavigation<ChapterScreenProps['navigation']>();

  const openLink = () => {
    const link = data.url;
    Linking.canOpenURL(link).then(supported => {
      if (supported) {
        Linking.openURL(link);
      } else {
        console.log("Don't know how to open URI: " + link);
        showMessage({
          message:
            "can't open link. please select default browser in the setting",
          type: 'info',
        });
      }
    });
  };

  const openWebView = () => {
    navigation.navigate('WebView', {uri: data.url});
  };

  return (
    // <TouchableOpacity onPress={openLink}>
    <TouchableOpacity onPress={openWebView}>
      <View
        // start={{x: 0.0, y: 0.25}}
        // end={{x: 0.5, y: 1.0}}
        // colors={['#F6B364', '#9E58F6']}
        style={{
          backgroundColor: Colors.background.dark,
          padding: 16,
          justifyContent: 'space-evenly',
          borderColor: Colors.background.dark,
          borderWidth: 1,
          width: 200,
          height: 200,
          position: 'relative',
          marginRight: 10,
        }}>
        <Image
          source={{uri: data.iconUrl}}
          style={{
            width: 60,
            height: 60,
            resizeMode: 'contain',
          }}
        />
        <Image
          source={require('../../assets/images/waves.png')}
          style={{
            top: 0,
            left: 0,
            width: 200,
            height: 200,
            position: 'absolute',
            resizeMode: 'cover',
          }}
        />
        <FlaqText size="md" weight="medium" align="left" mt={12}>
          {data.title}
        </FlaqText>
      </View>
    </TouchableOpacity>
  );
};

export default MainArticle;
