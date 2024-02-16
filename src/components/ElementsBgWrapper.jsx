import React from 'react';
import {Img_Paths} from '../assets/Imagepaths';
import {
    FourthColor,
    PrimaryColor,
    SecondaryColor,
    TextColorGreen,
    ThirdColor,
    pinkColor,
  } from '../screens/Styles/Style';
import {
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from 'react-native';

const ElementsBgWrapper = ({children}) => {
  const {BG_IMAGE_ELEMENTS} = Img_Paths;
  return (
    <ImageBackground style={styles.container} source={BG_IMAGE_ELEMENTS}>
      <SafeAreaView>
        {children}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ElementsBgWrapper;

const styles = StyleSheet.create({
  container: {
    backgroundColor: SecondaryColor,
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
