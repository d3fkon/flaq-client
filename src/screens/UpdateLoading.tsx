import {View, Image, ActivityIndicator} from 'react-native';
import React from 'react';
import FlaqContainer from '../components/common/flaqui/FlaqContainer';
import globalStyles from '../utils/global_styles';
import FlaqText from '../components/common/flaqui/FlaqText';

const Loading = () => {
  return (
    <FlaqContainer background="dark">
      <View style={globalStyles.fullCenter}>
        <Image
          source={require('../../assets/images/icons/flaq.png')}
          style={{width: 70, height: 70, resizeMode: 'contain'}}
        />
        <FlaqText mt={16} color="white" size="xl" weight="semibold">
          flaq
        </FlaqText>
      </View>
      <View style={{flex: 1}}>
        <FlaqText>checking and downloading updates...</FlaqText>
        <ActivityIndicator size="small" style={{marginTop: 10}} />
      </View>
    </FlaqContainer>
  );
};
export default Loading;
