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
    title: 'Crypto news',
    subTitle:
      'Solana Status confirmed the attack, noting that as of Wednesday morning, about 7,767 wallets have been affected.',
  },
  {
    title: 'Business insider',
    subTitle:
      'Getting reservations in NYC has gotten so out of hand that some restaurants are now offering $1,000 NFTs so diners can skip the line',
  },
];

const NewsScreen = () => {
  return (
    <>
      <FlaqContainer>
        <FlaqText
          align="left"
          weight="semibold"
          mt={30}
          mb={20}
          size="lg"
          style={globalStyles.fullWidth}>
          flaq news
        </FlaqText>
        <ScrollView style={{flex: 1, width: '100%'}}>
          {DATA.map((content, index) => {
            return <Box key={index} index={index} content={content} />;
          })}
        </ScrollView>
      </FlaqContainer>
    </>
  );
};

const Box = ({index, content}: any) => {
  return (
    <View style={{height: 350, width: '100%', marginBottom: 10}}>
      <View
        style={{
          width: '100%',
          height: 350,
          borderRadius: 20,
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: Colors.background.normal,
        }}>
        <View
          style={{
            zIndex: 1,
            width: 300,
            height: 350,
            padding: 30,
            position: 'absolute',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}>
          <Image
            source={require('../../assets/images/bi.png')}
            style={{
              width: 60,
              height: 60,
              resizeMode: 'contain',
              borderRadius: 8,
            }}
          />
          <FlaqText color="white" size="lg" align="left">
            {content.title}
          </FlaqText>
          <FlaqText size="sm" align="left" style={{lineHeight: 22}}>
            {content.subTitle}
          </FlaqText>
          <FlaqButton fullWidth={false} style={globalStyles.rowCenter}>
            <FlaqText
              color="black"
              weight="semibold"
              size="sm"
              style={{marginRight: 8}}>
              read now
            </FlaqText>
            <MaterialIcons
              name="arrow-right-alt"
              size={20}
              color={Colors.text.black}
            />
          </FlaqButton>
        </View>
        {/* <Image
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
        /> */}
      </View>
    </View>
  );
};

export default NewsScreen;
