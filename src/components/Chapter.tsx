import {useNavigation} from '@react-navigation/native';
import React, {FC} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {Campaign} from '../screens/LevelScreen';
import {Colors} from '../utils/colors';
import FlaqText from './common/flaqui/FlaqText';

const Chapter: FC<Campaign & {levelOne: string}> = ({
  title,
  description1,
  description2,
  description3,
  _id,
  levelOne,
}) => {
  const navigation: any = useNavigation();
  const getLink: NodeRequire = (icon: string) => {
    switch (icon) {
      case 'one': {
        return require('../../assets/images/small/one.png');
      }
      case 'two': {
        return require('../../assets/images/small/two.png');
      }
      case 'three': {
        return require('../../assets/images/small/three.png');
      }
      case 'four': {
        return require('../../assets/images/small/four.png');
      }
      default: {
        return require('../../assets/images/small/one.png');
      }
    }
  };
  const link = getLink('one');

  const goToChapter = () => {
    navigation.navigate('Chapter', {campaignId: _id, level: levelOne});
  };

  return (
    <TouchableOpacity
      onPress={goToChapter}
      style={{
        backgroundColor: Colors.background.black,
        padding: 16,
        borderRadius: 8,
        borderColor: Colors.background.dark,
        borderWidth: 1,
        width: 200,
        marginRight: 10,
      }}>
      <Image
        source={link}
        style={{width: 40, height: 40, resizeMode: 'contain'}}
      />
      <FlaqText size="xs" weight="semibold" align="left" mt={12}>
        {title}
      </FlaqText>
      <FlaqText size="xxs" align="left" mt={6} color="light">
        {description1}
      </FlaqText>
    </TouchableOpacity>
  );
};

export default Chapter;
