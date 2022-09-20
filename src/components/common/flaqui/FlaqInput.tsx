import React, {FC, ReactNode, RefObject, useState} from 'react';
import {TextInput, TextInputProps, TextStyle} from 'react-native';
import type {StyleProp} from 'react-native';
import {Colors} from '../../../utils/colors';
import {Styles} from '../../../utils/styles';

export interface FlaqInputProps extends TextInputProps {
  style?: StyleProp<TextStyle>;
  variant?: 'dark' | 'normal' | 'light';
  fullWidth?: boolean;
  hidden?: boolean;
  mt?: number;
  forwardRef?: RefObject<TextInput>;
  mb?: number;
}

const FlaqInput: FC<FlaqInputProps> = ({
  style,
  fullWidth = true,
  variant = 'normal',
  hidden = false,
  mt = 0,
  mb = 0,
  forwardRef,
  ...inputProps
}) => {
  const [focusStyle, setFocusStyle] = useState<StyleProp<TextStyle>>({});

  const variantStyle = (): StyleProp<TextStyle> => {
    return {backgroundColor: Colors.background[variant]};
  };

  const fullWidthStyle = (): StyleProp<TextStyle> => {
    return fullWidth ? {width: '100%'} : {};
  };

  const marginStyles = {
    marginTop: mt,
    marginBottom: mb,
  };

  const defaultStyle: StyleProp<TextStyle> = {
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontFamily: Styles.fontFamily.primary.medium.normal,
    color: Colors.text.white,
    backgroundColor: Colors.background.darkest,
    borderWidth: 1,
    fontSize: Styles.fontSize.md,
    borderColor: Colors.background.normal,
    borderRadius: 4,
  };

  return (
    <TextInput
      ref={forwardRef}
      placeholderTextColor={Colors.text.normal}
      autoCorrect={false}
      autoCapitalize={'none'}
      autoComplete="off"
      style={[
        variantStyle(),
        fullWidthStyle(),
        marginStyles,
        defaultStyle,
        focusStyle,
        style,
        hidden ? {display: 'none'} : {},
      ]}
      {...inputProps}
      onBlur={e => {
        setFocusStyle({});
        if (inputProps.onBlur) {
          inputProps.onBlur(e);
        }
      }}
      onFocus={e => {
        setFocusStyle({
          backgroundColor: Colors.background.dark,
        });
        if (inputProps.onFocus) {
          inputProps.onFocus(e);
        }
      }}
    />
  );
};

export default FlaqInput;
