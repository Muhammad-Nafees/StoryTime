import {
  View,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import React from 'react';
import { Img_Paths } from '../../../assets/Imagepaths';
import {
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import BackiconCategoriesGame from '../../../components/categories/BackiconCategoriesGame';
import StartGameContent from '../../../components/categories/StartGameContent';

const StartGame = () => {
  const { SPLASH_SCREEN_IMAGE } = Img_Paths;

  return (
    <ImageBackground style={styles.container} source={SPLASH_SCREEN_IMAGE}>
      <View style={styles.backplay_flow}>
        <BackiconCategoriesGame
        />
      </View>
      {/* content */}
      <StartGameContent
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backplay_flow: {
    marginLeft: "auto",
    width: responsiveWidth(95)
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FFF"
  },

});

export default StartGame;
