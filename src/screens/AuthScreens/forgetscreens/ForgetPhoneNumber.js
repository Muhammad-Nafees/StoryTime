import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  SecondaryColor,
} from '../../Styles/Style';
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import { moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from '../../../assets/Imagepaths';
import Toast from 'react-native-toast-message';
import { Formik } from 'formik';
import ForgetCustomInput from '../../../components/ForgetCustomInput';
import reset_email from '../../../../services/api/auth_mdule/auth';
import { useNavigation } from '@react-navigation/native';
import { validationforgetPhone } from '../../../../validation/validation';



const ForgetPhoneNumber = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { ANOTHER_FORGET_BG_IMG } = Img_Paths;
  const phoneInput = useRef();
  const navigation = useNavigation();

  const handleForgetPhoneNumber = async (values) => {
    setIsSubmitted(false);
    setIsLoading(true);
    try {
      const responseData = await reset_email({ phone: values?.phone })
      console.log(responseData.data?.data, "RESPONSE FROM PHONE")
      setIsLoading(false);
      navigation.navigate("OtpForget", {
        code: responseData?.data?.data?.code,
        phone: values?.phone,
      });

    } catch (error) {
      setIsLoading(false);
      Toast.show({
        type: "error",
        text1: error?.response?.data?.message
      })
      console.log(error?.response?.data?.message, "ERROR FROM PHONE")
    }
  };


  return (
    <Formik
      initialValues={{ phone: '' }}
      validationSchema={validationforgetPhone}
      onSubmit={handleForgetPhoneNumber}
    >
      {({
        values,
        errors,
        handleChange,
        handleSubmit,
        setFieldValue,
        touched,
      }) => (

        <View style={styles.container}>
          <ScrollView contentContainerStyle={{ flex: 1 }}>
            <View style={styles.img_container}>
              <Image style={styles.img_child} source={ANOTHER_FORGET_BG_IMG} />
            </View>

            {/* Password------------ */}

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <ForgetCustomInput
                value={values.phone}
                error={errors.phone}
                touched={touched.phone}
                handleChange={handleChange('phone')}
                setFieldValue={setFieldValue}
                phoneInput={phoneInput}
                isSubmitted={isSubmitted}
                setIsSubmitted={setIsSubmitted}
                isLoading={isLoading}
                handleSubmit={handleSubmit}
              />
            </View>

            {/* Confirm Password------------ */}

            {/* Next and Back------------ */}
            <Toast />
          </ScrollView>
        </View>
      )}
    </Formik>
  );
};



const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: SecondaryColor,
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

export default ForgetPhoneNumber;
