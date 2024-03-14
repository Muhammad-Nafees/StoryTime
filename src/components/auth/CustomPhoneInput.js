import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Field } from 'formik';
import PhoneInput from 'react-native-phone-number-input';
import Icon from 'react-native-vector-icons/Ionicons';
import { verticalScale } from 'react-native-size-matters';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { FourthColor, TextinputColor } from '../../screens/Styles/Style';
import { username_api } from '../../../services/api/auth_mdule/auth';
import _ from 'lodash';
import { Path, Svg } from 'react-native-svg';
import { Inter_Regular } from '../../constants/GlobalFonts';
import axios from 'axios';
import { Base_Url, username_endpoint } from '../../../services';

const CustomPhoneInput = ({
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
  setPhoneError,
  disabled = false,
  extraStyles,
  setphoneNumberStatusCode,
  defaultCode,
}) => {

  const [isFocused, setIsFocused] = useState(false);
  const [response, setResponse] = useState();
  const [statusCodePhone, setStatusCodePhone] = useState();
  const [phoneAlreadyExist, setPhoneAlreadyExist] = useState("")

  // const response = await axios.post(Base_Url + username_endpoint, `+${code}${phoneNumber}`)

  const debouncedApiCall = useRef(
    _.debounce(async (phoneNumber) => {
      const code = phoneInput?.current?.state?.code;
      setResponse(response?.status);

      try {
        // const response = await username_api({ completePhone: `+${code}${phoneNumber}` });
        const response = await axios.post(Base_Url + username_endpoint, { completePhone: `+${code}${phoneNumber}` });
        console.log("CUSTOM phone RESPONSE--- :", response?.data);
        setphoneNumberStatusCode(response?.statusCode);
        setStatusCodePhone(response?.statusCode);
        console.log(response?.statusCode);
      } catch (error) {
        setFieldError("phoneNo", error?.response?.data?.message);
        console.log(error?.response?.data, 'ERROR FROM PHONENUMBER!');
      }
    }, 300),
  ).current;



  const handleCountryChange = () => {
    phoneInput.current?.setState({ number: '' });
    setFieldValue('phoneNo', '');
    setIsError('Phone number is required!');
  };

  useEffect(() => {
    if (touched && value === '') {
      setIsError('Phone number is required!');
    }
  }, [touched, value]);

  console.log('statusPhoneCOde===', statusCodePhone);
  // ----------------------

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={{ paddingVertical: 10 }}>
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
            defaultCode={defaultCode || 'AU'}
            containerStyle={styles.phoneContainer}
            textContainerStyle={styles.phoneTextContainer}
            textInputStyle={styles.phoneTextInput}
            flagButtonStyle={{ width: 90 }}
            value={value}
            codeTextStyle={{
              color: 'rgba(170, 170, 170, 1)',
              fontFamily: Inter_Regular.Inter_Regular,
              fontWeight: '400',
              fontSize: responsiveFontSize(1.8),
            }}
            onChangeText={phoneNumber => {
              handleChange(phoneNumber);
              setFieldError('phoneNo', '');
              setIsError('');
              const checkValid = phoneInput.current?.isValidNumber(phoneNumber);
              if (checkValid) {
                debouncedApiCall(phoneNumber, setFieldError);
              }
              if (!checkValid) {
                setFieldError('phoneNo', 'Invalid phone number');
                setIsError('Invalid phone number');
              }
            }}
            renderDropdownImage={
              <Svg
                width="19"
                height="10"
                viewBox="0 0 19 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <Path
                  d="M17.3625 1.21094L10.8425 7.73094C10.0725 8.50094 8.81246 8.50094 8.04246 7.73094L1.52246 1.21094"
                  stroke="#696969"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </Svg>
            }
            onChangeCountry={country => {
              setPhoneCode(country.callingCode);
              console.log(country.callingCode, 'phoneCode');
              handleCountryChange();
            }}
            onCopy={() => {
              console.log('Copy event triggered');
              // Add any additional debugging statements here
            }}
            onFocus={handleFocus} // Simulate focus event
            onBlur={handleBlur}
          />
        )}
      </Field>

      {/* { */}
      {/* (value !== "" && !isFocused && (!error || !isError)) && ( */}

      {/* )} */}

      {value !== '' && (error || isError) && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2,
            marginTop: 2,
          }}>
          <Icon name="alert-circle" size={22} color="red" />
          <Text style={{ color: 'red' }}>{error || isError}</Text>
        </View>
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
