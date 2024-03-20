import React from 'react';
import { Img_Paths } from '../../assets/Imagepaths';
import { SecondaryColor } from '../../screens/Styles/Style';
import {
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { SCREEN_WIDTH } from '../../constants/Constant';

const BackgroundWrapper = props => {
  const { children, contentContainerStyle, disableScrollView, coverScreen } =
    props;
  const { SPLASH_SCREEN_IMAGE } = Img_Paths;

  const safeAreaViewStyle = [
    {
      // color: '#000',
      ...(coverScreen && { flex: 1, width: SCREEN_WIDTH }),
    },
    // style,
  ];

  return (
    <ImageBackground style={styles.container} source={SPLASH_SCREEN_IMAGE}>
      <SafeAreaView style={safeAreaViewStyle}>
        {disableScrollView ? (
          children
        ) : (
          <ScrollView
            contentContainerStyle={{ ...(contentContainerStyle || {}) }}>
            {children}
          </ScrollView>
        )}
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
