import React, {FC, ReactNode} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import type {StyleProp} from 'react-native';
import {Colors} from '../../../utils/colors';

export interface Props extends ViewProps {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  mt?: number;
  mb?: number;
  background?: keyof typeof Colors.background;
  fullWidth?: boolean;
}

const FlaqContainer: FC<Props> = ({
  style,
  mt = 0,
  mb = 0,
  fullWidth = false,
  background = 'darkest',
  children,
  ...safeAreaViewProps
}) => {
  const marginStyles = {
    marginTop: mt,
    marginBottom: mb,
  };

  const defaultStyle: StyleProp<ViewStyle> = {
    backgroundColor: Colors.background[background],
    flex: 1,
    alignItems: 'center',
  };

  const container: StyleProp<ViewStyle> = {
    flex: 1,
    width: fullWidth ? '100%' : '90%',
    alignItems: 'center',
  };

  return (
    <SafeAreaView style={[defaultStyle, style]} {...safeAreaViewProps}>
      <StatusBar barStyle={'light-content'} />
      <View style={[marginStyles, container]}>{children}</View>
    </SafeAreaView>
  );
};

export default FlaqContainer;
