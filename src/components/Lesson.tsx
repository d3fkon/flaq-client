import React, {FC} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import {Level2} from '../screens/LevelScreen';
import globalStyles from '../utils/global_styles';
import Chapter from './Chapter';
import Container from './common/Container';
import FlaqText from './common/flaqui/FlaqText';

const Lesson: FC<Partial<Level2> & {level: string}> = ({
  campaigns,
  title,
  _id,
  level,
}) => {
  return (
    <Container fullWidth={true} mt={30}>
      <Container style={globalStyles.rowSpaceBetween}>
        <FlaqText align="left" style={{width: '75%'}}>
          {title}
        </FlaqText>
        <TouchableOpacity onPress={() => {}}>
          <FlaqText size="sm" weight="semibold" color="normal">
            view all
          </FlaqText>
        </TouchableOpacity>
      </Container>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          paddingLeft: 16,
        }}
        style={[globalStyles.fullWidth, {marginTop: 20}]}>
        {campaigns?.map((chapter: any, index) => {
          return (
            <Chapter
              key={index}
              levelOne={level}
              {...chapter}
              // navigation={navigation}
            />
          );
        })}
      </ScrollView>
    </Container>
  );
};

export default Lesson;
