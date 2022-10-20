import {View, Image, TouchableOpacity, Linking, Alert} from 'react-native';
import React from 'react';
import FlaqContainer from '../components/common/flaqui/FlaqContainer';
import globalStyles from '../utils/global_styles';
import FlaqText from '../components/common/flaqui/FlaqText';
import {
  CompositeScreenProps,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ExploreStackParamList, TabParamList} from '../navigation/Home';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../utils/colors';
import Container from '../components/common/Container';
import FlaqButton from '../components/common/flaqui/FlaqButton';
import FlaqCustomInput from '../components/common/flaqui/FlaqCustomInput';
import {showMessage} from 'react-native-flash-message';
import Clipboard from '@react-native-community/clipboard';

export type TipScreenProps = CompositeScreenProps<
  NativeStackScreenProps<ExploreStackParamList, 'Tip'>,
  BottomTabScreenProps<TabParamList>
>;

const TipScreen = () => {
  const {
    params: {walletAddress},
  } = useRoute<TipScreenProps['route']>();
  const navigation = useNavigation<TipScreenProps['navigation']>();

  const openPhantom = () => {
    const link = 'https://phantom.app/';
    Linking.canOpenURL(link).then(supported => {
      if (supported) {
        Linking.openURL(link);
      } else {
        console.log("Don't know how to open URI: " + link);
        showMessage({
          message: "can't open phantom. please open it manually",
          type: 'info',
        });
      }
    });
  };
  const handleCopy = (text: string) => {
    Clipboard.setString(text);
    // showMessage({
    //   message: 'address copied',
    // });
    Alert.alert('address copied');
  };

  return (
    <FlaqContainer background="dark" fullWidth={true}>
      <Container
        background="dark"
        fullWidth={true}
        style={{marginTop: 10, padding: 10}}>
        <TouchableOpacity onPress={navigation.goBack}>
          <FontAwesome name="caret-down" color={Colors.text.white} size={20} />
        </TouchableOpacity>
      </Container>
      <View style={{marginTop: 40, alignItems: 'center'}}>
        <Image
          source={require('../../assets/images/icons/flaq.png')}
          style={{width: 70, height: 70, resizeMode: 'contain'}}
        />
        <FlaqText mt={16} color="white" size="xl" weight="semibold">
          flaq academy
        </FlaqText>
      </View>
      <Container
        style={[globalStyles.fullCenter, globalStyles.fullWidth]}
        background="dark">
        <View style={globalStyles.fullWidth}>
          <FlaqCustomInput
            editable={false}
            style={{width: '100%'}}
            mt={8}
            value={walletAddress}
            iconName="content-copy"
            handleIconPress={() => handleCopy(walletAddress)}
            iconType="mci"
          />
        </View>
      </Container>
      <Container background="dark" style={{marginBottom: 20, padding: 20}}>
        <FlaqButton
          // mt={28}
          onPress={openPhantom}
          // disabled={isSubmitting}>
        >
          <FlaqText color="black" weight="semibold" size="sm">
            open phantom
          </FlaqText>
        </FlaqButton>
      </Container>
    </FlaqContainer>
  );
};
export default TipScreen;
