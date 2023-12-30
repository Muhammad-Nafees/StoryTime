import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
} from 'react-native';
import {
  FourthColor,
  PrimaryColor,
  SecondaryColor,
  TextColorGreen,
  TextinputColor,
  ThirdColor,
} from '../Styles/Style';
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import TextInputField from '../../components/TextInputField';
import TouchableButton from '../../components/TouchableButton';
import SocialsLogin from '../../components/SocialsLogin';
import {useNavigation} from '@react-navigation/native';
import CountryPicker from 'react-native-country-picker-modal';
import PhoneNumber from '../../components/PhoneNumber';
import NavigationsString from '../../constants/NavigationsString';
import {Img_Paths} from '../../assets/Imagepaths';
import {moderateVerticalScale, moderateScale} from 'react-native-size-matters';
import {registeruser} from '../../../store/slices/Register_Slice';
import {register} from '../../../store/slices/Register_Slice';
import CustomInput from '../../components/CustomInput';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import {validationSignUp} from '../../../validation/validation';
import Svg, {Path} from 'react-native-svg';
import Toast from 'react-native-toast-message';
import CustomPhoneInput from '../../components/CustomPhoneInput';
import {
  userdata,
  userinfoState,
} from '../../../store/slices/userInfoState_Slice';

const Register = () => {
  const {CREATE_ACCOUNT_ICON} = Img_Paths;
  const navigation = useNavigation();
  const {REGISTER_USER_INFO} = NavigationsString;
  const [countryCode, setCountryCode] = useState('');
  const [isError, setIsError] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const dispatch = useDispatch();
  const phoneInput = useRef(null);

  const countryinfo = {};

  if (countryCode === '') {
    countryinfo.countryCode = 'AU';
  } else {
    countryinfo.countryCode = countryCode;
  }

  if (phoneCode === '') {
    countryinfo.phonecodee = '61';
  } else {
    countryinfo.phonecodee = phoneCode;
  }

  const handleFormSubmit = async values => {
    setIsLoading(true);
    setIsLoading(false);
    if (usernameError !== '' || emailError !== '') {
      return;
    }
    navigation.navigate(REGISTER_USER_INFO);
    dispatch(userinfoState(countryinfo));
    dispatch(register({values, countryCode: countryinfo}));
  };

  return (
    <Formik
      initialValues={{
        username: '',
        firstName: '',
        lastName: '',
        phoneNo: '',
        email: '',
        role: 'user',
        fcmToken: '1234567',
      }}
      validationSchema={validationSignUp}
      onSubmit={handleFormSubmit}>
      {({
        values,
        errors,
        handleChange,
        handleSubmit,
        setFieldValue,
        touched,
        isValid,
        dirty,
        setFieldError,
      }) => (
        <>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.container}>
              <View style={styles.img_container}>
                <Image style={styles.img_child} source={CREATE_ACCOUNT_ICON} />
              </View>

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <CustomInput
                  label="Username"
                  placeholder="Type here"
                  value={values.username}
                  error={errors.username}
                  customError={usernameError}
                  touched={touched.username}
                  initialTouched={true}
                  setFieldError={setUsernameError}
                  fieldName="username"
                  handleChange={text => setFieldValue('username', text)}
                />

                <CustomInput
                  label="First Name"
                  placeholder="Type here"
                  value={values.firstName}
                  error={errors.firstName}
                  touched={touched.firstName}
                  initialTouched={true}
                  setFieldError={setFieldError}
                  fieldName="firstName"
                  handleChange={text => setFieldValue('firstName', text)}
                />

                <CustomInput
                  label="Last Name"
                  placeholder="Type here"
                  value={values.lastName}
                  error={errors.lastName}
                  touched={touched.lastName}
                  initialTouched={true}
                  setFieldError={setFieldError}
                  fieldName="lastName"
                  handleChange={text => setFieldValue('lastName', text)}
                />

                <CustomPhoneInput
                  value={values.phone}
                  error={errors.phone}
                  touched={touched.phone}
                  handleChange={handleChange('phoneNo')}
                  setFieldValue={setFieldValue}
                  phoneInput={phoneInput}
                  setIsError={setIsError}
                  setFieldError={setFieldError}
                  isError={isError}
                  setPhoneCode={setPhoneCode}
                  countryCode={phoneCode}
                />
                <CustomInput
                  label="Email Address"
                  placeholder="Type here"
                  value={values.email}
                  error={errors.email}
                  customError={emailError}
                  touched={touched.email}
                  initialTouched={true}
                  setFieldError={setEmailError}
                  fieldName="email"
                  handleChange={text => setFieldValue('email', text)}
                />

                <View style={{paddingVertical: responsiveWidth(6)}}>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={{
                      width: responsiveWidth(80),
                      backgroundColor:
                        values.email &&
                        values.firstName &&
                        values.lastName &&
                        values.phoneNo &&
                        values.username
                          ? '#395E66'
                          : 'rgba(57, 94, 102, 0.6)',
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: '#395E66',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: responsiveHeight(6.6),
                    }}
                    disabled={
                      !(
                        values.email &&
                        values.firstName &&
                        values.lastName &&
                        values.phoneNo &&
                        values.username
                      )
                    }>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(1.9),
                        fontWeight: '600',
                        letterSpacing: 0.28,
                        color: 'white',
                      }}>
                      Next
                    </Text>
                  </TouchableOpacity>

                  <View style={{marginVertical: moderateVerticalScale(7)}}>
                    <TouchableButton
                      onPress={() => navigation.goBack()}
                      backgroundColor="#FFF"
                      borderWidth="1"
                      color="#395E66"
                      text="Back"
                    />
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          <Toast />
        </>
      )}
    </Formik>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: SecondaryColor,
    flex: 1,
  },
  text: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '400',
  },
  img_container: {
    paddingVertical: moderateVerticalScale(22),
    justifyContent: 'center',
    alignItems: 'center',
  },
  img_child: {
    width: responsiveWidth(50),
    height: responsiveHeight(20),
    resizeMode: 'center',
  },
});
