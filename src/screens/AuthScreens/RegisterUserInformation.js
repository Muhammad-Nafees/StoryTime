import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {
  SecondaryColor,
} from '../Styles/Style';
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import CustomButton from '../../components/reusable-components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { moderateVerticalScale, moderateScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { register, } from '../../../store/slices/authSlice';
import { Formik } from 'formik';
import { zipCodeValidation } from '../../../validation/validation';
import AuthCustomSelectDropdown from '../../components/auth/AuthSelectDropDown';
import CustomInput from '../../components/auth/CustomInput';


const RegisterUserInformation = ({ }) => {
  // states
  const [changeColor, setChangeColor] = useState("#AAA")
  const [secondChangeColor, setSecondChangeColor] = useState("#AAA");
  const [isSubmitted, setIsSubmitted] = useState(false)
  // redux states
  const { userdata } = useSelector(state => state?.userinfostate);
  const { userdatacity } = useSelector(state => state?.userinfocity);
  const { registerData } = useSelector(state => state?.authSlice);
  // dropdown names
  const namesArray = userdata?.data?.map(item => item.name);
  const namesCities = userdatacity?.data?.map(item => item?.name);
  // navigation
  const navigation = useNavigation();


  // dispatch
  const dispatch = useDispatch();

  const handlerSubmitUserInfo = async (values) => {
    setIsSubmitted(false);
    dispatch(
      register({ ...registerData, state: values?.state, city: values?.city, zipCode: values?.zipCode }),
    );
    navigation.navigate("RegisterPassword");
  };



  return (
    <Formik
      initialValues={{
        zipCode: '',
        state: '',
        city: '',
      }}
      validationSchema={zipCodeValidation}
      validateOnChange={false}
      onSubmit={handlerSubmitUserInfo}>
      {({
        values,
        errors,
        touched,
        handleSubmit,
        setFieldValue,
        handleChange,
        setFieldTouched
      }) => (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <View style={styles.img_container}>
              <Image
                style={styles.img_child}
                source={require('../../assets/create-account-img.png')}
              />
            </View>



            <View>
              {/* State----------- */}

              {/* City------------ */}
              <View>

                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <AuthCustomSelectDropdown
                    data={namesArray}
                    defaultText="Select here"
                    setFieldValue={setFieldValue}
                    FieldValueType={"state"}
                    userdata={userdata}
                    changeColor={changeColor}
                    setChangeColor={setChangeColor}
                    label="State"
                    type="firstDropdown"
                    image={() => (
                      <Image
                        style={{ width: 16, height: 16, resizeMode: 'center' }}
                        source={require('../../assets/bottom-icon.png')}
                      />
                    )}
                  />
                  {
                    console.log("errorsZipcode--- :", errors.zipCode)
                  }
                  <AuthCustomSelectDropdown
                    data={namesCities}
                    defaultText="Select here"
                    setFieldValue={setFieldValue}
                    FieldValueType={"city"}
                    label="City"
                    changeColor={secondChangeColor}
                    setChangeColor={setSecondChangeColor}
                    type="secondDropdown"
                    image={() => (
                      <Image
                        style={{ width: 16, height: 16, resizeMode: 'center' }}
                        source={require('../../assets/bottom-icon.png')}
                      />
                    )}
                  />

                </View>
              </View>

              <View style={{ paddingTop: responsiveWidth(3) }}>
                <CustomInput
                  placeholder="Type here"
                  type="customfield"
                  keyboardType={'decimal-pad'}
                  value={values.zipCode}
                  label={"Zip Code"}
                  error={errors.zipCode}
                  touched={touched.zipCode}
                  Submitted={isSubmitted}
                  width={responsiveWidth(90)}
                  handleChange={handleChange('zipCode')}
                  setFieldTouched={() => setFieldTouched("zipCode")}
                />
              </View>

            </View>

            {/* Next and Back------------ */}

            <View style={{ paddingTop: responsiveWidth(25) }}>

              <CustomButton
                onPress={() => {
                  if (values.city !== '' && values.state !== '' && values.zip !== '') {
                    handleSubmit();
                    setIsSubmitted(true);
                  } else {
                    return null;
                  }
                }}
                backgroundColor={
                  values.city !== '' && values.state !== '' && values.zip !== ''
                    ? '#395E66'
                    : 'rgba(57, 94, 102, 0.5)'
                }
                type="registeruserInfo"
                color="#FFF"
                text="Next"
              />

              <View style={{ paddingVertical: moderateVerticalScale(7) }}>
                <CustomButton
                  onPress={() => navigation.goBack()}
                  backgroundColor="#FFF"
                  type={"backuser"}
                  borderWidth="1"
                  color="#395E66"
                  text="Back"
                />
              </View>

            </View>
          </View>
        </SafeAreaView>
      )
      }
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: SecondaryColor,
    flex: 1,
  },
  text: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: '600',
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

export default RegisterUserInformation;
