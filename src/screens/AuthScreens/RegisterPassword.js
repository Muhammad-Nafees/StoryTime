import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Button,
    Alert,
    SafeAreaView,
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
import TextInputField from '../../components/TextInputField';
import CustomButton from '../../components/reusable-components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { moderateVerticalScale, moderateScale } from 'react-native-size-matters';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import UserErrors from '../../components/auth/UserErrors';
import NavigationsString from '../../constants/NavigationsString';
import { registerapi } from '../../../services/api/auth_mdule/auth';
import Toast from 'react-native-toast-message';
import { validationUserPassword } from '../../../validation/validation';
import { Path, Svg } from 'react-native-svg';
import { Img_Paths } from '../../assets/Imagepaths';
import ErrorMessageForm from '../../components/ErrorMessagesForm';
import CustomErrorField from '../../components/auth/CustomErrorField';
import CustomInput from '../../components/auth/CustomInput';
import axios from 'axios';
import { Base_Url } from '../../../services';

const RegisterPassword = ({ route }) => {
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(true);
    const [confirmShowPassword, setConfirmShowPassword] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setVisible] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const dispatch = useDispatch();
    const { LOGIN } = NavigationsString;
    const { BGIMAGE_ACCOUNT_CREATED, CREATE_PASSWORD_IMG } = Img_Paths;
    const { registerData } = useSelector(state => state.authSlice);
    const { registerLocationData } = useSelector(state => state.authSlice);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // [{"countryCode": "AU", "phoneCode": "61", "values": {"email": "cjcucu@gmail.com", "fcmToken": "1234567", "firstName": "Fufu", "lastName": "Xjjcu", "phoneNo": "369362662", "role": "user", "username": "Bdjfj"}}] 

    const { countryCode, phoneCode } = registerData
    const { email, fcmToken, firstName, lastName, phoneNo, role, username } = registerData?.values
    const { city, state, zipCode } = registerLocationData;

    const toggleconfirmshowpassword = () => {
        setConfirmShowPassword(!confirmShowPassword);
    };

    const validate = values => {
        return values.password && values.confirmPassword;
    };

    // registerData,
    // registerLocationData,
    // values,

    const requestData = {
        ...registerData,
        ...registerLocationData,
        ...values,
    };

    const handleRegisterPassword = async (values) => {
        try {
            setIsLoading(true);
            const responseData = await axios.post(Base_Url + register_endpoint, requestData);
            const message = responseData?.message;

            setVisible(true);
            setIsLoading(false);
            Toast.show({
                type: 'success',
                text1: message,
                position: 'top',
                visibilityTime: 2500,
            });
        }

        catch (error) {
            console.log(error?.response?.data, 'ERROR FROM REGISTER!');
            Toast.show({
                type: "error",
                text1: `${error?.response?.data?.message}`,
            });
        }
    };

    return (
        <Formik
            initialValues={{
                password: '',
                confirmPassword: '',
            }}
            validationSchema={validationUserPassword}
            onSubmit={handleRegisterPassword}>
            {({
                values,
                errors,
                handleChange,
                handleSubmit,
                setFieldTouched,
            }) => (
                <>
                    <View style={styles.container}>
                        <ScrollView>
                            <View style={styles.img_container}>
                                <Image style={styles.img_child} source={CREATE_PASSWORD_IMG} />
                            </View>

                            {/* Password------------ */}

                            <CustomInput
                                label={"Password"}
                                value={values.confirmPassword}
                                width={responsiveWidth(90)}
                                handleChange={handleChange('confirmPassword')}
                                onPress={toggleconfirmshowpassword}
                                showPassword={confirmShowPassword}
                                setShowPassword={setConfirmShowPassword}
                                placeholder={"Enter here"}
                                typeStyle="alignStyling"
                                onBlur={() => setFieldTouched('confirmPassword')}
                                type="password"
                            />

                            <View style={{ height: responsiveHeight(3.2) }}>
                                {
                                    <ErrorMessageForm
                                        errorsField={errors.password}
                                        isSubmitted={isSubmitted}
                                    />
                                }
                            </View>

                            {/* <View */}
                            {/* Confirm Password------------ */}

                            <View>
                                <CustomInput
                                    label={"Confirm Password"}
                                    value={values.password}
                                    width={responsiveWidth(90)}
                                    handleChange={handleChange('password')}
                                    onPress={toggleShowPassword}
                                    showPassword={showPassword}
                                    setShowPassword={setShowPassword}
                                    placeholder={"Enter here"}
                                    onBlur={() => setFieldTouched('password')}
                                    type="password"
                                    typeStyle="alignStyling"
                                />
                            </View>

                            {
                                <ErrorMessageForm
                                    errorsField={errors.confirmPassword}
                                    isSubmitted={isSubmitted}
                                />
                            }

                            {/* Next and Back------------ */}

                            <View style={{ paddingTop: responsiveWidth(42.5) }}>
                                <View
                                    style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <CustomButton
                                        backgroundColor={validate(values) ? '#395E66'
                                            : 'rgba(57, 94, 102, 0.4)'}
                                        color={"#FFF"}
                                        validate={validate}
                                        isLoading={isLoading}
                                        onPress={handleSubmit}
                                        values={values}
                                        text={"Next"}
                                        type="registerpassword"
                                    />
                                </View>

                                {/*  */}
                                <View style={{ marginVertical: 7 }}>
                                    <CustomButton
                                        onPress={() => navigation.goBack()}
                                        type={'backRegisterpassword'}
                                        backgroundColor="#FFF"
                                        borderWidth="1"
                                        color="#395E66"
                                        text="Back"
                                    />
                                </View>
                            </View>


                            {isVisible && (
                                <UserErrors
                                    setVisible={setVisible}
                                    text1={'Account Created'}
                                    bgImage={BGIMAGE_ACCOUNT_CREATED}
                                    isVisible={isVisible}
                                    text="Login"
                                    onPress={() => navigation.navigate(LOGIN)}
                                />
                            )}
                        </ScrollView>
                    </View>
                    <Toast />
                </>
            )}
        </Formik>
    );
};



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

export default RegisterPassword;
