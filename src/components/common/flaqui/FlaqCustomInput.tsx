import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import FlaqInput, {FlaqInputProps} from './FlaqInput';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../../utils/colors';

type Props = {
  iconName: string;
  iconType?: 'antdesign' | 'mci';
  iconColor?: keyof typeof Colors.text;
  handleIconPress?: () => void;
} & FlaqInputProps;

const FlaqCustomInput: FC<Props> = ({
  iconName,
  iconType = 'antdesign',
  iconColor = 'normal',
  handleIconPress,
  ...props
}) => {
  const getIcon = () => {
    const style = {
      fontSize: 20,
      color: Colors.text[iconColor || 'light'],
    };
    switch (iconType) {
      case 'antdesign': {
        return (
          <AntDesign
            color={Colors.text[iconColor || 'light']}
            name={iconName!}
            style={style}
          />
        );
      }
      case 'mci': {
        return <MaterialCommunityIcons name={iconName!} style={style} />;
      }
      default:
        return <AntDesign name="questioncircleo" style={style} />;
    }
  };

  return (
    <View>
      <View style={styles.inputWrap}>
        <TouchableOpacity style={styles.iconPosition} onPress={handleIconPress}>
          {getIcon()}
        </TouchableOpacity>
        <FlaqInput {...props} style={styles.inputStyle} />
      </View>
    </View>
  );
};

export default FlaqCustomInput;

const styles = StyleSheet.create({
  inputWrap: {
    width: '100%',
    position: 'relative',
  },
  iconPosition: {
    position: 'absolute',
    top: 20,
    right: 16,
    zIndex: 10,
  },
  inputStyle: {
    paddingRight: 40,
  },
});
