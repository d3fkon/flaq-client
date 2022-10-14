import React, {FC, useContext} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import FlaqButton from '../components/common/flaqui/FlaqButton';
import FlaqContainer from '../components/common/flaqui/FlaqContainer';
import FlaqText from '../components/common/flaqui/FlaqText';
import globalStyles from '../utils/global_styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../utils/colors';
import {logout} from '../apis/query';
import {StorageClearAll} from '../utils/storage';
import {AccountStatus, GlobalContext} from '../state/contexts/GlobalContext';
import {setAccountStatus} from '../state/actions/global';
import {showMessage} from 'react-native-flash-message';
import {useQuery} from '@tanstack/react-query';
import axios from '../apis/axios';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NewsParamList} from '../navigation/Home';
import {useNavigation} from '@react-navigation/native';

type NewsScreenProps = NativeStackScreenProps<NewsParamList, 'News'>;

type NewsType = {
  title: string;
  description: string;
  image: string;
  url: string;
};

const NewsScreen = () => {
  const {state, dispatch} = useContext(GlobalContext);

  const navigation = useNavigation<NewsScreenProps['navigation']>();

  const {data, isLoading, isError} = useQuery(
    ['news'],
    async () => {
      const response = await axios.get<NewsType[]>('/news/getNews');
      return response.data;
    },
    {
      onError: error => {
        console.log('LEVEL1', error);
      },
    },
  );

  if (isLoading) {
    return (
      <FlaqContainer fullWidth={true}>
        <View style={globalStyles.fullCenter}>
          <ActivityIndicator />
        </View>
      </FlaqContainer>
    );
  }

  if (isError) {
    return (
      <FlaqContainer fullWidth={true}>
        <View style={globalStyles.fullCenter}>
          {/* <ActivityIndicator /> */}
          <FlaqText>there is some error fetching data.</FlaqText>
          <TouchableOpacity
            onPress={() => {
              dispatch(setAccountStatus(AccountStatus.NEW));
            }}>
            <FlaqText
              weight="semibold"
              style={{textDecorationLine: 'underline'}}>
              try again?
            </FlaqText>
          </TouchableOpacity>
        </View>
      </FlaqContainer>
    );
  }

  const handleLogout = async () => {
    try {
      await logout();
      await StorageClearAll();
      dispatch(setAccountStatus(AccountStatus.NEW));
    } catch (e) {
      showMessage({
        message: 'error logging out',
        type: 'danger',
      });
    }
  };

  return (
    <>
      <FlaqContainer>
        <View style={[globalStyles.fullWidth, globalStyles.rowSpaceBetween]}>
          <FlaqText
            align="left"
            weight="semibold"
            mt={30}
            mb={20}
            size="lg"
            style={globalStyles.fullWidth}>
            flaq news
          </FlaqText>
          <TouchableOpacity onPress={() => handleLogout()}>
            <FlaqText color="black">logout</FlaqText>
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{flex: 1, width: '100%'}}>
          {data.map(content => {
            return (
              <Box
                key={content.title}
                content={content}
                navigation={navigation}
              />
            );
          })}
        </ScrollView>
      </FlaqContainer>
    </>
  );
};

const Box = ({content, navigation}: {content: NewsType; navigation: any}) => {
  const openWebView = () => {
    navigation.navigate('WebView', {uri: content.url});
  };

  return (
    <View style={{height: 350, width: '100%', marginBottom: 10}}>
      <View
        style={{
          width: '100%',
          height: 350,
          borderRadius: 20,
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: Colors.background.normal,
        }}>
        <View
          style={{
            zIndex: 1,
            width: 300,
            height: 350,
            padding: 30,
            position: 'absolute',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}>
          <Image
            source={require('../../assets/images/bi.png')}
            style={{
              width: 60,
              height: 60,
              resizeMode: 'contain',
              borderRadius: 8,
            }}
          />
          <FlaqText color="white" size="lg" align="left">
            {content.title}
          </FlaqText>
          <FlaqText size="sm" align="left" style={{lineHeight: 22}}>
            {content.description.slice(1, 100)}
            {content.description.length > 100 && '...'}
          </FlaqText>
          <FlaqButton
            onPress={openWebView}
            fullWidth={false}
            style={globalStyles.rowCenter}>
            <FlaqText
              color="black"
              weight="semibold"
              size="sm"
              style={{marginRight: 8}}>
              read now
            </FlaqText>
            <MaterialIcons
              name="arrow-right-alt"
              size={20}
              color={Colors.text.black}
            />
          </FlaqButton>
        </View>
        {/* <Image
          source={
            index % 2 === 0
              ? require('../../assets/images/prup.png')
              : require('../../assets/images/red.png')
          }
          style={{
            width: '100%',
            zIndex: 0,
            height: 350,
            borderColor: 'green',
            resizeMode: 'stretch',
          }}
        /> */}
      </View>
    </View>
  );
};

export default NewsScreen;
