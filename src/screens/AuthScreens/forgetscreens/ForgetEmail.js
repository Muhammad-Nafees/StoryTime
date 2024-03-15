import React, { useState } from 'react';
import {
  Text,
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
import { useNavigation } from '@react-navigation/native';
import NavigationsString from '../../../constants/NavigationsString';
import { moderateVerticalScale, moderateScale } from 'react-native-size-matters';
import { Img_Paths } from '../../../assets/Imagepaths';
import Toast from 'react-native-toast-message';
import { Formik } from 'formik';
import { validationforgetEmail } from '../../../../validation/validation';
import _ from 'lodash';
import CustomInputForgetEmail from '../../../components/auth/CustomInputForgetEmail';

const ForgetEmail = () => {
  const { GREEN_COLOUR_FORGETIMAGE } = Img_Paths;
  const navigation = useNavigation();


  return (
    <KeyboardAvoidingView>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={validationforgetEmail}
        onSubmit={async values => { }}>
        {({
          values,
          errors,
          handleChange,
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
                  handleChange={text => setFieldValue('email', text)}
                />
              </View>

              {/* Next------------ */}
            </View>
          </>
        )}
      </Formik>
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
