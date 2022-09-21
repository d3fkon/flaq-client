import React from 'react';
import {Image, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import FlaqContainer from '../components/common/flaqui/FlaqContainer';
import FlaqText from '../components/common/flaqui/FlaqText';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Colors} from '../utils/colors';
import globalStyles from '../utils/global_styles';
import Lesson from '../components/Lesson';

const lessons = [
  {
    lesson: "the term 'web3' explained",
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
  {
    lesson: 'tech behind web3: blockchain',
    chapters: [
      {
        icon: 'three',
        heading: 'blockchain defined',
        subHeading:
          'a shared, immutable ledger that facilitates the process of recording transactions and tracking',
      },
      {
        icon: 'four',
        heading: 'where did blockchain come from',
        subHeading:
          'blockchain TECH was described in 1991 by the research scientist Stuart Haber and W. Scott Stornetta.',
      },
    ],
  },
  {
    lesson: 'tech behind web3: blockchain new',
    chapters: [
      {
        icon: 'three',
        heading: 'blockchain defined',
        subHeading:
          'a shared, immutable ledger that facilitates the process of recording transactions and tracking',
      },
      {
        icon: 'four',
        heading: 'where did blockchain come from',
        subHeading:
          'blockchain TECH was described in 1991 by the research scientist Stuart Haber and W. Scott Stornetta.',
      },
    ],
  },
];

export type LessonType = typeof lessons[0];

const LevelScreen = ({navigation}: any) => {
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <FlaqContainer fullWidth={true}>
      <View
        style={{
          backgroundColor: Colors.background.purple,
          width: '100%',
          alignItems: 'center',
          paddingVertical: 20,
          overflow: 'hidden',
          position: 'relative',
        }}>
        <Image
          source={require('../../assets/images/corner.png')}
          style={{
            position: 'absolute',
            width: 90,
            resizeMode: 'contain',
            height: 90,
            right: 0,
            top: -8,
          }}
        />
        <View style={{width: '90%'}}>
          <TouchableOpacity onPress={goBack}>
            <Fontisto name="arrow-left-l" color={Colors.text.white} size={20} />
          </TouchableOpacity>
          <FlaqText align="left" size="lg" weight="semibold" mt={10}>
            lv.1 dive into web3
          </FlaqText>
          <FlaqText align="left" size="xs" style={{width: '60%'}} mt={10}>
            learn about the evolution & relevance of web3
          </FlaqText>
        </View>
      </View>
      <ScrollView style={globalStyles.fullWidth}>
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
      </ScrollView>
    </FlaqContainer>
  );
};

export default LevelScreen;
