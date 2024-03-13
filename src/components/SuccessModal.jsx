import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground
} from 'react-native';
import Modal from 'react-native-modal';
import {
  TextColorGreen,
  pastelGreen,
} from '../screens/Styles/Style';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import SvgIcons from './svgIcon/svgIcons';
import {Img_Paths} from '../assets/Imagepaths/index';
import { moderateVerticalScale } from 'react-native-size-matters';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../constants/Constant';

const SuccessModal = ({
  isVisible,
  setVisible,
  text,
  onPress,
  textButton,
  iconName,
  loading
}) => {
  const {BG_Del} = Img_Paths;

  const close = () => {
    if (onPress) {
      onPress()
      setVisible(false);
    }else{
     setVisible(false);
    }
  };
  return (
    <Modal
      style={{ flex: 1 }}
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropColor='transparent'
      onModalHide={close}
      backdropOpacity={0.98}
      onBackdropPress={close}>
    <ImageBackground style={{height:SCREEN_HEIGHT,width:SCREEN_WIDTH,alignSelf:'center',justifyContent:'center'}} source={BG_Del}>
      <View
        style={{
          width: responsiveWidth(80),
          // height: responsiveHeight(29),
          padding:responsiveHeight(1.6),
          backgroundColor: '#FFF',
          borderRadius: 30,
          paddingHorizontal: responsiveWidth(2),
          alignSelf: 'center',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: moderateVerticalScale(12),
          }}>
          
            <View
              style={{
                marginTop: 'auto',
                marginBottom: 'auto',
                borderRadius: 100,
                backgroundColor: pastelGreen,
                padding: responsiveWidth(2),
              }}>
              <SvgIcons name={iconName} width={27} height={23} />
            </View>
          <Text
            style={{
              fontSize: responsiveFontSize(1.9),
              color: '#000',
              textAlign: 'center',
              lineHeight: 20,
              marginTop: responsiveHeight(1),
            }}>
            {text}
          </Text>
        </View>
        {loading ?
          <ActivityIndicator /> :
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: responsiveHeight(2),
            }}>
            <TouchableOpacity
              onPress={close}
              style={{
                width: responsiveWidth(60),
                backgroundColor: TextColorGreen,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                height: responsiveHeight(6.6),
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.9),
                  fontWeight: '600',
                  letterSpacing: 0.28,
                  color: '#FFF',
                }}>
                {textButton}
              </Text>
            </TouchableOpacity>
          </View>
        }
      </View>
      </ImageBackground>
    </Modal>
  );
};

export default SuccessModal;
