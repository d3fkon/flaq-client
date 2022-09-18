import React, {FC} from 'react';
import {View} from 'react-native';
import {Colors} from '../../utils/colors';
import globalStyles from '../../utils/global_styles';
import FlaqIcon from './flaqui/FlaqIcon';
import FlaqText from './flaqui/FlaqText';

type Props = {
  startIcon?: string;
  startIconType?: 'antdesign' | 'mci';
  text?: string;
  endIcon?: string;
  endIconType?: 'antdesign' | 'mci';
  startClick: () => void;
  endClick?: () => void;
};

const TopNavbar: FC<Props> = ({
  startIcon,
  startIconType,
  startClick,
  text,
  endIcon,
  endIconType,
  endClick,
}) => {
  return (
    <View
      style={[
        globalStyles.rowSpaceBetween,
        {backgroundColor: Colors.background.dark, zIndex: 50},
      ]}>
      <View style={globalStyles.rowCenter}>
        <FlaqIcon
          name={startIcon || 'questioncircleo'}
          type="dark"
          variant={startIconType || 'antdesign'}
          onPress={startClick}
        />
        <FlaqText size="xl" weight="semibold" style={{marginLeft: 8}}>
          {text}
        </FlaqText>
      </View>
      {endIcon && (
        <FlaqIcon
          name={endIcon ?? 'questioncircleo'}
          type="dark"
          onPress={endClick}
          variant={endIconType || 'antdesign'}
        />
      )}
    </View>
  );
};

export default TopNavbar;
