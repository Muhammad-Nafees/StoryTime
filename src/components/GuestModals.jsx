import Modal from 'react-native-modal';
import {Img_Paths} from '../assets/Imagepaths';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {SecondaryColor, TextColorGreen} from '../screens/Styles/Style';
import {PassionOne_Regular} from '../constants/GlobalFonts';
import {SPACING} from '../constants/Constant';

const GuestModals = forwardRef((props, ref) => {
  const {onPress, textOnPress} = props;
  const [isVisible, setIsVisible] = useState(false);
  const [heading, setHeading] = useState(null);
  const [content, setContent] = useState(null);
  const [text, setText] = useState(null);
  const [buttonText, setButtonText] = useState(null);

  const {BG_CLOCK} = Img_Paths;

  const open = (heading, content, buttonText, text) => {
    setIsVisible(true);
    setHeading(heading);
    setContent(content);
    setText(text);
    setButtonText(buttonText);
  };

  const close = () => {
    setIsVisible(false);
  };

  useImperativeHandle(ref, () => {
    return {open};
  });
  return (
    <Modal
      style={{flex: 1}}
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      // backdropColor="white"
      onModalHide={close}
      backdropOpacity={0.8}
      onBackdropPress={close}>
      <ImageBackground
        style={styles.img_frame}
        resizeMode="stretch"
        source={BG_CLOCK}>
        <View
          style={{
            height: '50%',
            width: '80%',
            marginTop: -SPACING*2,
            alignSelf: 'center',
            justifyContent: 'center',
            paddingHorizontal:responsiveWidth(2)
          }}>
          <Text
            style={{
              fontFamily: PassionOne_Regular.passionOne,
              color: TextColorGreen,
              fontSize: 24,
              paddingVertical: 10,
              textAlign: 'center',
              marginTop: responsiveHeight(4),
            }}>
            {heading}
          </Text>
          <Text
            style={{
              paddingVertical: 2,
              textAlign: 'center',
              color: TextColorGreen,
              lineHeight: 22,
              fontWeight: '400',
              marginHorizontal: responsiveWidth(10),
              marginVertical: responsiveHeight(2),
            }}>
            {content}
          </Text>
          <TouchableOpacity
            activeOpacity={0.3}
            onPress={()=>{
              if(typeof(onPress)=== 'function'){
                onPress()
              }
              close();
            }}
            style={{
              width: '100%',
              backgroundColor: TextColorGreen,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              height: responsiveHeight(6.6),
              marginBottom: responsiveHeight(3),
            }}>
            <Text style={{color: 'white'}}>{buttonText}</Text>
          </TouchableOpacity>
          <Text
            style={{
              textAlign: 'center',
              color: TextColorGreen,
              fontWeight: '900',
              fontSize: 15,
              marginBottom: responsiveHeight(4),
            }}
            onPress={()=>{
              if(typeof(textOnPress)=== 'function'){
                textOnPress()
              }
              close()
            }}>
            {text}
          </Text>
        </View>
      </ImageBackground>
    </Modal>
  );
});

const styles = StyleSheet.create({
  img_frame: {
    height: '80%',
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
export default GuestModals;
