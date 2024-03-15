import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Field } from 'formik';
import PhoneInput from 'react-native-phone-number-input';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  moderateScale,
  moderateVerticalScale,
  verticalScale,
} from 'react-native-size-matters';
import {
  responsiveFontSize,
  responsiveScreenFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  FourthColor,
  TextColorGreen,
  TextinputColor,
} from '../screens/Styles/Style';
import reset_email, { username_api } from '../../services/api/auth_mdule/auth';
import _ from 'lodash';
import CustomButton from './reusable-components/CustomButton/CustomButton';
import NavigationsString from '../constants/NavigationsString';
import { useNavigation } from '@react-navigation/native';
import { Path, Svg, err } from 'react-native-svg';
import { Inter_Regular } from '../constants/GlobalFonts';

const ForgetCustomInput = ({
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
  setPhoneError,
  disabled = false,
  handleSubmit,
  isLoading,
  isValid,
  dirty,
}) => {
  const [responses, setResponse] = useState('');
  const [textphone, setPhone] = useState('');
  const [isStatusCodeSuccess, setIsStatusCodeSuccess] = useState(false);
  const [invalidPhoneNumber, setInvalidPhoneNumber] = useState("");
  const { OTP_FORGET, FORGET_EMAIL } = NavigationsString;
  const navigation = useNavigation();


  const debouncedApiCall = useRef(
    _.debounce(async phoneNumber => {
      try {
        const response = await reset_email({ phone: phoneNumber });
        console.log("phonenUmberValue--=---------- :", phoneNumber)
        console.log("response file--=---------- :", response)
        setPhone(phoneNumber);
        setResponse(response?.data?.code);

        console.log("response?.message", response?.message)
        if (response?.message === "Invalid Information, Record Not Found!") {
          setInvalidPhoneNumber("Invalid Information, Record Not Found!");
        } else {
          setInvalidPhoneNumber("Invalid number")
        }

        if (response?.statusCode === 200) {
          setIsStatusCodeSuccess(true);
          setInvalidPhoneNumber("");
        } else {
          setIsStatusCodeSuccess(false);
        };

      } catch (error) {
        console.log(error);
      }
    }, 300),
  ).current;

  const handleCountryChange = () => {
    phoneInput.current?.setState({ number: '' });
    setFieldValue('phone', '');
    setIsError('Phone number is required!');
  };
  console.log('setFieldError--', setFieldError);
  useEffect(() => {
    if (touched && value === '') {
      setIsError('Phone number is required!');
    }
  }, [touched, value]);

  return (
    <View style={{ paddingVertical: 10, flex: 1 }}>
      <Text
        style={{
          color: FourthColor,
          fontWeight: '600',
          marginBottom: verticalScale(7),
        }}>
        Phone Number
      </Text>
      <Field name="phone">
        {() => (
          <PhoneInput
            ref={phoneInput}
            disabled={disabled}
            placeholder=" "
            defaultCode={'AU'}
            codeTextStyle={{
              color: 'rgba(170, 170, 170, 1)',
              fontFamily: Inter_Regular.Inter_Regular,
              fontWeight: '400',
              fontSize: responsiveFontSize(1.8),
            }}
            onChangeFormattedText={phone => {
              handleChange(phone);
              setFieldError('phone', '');
              setIsError('');
              if (phone?.length > 3) {
                console.log("phone?.length", phone?.length)
                debouncedApiCall(phone)
              }
              console.log('--==', phone);
              const checkValid = phoneInput.current?.isValidNumber(phone);

              if (!checkValid) {
                setFieldError('phone', 'Invalid phone number');
                setIsError('Invalid phone number');
              }
            }}

            containerStyle={styles.phoneContainer}
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
            textContainerStyle={styles.phoneTextContainer}
            textInputStyle={styles.phoneTextInput}
            flagButtonStyle={{ width: 87 }}
            value={value}
            onChangeText={phoneNumber => { }}
            onChangeCountry={country => {
              setPhoneCode(country.callingCode);
              console.log(country.callingCode, 'phoneCode');
              handleCountryChange();
            }}
          />
        )}
      </Field>


      {
        console.log("error", isError)
      }
      {
        invalidPhoneNumber &&
        <>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 2,
              marginTop: 2,
            }}>
            <Icon name="alert-circle" size={22} color="red" />
            <Text style={{ color: 'red' }}>{invalidPhoneNumber}</Text>
          </View>
          <View style={{ height: 0 }} />
        </>
      }


      <View style={{ marginTop: 'auto', paddingBottom: responsiveWidth(12) }}>
        <TouchableOpacity onPress={() => navigation.navigate(FORGET_EMAIL)}>
          <Text
            style={{
              color: TextColorGreen,
              fontWeight: '600',
              textAlign: 'center',
              paddingVertical: moderateVerticalScale(22),
            }}>
            Use email address instead
          </Text>
        </TouchableOpacity>
        <CustomButton

          isLoading={isLoading}
          isValid={isValid}
          dirty={dirty}
          type="register"
          phoneValue={value}
          StatusCodeSuccess={isStatusCodeSuccess}
          onPress={() => {
            value !== '' ? handleSubmit : null;
            const checkValid = phoneInput.current?.isValidNumber(textphone);
            if (!error && !isError && checkValid) {
              navigation.navigate(OTP_FORGET, {
                code: responses,
                phone: textphone,
              });
            }
          }}
          backgroundColor={isStatusCodeSuccess ? '#395E66' : 'rgba(57, 94, 102, 0.5)'}
          // backgroundColor={value == '' ? '#395E66' : 'rgba(57, 94, 102, 0.5)'}
          color="#FFF"
          text="Next"
        />
      </View>
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

export default ForgetCustomInput;
