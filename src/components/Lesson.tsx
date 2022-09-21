import React, {FC} from 'react';
import {ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import globalStyles from '../utils/global_styles';
import Chapter from './Chapter';
import Container from './common/Container';
import FlaqText from './common/flaqui/FlaqText';

export type LessonProp = {
  chapters: any;
  lesson: string;
  navigation: any;
};

const Lesson: FC<LessonProp> = ({chapters, lesson, navigation}) => {
  return (
    <Container fullWidth={true} mt={30}>
      <Container style={globalStyles.rowSpaceBetween}>
        <FlaqText align="left">{lesson}</FlaqText>
        <TouchableOpacity>
          <FlaqText size="sm" weight="semibold" color="normal">
            view all
          </FlaqText>
        </TouchableOpacity>
      </Container>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          paddingLeft: 20,
        }}
        style={[globalStyles.fullWidth, {marginTop: 20}]}>
        {chapters.map((chapter: any) => {
          return (
            <Chapter
              key={chapter.heading}
              data={chapter}
              navigation={navigation}
            />
          );
        })}
      </ScrollView>
    </Container>
  );
};

export default Lesson;
