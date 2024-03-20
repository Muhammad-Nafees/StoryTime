import {
  ImageBackground,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import {TextColorGreen} from '../../../screens/Styles/Style';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const MicrophoneButton = ({
  isFirstCall,
  pressHandlerIn,
  pressHandlerOut,
  timeLeft,
  isPressed,
}) => {
  const SCREENWIDTH = Dimensions.get('window').width;
  

  return (
    <ImageBackground source={require('../../../assets/microphone-bg.png')}>
      <TouchableOpacity
        disabled={isFirstCall ? true : false}
        onLongPress={() => {
          pressHandlerIn();
        }}
        onPressOut={() => {
          pressHandlerOut();
        }}
        activeOpacity={0.7}
        style={{
          borderWidth: isPressed ? 6 : 0,
          borderColor: isPressed ? '#D04141' : TextColorGreen,
          backgroundColor:
            isFirstCall || timeLeft == 0
              ? 'rgba(57, 94, 102, 0.3)'
              : TextColorGreen,
          width: SCREENWIDTH * 0.32,
          height: SCREENWIDTH * 0.32,
          borderRadius: SCREENWIDTH / 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{
            width: responsiveWidth(16),
            height: responsiveHeight(8),
            tintColor: isPressed ? '#D04141' : null,
            resizeMode: 'center',
          }}
          source={require('../../../assets/mic.png')}
        />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default MicrophoneButton;
