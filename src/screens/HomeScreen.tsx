import React, {useContext} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import FlaqContainer from '../components/common/flaqui/FlaqContainer';
import FlaqText from '../components/common/flaqui/FlaqText';
import globalStyles from '../utils/global_styles';
import Lesson from '../components/Lesson';
import Container from '../components/common/Container';
import InfoCard from '../components/InfoCard';
import Article from '../components/Article';
import {useQuery} from '@tanstack/react-query';
import {Level} from './LevelScreen';
import {logout} from '../apis/query';
import {showMessage} from 'react-native-flash-message';
import {AccountStatus, GlobalContext} from '../state/contexts/GlobalContext';
import {setAccountStatus} from '../state/actions/global';
import axios from '../apis/axios';
import useAuth from '../hooks/useAuth';
import {StorageClearAll} from '../utils/storage';

const infoCards = [
  {name: 'daily streak', value: 5},
  {name: 'lesson learnt', value: 3},
  {name: 'total points', value: 300},
];

const articles = [
  {
    icon: 'one',
    heading: 'dive into web3',
    subHeading: 'where did blockchain come from',
  },
  {
    icon: 'two',
    heading: 'dive into web3 new',
    subHeading: 'where did blockchain come from',
  },
  {
    icon: 'three',
    heading: 'dive into web3 two',
    subHeading: 'where did blockchain come from',
  },
];

// export type LessonType = typeof lessons[0];
export type InfoCardType = typeof infoCards[0];
export type ArticleTypes = typeof articles[0];

const HomeScreen = () => {
  const {
    state: {auth},
    dispatch,
  } = useContext(GlobalContext);

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
  const query = '63236baa9beae60aee9b1839';
  const {data, isLoading, isError} = useQuery(['level2', query], async () => {
    const response = await axios.get<Level>(`/campaigns/level1/${query}`);
    return response.data;
  });

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
          <TouchableOpacity onPress={() => {}}>
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

  return (
    <FlaqContainer fullWidth={true}>
      <Container>
        <View style={[globalStyles.fullWidth, globalStyles.rowSpaceBetween]}>
          <FlaqText mt={30} mb={20} size="lg" weight="semibold">
            hi {auth?.email?.split('@')[0]}
          </FlaqText>
          <TouchableOpacity
            onPress={handleLogout}
            style={{marginTop: 30, marginBottom: 20}}>
            <FlaqText
              weight="semibold"
              color="purple"
              style={{textDecorationLine: 'underline'}}>
              logout
            </FlaqText>
          </TouchableOpacity>
        </View>
      </Container>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          paddingLeft: 16,
        }}
        style={[
          globalStyles.fullWidth,
          {marginTop: 20, maxHeight: 100, minHeight: 100},
        ]}>
        {infoCards.map(info => {
          return <InfoCard data={info} key={info.name} />;
        })}
      </ScrollView>
      <View style={globalStyles.fullWidth}>
        {data?.level2.map((lesson, index) => {
          return (
            <Lesson
              level={query}
              key={index}
              campaigns={lesson.campaigns}
              title={'continue learning'}
            />
          );
        })}
      </View>
      <Container style={{marginTop: 20}}>
        <FlaqText align="left" mb={20}>
          new articles
        </FlaqText>
      </Container>
      <ScrollView style={[globalStyles.fullWidth, {paddingHorizontal: 16}]}>
        {articles.map((article, index) => {
          return <Article data={article} key={index} />;
        })}
      </ScrollView>
    </FlaqContainer>
  );
};

export default HomeScreen;
