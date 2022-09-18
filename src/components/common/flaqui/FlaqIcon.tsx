import React, {FC, ReactNode} from 'react';
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import {Colors} from '../../../utils/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Styles} from '../../../utils/styles';
import FlaqText from './FlaqText';

export type FlaqIconProps = {
  children?: ReactNode;
  type?: 'light' | 'dark' | 'normal';
  size?: keyof typeof Styles.fontSize;
  variant?: 'antdesign' | 'mci';
  name?: string;
  subText?: string;
} & TouchableOpacityProps;

const FlaqIcon: FC<FlaqIconProps> = ({
  children,
  type = 'light',
  variant = 'antdesign',
  size = 'md',
  name,
  subText,
  ...props
}) => {
  const iconBackgroundStyle: StyleProp<ViewStyle> = {
    backgroundColor:
      type === 'light'
        ? Colors.background.lightest
        : type === 'dark'
        ? Colors.background.dark
        : Colors.background.normal,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    width: 50,
  };

  const iconStyle: StyleProp<TextStyle> = {
    color: type === 'light' ? Colors.text.dark : Colors.text.white,
    fontSize: Styles.fontSize[size] * 1.3,
    padding: 10,
    overflow: 'hidden',
  };

  const getIcon = () => {
    switch (variant) {
      case 'antdesign': {
        return <AntDesign name={name!} style={iconStyle} />;
      }
      case 'mci': {
        return <MaterialCommunityIcons name={name!} style={iconStyle} />;
      }
      default:
        <></>;
    }
  };

  return (
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity style={[iconBackgroundStyle, props.style]} {...props}>
        {getIcon()}
        {children}
      </TouchableOpacity>
      {subText && (
        <FlaqText type="secondary" mt={10} style={{fontSize: 14}}>
          {subText}
        </FlaqText>
      )}
    </View>
  );
};

export default FlaqIcon;
