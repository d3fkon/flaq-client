import {Image, Linking, View} from 'react-native';
import React, {FC} from 'react';
import FlaqText from './common/flaqui/FlaqText';
import {InfoCardType} from '../screens/HomeScreen';
import {Colors} from '../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import globalStyles from '../utils/global_styles';
import Container from './common/Container';
import FlaqIcon, {IconType} from './common/flaqui/FlaqIcon';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {showMessage} from 'react-native-flash-message';

type HomeInfoCardType = {
  title: string;
  heading: string;
  subHeading: string;
  icon: string;
  iconType: IconType;
  background: keyof typeof Colors.background;
  iconBackground: keyof typeof Colors.background;
  iconColor: keyof typeof Colors.text;
  handlePress: () => void;
};

const openLink = (url: string) => {
  Linking.canOpenURL(url).then((supported: any) => {
    if (supported) {
      Linking.openURL(url);
    } else {
      // console.log("Don't know how to open URI: " + url);
      showMessage({
        message:
          "can't open link. please select default browser in the setting",
        type: 'info',
      });
    }
  });
};

const HomeInfoCards = () => {
  const cards: HomeInfoCardType[] = [
    {
      title: 'course structure',
      heading: 'flaq roadmap',
      subHeading: 'learn about what have coming in the next weeks',
      icon: 'map',
      iconType: 'feather',
      background: 'darkpink',
      iconColor: 'darkpink',
      iconBackground: 'lightpink',
      handlePress: () => {
        openLink(
          'https://onpar.notion.site/Flaq-Roadmap-3441f1e1fac44086ba9bd64f16521ae8',
        );
      },
    },
    {
      title: 'web3 dictionary',
      heading: 'flaq dictionary',
      subHeading: 'tired of not knowing all those web3 slangs?',
      icon: 'book',
      iconType: 'antdesign',
      background: 'darkorange',
      iconColor: 'darkorange',
      iconBackground: 'lightorange',
      handlePress: () => {
        openLink('https://learn.flaq.club/web3-lingo/web3-dictionary');
      },
    },
  ];

  return (
    <Container>
      <View style={[globalStyles.fullWidth]}>
        {cards.map(card => {
          return (
            <View style={{marginTop: 24, width: '100%'}}>
              <FlaqText align="left" mb={12} size="lg" weight="semibold">
                {card.title}
              </FlaqText>
              <HomeInfoCard data={card} key={card.title} />
            </View>
          );
        })}
      </View>
    </Container>
  );
};

export default HomeInfoCards;

type HomeInfoCardProps = {
  data: HomeInfoCardType;
};

const HomeInfoCard: FC<HomeInfoCardProps> = ({data}) => {
  return (
    <TouchableOpacity
      onPress={data.handlePress}
      style={{
        backgroundColor: Colors.background[data.background],
        position: 'relative',
        borderRadius: 10,
        paddingVertical: 24,
        paddingHorizontal: 16,
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
      }}>
      <Image
        source={require('../../assets/images/card-wave.png')}
        style={{
          position: 'absolute',
          top: 0,
          height: 100,
          width: '100%',
          resizeMode: 'contain',
        }}
      />
      <FlaqIcon
        name={data.icon}
        variant={data.iconType}
        type="button"
        color={data.iconColor}
        background={data.iconBackground}
      />
      <View
        style={{
          marginLeft: 12,
          flex: 1,
        }}>
        <FlaqText align="left" weight="semibold">
          {data.heading}
        </FlaqText>
        <FlaqText size="sm" align="left" mt={8}>
          {data.subHeading}
        </FlaqText>
      </View>
    </TouchableOpacity>
  );
};
