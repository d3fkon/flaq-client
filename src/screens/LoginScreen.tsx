import React, {FC} from 'react';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FlaqButton from '../components/common/flaqui/FlaqButton';
import FlaqContainer from '../components/common/flaqui/FlaqContainer';
import FlaqInput from '../components/common/flaqui/FlaqInput';
import FlaqText from '../components/common/flaqui/FlaqText';
import globalStyles from '../utils/global_styles';

type Props = {
  navigation: any;
};

const LoginScreen: FC<Props> = ({navigation}) => {
  const onSubmit = async () => {
    navigation.navigate('Tabs');
  };

  return (
    <FlaqContainer>
      <View
        style={{
          marginTop: 30,
          width: '80%',
          flex: 1,
        }}>
        <FlaqText weight="medium" size="lg" align="left">
          login to flaq
        </FlaqText>
        <FlaqText color="normal" size="sm" align="left" mt={16}>
          enter your credentials
        </FlaqText>
        <View style={[globalStyles.fullCenter, {justifyContent: 'flex-start'}]}>
          <FlaqInput placeholder="email" mt={40} />
          <FlaqInput placeholder="password" mt={28} />
          <FlaqButton mt={28} onPress={onSubmit}>
            <FlaqText color="black" weight="semibold" size="sm">
              log in
            </FlaqText>
          </FlaqButton>
          <TouchableOpacity>
            <FlaqText
              weight="bold"
              size="sm"
              color="normal"
              mt={12}
              style={{textDecorationLine: 'underline'}}>
              new user? sign up
            </FlaqText>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <FlaqText size="xxs" color="normal">
            by signing up you agree to our{' '}
          </FlaqText>
          <TouchableOpacity>
            <FlaqText
              size="xxs"
              color="purple"
              style={{textDecorationLine: 'underline'}}>
              terms of use, privacy policy,{' '}
            </FlaqText>
          </TouchableOpacity>
          <TouchableOpacity>
            <FlaqText
              size="xxs"
              color="purple"
              style={{textDecorationLine: 'underline'}}>
              information collection,{' '}
            </FlaqText>
          </TouchableOpacity>
          <FlaqText size="xxs" color="normal">
            and that you are over 18 years old
          </FlaqText>
        </View>
      </View>
    </FlaqContainer>
  );
};

export default LoginScreen;
