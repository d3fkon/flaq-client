import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {ExploreStackParamList} from '../navigation/Home';
import {Campaign} from '../screens/LevelScreen';
import {Colors} from '../utils/colors';
import FlaqText from './common/flaqui/FlaqText';

export type ChapterScreenProps = NativeStackScreenProps<
  ExploreStackParamList,
  'Chapter'
>;

const Chapter: FC<
  Campaign & {index: number; levelOne: string; levelId: number}
> = ({title, description1, index, walletAddress, _id, levelOne, levelId}) => {
  const navigation = useNavigation<ChapterScreenProps['navigation']>();
  const getLink = () => {
    switch (levelId % 4) {
      case 0: {
        return require('../../assets/images/small/one.png');
      }
      case 1: {
        return require('../../assets/images/small/two.png');
      }
      case 2: {
        return require('../../assets/images/small/three.png');
      }
      case 3: {
        return require('../../assets/images/small/four.png');
      }
      default: {
        return require('../../assets/images/small/one.png');
      }
    }
  };
  const link = getLink();

  const goToChapter = () => {
    navigation.navigate('Chapter', {
      campaignId: _id,
      level: levelOne,
      levelId,
      walletAddress,
    });
  };

  return (
    <TouchableOpacity
      accessible={true}
      accessibilityLabel={`open level 3 with title ${title}`}
      onPress={goToChapter}
      style={{
        backgroundColor: Colors.background.black,
        marginTop: 10,
        padding: 20,
        borderRadius: 10,
        borderColor: Colors.background.dark,
        borderWidth: 1,
        // width: index % 2 === 0 ? '47%' : '50%',
        // marginRight: index % 2 === 0 ? '2%' : 0,
        width: '100%',
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
