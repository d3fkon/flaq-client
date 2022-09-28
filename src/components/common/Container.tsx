import React, {FC, ReactNode} from 'react';
import {View, ViewProps, ViewStyle} from 'react-native';
import type {StyleProp} from 'react-native';
import {Colors} from '../../utils/colors';

export interface Props extends ViewProps {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  background?: keyof typeof Colors.background;
  mt?: number;
  mb?: number;
  fullWidth?: boolean;
}

const Container: FC<Props> = ({
  style,
  mt = 0,
  mb = 0,
  background = 'darkest',
  fullWidth = false,
  children,
  ...viewProps
}) => {
  const marginStyles = {
    marginTop: mt,
    marginBottom: mb,
  };

  const container: StyleProp<ViewStyle> = {
    backgroundColor: Colors.background[background],
    width: '100%',
    paddingHorizontal: fullWidth ? 0 : 16,
    alignItems: fullWidth ? 'center' : 'flex-start',
  };

  return (
    <View style={[container, marginStyles, style]} {...viewProps}>
      {children}
    </View>
  );
};

export default Container;
