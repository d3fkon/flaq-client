import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import FlaqContainer from '../components/common/flaqui/FlaqContainer';
import {Colors} from '../utils/colors';
import FlaqText from '../components/common/flaqui/FlaqText';
import globalStyles from '../utils/global_styles';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Container from '../components/common/Container';
import {AxiosError} from 'axios';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import {useQuery} from '@tanstack/react-query';
import {Campaign, Level} from './LevelScreen';
import {useRoute} from '@react-navigation/native';
import YoutubeIframe from 'react-native-youtube-iframe';
import Article from '../components/Article';
import MainArticle from '../components/MainArticle';

const ChapterScreen = ({navigation}: any) => {
  const route = useRoute();
  const [playing, setPlaying] = useState(false);
  const params = route.params as any;
  const campaingId: string = params.campaignId;
  const level: string = params.level;
  const axiosPrivate = useAxiosPrivate();

  const {data, isLoading, isError, isSuccess} = useQuery(
    ['campaign', campaingId],
    async () => {
      const response = await axiosPrivate.get<Level>(
        `/campaigns/level1/${level}`,
      );
      return response.data?.level2[0]?.campaigns?.find(
        _campaign => _campaign._id === campaingId,
      ) as Campaign;
    },
    {
      onError: (error: AxiosError) => {
        console.log('LEVEL1', error);
      },
    },
  );

  const onStateChange = useCallback((state: any) => {
    if (state === 'ended') {
      setPlaying(false);
      // Alert.alert('video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

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
      <Container>
        <TouchableOpacity onPress={goBack} style={{marginTop: 20}}>
          <Fontisto name="arrow-left-l" color={Colors.text.white} size={20} />
        </TouchableOpacity>
        {/* <FlaqText align="left" weight="semibold" mt={10}>
          {data?.title}
        </FlaqText> */}
      </Container>
      {(data.contentType === 'VideoAndArticles' ||
        data.contentType === 'Video') &&
        data?.videos?.length > 0 && (
          <ScrollView
            horizontal={true}
            // bounces={false}
            contentContainerStyle={{
              paddingHorizontal: 16,
              height: 360,
              maxHeight: 360,
              minHeight: 360,
              borderBottomColor: Colors.background.normal,
              borderBottomWidth: 1,
            }}
            style={{marginTop: 20}}>
            {data?.videos?.map((video, index) => {
              const id = video.url.split('=')[1];
              return (
                <View key={index}>
                  <View
                    style={{
                      maxWidth: 344,
                      padding: 12,
                      backgroundColor: Colors.background.dark,
                      borderColor: Colors.background.normal,
                      borderWidth: 1,
                      marginRight: 12,
                    }}>
                    <YoutubeIframe
                      height={180}
                      play={playing}
                      videoId={id}
                      onChangeState={onStateChange}
                    />
                    <FlaqText align="left" size="xs" mt={4} color="light">
                      {video.desc}
                    </FlaqText>
                  </View>
                  <FlaqText
                    size="xs"
                    style={{maxWidth: 344, paddingRight: 8}}
                    align="left"
                    mt={16}>
                    {video.title}
                  </FlaqText>
                </View>
              );
            })}
          </ScrollView>
        )}

      {(data.contentType === 'VideoAndArticles' ||
        data.contentType === 'Article') &&
        data?.articles?.length > 0 && (
          <>
            <Container>
              <FlaqText align="left" size="sm">
                here’s a mix of articles and twitter threads explaining the
                importance of ipfs
              </FlaqText>
            </Container>
            <ScrollView
              horizontal={true}
              contentContainerStyle={{
                height: 200,
                minHeight: 200,
                maxHeight: 200,
                width: 200,
                paddingHorizontal: 16,
              }}
              style={[globalStyles.fullWidth, {marginTop: 12}]}>
              {data?.articles?.map((article, index) => {
                return <MainArticle data={article} key={index} />;
              })}
            </ScrollView>
          </>
        )}
    </FlaqContainer>
  );
};

export default ChapterScreen;
