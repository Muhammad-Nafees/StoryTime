import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Field} from 'formik';
import PhoneInput from 'react-native-phone-number-input';
import Icon from 'react-native-vector-icons/Ionicons';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {FourthColor, TextinputColor} from '../screens/Styles/Style';
import {username_api} from '../../services/api/auth_mdule/auth';
import _ from 'lodash';

interface Props {
  setFieldValue: any;
  label?: string;
  value: any;
  error?: string;
  touched?: boolean;
  handleChange: (number: string) => void;
  phoneInput?: any;
  isError?: any;
  setIsError?: any;
  setPhoneCode: (code: string) => void;
  setFieldError?: any;
  countryCode?: any;
  placeholder?: string;
  disabled?: boolean;
  extraStyles?: any;
}

const CustomPhoneInput = ({
  label,
  handleChange,
  error,
  value,
  touched,
  setFieldValue,
  phoneInput,
  isError,
  setIsError,
  setPhoneCode,
  setFieldError,
  countryCode,
  placeholder,
  disabled = false,
  extraStyles,
}: Props) => {
  const debouncedApiCall = useRef(
    _.debounce(async (phoneNumber, setFieldError) => {
      const response = await username_api(
        '',
        '',
        `+${countryCode}${phoneNumber}`,
      );

      if (response?.statusCode !== 200) {
        setFieldError('phoneNo', `Phone Number already exists`);
      }
    }, 1000),
  ).current;

  const handleCountryChange = () => {
    phoneInput.current?.setState({number: ''});
    setFieldValue('phoneNo', '');
    setIsError('Phone number is required!');
  };

  useEffect(() => {
    if (touched && value === '') {
      setIsError('Phone number is required!');
    }
  }, [touched, value]);

  return (
    <View style={{paddingVertical: 10}}>
      <Text
        style={{
          color: FourthColor,
          fontWeight: '600',
          marginBottom: verticalScale(7),
        }}>
        Phone Number
      </Text>
      <Field name="phoneNo">
        {() => (
          <PhoneInput
            ref={phoneInput}
            disabled={disabled}
            placeholder=" "
            defaultCode={'US'}
            containerStyle={styles.phoneContainer}
            textContainerStyle={styles.phoneTextContainer}
            textInputStyle={styles.phoneTextInput}
            flagButtonStyle={{width: 87}}
            value={value}
            onChangeText={phoneNumber => {
              handleChange(phoneNumber);
              setFieldError('phoneNo', '');
              setIsError('');
              debouncedApiCall(phoneNumber, setFieldError);
              const checkValid = phoneInput.current?.isValidNumber(
                `+${countryCode}${phoneNumber}`,
              );
              if (!checkValid) {
                setFieldError('phoneNo', 'Invalid phone number');
                setIsError('Invalid phone number');
              }
            }}
            onChangeCountry={country => {
              setPhoneCode(country.callingCode as any);
              console.log(country.callingCode, 'phoneCode');
              handleCountryChange();
            }}
          />
        )}
      </Field>

      {isError !== '' || (touched && !value) ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2,
            marginTop: 2,
          }}>
          <Icon name="alert-circle" size={22} color="red" />
          <Text style={{color: 'red'}}>{error ? error : isError}</Text>
        </View>
      ) : (
        <View style={{height: 0}} />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  phoneInput: {
    width: responsiveWidth(80),
    borderRadius: 12,
    backgroundColor: TextinputColor,
    color: FourthColor,
    height: 40,
  },
  phoneTextInput: {
    padding: 0,
    fontSize: responsiveFontSize(2),
    color: '#000',
    marginTop: verticalScale(1.5),
  },
  phoneTextContainer: {
    backgroundColor: '#F3F3F3',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  phoneContainer: {
    width: responsiveWidth(80),
    backgroundColor: 'rgba(232, 232, 232, 1)',
    borderRadius: 12,
  },
});

export default CustomPhoneInput;
