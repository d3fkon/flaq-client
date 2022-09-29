import React, {FC, ReactNode} from 'react';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import type {StyleProp, TouchableOpacityProps, ViewStyle} from 'react-native';
import {Colors} from '../../../utils/colors';

type Variant = keyof typeof Colors.background;

interface ButtonProps extends TouchableOpacityProps {
  style?: StyleProp<ViewStyle>;
  variant?: Variant;
  fullWidth?: boolean;
  children?: ReactNode;
  loading?: boolean;
  mt?: number;
  mb?: number;
}

const FlaqButton: FC<ButtonProps> = ({
  style,
  children,
  fullWidth = true,
  variant = 'lightest',
  loading = false,
  mt = 0,
  mb = 0,
  ...touchableProps
}) => {
  const variantStyle = (): StyleProp<ViewStyle> => {
    return {backgroundColor: Colors.background[variant]};
  };

  const fullWidthStyle = (): StyleProp<ViewStyle> => {
    return fullWidth ? {width: '100%'} : {};
  };

  const disabled = touchableProps.disabled as boolean;
  const disableColor = (disabled && '#fffa') as string;

  const defaultStyle: StyleProp<ViewStyle> = {
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  };

  const marginStyles = {
    marginTop: mt,
    marginBottom: mb,
  };

  return (
    <TouchableOpacity
      accessible={true}
      style={[
        variantStyle(),
        fullWidthStyle(),
        marginStyles,
        defaultStyle,
        touchableProps.disabled ? {backgroundColor: disableColor} : {},
        style,
      ]}
      {...touchableProps}>
      {loading ? <ActivityIndicator size={24} color="black" /> : children}
    </TouchableOpacity>
  );
};

export default FlaqButton;
