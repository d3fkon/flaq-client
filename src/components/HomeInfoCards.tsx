import {Image, Linking, View} from 'react-native';
import React, {FC} from 'react';
import FlaqText from './common/flaqui/FlaqText';
import {Colors} from '../utils/colors';
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
      showMessage({
        message:
          "can't open link. please select default browser in the setting",
        type: 'info',
      });
    }
  });
};

const HomeInfoCards = ({lang}: {lang: 'eng' | 'hn'}) => {
  const cards: HomeInfoCardType[] = [
    {
      title: lang === 'eng' ? 'course structure' : 'कोर्स स्ट्रक्चर',
      heading: lang === 'eng' ? 'flaq content roadmap' : 'फ़्लैक रोडमैप',
      subHeading:
        lang === 'eng'
          ? 'check out what we have in store for you in the coming weeks!'
          : 'अगले हफ्तों में हमारे पास क्या आ रहा है, इसके बारे में जानें',
      icon: 'map',
      iconType: 'feather',
      background: 'darkpink',
      iconColor: 'darkpink',
      iconBackground: 'lightpink',
      handlePress: () => {
        if (lang === 'hn') {
          openLink(
            'https://onpar.notion.site/Course-Roadmap-c28c293212e048da975a1de1ea1ab4e2',
          );
        } else {
          openLink(
            'https://onpar.notion.site/Flaq-Roadmap-3441f1e1fac44086ba9bd64f16521ae8',
          );
        }
      },
    },
    {
      title: lang === 'eng' ? 'web3 dictionary' : 'वेब3 डिक्शनरी',
      heading: lang === 'eng' ? 'web3 dictionary' : 'वेब3 डिक्शनरी',
      subHeading:
        lang === 'eng'
          ? "tired of not knowing what web3 terms mean? we've got you!"
          : 'उन सभी वेब3 शब्दों को नहीं जानने की वजह से थक गए हैं?',
      icon: 'book',
      iconType: 'antdesign',
      background: 'darkorange',
      iconColor: 'darkorange',
      iconBackground: 'lightorange',
      handlePress: () => {
        if (lang === 'hn') {
          openLink(
            'https://seekhiye.flaq.club/%E0%A4%B6%E0%A4%AC%E0%A5%8D%E0%A4%A6%E0%A4%95%E0%A5%8B%E0%A4%B6/Web3%20(%E0%A4%B5%E0%A5%87%E0%A4%AC3)%20%E0%A4%B6%E0%A4%AC%E0%A5%8D%E0%A4%A6%E0%A4%95%E0%A5%8B%E0%A4%B6',
          );
        } else {
          openLink('https://learn.flaq.club/web3-lingo/web3-dictionary');
        }
      },
    },
  ];

  return (
    <Container>
      <View style={[globalStyles.fullWidth]}>
        {cards.map(card => {
          return (
            <View key={card.title} style={{marginTop: 24, width: '100%'}}>
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
