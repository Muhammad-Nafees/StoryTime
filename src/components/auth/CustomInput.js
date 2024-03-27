import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { FourthColor, TextinputColor } from '../../screens/Styles/Style';
import _ from 'lodash';
import { username_api } from '../../../services/api/auth_mdule/auth';
import UserNameExist from './UserNameExist';
import { Img_Paths } from '../../assets/Imagepaths';



const CustomInput = (props) => {
  const { NOT_EYE_ICON, EYE_ICON } = Img_Paths
  console.log("value--- :", props?.value);
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



  return (
    <>
      <View style={{ marginLeft: "auto", width: responsiveWidth(90), }}>
        <Text style={[props?.labelStyles, { color: FourthColor, fontWeight: "600", }]}>
          {props.label}
        </Text>
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: moderateVerticalScale(4),
          paddingTop: responsiveWidth(3),
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
            onBlur={props.setFieldBlur}
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

      {
        !props.error && props.customError && (
          <View
            style={[
              {
                width: responsiveWidth(90),
                marginLeft: "auto",
                flexDirection: "row",
              },
            ]}
          >
            <Icon name="alert-circle" size={22} color="red" />
            <Text style={[{ color: 'red' }]}>{props.customError}</Text>
          </View>
        )
      }



      <View style={{ height: responsiveHeight(3.5) }}>
        {
          props?.Submitted && props.touched && props.error && (
            <View
              style={[
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: moderateScale(16),
                  gap: 5,
                },
              ]}
            >
              <Icon name="alert-circle" size={22} color="red" />
              <Text style={[{ color: 'red', fontSize: responsiveFontSize(1.9), fontWeight: "600" }]}>{props.error}</Text>
            </View>
          )
        }
      </View>


      {
        props.isVisible && (
          <UserNameExist setVisible={props.setVisible} isVisible={props.isVisible} text="Back" onPress={() => props.setVisible(false)}
          />
        )
      }


    </>
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
