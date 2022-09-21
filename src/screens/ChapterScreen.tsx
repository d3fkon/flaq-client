import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import FlaqContainer from '../components/common/flaqui/FlaqContainer';
import {Colors} from '../utils/colors';
import FlaqText from '../components/common/flaqui/FlaqText';
import globalStyles from '../utils/global_styles';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Container from '../components/common/Container';

const ChapterScreen = ({navigation}: any) => {
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <FlaqContainer fullWidth={true}>
      <Container>
        <TouchableOpacity onPress={goBack} style={{marginTop: 20}}>
          <Fontisto name="arrow-left-l" color={Colors.text.white} size={20} />
        </TouchableOpacity>
        <FlaqText align="left" size="lg" weight="semibold" mt={10}>
          {/* lv.1 dive into web3 */}
          what is ipfs
        </FlaqText>
      </Container>
      <ScrollView
        style={[globalStyles.fullWidth]}
        contentContainerStyle={{alignItems: 'center'}}>
        <Container>
          <FlaqText align="left">feed your mind</FlaqText>
          <FlaqText align="left">
            here’s a mix of articles and twitter threads explaining the
            importance of ipfs
          </FlaqText>
        </Container>

        {/* {lessons.map(lesson => {
          return (
            <Lesson
              navigation={navigation}
              key={lesson.lesson}
              chapters={lesson.chapters}
              lesson={lesson.lesson}
            />
          ); */}
        {/* })} */}
      </ScrollView>
    </FlaqContainer>
  );
};

export default ChapterScreen;
