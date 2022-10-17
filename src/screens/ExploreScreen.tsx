import React, {FC, useContext, useState} from 'react';
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
import Container from '../components/common/Container';
import {useQuery} from '@tanstack/react-query';
import {AccountStatus, GlobalContext} from '../state/contexts/GlobalContext';
import {setAccountStatus} from '../state/actions/global';
import {AxiosError} from 'axios';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import {showMessage} from 'react-native-flash-message';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ExploreStackParamList} from '../navigation/Home';
import FlaqAccordian from '../components/common/flaqui/FlaqAccordian';
import {logout} from '../apis/query';
import {StorageClearAll} from '../utils/storage';

export type LevelOne = {
  _id: string;
  title: string;
  description: string;
};

type ExploreScreenProps = NativeStackScreenProps<
  ExploreStackParamList,
  'Explore'
>;

const ExploreScreen: FC<ExploreScreenProps> = ({navigation}) => {
  const [lang, setLang] = useState<'eng' | 'hn'>('eng');
  const {state, dispatch} = useContext(GlobalContext);
  const axiosPrivate = useAxiosPrivate();

  const {data, isLoading, isError, isFetching} = useQuery(
    ['level1', lang],
    async values => {
      const response = await axiosPrivate.get<LevelOne[]>(
        `/campaigns/level1?lang=${values.queryKey[1]}`,
      );
      return response.data;
    },
    {
      onError: error => {
        console.log('ERROR___>', error);
        if (error instanceof AxiosError) {
          if (error.response?.data.statusCode === 404) {
            showMessage({
              message: 'login again',
              type: 'info',
            });
            dispatch(setAccountStatus(AccountStatus.NEW));
          }
        }
      },
    },
  );

  const openLevel = (level: string) => {
    navigation.navigate('Level', {level});
  };

  const changeLang = () => {
    setLang(lang === 'eng' ? 'hn' : 'eng');
  };

  const englishQuestions = [
    {
      title: 'Are each of the courses constrained by time?',
      content:
        'No, you can read any part of the course and complete whichever course you choose to, at your own pace.',
    },
    {
      title: 'Do I have to pay to access the content?',
      content:
        'No, all of our educative pieces are free of cost and at no point will you be asked to pay.',
    },
    {
      title:
        'Can I reach out to the team in case of any content-related doubts for guidance?',
      content:
        "yes, you can reach out to us through our contact us page and we're here to guide you!",
    },
  ];

  const hindiQuestions = [
    {
      title: 'क्या प्रत्येक पाठ्यक्रम समय से विवश है?',
      content:
        'नहीं, आप पाठ्यक्रम के किसी भी भाग को पढ़ सकते हैं और अपनी गति से जो भी पाठ्यक्रम चुनते हैं उसे पूरा कर सकते हैं।',
    },
    {
      title: 'क्या मुझे सामग्री तक पहुंचने के लिए भुगतान करना होगा?',
      content:
        'नहीं, हमारे सभी शिक्षाप्रद अंश निःशुल्क हैं और आपको किसी भी समय भुगतान करने के लिए नहीं कहा जाएगा।',
    },
    {
      title:
        'क्या मैं मार्गदर्शन के लिए सामग्री से संबंधित किसी भी संदेह के मामले में टीम से संपर्क कर सकता हूं?',
      content:
        'हाँ, आप हमसे संपर्क करें पृष्ठ के माध्यम से हमसे संपर्क कर सकते हैं और हम आपका मार्गदर्शन करने के लिए यहां हैं!',
    },
  ];

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

  if (isLoading) {
    return (
      <FlaqContainer fullWidth={true}>
        <Container>
          <View style={[globalStyles.rowSpaceBetween, globalStyles.fullWidth]}>
            <View style={globalStyles.rowCenter}>
              <FlaqText
                align="left"
                weight="semibold"
                mt={30}
                mb={20}
                size="lg">
                {lang === 'eng' ? 'explore flaq' : 'Flaq का अन्वेषण करें'}
              </FlaqText>
              <TouchableOpacity onPress={changeLang}>
                <View
                  accessible={true}
                  accessibilityLabel="loading"
                  style={globalStyles.rowCenter}>
                  {isFetching && (
                    <ActivityIndicator
                      size={'small'}
                      style={{marginTop: 30, marginBottom: 20, marginRight: 10}}
                    />
                  )}
                  <FlaqText
                    accessible={true}
                    accessibilityLabel={`change language to ${
                      lang === 'eng' ? 'hindi' : 'eng'
                    }`}
                    mt={30}
                    mb={20}
                    color="awaiting"
                    style={{textDecorationLine: 'underline'}}
                    weight="semibold">
                    {lang === 'eng' ? 'hindi' : 'eng'}
                  </FlaqText>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => handleLogout()}>
              <FlaqText
                mt={30}
                mb={20}
                style={{color: '#991b1b'}}
                weight="bold">
                logout
              </FlaqText>
            </TouchableOpacity>
          </View>
        </Container>
        <View style={globalStyles.fullCenter}>
          <ActivityIndicator />
        </View>
        <Container>
          <FlaqText
            align="left"
            weight="semibold"
            size="lg"
            style={[globalStyles.fullWidth, {marginTop: 30}]}>
            {lang === 'eng' ? 'questions?' : 'सवाल?'}
          </FlaqText>
          <ScrollView
            accessibilityRole="adjustable"
            accessible={true}
            accessibilityLabel="frequently asked questions"
            showsVerticalScrollIndicator={false}
            style={{
              width: '100%',
              paddingVertical: 12,
            }}>
            <FlaqAccordian
              sections={lang === 'eng' ? englishQuestions : hindiQuestions}
            />
          </ScrollView>
        </Container>
      </FlaqContainer>
    );
  }

  if (isError) {
    return (
      <FlaqContainer fullWidth={true}>
        <Container>
          <View style={[globalStyles.rowSpaceBetween, globalStyles.fullWidth]}>
            <View style={globalStyles.rowCenter}>
              <FlaqText
                align="left"
                weight="semibold"
                mt={30}
                mb={20}
                size="lg">
                {lang === 'eng' ? 'explore flaq' : 'Flaq का अन्वेषण करें'}
              </FlaqText>
              <TouchableOpacity onPress={changeLang}>
                <View style={globalStyles.rowCenter}>
                  {isFetching && (
                    <ActivityIndicator
                      size={'small'}
                      style={{marginTop: 30, marginBottom: 20, marginRight: 10}}
                    />
                  )}
                  <FlaqText
                    mt={30}
                    mb={20}
                    color="awaiting"
                    style={{textDecorationLine: 'underline'}}
                    weight="semibold">
                    {lang === 'eng' ? 'hindi' : 'eng'}
                  </FlaqText>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => handleLogout()}>
              <FlaqText
                mt={30}
                mb={20}
                style={{color: '#991b1b'}}
                weight="bold">
                logout
              </FlaqText>
            </TouchableOpacity>
          </View>
        </Container>
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
        <Container>
          <FlaqText
            align="left"
            weight="semibold"
            size="lg"
            style={[globalStyles.fullWidth, {marginTop: 30}]}>
            {lang === 'eng' ? 'questions?' : 'सवाल?'}
          </FlaqText>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              width: '100%',
              paddingVertical: 12,
            }}>
            <FlaqAccordian
              sections={lang === 'eng' ? englishQuestions : hindiQuestions}
            />
          </ScrollView>
        </Container>
      </FlaqContainer>
    );
  }
  // console.log(data);

  return (
    <FlaqContainer fullWidth={true}>
      <Container>
        <View style={[globalStyles.rowSpaceBetween, globalStyles.fullWidth]}>
          <View style={globalStyles.rowCenter}>
            <FlaqText align="left" weight="semibold" mt={30} mb={20} size="lg">
              {lang === 'eng' ? 'explore flaq' : 'Flaq का अन्वेषण करें'}
            </FlaqText>
            <TouchableOpacity style={{marginLeft: 10}} onPress={changeLang}>
              <View style={globalStyles.rowCenter}>
                {isFetching && (
                  <ActivityIndicator
                    size={'small'}
                    style={{marginTop: 30, marginBottom: 20, marginRight: 10}}
                  />
                )}
                <FlaqText
                  mt={30}
                  mb={20}
                  color="awaiting"
                  style={{textDecorationLine: 'underline'}}
                  weight="semibold">
                  {lang === 'eng' ? 'hindi' : 'eng'}
                </FlaqText>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => handleLogout()}>
            <FlaqText mt={30} mb={20} style={{color: '#991b1b'}} weight="bold">
              logout
            </FlaqText>
          </TouchableOpacity>
        </View>
      </Container>
      <ScrollView
        accessibilityRole="adjustable"
        accessible={true}
        accessibilityLabel="level 1"
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: 16,
        }}
        style={{
          width: '100%',
          minHeight: 350,
          maxHeight: 350,
        }}>
        {data?.map((content, index) => {
          return (
            <Box
              lang={lang}
              key={index}
              index={index}
              content={content}
              openLevel={openLevel}
            />
          );
        })}
        {data.length === 0 && (
          <FlaqText align="center">
            {lang === 'eng' ? 'no content' : 'hindi content coming soon'}
          </FlaqText>
        )}
      </ScrollView>
      <Container>
        <FlaqText
          align="left"
          weight="semibold"
          size="lg"
          style={[globalStyles.fullWidth, {marginTop: 30}]}>
          {lang === 'eng' ? 'questions?' : 'सवाल?'}
        </FlaqText>
        <ScrollView
          accessibilityRole="adjustable"
          accessible={true}
          accessibilityLabel="frequently asked questions"
          showsVerticalScrollIndicator={false}
          style={{
            width: '100%',
            height: 230,
            paddingVertical: 12,
          }}>
          <FlaqAccordian
            sections={lang === 'eng' ? englishQuestions : hindiQuestions}
          />
        </ScrollView>
      </Container>
    </FlaqContainer>
  );
};

