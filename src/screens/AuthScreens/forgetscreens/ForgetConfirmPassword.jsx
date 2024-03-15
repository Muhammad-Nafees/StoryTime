import { useRef } from 'react';
import React, { useState } from 'react';
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
} from '../../Styles/Style';
import {
    responsiveFontSize,
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';
import CustomButton from '../../../components/reusable-components/CustomButton/CustomButton';
import TextInputField from '../../../components/TextInputField';
import { moderateVerticalScale, moderateScale } from 'react-native-size-matters';
import { Img_Paths } from '../../../assets/Imagepaths';
import { reset_password } from '../../../../services/api/auth_mdule/auth';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { Formik } from 'formik';
import { Path, Svg } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import NavigationsString from '../../../constants/NavigationsString';
import * as Yup from 'yup';
import ResetPasswordModal from '../../../components/forget-screens-modal/ResetpasswordModal';
import ErrorMessageForm from '../../../components/ErrorMessagesForm';
import { validationForgetConfirmPassword } from '../../../../validation/validation';
import CustomInput from '../../../components/auth/CustomInput';





const ForgetConfirmPassword = () => {

    const [showPassword, setShowPassword] = useState(true);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(true);
    const { CREATE_NEW_PASSWORD_IMG } = Img_Paths;
    const { LOGIN } = NavigationsString;
    const [isVisible, setVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigation = useNavigation();

    const handleConfirmForget = async (values) => {
        setIsSubmitted(false)
        const { newPassword, confirmPassword } = values;
        setIsLoading(true);
        try {
            const response = await reset_password(newPassword, confirmPassword, forgetuserToken);
            console.log(response, "RESPONSE FROM FORGET_CONFIRM_PWD");
            setVisible(true);
            setIsLoading(false)

            setTimeout(() => {
                navigation.navigate(LOGIN);
            }, 1000);
        }
        catch (error) {
            setIsLoading(false);
            console.log(error, "ERROR FROM FORGET_CONFIRM_PWD");
            if (error?.response?.data) {
                Toast.show({
                    type: "error",
                    text1: error?.response?.data?.message
                })
            }
        }
    }


    const forgetuserToken = useSelector(
        state => state?.authSlice?.forgetAccesstoken,
    );

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowPasswordConfirm = () => {
        setShowPasswordConfirm(!showPasswordConfirm);
    };

    const validate = (values) => {
        return (
            values.newPassword &&
            values.confirmPassword
        )
    };

    return (
        <Formik
            initialValues={{
                newPassword: '',
                confirmPassword: '',
            }}
            validationSchema={validationForgetConfirmPassword}
            validateOnChange={false}
            onSubmit={handleConfirmForget}>

            {({ values, errors, handleChange, handleSubmit, touched, setFieldTouched }) => (

                <View style={styles.container}>
                    <ScrollView style={{}}>

                        <View style={styles.img_container}>
                            <Image style={styles.img_child} source={CREATE_NEW_PASSWORD_IMG} />
                        </View>

                        {/* Code------------ */}

                        <CustomInput
                            label={"New Password"}
                            handleChange={handleChange('newPassword')}
                            onPress={toggleShowPassword}
                            showPassword={showPassword}
                            setShowPassword={setShowPassword}
                            value={values.newPassword}
                            touched={touched.newPassword}
                            error={errors.newPassword}
                            type="password"
                            placeholder="Enter here"
                            setFieldTouched={() => setFieldTouched("password")}
                            Submitted={isSubmitted}
                        />

                        {/* <View */}
                        {/* Confirm Password------------ */}

                        <CustomInput
                            label={"Confirm Password"}
                            handleChange={handleChange('confirmPassword')}
                            onPress={toggleShowPasswordConfirm}
                            showPassword={showPasswordConfirm}
                            error={errors.confirmPassword}
                            touched={touched.confirmPassword}
                            type="password"
                            placeholder="Enter here"
                            value={values.confirmPassword}
                            setFieldTouched={() => setFieldTouched("confirmPassword")}
                            Submitted={isSubmitted}
                        />

                        {/* Next and Back------------ */}

                        <View style={{ paddingTop: responsiveWidth(60) }}>

                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity
                                    disabled={validate(values) ? false : true}
                                    onPress={() => {
                                        setIsSubmitted(true)
                                        handleSubmit();
                                    }
                                    }
                                    style={{
                                        width: responsiveWidth(80),
                                        backgroundColor: validate(values) ? TextColorGreen : "rgba(57, 94, 102, 0.3)",
                                        borderRadius: 10,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: responsiveHeight(6.6),
                                    }}
                                >
                                    {
                                        !isLoading ? (
                                            <Text
                                                style={{
                                                    fontSize: responsiveFontSize(1.9),
                                                    fontWeight: '600',
                                                    letterSpacing: 0.28,
                                                    color: "#FFF",
                                                }}>
                                                Create
                                            </Text>
                                        ) :
                                            <ActivityIndicator color={'#FFF'} />
                                    }
                                </TouchableOpacity>
                            </View>

                            {/*  */}

                        </View>


                        {/* -------------------------------------------------------------------------- */}
                        {/* <View>
                            <View>
                                {/*New Password----------- */}

                        {
                            isVisible && (
                                <ResetPasswordModal
                                    setVisible={setVisible}
                                    isVisible={isVisible}
                                    text="Reset Password Complete!"
                                    onPress={() => { }}
                                />
                            )
                        }
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
        paddingTop: responsiveWidth(10),
        justifyContent: 'center',
        alignItems: 'center',
    },
    img_child: {
        width: responsiveWidth(50),
        height: responsiveHeight(20),
        resizeMode: 'center',
    },
});

export default ForgetConfirmPassword;
