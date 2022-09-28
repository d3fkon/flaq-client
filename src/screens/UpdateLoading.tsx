import {View, Image, ActivityIndicator} from 'react-native';
import React, {useContext} from 'react';
import FlaqContainer from '../components/common/flaqui/FlaqContainer';
import globalStyles from '../utils/global_styles';
import FlaqText from '../components/common/flaqui/FlaqText';
import {GlobalContext, StatusEnum} from '../state/contexts/GlobalContext';

const Loading = () => {
  const {state} = useContext(GlobalContext);

  const {progress, status} = state.updateStatus!;
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
      <View style={{flex: 1, alignItems: 'center'}}>
        <FlaqText>{status.split('_').join(' ').toLowerCase()}...</FlaqText>
        {status === StatusEnum.DOWNLOADING_PACKAGE && (
          <FlaqText mt={2} mb={2}>
            {progress}%
          </FlaqText>
        )}
        <ActivityIndicator size="small" style={{marginTop: 10}} />
      </View>
    </FlaqContainer>
  );
};
export default Loading;
