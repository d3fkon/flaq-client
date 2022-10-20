import {View, Text} from 'react-native';
import React, {useState} from 'react';
import FlaqText from './FlaqText';
import globalStyles from '../../../utils/global_styles';
import Accordion from 'react-native-collapsible/Accordion';
import {Colors} from '../../../utils/colors';
import FlaqIcon from './FlaqIcon';
import AntDesign from 'react-native-vector-icons/AntDesign';

const FlaqAccordian = ({sections}: {sections: any}) => {
  const [activeSections, setActiveSections] = useState<any>([]);

  const renderSectionTitle = (section: any) => {
    return (
      <View style={[globalStyles.fullWidth, globalStyles.testBorder]}>
        {/* <FlaqText>{section.title}</FlaqText> */}
      </View>
    );
  };

  const renderHeader = (section: any) => {
    return (
      <View style={[globalStyles.fullWidth, globalStyles.rowSpaceBetween]}>
        <FlaqText
          size="sm"
          align="left"
          weight="semibold"
          style={{paddingRight: 20, flex: 1}}>
          {section.title}
        </FlaqText>
        {/* <FlaqIcon name="plus" /> */}
        <AntDesign style={{}} name="plus" color="white" />
      </View>
    );
  };

  const renderContent = (section: any) => {
    // console.log('CONTENT');
    return (
      <View
        style={[
          globalStyles.fullWidth,
          // {borderWidth: 1, borderColor: 'white'},
        ]}>
        <FlaqText align="left" size="sm" mt={10}>
          {section.content}
        </FlaqText>
      </View>
    );
  };

  const updateSections = (newActiveSections: any) => {
    setActiveSections([...newActiveSections]);
  };

  return (
    <Accordion
      sections={sections}
      activeSections={activeSections}
      // renderSectionTitle={renderSectionTitle}
      sectionContainerStyle={{
        borderColor: Colors.text.dark,
        borderWidth: 1,
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        // marginTop: 0,
      }}
      // containerStyle={{marginTop: 12}}
      renderHeader={renderHeader}
      renderContent={renderContent}
      onChange={updateSections}
    />
  );
};

export default FlaqAccordian;
