import React, {FC, ReactNode, RefObject} from 'react';
import {StyleProp, Text, TextProps, TextStyle} from 'react-native';
import {Colors} from '../../../utils/colors';
import {Styles} from '../../../utils/styles';

type PrimaryWeight = keyof typeof Styles.fontFamily.primary;
type SecondaryWeight = keyof typeof Styles.fontFamily.secondary;
type Color = keyof typeof Colors.text;

type PrimaryTextProps = {
  type?: 'primary';
  weight?: PrimaryWeight;
};

type SecondaryTextProps = {
  type?: 'secondary';
  weight?: SecondaryWeight;
};

export type FlaqTextProps = {
  style?: StyleProp<TextStyle>;
  color?: Color;
  fullWidth?: boolean;
  children?: ReactNode;
  italic?: boolean;
  forwardRef?: RefObject<Text>;
  align?: 'right' | 'left' | 'center';
  size?: keyof typeof Styles.fontSize;
  mt?: number;
  mb?: number;
} & (SecondaryTextProps | PrimaryTextProps);

export type FlaqTextCompleteProps = FlaqTextProps & TextProps;

const FlaqText: FC<FlaqTextCompleteProps> = ({
  style,
  children,
  weight = 'regular',
  italic = false,
  forwardRef,
  type = 'primary',
  color = 'white',
  align = 'center',
  size = 'md',
  mt = 0,
  mb = 0,
  ...textProps
}) => {
  const colorStyle = (): StyleProp<TextStyle> => {
    return {color: Colors.text[color]};
  };

  const typeStyle = (): StyleProp<TextStyle> => {
    switch (type) {
      case 'secondary': {
        const secondary = Styles.fontFamily.secondary;
        const secondaryWeight = weight as SecondaryWeight;
        return {
          fontFamily: italic
            ? secondary[secondaryWeight].italic
            : secondary[secondaryWeight].normal,
        };
      }
      default: {
        const primary = Styles.fontFamily.primary;
        return {
          fontFamily: italic ? primary[weight].italic : primary[weight].normal,
        };
      }
    }
  };

  const defaultStyles = {textAlign: align, fontSize: Styles.fontSize[size]};
  const marginStyles = {marginBottom: mb, marginTop: mt};

  return (
    <Text
      ref={forwardRef}
      style={[typeStyle(), colorStyle(), marginStyles, defaultStyles, style]}
      {...textProps}>
      {children}
    </Text>
  );
};

export default FlaqText;
