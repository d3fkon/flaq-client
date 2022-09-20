import React from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import FlaqContainer from '../components/common/flaqui/FlaqContainer';
import FlaqText from '../components/common/flaqui/FlaqText';
import globalStyles from '../utils/global_styles';
import Fontisto from 'react-native-vector-icons/Fontisto';

import {Colors} from '../utils/colors';
import Lesson from '../components/Lesson';
import Container from '../components/common/Container';

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

export type LessonType = typeof lessons[0];

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

      <ScrollView style={globalStyles.fullWidth}>
        {lessons.map(lesson => {
          return (
            <Lesson
              key={lesson.lesson}
              chapters={lesson.chapters}
              lesson={lesson.lesson}
            />
          );
        })}
      </ScrollView>
    </FlaqContainer>
  );
};

export default HomeScreen;
