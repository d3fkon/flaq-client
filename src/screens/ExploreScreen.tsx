import React, {FC, useContext, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import FlaqButton from '../components/common/flaqui/FlaqButton';
import FlaqContainer from '../components/common/flaqui/FlaqContainer';
import FlaqText from '../components/common/flaqui/FlaqText';
import globalStyles from '../utils/global_styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../utils/colors';
import Container from '../components/common/Container';
import {useQuery} from '@tanstack/react-query';
import {AccountStatus, GlobalContext} from '../state/contexts/GlobalContext';
import {setAccountStatus} from '../state/actions/global';
import {AxiosError} from 'axios';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import {showMessage} from 'react-native-flash-message';

export type LevelOne = {
  _id: number;
  title: string;
  description: string;
};

type ExploreScreenProps = {
  navigation: any;
};

const ExploreScreen: FC<ExploreScreenProps> = ({navigation}) => {
  const [lang, setLang] = useState<'eng' | 'hn'>('eng');
  const {state, dispatch} = useContext(GlobalContext);
  const axiosPrivate = useAxiosPrivate();

  const {data, isLoading, isError, isFetching} = useQuery(
    ['level1', lang],
    async values => {
      const response = await axiosPrivate.get<LevelOne[]>(
        `/campaigns/level1?lang=${values.queryKey[1]}`,
      );
      return response.data;
    },
    {
      onError: error => {
        console.log('ERROR___>', error);
        if (error instanceof AxiosError) {
          if (error.response?.data.statusCode === 404) {
            showMessage({
              message: 'login again',
              type: 'info',
            });
            dispatch(setAccountStatus(AccountStatus.NEW));
          }
        }
      },
    },
  );

  const openLevel = (level: number) => {
    navigation.navigate('Level', {level});
  };

  const changeLang = () => {
    setLang(lang === 'eng' ? 'hn' : 'eng');
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
  // console.log(data);

  return (
    <FlaqContainer fullWidth={true}>
      <Container>
        <View style={[globalStyles.rowSpaceBetween, globalStyles.fullWidth]}>
          <FlaqText align="left" weight="semibold" mt={30} mb={20} size="lg">
            explore flaq
          </FlaqText>
          <TouchableOpacity onPress={changeLang}>
            <View style={globalStyles.rowCenter}>
              {isFetching && (
                <ActivityIndicator
                  size={'small'}
                  style={{marginTop: 30, marginBottom: 20, marginRight: 10}}
                />
              )}
              <FlaqText
                mt={30}
                mb={20}
                color="awaiting"
                style={{textDecorationLine: 'underline'}}
                weight="semibold">
                {lang === 'eng' ? 'hindi' : 'eng'}
              </FlaqText>
            </View>
          </TouchableOpacity>
        </View>
      </Container>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          paddingLeft: 16,
        }}
        style={{
          width: '100%',
          minHeight: 350,
          maxHeight: 350,
        }}>
        {data?.map((content, index) => {
          return (
            <Box
              key={index}
              index={index}
              content={content}
              openLevel={openLevel}
            />
          );
        })}
      </ScrollView>
      <Container>
        <FlaqText
          align="left"
          weight="semibold"
          size="lg"
          style={[globalStyles.fullWidth, {marginTop: 30}]}>
          questions?
        </FlaqText>
        <View
          style={[
            globalStyles.fullWidth,
            {alignItems: 'flex-start', marginTop: 20},
          ]}>
          <FlaqButton
            variant="light"
            fullWidth={false}
            style={globalStyles.rowCenter}>
            <FlaqText weight="semibold" size="sm" style={{marginRight: 10}}>
              faqs
            </FlaqText>
            <MaterialIcons
              name="arrow-right-alt"
              size={20}
              color={Colors.text.white}
            />
          </FlaqButton>
        </View>
      </Container>
    </FlaqContainer>
  );
};

type BoxProps = {
  index: number;
  content: LevelOne;
  openLevel: (level: number) => void;
};

const Box: FC<BoxProps> = ({index, content, openLevel}) => {
  return (
    <View style={{height: 350}}>
      <View
        style={{
          width: 350,
          height: 350,
          borderRadius: 20,
          position: 'relative',
          overflow: 'hidden',
          marginRight: 10,
        }}>
        <View
          style={{
            zIndex: 1,
            width: 220,
            height: 350,
            position: 'absolute',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
            paddingBottom: 24,
            paddingLeft: 24,
          }}>
          <FlaqText color="white" size="xl" align="left">
            {content.title}
          </FlaqText>
          <FlaqText size="xs" align="left" mt={14}>
            {content.description}
          </FlaqText>
          <FlaqButton
            fullWidth={false}
            mt={14}
            onPress={() => openLevel(content._id)}>
            <FlaqText color="black" weight="semibold" size="sm">
              get started
            </FlaqText>
          </FlaqButton>
        </View>
        <Image
          source={
            index % 2 === 0
              ? require('../../assets/images/prup.png')
              : require('../../assets/images/red.png')
          }
          style={{
            width: '100%',
            zIndex: 0,
            height: 350,
            borderColor: 'green',
            resizeMode: 'stretch',
          }}
        />
      </View>
    </View>
  );
};

export default ExploreScreen;
