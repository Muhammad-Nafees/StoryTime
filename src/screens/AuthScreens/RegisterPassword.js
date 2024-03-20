import React, { useState } from 'react';
import {
    View,
    Image,
    StyleSheet,
    ScrollView,
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
import { moderateVerticalScale } from 'react-native-size-matters';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import UserErrors from '../../components/auth/UserErrors';
import { registerapi } from '../../../services/api/auth_mdule/auth';
import Toast from 'react-native-toast-message';
import { validationUserPassword } from '../../../validation/validation';
import { Img_Paths } from '../../assets/Imagepaths';
import CustomInput from '../../components/auth/CustomInput';

const RegisterPassword = () => {
    // states
    const [showPassword, setShowPassword] = useState(true);
    const [confirmShowPassword, setConfirmShowPassword] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setVisible] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    // images
    const { BGIMAGE_ACCOUNT_CREATED, CREATE_PASSWORD_IMG } = Img_Paths;
    // redux state
    const { registerData } = useSelector(state => state.authSlice);
    // navigation
    const navigation = useNavigation();

    // api calling
    const handleRegisterPassword = async (values) => {
        setIsSubmitted(false);
        setIsLoading(true);
        try {
            console.log("BEFORE api CALL ")
            const responseData = await registerapi(
                registerData,
                values,
            );
            setIsLoading(false);
            console.log("AFTER api CALL ");
            setVisible(true);
        }
        catch (error) {
            console.log(error?.response, 'ERROR FROM REGISTER PASSWORD!');
            if (error?.response?.data) {
                setIsLoading(false);
                Toast.show({
                    type: "error",
                    text1: `${error?.response?.data?.message}`,
                });
            }
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleconfirmshowpassword = () => {
        setConfirmShowPassword(!confirmShowPassword);
    };

    const validate = values => {
        return values.password && values.confirmPassword;
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
                touched
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
                                value={values.password}
                                width={responsiveWidth(90)}
                                handleChange={handleChange('password')}
                                onPress={toggleShowPassword}
                                showPassword={showPassword}
                                setShowPassword={setShowPassword}
                                error={errors.password}
                                touched={touched.password}
                                placeholder={"Enter here"}
                                typeStyle="alignStyling"
                                onBlur={() => setFieldTouched('password')}
                                type="password"
                                Submitted={isSubmitted}
                            />

                            {/* Confirm Password------------ */}

                            <CustomInput
                                label={"Confirm Password"}
                                value={values.confirmPassword}
                                width={responsiveWidth(90)}
                                handleChange={handleChange('confirmPassword')}
                                onPress={toggleconfirmshowpassword}
                                showPassword={confirmShowPassword}
                                setShowPassword={setConfirmShowPassword}
                                error={errors.confirmPassword}
                                placeholder={"Enter here"}
                                touched={touched.confirmPassword}
                                onBlur={() => setFieldTouched('confirmPassword')}
                                type="password"
                                typeStyle="alignStyling"
                                Submitted={isSubmitted}
                            />

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
                                        onPress={() => {
                                            setIsSubmitted(true);
                                            handleSubmit();
                                        }
                                        }
                                        values={values}
                                        text={"Save"}
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
                                    onPress={() => navigation.navigate("Login")}
                                />
                            )}
                        </ScrollView>
                    </View>
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
