import React, {FC} from 'react';
import {Pressable, TextStyle, View} from 'react-native';
import type {StyleProp, ViewStyle} from 'react-native';
import FlaqInput, {FlaqInputProps} from './FlaqInput';
import {useTogglePasswordVisibility} from '../../../hooks/useTogglePasswordVisibility';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface PInputProps extends FlaqInputProps {
  style?: StyleProp<TextStyle>;
}

const FlaqPasswordInput: FC<PInputProps> = ({style, ...passwordInputProps}) => {
  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility();

  const eyeIconStyle: StyleProp<ViewStyle> = {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    top: 16,
    bottom: 0,
    width: 50,
  };

  return (
    <View style={{position: 'relative'}}>
      <FlaqInput
        secureTextEntry={passwordVisibility}
        style={style}
        {...passwordInputProps}
      />
      <Pressable onPress={handlePasswordVisibility} style={eyeIconStyle}>
        <MaterialCommunityIcons name={rightIcon} size={22} color="gray" />
      </Pressable>
    </View>
  );
};

export default FlaqPasswordInput;
