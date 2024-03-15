import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import {
  SecondaryColor,
} from '../../Styles/Style';
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import { moderateVerticalScale, moderateScale } from 'react-native-size-matters';
import { Img_Paths } from '../../../assets/Imagepaths';
import { Formik } from 'formik';
import { validationforgetEmail } from '../../../../validation/validation';
import _ from 'lodash';
import CustomInputForgetEmail from '../../../components/auth/CustomInputForgetEmail';
import reset_email from '../../../../services/api/auth_mdule/auth';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const ForgetEmail = () => {
  const { GREEN_COLOUR_FORGETIMAGE } = Img_Paths;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleForgetEmail = async (values) => {

    setIsSubmitted(false);
    setIsLoading(true);

    try {
      const responseData = await reset_email({ email: values?.email })
      console.log(responseData.data?.data, "RESPONSE FROM EMAIL")
      setIsLoading(false);
      navigation.navigate("OtpForget", {
        code: responseData?.data?.data?.code,
        email: values?.email,
        type: 'email',
      });
    } catch (error) {
      setIsLoading(false);
      Toast.show({
        type: "error",
        text1: error?.response?.data?.message
      })
      console.log(error?.response?.data?.message, "ERROE FROM EMAIL")
    }
  };

  return (
    <KeyboardAvoidingView>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={validationforgetEmail}
        onSubmit={handleForgetEmail}>
        {({
          values,
          errors,
          handleSubmit,
          setFieldError,
          touched,
          setFieldValue,
          dirty,
          isValid,
        }) => (
          <>
            <View style={[styles.container]}>
              <View style={styles.img_container}>
                <Image
                  style={styles.img_child}
                  source={GREEN_COLOUR_FORGETIMAGE}
                />
              </View>

              {/* Password------------ */}

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>

                <CustomInputForgetEmail
                  label="Email Adress"
                  placeholder="Type here"
                  value={values.email}
                  error={errors.email}
                  touched={touched.email}
                  initialTouched={true}
                  setFieldError={setFieldError}
                  erroremail={errors?.email}
                  handleSubmit={handleSubmit}
                  fieldName="email"
                  dirty={dirty}
                  isValid={isValid}
                  isLoading={isLoading}
                  isSubmitted={isSubmitted}
                  setIsSubmitted={setIsSubmitted}
                  handleChange={text => setFieldValue('email', text)}
                />
              </View>

              {/* Next------------ */}
            </View>
          </>
        )}
      </Formik>
      <Toast />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: SecondaryColor,
    height: '100%',
    width: '100%',
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
    resizeMode: "center",
  },
});

export default ForgetEmail;
