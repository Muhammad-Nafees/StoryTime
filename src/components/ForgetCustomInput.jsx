import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Field } from 'formik';
import PhoneInput from 'react-native-phone-number-input';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  moderateVerticalScale,
  verticalScale,
} from 'react-native-size-matters';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  FourthColor,
  TextColorGreen,
  TextinputColor,
} from '../screens/Styles/Style';
import _ from 'lodash';
import CustomButton from './reusable-components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { Path, Svg, err } from 'react-native-svg';
import { Inter_Regular } from '../constants/GlobalFonts';


const ForgetCustomInput = ({
  handleChange,
  error,
  value,
  touched,
  phoneInput,
  disabled = false,
  isSubmitted,
  setIsSubmitted,
  handleSubmit,
  isLoading,
  isValid,
  dirty,
}) => {

  const navigation = useNavigation();

  const handleCountryChange = () => {
    phoneInput.current?.setState({ number: '' });
  };

  return (
    <>

      <View style={{ width: responsiveWidth(90), marginLeft: "auto", }}>
        <Text
          style={{
            color: FourthColor,
            fontWeight: '600',
            marginBottom: verticalScale(7),
          }}>
          Phone Number
        </Text>
      </View>
      <View style={{ flex: 1 }}>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
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
                  console.log(country.callingCode, 'phoneCode');
                  handleCountryChange();
                }}
              />
            )}
          </Field>
        </View>

        {
          isSubmitted && touched && error &&
          <>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: responsiveWidth(1.5),
                gap: 4,
                width: responsiveWidth(80),
                marginLeft: "auto"
              }}>
              <Icon name="alert-circle" size={22} color="red" />
              <Text style={{ color: 'red', fontWeight: "600", fontSize: responsiveFontSize(1.9) }}>{error}</Text>
            </View>
            <View style={{ height: 0 }} />
          </>
        }

        <View style={{ marginTop: 'auto', paddingBottom: responsiveWidth(12) }}>
          <TouchableOpacity onPress={() => navigation.navigate("ForgetEmail")}>
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
            value={value}
            type="register"
            phoneValue={value}
            onPress={() => {
              setIsSubmitted(true);
              handleSubmit();
            }}
            backgroundColor={value !== "" ? '#395E66' : 'rgba(57, 94, 102, 0.5)'}
            color="#FFF"
            text="Next"
          />
        </View>
      </View>
    </>

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
