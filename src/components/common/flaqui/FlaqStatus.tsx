import React, {FC} from 'react';
import {StyleProp, View, ViewProps, ViewStyle} from 'react-native';

export type FlaqStatusProps = {
  type: 'success' | 'error' | 'warning';
  style?: StyleProp<ViewStyle>;
} & ViewProps;

const FlaqStatus: FC<FlaqStatusProps> = ({type, style, ...statusProps}) => {
  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'green';
      case 'error':
        return 'red';
      case 'warning':
        return 'orange';
      default:
        return 'white';
    }
  };

  const statusStyle: StyleProp<ViewStyle> = {
    width: 10,
    height: 10,
    borderRadius: 14,
    backgroundColor: getBackgroundColor(),
  };
  return <View style={[statusStyle, style]} {...statusProps} />;
};

export default FlaqStatus;
