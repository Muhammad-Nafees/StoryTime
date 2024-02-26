import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
} from '../../Styles/Style';
import {
    responsiveFontSize,
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import TouchableButton from '../../../components/TouchableButton';
import PhoneNumber from '../../../components/PhoneNumber';
import NavigationsString from '../../../constants/NavigationsString';
import { moderateVerticalScale, moderateScale } from 'react-native-size-matters';
import { Img_Paths } from '../../../assets/Imagepaths';
import reset_email from '../../../../services/api/auth_mdule/auth';
import Toast from 'react-native-toast-message';
import { Path, Svg } from 'react-native-svg';
import { Formik } from 'formik';
import CustomPhoneInput from '../../../components/CustomPhoneInput';
import ForgetCustomInput from '../../../components/ForgetCustomInput';

const ForgetPhoneNumber = () => {

    const navigation = useNavigation();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { OTP_FORGET, FORGET_EMAIL } = NavigationsString;
    const [formatText, setFormatText] = useState('');
    const [phoneCode, setPhoneCode] = useState('');
    const [isError, setIsError] = useState('')
    const [phoneError, setPhoneError] = useState('');
    const { FORGET_BG_IMG } = Img_Paths;
    const phoneInput = useRef()
    const toggleCountryPicker = () => {
        setCountryPickerVisible(!countryPickerVisible);
    };


    return (
        <Formik
            initialValues={{ phone: '' }}
            onSubmit={async values => {
            }}>
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

                <View style={styles.container}>
                    <ScrollView>

                        <View style={styles.img_container}>
                            <Image style={styles.img_child} source={FORGET_BG_IMG} />
                        </View>

                        {/* Password------------ */}

                        <View>
                            <View style={{ justifyContent: "center", alignItems: "center" }}>
                                <ForgetCustomInput
                                    value={values.phone}
                                    error={errors.phone}
                                    touched={touched.phone}
                                    handleChange={handleChange('phone')}
                                    setFieldValue={setFieldValue}
                                    phoneInput={phoneInput}
                                    setIsError={setIsError}
                                    setFieldError={setFieldError}
                                    setFormatText={setFormatText}
                                    isError={isError}
                                    setPhoneCode={setPhoneCode}
                                    setPhoneError={setPhoneError}
                                    isLoading={isLoading}
                                    handleSubmit={handleSubmit}

                                />
                            </View>
                            {/* <CustomPhoneInput
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
                /> */}
                            {/* Confirm Password------------ */}

                            {/* Next and Back------------ */}

                        </View>
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
        resizeMode: 'center',
    },
});

export default ForgetPhoneNumber;
