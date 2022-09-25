import React from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import FlaqContainer from '../components/common/flaqui/FlaqContainer';
import FlaqText from '../components/common/flaqui/FlaqText';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Colors} from '../utils/colors';
import globalStyles from '../utils/global_styles';
import Lesson from '../components/Lesson';
import Container from '../components/common/Container';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

export interface Video {
  url: string;
  desc: string;
  title: string;
}

export interface Article {
  url: string;
  title: string;
  iconUrl: string;
}

export type ContentType = 'VideoAndArticles' | 'Video' | 'Article';

export interface Campaign {
  _id: string;
  title: string;
  description1: string;
  description2: string;
  description3: string;
  videos: Video[];
  contentType: ContentType;
  status: string;
  image: string;
  articles: Article[];
  quizzes: any[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Level2 {
  _id: string;
  title: string;
  campaigns: Campaign[];
}

export interface MultipleLang {
  eng: string;
  hn: string;
  _id: string;
}

export interface Level {
  _id: string;
  imageUrl: string;
  title: string;
  description: string;
  level2: Level2[];
  language: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  multipleLang: MultipleLang;
}

const LevelScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const axios = useAxiosPrivate();

  const params = route.params as any;
  const query = params.level;

  const {data, isLoading, isError} = useQuery(
    ['level2', query],
    async () => {
      const response = await axios.get<Level>(`/campaigns/level1/${query}`);
      return response.data;
    },
    {
      onError: error => {
        console.log('LEVEL1', error);
      },
    },
  );

  const goBack = async () => {
    navigation.goBack();
  };

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
        <Container
          style={{zIndex: 10, backgroundColor: Colors.background.transparent}}>
          <Pressable onPress={() => goBack()}>
            <Fontisto name="arrow-left-l" color={Colors.text.white} size={20} />
          </Pressable>
          <FlaqText align="left" size="lg" weight="semibold" mt={10}>
            {data!.title}
          </FlaqText>
          <FlaqText align="left" size="xs" style={{width: '60%'}} mt={10}>
            {data!.description}
          </FlaqText>
        </Container>
      </View>
      <ScrollView style={globalStyles.fullWidth}>
        {data!.level2?.map(lesson => {
          return (
            <Lesson
              // navigation={navigation}
              level={query}
              key={lesson.title}
              campaigns={lesson.campaigns}
              title={lesson.title}
            />
          );
        })}
      </ScrollView>
    </FlaqContainer>
  );
};

export default LevelScreen;
