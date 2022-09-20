import React from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import FlaqButton from '../components/common/flaqui/FlaqButton';
import FlaqContainer from '../components/common/flaqui/FlaqContainer';
import FlaqText from '../components/common/flaqui/FlaqText';
import globalStyles from '../utils/global_styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../utils/colors';

const DATA = [
  {
    title: 'dive into web 3',
    subTitle: 'learn about the evolution & relevance of web3',
  },
  {
    title: 'what are NFTs?',
    subTitle: 'learn about types of NFTs and how do they work',
  },
];

const HomeScreen = () => {
  return (
    <>
      <FlaqContainer>
        <FlaqText
          align="left"
          weight="semibold"
          mt={30}
          mb={20}
          style={globalStyles.fullWidth}>
          explore flaq
        </FlaqText>
        <ScrollView
          horizontal={true}
          style={{
            width: '100%',
            maxHeight: 350,
          }}>
          {DATA.map((content, index) => {
            return <Box key={index} index={index} content={content} />;
          })}
        </ScrollView>
        <FlaqText
          align="left"
          weight="semibold"
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
      </FlaqContainer>
    </>
  );
};

const Box = ({index, content}: any) => {
  return (
    <TouchableOpacity style={{height: 350}}>
      <View
        style={{
          width: 320,
          height: 350,
          borderRadius: 20,
          position: 'relative',
          overflow: 'hidden',
          marginRight: 20,
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
            {content.subTitle}
          </FlaqText>
          <FlaqButton fullWidth={false} mt={14}>
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
    </TouchableOpacity>
  );
};

export default HomeScreen;
