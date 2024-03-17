import React from 'react';
import {
  ImageBackground,
  View,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { Img_Paths } from '../../../assets/Imagepaths/index';
import BackButton from '../../../components/reusable-components/addplayer/customBackButton/BackButton';
import { SCREEN_HEIGHT } from '../../../constants/Constant';
import VoiceToText from '../../../components/categories/VoiceToText';


const SelectGamePoint = () => {
  const {
    BG_PLAYFLOW,
    FIRST_VOICE_TO_TEXT_IMAGE,
    VIDEO_IMAGE,
  } = Img_Paths;
  const navigation = useNavigation();

  return (
    <ImageBackground style={styles.container} source={BG_PLAYFLOW}>
      <View
        style={{
          height: SCREEN_HEIGHT / 1,
        }}>
        <View style={{ paddingTop: responsiveWidth(10) }}>
          <BackButton onPress={() => navigation.goBack()} />
        </View>
        {/* Back Button */}
        <View style={{ paddingTop: responsiveWidth(15) }}>
          <VoiceToText
            onPress={() => navigation.navigate("StartGame")}
            text="Voice to Text"
            BackgroundImage={FIRST_VOICE_TO_TEXT_IMAGE}
          />
          <VoiceToText
            onPress={() => navigation.navigate("VideoFirstStartScreen")}
            text="Video"
            BackgroundImage={VIDEO_IMAGE}
          />
        </View>
      </View>
    </ImageBackground>
  );
};



const styles = StyleSheet.create({
  img: {
    resizeMode: 'center',
  },
  container: {
    alignItems: 'center',
  },

});

export default SelectGamePoint;
