import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Platform, SafeAreaView, TouchableOpacity} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {WebView} from 'react-native-webview';
import Container from '../components/common/Container';
import TopNavbar from '../components/common/TopNavbar';
import {ExploreStackParamList, TabParamList} from '../navigation/Home';
import {Colors} from '../utils/colors';

export type WebViewScreenProps = CompositeScreenProps<
  NativeStackScreenProps<ExploreStackParamList, 'WebView'>,
  BottomTabScreenProps<TabParamList>
>;

function WebViewScreen() {
  const navigation = useNavigation<WebViewScreenProps['navigation']>();
  const route = useRoute<WebViewScreenProps['route']>();
  const url = route.params.uri;

  return (
    <>
      <Container>
        <TouchableOpacity
          onPress={navigation.goBack}
          style={{
            marginTop: Platform.OS === 'ios' ? 60 : 20,
            marginBottom: 20,
          }}>
          <Fontisto name="arrow-left-l" color={Colors.text.white} size={20} />
        </TouchableOpacity>
      </Container>
      <WebView source={{uri: url}} />
    </>
  );
}

export default WebViewScreen;
