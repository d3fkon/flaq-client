import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {Colors} from '../utils/colors';
import FlaqText from './common/flaqui/FlaqText';

const Chapter = ({data}: {data: any}) => {
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
  const link = getLink(data.icon);
  return (
    <TouchableOpacity
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
        {data.heading}
      </FlaqText>
      <FlaqText size="xxs" align="left" mt={6} color="light">
        {data.subHeading}
      </FlaqText>
    </TouchableOpacity>
  );
};

export default Chapter;
