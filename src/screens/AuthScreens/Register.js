import React, { useEffect, useMemo, useRef, useState } from 'react';
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
  ActivityIndicator,
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
import TouchableButton from '../../components/TouchableButton';
import { useNavigation } from '@react-navigation/native';
import NavigationsString from '../../constants/NavigationsString';
import { Img_Paths } from '../../assets/Imagepaths';
import { moderateVerticalScale, moderateScale } from 'react-native-size-matters';
import { register } from '../../../store/slices/authSlice';

import CustomInput from '../../components/CustomInput';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { validationSignUp } from '../../../validation/validation';
import Toast from 'react-native-toast-message';
import CustomPhoneInput from '../../components/CustomPhoneInput';
import { userinfoState, userdata } from '../../../store/slices/authStatesandCity/userInfoState_Slice';
import { username_api } from '../../../services/api/auth_mdule/auth';


const Register = () => {
  const { CREATE_ACCOUNT_ICON } = Img_Paths;
  const navigation = useNavigation();
  const { REGISTER_USER_INFO } = NavigationsString;
  const [isError, setIsError] = useState('');
  const [phoneCodee, setPhoneCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formatText, setFormatText] = useState("")
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [statusCodeusername, setStatusCodeusername] = useState();
  const [emailstatusCode, setEmailstatusCode] = useState();
  const [phoneNumberStatusCode, setphoneNumberStatusCode] = useState();
  const [phoneError, setPhoneError] = useState('');
  const [isVisible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const phoneInput = useRef(null);

  const phoneCode = phoneInput?.current?.state?.code;
  const countryCode = phoneInput?.current?.state?.countryCode;

  const validate = (values) => {
    return (
      values.email &&
      values.firstName &&
      values.lastName &&
      values.phoneNo &&
      values.username
    )
  }

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

      onSubmit={async (values) => {
        setIsLoading(true);
        try {
          dispatch(userinfoState(countryCode));
          dispatch(register({ values, countryCode: countryCode, phoneCode: phoneCode }));
          const responseData = await username_api({ username: values?.username })
          setIsLoading(false);
          setStatusCodeusername(responseData.statusCode)

          if (responseData?.statusCode !== 200) {
            setVisible(true)
          }
          if (responseData?.statusCode !== 200 || emailstatusCode !== 200 || phoneNumberStatusCode !== 200 || checkValid === false) {
            return;
          }
          navigation.navigate(REGISTER_USER_INFO);
          return responseData;
        } catch (error) {
        }
        setIsLoading(true);
        setIsLoading(false);
        const checkValid = phoneInput.current?.isValidNumber(values.phoneNo);
      }}
    >
      {({
        values,
        errors,
        handleChange,
        handleSubmit,
        setFieldValue,
        touched,
        setFieldError,
        setFieldTouched
      }) => (
        <>
          {
            console.log("touchedOutside======", touched)
          }
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
              <View style={styles.img_container}>
                <Image style={styles.img_child} source={CREATE_ACCOUNT_ICON} />
              </View>

              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <CustomInput
                  label="Username"
                  placeholder="Type here"
                  value={values.username}
                  error={errors.username}
                  customError={usernameError}
                  touched={touched.username}
                  initialTouched={true}
                  setFieldError={setUsernameError}
                  isVisible={isVisible}
                  setVisible={setVisible}
                  fieldName="username"
                  handleChange={text => setFieldValue('username', text)}
                  setFieldTouched={() => setFieldTouched("username")}
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
                  setFieldTouched={() => setFieldTouched("firstName")}

                />

                <CustomInput
                  label="Last Name"
                  placeholder="Type here"
                  value={values.lastName}
                  error={errors.lastName}
                  touched={touched.lastName}
                  initialTouched={true}
                  setFieldTouched={() => setFieldTouched("lastName")}
                  setFieldError={setFieldError}
                  fieldName="lastName"
                  handleChange={text => setFieldValue('lastName', text)}
                />

                <CustomPhoneInput
                  value={values.phoneNo}
                  error={errors.phoneNo}
                  touched={touched.phoneNo}
                  handleChange={handleChange('phoneNo')}
                  setFieldValue={setFieldValue}
                  phoneInput={phoneInput}
                  setIsError={setIsError}
                  setFieldError={setFieldError}
                  setFormatText={setFormatText}
                  isError={isError}
                  setPhoneCode={setPhoneCode}
                  setPhoneError={setPhoneError}
                  setphoneNumberStatusCode={setphoneNumberStatusCode}
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
                  setEmailstatusCode={setEmailstatusCode}
                  setFieldTouched={() => setFieldTouched("email")}
                  fieldName="email"
                  handleChange={text => setFieldValue('email', text)}
                />

                <View style={{ paddingVertical: responsiveWidth(6) }}>
                  <TouchableOpacity
                    disabled={!validate(values) ? true : false}
                    onPress={handleSubmit}
                    style={{
                      width: responsiveWidth(80),
                      backgroundColor: validate(values) ? '#395E66'
                        : 'rgba(57, 94, 102, 0.4)',
                      borderRadius: 10,
                      // borderWidth: 1,
                      borderColor: '#395E66',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: responsiveHeight(6.6),
                    }}
                  >
                    {!isLoading ?
                      <Text
                        style={{
                          fontSize: responsiveFontSize(1.9),
                          fontWeight: '600',
                          letterSpacing: 0.28,
                          color: 'white',
                        }}>
                        Next
                      </Text> :
                      <ActivityIndicator size={22} />
                    }
                  </TouchableOpacity>

                  <View style={{ marginVertical: moderateVerticalScale(7) }}>
                    <TouchableButton
                      onPress={() => navigation.goBack()}
                      backgroundColor="#FFF"
                      borderWidth="1"
                      type={"backuser"}
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
