import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {verticalScale} from 'react-native-size-matters';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {FourthColor, TextinputColor} from '../screens/Styles/Style';
import _ from 'lodash';
import {username_api} from '../../services/api/auth_mdule/auth';
import Toast from 'react-native-toast-message';

interface Props {
  placeholder?: string;
  label?: string;
  value?: any;
  error?: string;
  touched?: boolean | undefined;
  initialTouched?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  extraStyles?: any;
  multiline?: boolean;
  isPasswordIcon?: boolean;
  textAlignVertical?: string;
  handleChange: (e: any) => void;
  isFirstLetterLowercase?: boolean;
  setFieldError: (name: any, error: any) => void;
  labelStyles?: any;
  fieldName: string;
  editable?: boolean;
  starlabel?: boolean;
  secondLabel?: boolean;
}

const CustomInput = ({...props}: Props) => {
  const [isFocused, setIsFocused] = useState(false);

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
        fieldName === 'email' ? value : '',
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
    }, 850),
  ).current;

  const handleChangeText = async (text: string, fieldName: string) => {
    props.handleChange(text);
    if (
      (fieldName === 'username' && text !== '') ||
      (fieldName === 'email' && text !== '')
    ) {
      debouncedApiCall(text, props.setFieldError, fieldName);
    }
  };

  const inputStyle = {
    ...styles.input,
    height: verticalScale(50),
    textAlignVertical: 'center',
    paddingHorizontal: 20,
  };

  return (
    <View style={{paddingVertical: 10}}>
      <Text
        style={[
          {
            color: FourthColor,
            fontWeight: '600',
            marginBottom: verticalScale(7),
          },
          props.labelStyles,
        ]}>
        {props.label}
      </Text>
      <View>
        <TextInput
          style={[inputStyle, {color: 'black', fontWeight: '400'}]}
          placeholder={isFocused ? '' : props.placeholder}
          value={props.value}
          onChangeText={text => handleChangeText(text, props.fieldName)}
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
          ]}>
          <Icon name="alert-circle" size={22} color="red" />
          <Text style={[{color: 'red'}]}>{props.customError}</Text>
        </View>
      )}
      {props.error && (
        <View
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
              gap: 2,
              marginTop: verticalScale(7),
            },
          ]}>
          <Icon name="alert-circle" size={22} color="red" />
          <Text style={[{color: 'red'}]}>{props.error}</Text>
        </View>
      )}
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
