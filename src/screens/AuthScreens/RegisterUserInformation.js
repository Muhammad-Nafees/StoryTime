import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {
  FourthColor,
  SecondaryColor,
  TextinputColor,
} from '../Styles/Style';
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import TextInputField from '../../components/TextInputField';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import NavigationsString from '../../constants/NavigationsString';
import { moderateVerticalScale, moderateScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { register, registerLocation, registeruser_city } from '../../../store/slices/authSlice';
import { userinfocity } from '../../../store/slices/authStatesandCity/userinfoCity';
import { Path, Svg } from 'react-native-svg';
import { Formik } from 'formik';
import { zipCodeValidation } from '../../../validation/validation';
import SelectDropdown from 'react-native-select-dropdown';
import CustomSelectDropDown from '../../components/profile/SelectDropDown';
import ErrorMessageForm from '../../components/ErrorMessagesForm';
import AuthCustomSelectDropdown from '../../components/auth/AuthSelectDropDown';
import CustomInput from '../../components/auth/CustomInput';

const RegisterUserInformation = ({ }) => {
  const [changeColor, setChangeColor] = useState("#AAA")
  const [secondChangeColor, setSecondChangeColor] = useState("#AAA")
  const navigation = useNavigation();
  const { userdata } = useSelector(state => state?.userinfostate);
  const { userdatacity } = useSelector(state => state?.userinfocity);
  const namesArray = userdata?.data?.map(item => item.name);
  const namesCities = userdatacity?.data?.map(item => item?.name);
  const SCREENWIDTH = Dimensions.get('window').width;
  const SCREENHEIGHT = Dimensions.get('window').height;
  const dispatch = useDispatch();


  const units = {
    vw: SCREENWIDTH.width / 100,
    vh: SCREENHEIGHT.height / 100,
  };

  const handlerSubmitUserInfo = async (values) => {
    dispatch(
      registerLocation({ state: values?.state, city: values?.city, zipCode: values?.zipCode }),
    );
    navigation.navigate("RegisterPassword");
  }



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
        error,
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

              <View>
                <CustomInput
                  placeholder="Type here"
                  type="customfield"
                  keyboardType={'decimal-pad'}
                  value={values.zipCode}
                  label={"Zip Code"}
                  error={errors.zipCode}
                  width={responsiveWidth(90)}
                  handleChange={handleChange('zipCode')}
                  setFieldTouched={() => setFieldTouched("zipcode")}
                />

              </View>

              {touched.zipCode && errors.zipCode && (
                <ErrorMessageForm
                  isSubmitted={touched.zipCode}
                  errorsField={errors.zipCode}
                />
              )}

            </View>

            {/* Next and Back------------ */}

            <View style={{ marginTop: responsiveWidth(30) }}>

              <CustomButton
                onPress={
                  values.city !== '' && values.state !== '' && values.zip !== ''
                    ? handleSubmit
                    : null
                }
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

export default RegisterUserInformation;

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
