import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { verticalScale } from 'react-native-size-matters';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { FourthColor, TextinputColor } from '../screens/Styles/Style';
import _ from 'lodash';
import { username_api } from '../../services/api/auth_mdule/auth';
import Toast from 'react-native-toast-message';
import UserNameExist from './UserNameExist';

const CustomInput = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setVisible] = useState(false)

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const debouncedApiCall = useRef(
    _.debounce(async (value, setFieldError, fieldName) => {
      const response = await username_api(
        fieldName === 'username' ? value : '',
        fieldName === 'email' ? value : ''
      );

      if (response?.statusCode !== 200) {
        if (fieldName === 'username') {
          setFieldError('Username already exists');
        } else if (fieldName === 'email') {
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
    if ((fieldName === 'username' && text !== '') || (fieldName === 'email' && text !== '')) {
      debouncedApiCall(text, props.setFieldError, fieldName);
    }
  };

  const inputStyle = {
    width: responsiveWidth(80),
    backgroundColor: TextinputColor,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    height: verticalScale(50),
    textAlignVertical: 'center',
    paddingHorizontal: 20,
    color: 'black',
    fontWeight: '400',
  };

  return (

    <View style={{ paddingVertical: 10 }}>
      <Text
        style={[
          {
            color: FourthColor,
            fontWeight: '600',
            paddingBottom: verticalScale(7),
          },
          props.labelStyles,
        ]}
      >
        {props.label}
      </Text>

      <View>
        <TextInput
          style={inputStyle}
          placeholder={isFocused ? '' : props.placeholder}
          value={props.value}
          onChangeText={(text) => handleChangeText(text, props.fieldName)}
          underlineColorAndroid="transparent"
          placeholderTextColor="gray"
          multiline={props.multiline ? props.multiline : false}
          keyboardType={props.keyboardType}
          autoCapitalize={props.autoCapitalize}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          editable={props.editable}
        />
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

      {isFocused && props.error && (
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
      )}

      {/* {isVisible && <UserNameExist setVisible={setVisible} isVisible={isVisible} text="Back" onPress={() => navigation.goBack()} />} */}

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
