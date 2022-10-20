import React, {useContext} from 'react';
import {TouchableOpacity, View} from 'react-native';
import FlaqContainer from '../components/common/flaqui/FlaqContainer';
import FlaqText from '../components/common/flaqui/FlaqText';
import globalStyles from '../utils/global_styles';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Colors} from '../utils/colors';
import {StorageSetItem} from '../utils/storage';
import {GlobalContext} from '../state/contexts/GlobalContext';
import {setLang} from '../state/actions/global';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProfileParamList} from '../navigation/Home';
import {useNavigation} from '@react-navigation/native';
import FlaqIcon from '../components/common/flaqui/FlaqIcon';

type LanguageScreenProps = NativeStackScreenProps<ProfileParamList, 'Language'>;

type LanguageType = {
  current: string;
  title: string;
  handleClick: () => void;
};

const LanguageScreen = () => {
  const {
    state: {lang},
    dispatch,
  } = useContext(GlobalContext);

  const navigation = useNavigation<LanguageScreenProps['navigation']>();

  const items: LanguageType[] = [
    {
      current: 'eng',
      title: 'english',
      handleClick: async () => {
        await StorageSetItem('lang', 'eng');
        dispatch(setLang('eng'));
      },
    },
    {
      current: 'hn',
      title: 'hindi',
      handleClick: async () => {
        await StorageSetItem('lang', 'hn');
        dispatch(setLang('hn'));
      },
    },
  ];

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <FlaqContainer>
      <View
        style={[
          globalStyles.fullWidth,
          globalStyles.rowCenter,
          {
            marginVertical: 20,
          },
        ]}>
        <TouchableOpacity onPress={goBack}>
          <Fontisto name="arrow-left-l" color={Colors.text.white} size={20} />
        </TouchableOpacity>
        <FlaqText
          align="left"
          weight="semibold"
          size="lg"
          style={[globalStyles.fullWidth, {marginLeft: 20}]}>
          change language
        </FlaqText>
      </View>
      {items.map(item => {
        return (
          <LanguageItem
            key={item.title}
            data={item}
            active={item.current === lang}
          />
        );
      })}
    </FlaqContainer>
  );
};

const LanguageItem = ({
  data,
  active,
}: {
  data: LanguageType;
  active: boolean;
}) => {
  return (
    <TouchableOpacity
      accessible={true}
      accessibilityLabel={`select ${data.title}`}
      onPress={data.handleClick}
      style={[
        globalStyles.fullWidth,
        globalStyles.rowSpaceBetween,
        {
          padding: 16,
          marginBottom: 16,
          backgroundColor: Colors.background.dark,
        },
      ]}>
      <View style={[globalStyles.rowCenter]}>
        <FlaqText>{data.title}</FlaqText>
      </View>
      <FlaqIcon
        type="normal"
        color={active ? 'approved' : 'dark'}
        size="lg"
        variant="antdesign"
        name="checkcircleo"
      />
    </TouchableOpacity>
  );
};

export default LanguageScreen;
