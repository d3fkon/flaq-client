import {Formik} from 'formik';
import React, {FC, useContext, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import FlaqButton from '../components/common/flaqui/FlaqButton';
import FlaqContainer from '../components/common/flaqui/FlaqContainer';
import FlaqInput from '../components/common/flaqui/FlaqInput';
import FlaqPasswordInput from '../components/common/flaqui/FlaqPasswordInput';
import FlaqText from '../components/common/flaqui/FlaqText';
import {setAccountStatus, setAuth} from '../state/actions/global';
import {AccountStatus, GlobalContext} from '../state/contexts/GlobalContext';
import globalStyles from '../utils/global_styles';
import * as Yup from 'yup';
import {Colors} from '../utils/colors';
import {auth, sendOtp, verifyOtp} from '../apis/query';
import {showMessage} from 'react-native-flash-message';
import {StorageSetItem} from '../utils/storage';
import {AuthStackParamList} from '../navigation/Auth';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email("well that's not an email"),
  password: Yup.string().required().min(8, 'weak password'),
});

type Props = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;

const SignUpScreen: FC<Props> = ({navigation}) => {
  const {state, dispatch} = useContext(GlobalContext);

  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const signUp = async (email: string, password: string) => {
    try {
      if (email.length < 4) {
        showMessage({
          message: 'invalid email',
          type: 'info',
        });
      }
      const tokens = await auth(email, password, 'signup');
      dispatch(setAuth({email, accessToken: tokens.accessToken}));
      await StorageSetItem('x-access-token', tokens.accessToken);
      await StorageSetItem('x-refresh-token', tokens.refreshToken);
      showMessage({
        message: 'successfully logged in',
        type: 'success',
      });
    } catch (e) {
      showMessage({
        message: 'Invalid credentials',
        type: 'danger',
      });
    }
  };

  const handleSendOtp = async (email: string) => {
    try {
      const response = await sendOtp(email);
      showMessage({
        message: 'otp sent to the mail',
        type: 'success',
      });
      setIsOtpSent(true);
      console.log('OTP Sent resopnse: ', response);
    } catch (e) {
      showMessage({message: 'some error sending otp', type: 'danger'});
      console.log(e);
    }
  };

  const handleVerifyOtp = async (email: string) => {
    try {
      const response = await verifyOtp(email, otp);
      showMessage({
        message: 'otp verified',
        type: 'success',
      });
      setIsOtpVerified(true);
      console.log('OTP Sent resopnse: ', response);
    } catch (e) {
      showMessage({message: 'wrong otp', type: 'danger'});
    }
  };

  const goToLoginPage = () => {
    navigation.navigate('Login');
  };

  const openWebView = () => {
    navigation.navigate('WebView', {uri: 'https://www.flaq.club'});
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
          sign up on flaq
        </FlaqText>
        <FlaqText color="normal" size="sm" align="left" mt={16}>
          enter your credentials
        </FlaqText>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          validateOnBlur={true}
          onSubmit={async (values, {setSubmitting}) => {
            await signUp(values.email, values.password);
            setSubmitting(false);
            dispatch(setAccountStatus(AccountStatus.EXISITING));
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isSubmitting,
            touched,
          }) => (
            <>
              <View
                style={[
                  globalStyles.fullCenter,
                  {justifyContent: 'flex-start'},
                ]}>
                <View style={globalStyles.fullWidth}>
                  <FlaqInput
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    placeholder="email"
                    mt={40}
                    value={values.email}
                    style={[
                      globalStyles.fullWidth,
                      {
                        borderBottomColor:
                          touched.email && errors.email
                            ? 'red'
                            : Colors.background.normal,
                      },
                    ]}
                  />
                  <View style={{height: 20}}>
                    <FlaqText size="xxs" align="left">
                      {touched.email && errors.email}
                    </FlaqText>
                  </View>
                </View>
                {isOtpSent && !isOtpVerified && (
                  <View style={globalStyles.fullWidth}>
                    <FlaqInput
                      onChangeText={text => setOtp(text)}
                      placeholder="------"
                      mt={40}
                      value={otp}
                      style={[globalStyles.fullWidth]}
                    />
                  </View>
                )}
                {isOtpSent && isOtpVerified && (
                  <View style={globalStyles.fullWidth}>
                    <FlaqPasswordInput
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      placeholder="password"
                      mt={14}
                      value={values.password}
                      style={[
                        globalStyles.fullWidth,
                        {
                          borderBottomColor:
                            touched.password && errors.password
                              ? 'red'
                              : Colors.background.normal,
                        },
                      ]}
                    />
                    <View style={{height: 20}}>
                      <FlaqText size="xxs" align="left">
                        {touched.password && errors.password}
                      </FlaqText>
                    </View>
                  </View>
                )}

                {!isOtpSent && !isOtpVerified && (
                  <FlaqButton
                    mt={28}
                    onPress={() => {
                      handleSendOtp(values.email);
                    }}
                    disabled={otp.length === 4}>
                    <FlaqText color="black" weight="semibold" size="sm">
                      send otp
                    </FlaqText>
                  </FlaqButton>
                )}

                {isOtpSent && !isOtpVerified && (
                  <FlaqButton
                    mt={28}
                    onPress={() => {
                      handleVerifyOtp(values.email);
                    }}
                    disabled={isSubmitting}>
                    <FlaqText color="black" weight="semibold" size="sm">
                      verify otp
                    </FlaqText>
                  </FlaqButton>
                )}

                {isOtpSent && isOtpVerified && (
                  <FlaqButton
                    mt={28}
                    onPress={handleSubmit}
                    disabled={isSubmitting}>
                    <FlaqText color="black" weight="semibold" size="sm">
                      {isSubmitting ? 'signing up...' : 'sign up'}
                    </FlaqText>
                  </FlaqButton>
                )}

                <TouchableOpacity onPress={goToLoginPage}>
                  <FlaqText
                    weight="bold"
                    size="sm"
                    color="normal"
                    mt={12}
                    style={{textDecorationLine: 'underline'}}>
                    already a user? log in
                  </FlaqText>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          <FlaqText size="xxs" color="normal">
            by signing up you agree to our{' '}
          </FlaqText>
          <TouchableOpacity onPress={openWebView}>
            <FlaqText
              size="xxs"
              color="purple"
              style={{textDecorationLine: 'underline'}}>
              terms of use, privacy policy,{' '}
            </FlaqText>
          </TouchableOpacity>
          <TouchableOpacity onPress={openWebView}>
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
