import React from 'react';
import {Img_Paths} from '../assets/Imagepaths';
import {
    SecondaryColor,
  } from '../screens/Styles/Style';
import {
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from 'react-native';

const BackgroundWrapper = (props) => {
  const {children, contentContainerStyle} = props
  const {SPLASH_SCREEN_IMAGE} = Img_Paths;
  return (
    <ImageBackground style={styles.container} source={SPLASH_SCREEN_IMAGE}>
      <SafeAreaView>
        <ScrollView contentContainerStyle={{...(contentContainerStyle || {})}}>{children}</ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default BackgroundWrapper;

const styles = StyleSheet.create({
  container: {
    backgroundColor: SecondaryColor,
    flex: 1,
  },
});
