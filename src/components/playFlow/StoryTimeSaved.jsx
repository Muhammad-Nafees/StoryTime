import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import Modal from 'react-native-modal';
import {
  TextColorGreen,
  pastelGreen,
} from '../../screens/Styles/Style';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import SvgIcons from '../svgIcon/svgIcons';
import { Circle, Path, Svg } from 'react-native-svg';
import { moderateVerticalScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';


const StoryTimeSaved = ({
  isVisible,
  setVisible,
  text,
  onPress,
  textButton,
  iconName,
  loading
}) => {

  const navigation = useNavigation();

  const close = () => {
    if (onPress) {
      onPress()
      setVisible(false);
    } else {
      // setVisible(false);
      navigation.navigate("profileStack", {
        screen: "Profile"
      });
    }
  };


  return (
    <Modal
      style={{ flex: 1 }}
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropColor='#979697'      
      onModalHide={close}
      backdropOpacity={0.95}
      onBackdropPress={close}>
        
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
          {iconName ? (
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
          ) : (
            <Svg
              width="35"
              height="34"
              viewBox="0 0 35 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <Circle cx="17.5" cy="17" r="17" fill="#30D298" />
              <Path
                d="M24.5 13L14.875 22L10.5 17.9091"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </Svg>
          )}
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
    </Modal>
  );
};

export default StoryTimeSaved;
