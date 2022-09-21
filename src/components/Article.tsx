import {TouchableOpacity, Image, View} from 'react-native';
import React from 'react';
import {Colors} from '../utils/colors';
import FlaqText from './common/flaqui/FlaqText';

const Article = ({data}: {data: any}) => {
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
        width: '100%',
        marginBottom: 10,
        flexDirection: 'row',
      }}>
      <Image
        source={link}
        style={{
          width: 100,
          height: 100,
          resizeMode: 'contain',
          marginRight: 20,
        }}
      />
      <View style={{justifyContent: 'center'}}>
        <FlaqText size="xs" weight="semibold" align="left" mt={12}>
          {data.heading}
        </FlaqText>
        <FlaqText size="xs" align="left" mt={6} color="white" weight="semibold">
          {data.subHeading}
        </FlaqText>
      </View>
    </TouchableOpacity>
  );
};

export default Article;