type BoxProps = {
  index: number;
  content: LevelOne;
  openLevel: (level: string) => void;
  lang: 'eng' | 'hn';
};

const Box: FC<BoxProps> = ({index, lang, content, openLevel}) => {
  return (
    <View style={{height: 350}}>
      <View
        accessible={true}
        accessibilityLabel={content.title}
        style={{
          width: 350,
          height: 350,
          borderRadius: 20,
          position: 'relative',
          overflow: 'hidden',
          marginRight: 10,
        }}>
        <View
          style={{
            zIndex: 1,
            width: 220,
            height: 350,
            position: 'absolute',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
            paddingBottom: 24,
            paddingLeft: 24,
          }}>
          <FlaqText color="white" size="xl" align="left">
            {content.title}
          </FlaqText>
          <FlaqText size="xs" align="left" mt={14}>
            {content.description}
          </FlaqText>
          <FlaqButton
            accessibilityLabel="click get started"
            fullWidth={false}
            mt={14}
            onPress={() => openLevel(content._id)}>
            <FlaqText color="black" weight="semibold" size="sm">
              {lang === 'eng' ? 'get started' : 'शुरू करें'}
            </FlaqText>
          </FlaqButton>
        </View>
        <Image
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
        />
      </View>
    </View>
  );
};

export default ExploreScreen;
