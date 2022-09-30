import {
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useContext, useState} from 'react';
import FlaqContainer from '../components/common/flaqui/FlaqContainer';
import {Colors} from '../utils/colors';
import FlaqText from '../components/common/flaqui/FlaqText';
import globalStyles from '../utils/global_styles';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Container from '../components/common/Container';
import {AxiosError} from 'axios';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import {useQuery} from '@tanstack/react-query';
import {Campaign, Level} from './LevelScreen';
import {
  CompositeScreenProps,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import YoutubeIframe from 'react-native-youtube-iframe';
import MainArticle from '../components/MainArticle';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ExploreStackParamList, TabParamList} from '../navigation/Home';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {AccountStatus, GlobalContext} from '../state/contexts/GlobalContext';
import {setAccountStatus} from '../state/actions/global';

export type ChapterScreenProps = CompositeScreenProps<
  NativeStackScreenProps<ExploreStackParamList, 'Chapter'>,
  BottomTabScreenProps<TabParamList>
>;

const ChapterScreen = () => {
  const {state: gloabalState, dispatch} = useContext(GlobalContext);
  const navigation = useNavigation<ChapterScreenProps['navigation']>();
  const {
    params: {campaignId, level, levelId, walletAddress},
  } = useRoute<ChapterScreenProps['route']>();

  const [playing, setPlaying] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const {data, isLoading, isError} = useQuery(
    ['campaign', campaignId],
    async () => {
      const response = await axiosPrivate.get<Level>(
        `/campaigns/level1/${level}`,
      );
      return (
        (response.data?.level2[levelId]?.campaigns?.find(
          _campaign => _campaign._id === campaignId,
        ) as Campaign) ?? []
      );
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
        <View
          accessible={true}
          accessibilityLabel="error fetching data"
          style={globalStyles.fullCenter}>
          {/* <ActivityIndicator /> */}
          <FlaqText>there is some error fetching data.</FlaqText>
          <TouchableOpacity
            onPress={() => {
              dispatch(setAccountStatus(AccountStatus.NEW));
            }}>
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
        <View style={[globalStyles.rowSpaceBetween, globalStyles.fullWidth]}>
          <TouchableOpacity onPress={goBack} style={{marginTop: 20}}>
            <Fontisto name="arrow-left-l" color={Colors.text.white} size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Tip', {walletAddress})}
            style={[
              globalStyles.rowCenter,
              {
                marginTop: 20,
                backgroundColor: Colors.background.normal,
                paddingVertical: 4,
                paddingHorizontal: 8,
                borderRadius: 20,
              },
            ]}>
            <AntDesign name="hearto" color={Colors.text.pink} size={20} />
            <FlaqText size="xs" style={{marginLeft: 8}} color="pink">
              Tip
            </FlaqText>
          </TouchableOpacity>
        </View>
        {/* <FlaqText align="left" weight="semibold" mt={10}>
          {data?.title}
        </FlaqText> */}
        {/* <FlaqText>hello</FlaqText> */}
      </Container>
      {(data.contentType === 'VideoAndArticles' ||
        data.contentType === 'Video') &&
        data?.videos?.length > 0 && (
          <ScrollView
            accessibilityRole="adjustable"
            accessible={true}
            accessibilityLabel="level 3"
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 16,
              borderBottomColor: Colors.background.normal,
              borderBottomWidth: 1,
            }}
            style={{
              marginTop: 20,
            }}>
            {data?.videos?.map((video, index) => {
              const id = video.url.split('=')[1];
              return (
                <View key={index}>
                  <View
                    style={{
                      maxWidth: 344,
                      width: 344,
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
                      {video.title}
                    </FlaqText>
                  </View>
                  <FlaqText
                    size="xs"
                    style={{
                      maxWidth: 344,
                      paddingRight: 8,
                    }}
                    align="left"
                    mt={16}>
                    {video.desc}
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
            <Container style={{marginTop: 12}}>
              <FlaqText align="left" size="sm">
                here’s a mix of articles and twitter threads
              </FlaqText>
            </Container>
            <ScrollView
              accessibilityRole="adjustable"
              accessible={true}
              accessibilityLabel="articles cards"
              horizontal={true}
              showsHorizontalScrollIndicator={false}
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
