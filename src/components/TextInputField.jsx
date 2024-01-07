import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  FourthColor,
  SecondaryColor,
  TextinputColor,
  ThirdColor,
} from '../screens/Styles/Style';
import Icon from 'react-native-vector-icons/Feather';
import { moderateVerticalScale, moderateScale } from 'react-native-size-matters';
import { Img_Paths } from '../assets/Imagepaths';

const TextInputField = ({
  placeholderText,
  type,
  onPress,
  showPassword,
  onChangeText,
  value,
  onBlur,
}) => {

  const { NOT_EYE_ICON, EYE_ICON } = Img_Paths;

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: moderateVerticalScale(10),
      }}>
      <View
        style={{
          flexDirection: type == 'password' ? 'row' : null,
          width: responsiveWidth(80),
          backgroundColor: TextinputColor,
          borderRadius: 12,
          height: responsiveHeight(6.5),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TextInput
          placeholder={placeholderText}
          onChangeText={onChangeText}
          onBlur={onBlur}
          value={value}
          keyboardType={type === 'zipcode' ? 'decimal-pad' : 'default'}
          placeholderTextColor="#AAAAAA"
          secureTextEntry={type == 'password' ? !showPassword : null}
          style={{ color: '#000', width: type == 'password' ? 235 : 260 }}
        />

        {type == 'password' && (
          <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
            <Image style={{ height: 20, width: 20, resizeMode: "center" }} source={!showPassword ? EYE_ICON : NOT_EYE_ICON} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TextInputField;
