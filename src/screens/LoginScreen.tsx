import {Formik} from 'formik';
import React, {FC, useContext} from 'react';
import {TouchableOpacity, View} from 'react-native';
import FlaqButton from '../components/common/flaqui/FlaqButton';
import FlaqContainer from '../components/common/flaqui/FlaqContainer';
import FlaqInput from '../components/common/flaqui/FlaqInput';
import FlaqPasswordInput from '../components/common/flaqui/FlaqPasswordInput';
import FlaqText from '../components/common/flaqui/FlaqText';
import {setAccountStatus, setUser} from '../state/actions/global';
import {AccountStatus, GlobalContext} from '../state/contexts/GlobalContext';
import globalStyles from '../utils/global_styles';
import * as Yup from 'yup';
import {Colors} from '../utils/colors';
import {auth} from '../apis/query';
import {showMessage} from 'react-native-flash-message';
import {StorageSetItem} from '../utils/storage';
import useAuth from '../hooks/useAuth';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email("well that's not an email"),
  password: Yup.string().required().min(8, 'weak password'),
});

type Props = {
  navigation: any;
};

const LoginScreen: FC<Props> = ({navigation}) => {
  const {state, dispatch} = useContext(GlobalContext);
  const {setAuth} = useAuth();

  const loginUser = async (email: string, password: string) => {
    try {
      const tokens = await auth(email, password, 'login');
      setAuth({email, accessToken: tokens.accessToken});
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

  const goToSignupPage = () => {
    navigation.navigate('SignUp');
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
          login to flaq
        </FlaqText>
        <FlaqText color="normal" size="sm" align="left" mt={16}>
          enter your credentials
        </FlaqText>
        <Formik
          initialValues={{
            email: 'ankit.negi@onpar.in',
            password: 'ankitnegi',
          }}
          validationSchema={validationSchema}
          validateOnBlur={true}
          onSubmit={async (values, {setSubmitting}) => {
            await loginUser(values.email, values.password);
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
                          touched && errors.email
                            ? 'red'
                            : Colors.text['solana-green'],
                      },
                    ]}
                  />
                  <View style={{height: 20}}>
                    <FlaqText size="xxs" align="left">
                      {errors.email}
                    </FlaqText>
                  </View>
                </View>
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
                          touched && errors.password
                            ? 'red'
                            : Colors.text['solana-green'],
                      },
                    ]}
                  />
                  <View style={{height: 20}}>
                    <FlaqText size="xxs" align="left">
                      {errors.password}
                    </FlaqText>
                  </View>
                </View>
                <FlaqButton
                  mt={28}
                  onPress={handleSubmit}
                  disabled={isSubmitting}>
                  <FlaqText color="black" weight="semibold" size="sm">
                    {isSubmitting ? 'loging in..' : 'log in'}
                  </FlaqText>
                </FlaqButton>
                <TouchableOpacity onPress={goToSignupPage}>
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
