import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { moderateVerticalScale, verticalScale } from 'react-native-size-matters';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { FourthColor, TextinputColor } from '../../screens/Styles/Style';
import _ from 'lodash';
import { username_api } from '../../../services/api/auth_mdule/auth';
import Toast from 'react-native-toast-message';
import UserNameExist from './UserNameExist';
import { Inter_Regular } from '../../constants/GlobalFonts';
import { Img_Paths } from '../../assets/Imagepaths';
import ErrorMessageForm from '../ErrorMessagesForm';
import CustomErrorField from './CustomErrorField';

const CustomInput = (props) => {
  const { NOT_EYE_ICON, EYE_ICON } = Img_Paths
  console.log("value--- :", props?.value)
  const debouncedApiCall = useRef(
    _.debounce(async (value, setFieldError, fieldName) => {
      const response = await username_api({ email: fieldName === 'email' ? value : '' });
      props.setEmailstatusCode(response.statusCode)
      if (response?.statusCode !== 200) {
        if (fieldName === 'email') {
          setFieldError('Email already exists');
        }
      } else {
        setFieldError('');
        setFieldError('');
      }
    }, 850)
  ).current;

  const handleChangeText = async (text, fieldName) => {
    props.handleChange(text);
    if (fieldName === 'email' && text !== '') {
      debouncedApiCall(text, props.setFieldError, fieldName);
    }
  };

  const inputStyle = {
    color: "rgba(0,0,0,1)",
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    height: verticalScale(50),
    textAlignVertical: 'center',
    color: '#000',
    paddingLeft: 28,
    fontFamily: Inter_Regular.Inter_Regular,
    fontSize: responsiveFontSize(1.8),
    backgroundColor: TextinputColor,
  };

  // paddingVertical: props?.type == "email" || props?.type == "password" ? 0 : 10
  return (

    <View style={{ paddingVertical: props?.type == "email" || props?.type == "password" ? 0 : 10 }}>
      <Text
        style={[
          {
            color: FourthColor,
            fontWeight: '600',
            paddingBottom: props?.type !== "customfield" || props?.typeStyle == "alignStyling" ? verticalScale(7) : null,
            paddingVertical: props?.type == "customfield" || props?.typeStyle == "alignStyling" ? 5 : null,
            width: props?.width,
            marginLeft: props?.type == "customfield" || props?.typeStyle == "alignStyling" ? 'auto' : null
          },
          // props.labelStyles,
        ]}
      >
        {props.label}
      </Text>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: moderateVerticalScale(2),

        }}>
        <View
          style={{
            flexDirection: props?.type == 'password' ? 'row' : null,
            width: props?.type == 'URL' ? responsiveWidth(73) : responsiveWidth(80),
            backgroundColor: TextinputColor,
            borderRadius: 12,
            height: verticalScale(50),
            justifyContent: 'center',
            alignItems: 'center',
          }}>

          <TextInput
            placeholder={props.placeholder}
            value={props.value}
            style={{
              color: "#000",
              paddingLeft: props?.type === 'URL' ? 40 : null,
              width: props?.type === 'password' ? 235 : 260,
              letterSpacing:
                props?.type === 'password' && !props?.showPassword && props?.value !== '' ? 10 : 0,
              fontWeight:
                props?.type === 'password' && !props?.showPassword && props?.value !== ''
                  ? '600'
                  : '400',
            }}
            onChangeText={(text) => handleChangeText(text, props.fieldName)}
            underlineColorAndroid="transparent"
            secureTextEntry={props?.type == 'password' ? !props?.showPassword : null}
            placeholderTextColor="gray"
            multiline={props.multiline ? props.multiline : false}
            keyboardType={props.keyboardType}
            autoCapitalize={props.autoCapitalize}
            editable={props.editable}
            onBlur={props.setFieldTouched}
          />

          {props?.type == 'password' && (
            <TouchableOpacity activeOpacity={0.7} onPress={props?.onPress}>
              <Image
                style={{ height: 20, width: 20, resizeMode: 'center' }}
                source={!props?.showPassword ? NOT_EYE_ICON : EYE_ICON}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {!props.error && props.customError && (
        <View
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
              gap: 2,
              marginTop: verticalScale(7),
            },
          ]}
        >
          <Icon name="alert-circle" size={22} color="red" />
          <Text style={[{ color: 'red' }]}>{props.customError}</Text>
        </View>
      )}

      {
        props.touched && props.error && (
          <View
            style={[
              {
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2,
                marginTop: verticalScale(7),
              },
            ]}
          >
            <Icon name="alert-circle" size={22} color="red" />
            <Text style={[{ color: 'red' }]}>{props.error}</Text>
          </View>
        )
      }

      {
        props.isVisible && (
          <UserNameExist setVisible={props.setVisible} isVisible={props.isVisible} text="Back" onPress={() => props.setVisible(false)}
          />
        )
      }

    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    width: responsiveWidth(80),
    backgroundColor: TextinputColor,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
