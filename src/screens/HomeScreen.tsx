import React from 'react';
import {ScrollView, View} from 'react-native';
import FlaqContainer from '../components/common/flaqui/FlaqContainer';
import FlaqText from '../components/common/flaqui/FlaqText';
import globalStyles from '../utils/global_styles';
import Lesson from '../components/Lesson';
import Container from '../components/common/Container';
import InfoCard from '../components/InfoCard';
import Article from '../components/Article';

const infoCards = [
  {name: 'daily streak', value: 5},
  {name: 'lesson learnt', value: 3},
  {name: 'total points', value: 300},
];

const lessons = [
  {
    lesson: 'continue learning',
    chapters: [
      {
        icon: 'one',
        heading: 'web3 defined',
        subHeading:
          'learn about new iteration of the world wide web which incorporates concepts such as decentralization',
      },
      {
        icon: 'two',
        heading: 'the evolution of web3',
        subHeading:
          'in 2006, Berners-Lee described the semantic web as a component of Web 3.0, which is different from the',
      },
    ],
  },
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

export type LessonType = typeof lessons[0];
export type InfoCardType = typeof infoCards[0];
export type ArticleTypes = typeof articles[0];

const HomeScreen = ({navigation}: {navigation: any}) => {
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <FlaqContainer fullWidth={true}>
      <Container>
        {/* <TouchableOpacity onPress={goBack}>
          <Fontisto name="arrow-left-l" color={Colors.text.white} size={20} />
        </TouchableOpacity> */}
        <View>
          <FlaqText mt={30} mb={20} size="lg" weight="semibold">
            hi ankit
          </FlaqText>
        </View>
      </Container>
      <ScrollView
        horizontal={true}
        style={[
          globalStyles.fullWidth,
          {paddingLeft: 20, marginTop: 20, maxHeight: 100, minHeight: 100},
        ]}>
        {infoCards.map(info => {
          return <InfoCard data={info} key={info.name} />;
        })}
      </ScrollView>
      <View style={globalStyles.fullWidth}>
        {lessons.map(lesson => {
          return (
            <Lesson
              navigation={navigation}
              key={lesson.lesson}
              chapters={lesson.chapters}
              lesson={lesson.lesson}
            />
          );
        })}
      </View>
      <Container style={{marginTop: 20}}>
        <FlaqText align="left" mb={20}>
          new articles
        </FlaqText>
      </Container>
      <ScrollView style={{width: '90%'}}>
        {articles.map(article => {
          return <Article data={article} key={article.heading} />;
        })}
      </ScrollView>
    </FlaqContainer>
  );
};

export default HomeScreen;
