import React from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import FlaqContainer from '../components/common/flaqui/FlaqContainer';
import FlaqText from '../components/common/flaqui/FlaqText';

const HomeScreen = () => {
  return (
    <FlaqContainer>
      <FlaqText>explore flaq</FlaqText>
      <ScrollView
        horizontal={true}
        style={{marginLeft: 30, width: '100%', marginTop: 40}}>
        {['#4A25B3', '#B32E4E', '#4A25B3'].map((_, index) => {
          return <Box key={index} index={index} />;
        })}
      </ScrollView>
    </FlaqContainer>
  );
};

const Box = ({index}: any) => {
  return (
    <TouchableOpacity>
      <View
        style={{
          width: 340,
          height: 350,
          borderRadius: 20,
          position: 'relative',
          overflow: 'hidden',
          marginRight: 10,
        }}>
        <Image
          source={
            index % 2 === 0
              ? require('../../assets/images/prup.png')
              : require('../../assets/images/red.png')
          }
          style={{
            width: '100%',
            zIndex: 0,
            height: 350,
            resizeMode: 'contain',
          }}
        />
        <View style={{borderColor: 'green', borderWidth: 10, zIndex: 10}}>
          <FlaqText
            color="white"
            style={{
              borderColor: 'white',
              borderWidth: 1,
              position: 'absolute',
              top: 20,
              left: 20,
            }}>
            hello
          </FlaqText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HomeScreen;
