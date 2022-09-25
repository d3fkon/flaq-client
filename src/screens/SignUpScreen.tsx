import React, {FC, useContext} from 'react';
import {TouchableOpacity, View} from 'react-native';
import FlaqButton from '../components/common/flaqui/FlaqButton';
import FlaqContainer from '../components/common/flaqui/FlaqContainer';
import FlaqInput from '../components/common/flaqui/FlaqInput';
import FlaqPasswordInput from '../components/common/flaqui/FlaqPasswordInput';
import FlaqText from '../components/common/flaqui/FlaqText';
import {setAccountStatus} from '../state/actions/global';
import {AccountStatus, GlobalContext} from '../state/contexts/GlobalContext';
import globalStyles from '../utils/global_styles';

type Props = {
  navigation: any;
};

const SignUpScreen: FC<Props> = ({navigation}) => {
  const {state, dispatch} = useContext(GlobalContext);

  const onSubmit = async () => {
    dispatch(setAccountStatus(AccountStatus.EXISITING));
  };
  const logIn = async () => {
    navigation.navigate('Login');
  };

  return (
    <FlaqContainer>
      <View
        style={{
          marginTop: 30,
          width: '90%',
          flex: 1,
        }}>
        <FlaqText weight="medium" size="lg" align="left">
          sign up
        </FlaqText>
        <FlaqText color="normal" size="sm" align="left" mt={16}>
          enter your credentials
        </FlaqText>
        <View style={[globalStyles.fullCenter, {justifyContent: 'flex-start'}]}>
          <FlaqInput placeholder="email" mt={40} mb={14} />
          <View style={globalStyles.fullWidth}>
            <FlaqPasswordInput
              placeholder="password"
              mt={14}
              style={globalStyles.fullWidth}
            />
          </View>
          <FlaqButton mt={28} onPress={onSubmit}>
            <FlaqText color="black" weight="semibold" size="sm">
              sign up
            </FlaqText>
          </FlaqButton>
          <TouchableOpacity onPress={logIn}>
            <FlaqText
              weight="bold"
              size="sm"
              color="normal"
              mt={12}
              style={{textDecorationLine: 'underline'}}>
              log in?
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

export default SignUpScreen;
