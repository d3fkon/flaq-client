import React, {FC, ReactNode} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import FlaqText from './FlaqText';

type Props = {
  text: string;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const FlaqLoader: FC<Props> = ({text, children, style, ...textProps}) => {
  return (
    <View
      style={[
        {flex: 1, justifyContent: 'center', alignItems: 'center'},
        style || {},
      ]}>
      <FlaqText color="normal" type="secondary" {...textProps}>
        {text}
      </FlaqText>
      {children}
    </View>
  );
};

export default FlaqLoader;
