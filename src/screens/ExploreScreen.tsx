import React, {FC, useContext} from 'react';
import {ActivityIndicator, Image, ScrollView, View} from 'react-native';
import FlaqButton from '../components/common/flaqui/FlaqButton';
import FlaqContainer from '../components/common/flaqui/FlaqContainer';
import FlaqText from '../components/common/flaqui/FlaqText';
import globalStyles from '../utils/global_styles';
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
import HomeInfoCards from '../components/HomeInfoCards';
import {questions} from '../utils/constants';

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
  const {
    state: {lang},
    dispatch,
  } = useContext(GlobalContext);
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
            </View>
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
            <FlaqAccordian sections={questions[lang]} />
          </ScrollView>
        </Container>
      </FlaqContainer>
    );
  }

  return (
    <FlaqContainer fullWidth={true}>
      <Container>
        <View style={[globalStyles.rowSpaceBetween, globalStyles.fullWidth]}>
          <View style={globalStyles.rowCenter}>
            <FlaqText align="left" weight="semibold" mt={30} mb={20} size="lg">
              {lang === 'eng' ? 'explore flaq' : 'Flaq का अन्वेषण करें'}
            </FlaqText>
          </View>
        </View>
      </Container>
      <ScrollView horizontal={false} style={{width: '100%'}}>
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
          {isError ? (
            <Box
              lang="eng"
              content={{
                title: 'error',
                _id: 'flaq_error',
                description: 'there was some error fetching data',
              }}
              index={0}
              openLevel={openLevel}
            />
          ) : (
            data?.map((content, index) => {
              return (
                <Box
                  lang={lang}
                  key={index}
                  index={index}
                  content={content}
                  openLevel={openLevel}
                />
              );
            })
          )}
          {data && data.length === 0 && (
            <FlaqText align="center">
              {lang === 'eng' ? 'no content' : 'hindi content coming soon'}
            </FlaqText>
          )}
        </ScrollView>
        <HomeInfoCards lang={lang} />
        <Container>
          <FlaqText align="left" weight="semibold" size="lg" mt={30} mb={20}>
            {lang === 'eng' ? 'questions?' : 'सवाल?'}
          </FlaqText>
          <View style={globalStyles.fullWidth}>
            <FlaqAccordian sections={questions[lang]} />
          </View>
        </Container>
      </ScrollView>
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
  const {dispatch} = useContext(GlobalContext);

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
            onPress={() => {
              if (content._id === 'flaq_error') {
                dispatch(setAccountStatus(AccountStatus.NEW));
              } else {
                openLevel(content._id);
              }
            }}>
            <FlaqText color="black" weight="semibold" size="sm">
              {content._id === 'flaq_error'
                ? 'try again?'
                : lang === 'eng'
                ? 'get started'
                : 'शुरू करें'}
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
