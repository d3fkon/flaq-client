import {TouchableOpacity, Image, View, Linking} from 'react-native';
import React from 'react';
import {Colors} from '../utils/colors';
import FlaqText from './common/flaqui/FlaqText';
import LinearGradient from 'react-native-linear-gradient';
import {Article} from '../screens/LevelScreen';
import {showMessage} from 'react-native-flash-message';

const MainArticle = ({data}: {data: Article}) => {
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
  return (
    <TouchableOpacity onPress={openLink}>
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        colors={['#F6B364', '#9E58F6']}
        style={{
          backgroundColor: Colors.background.black,
          padding: 16,
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
            width: 40,
            height: 40,
            position: 'absolute',
            top: 8,
            left: 8,
            resizeMode: 'contain',
            marginRight: 16,
          }}
        />
        <View style={{justifyContent: 'center', flex: 1}}>
          <FlaqText size="md" weight="medium" align="left" mt={12}>
            {data.title}
          </FlaqText>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default MainArticle;
