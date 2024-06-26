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
import TouchableButton from '../../../components/TouchableButton';
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

export const validationForgetConfirmPassword = Yup.object().shape({
    newPassword: Yup.string()
        .required('New Password is required')
        .min(8, 'Password length should be at least 8 characters'),
    confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .min(8, 'Password length should be at least 8 characters'),
});

const ForgetConfirmPassword = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const { FORGET_BG_IMG } = Img_Paths;
    const { LOGIN } = NavigationsString;
    const [isVisible, setVisible] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const forgetuserToken = useSelector(
        state => state?.authSlice?.forgetAccesstoken,
    );
    const navigation = useNavigation();

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowPasswordConfir = () => {
        setShowPasswordConfirm(!showPasswordConfirm);
    };

    return (
        <Formik
            initialValues={{
                newPassword: '',
                confirmPassword: '',
            }}
            validationSchema={validationForgetConfirmPassword}
            validateOnChange={false}
            onSubmit={async values => {
                const { newPassword, confirmPassword } = values;
                setIsLoading(true);
                try {
                    const response = await reset_password(
                        newPassword,
                        confirmPassword,
                        forgetuserToken,
                    );
                    if (response?.statusCode === 200) {
                        setVisible(true)
                        setIsLoading(false),
                            Toast.show({
                                type: 'success',
                                text1: response?.message,
                            });
                        setTimeout(() => {
                            navigation.navigate(LOGIN);
                        }, 1000);

                    } else if (response?.stack) {
                        Toast.show({
                            type: 'error',
                            text1: response?.message,
                        });
                        setIsLoading(false);
                    }
                } catch (err) {
                    console.log(err);
                } finally {
                    setIsLoading(false);
                }
            }}>

            {({ values, errors, handleChange, handleSubmit, touched, setFieldTouched }) => (

                <View style={styles.container}>
                    <ScrollView style={{}}>

                        <View style={styles.img_container}>
                            <Image style={styles.img_child} source={FORGET_BG_IMG} />
                        </View>

                        {/* Code------------ */}

                        <View>
                            <View>
                                {/*New Password----------- */}

                                <View style={{ width: responsiveWidth(90), marginLeft: 'auto' }}>
                                    <Text
                                        style={{
                                            color: FourthColor,
                                            fontWeight: '600',
                                            fontSize: responsiveFontSize(1.7),
                                        }}>
                                        New Password
                                    </Text>
                                </View>

                                <TextInputField
                                    onChangeText={handleChange('newPassword')}
                                    onPress={toggleShowPassword}
                                    showPassword={showPassword}
                                    setShowPassword={setShowPassword}
                                    value={values.newPassword}
                                    type="password"
                                    placeholderText="Enter here"
                                    setFieldTouched={() => setFieldTouched("password")}
                                />

                                {/* <TextInputField
                                value={values.password}
                                onChangeText={handleChange('password')}
                                onPress={toggleShowPassword}
                                showPassword={showPassword}
                                setShowPassword={setShowPassword}
                                placeholderText="Type here"
                                type="password"
                                onBlur={() => setFieldTouched("password")}
                            /> */}

                                {errors.newPassword && (
                                    <View
                                        style={{
                                            width: responsiveWidth(90),
                                            marginLeft: 'auto',
                                            paddingBottom: responsiveWidth(2),
                                        }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View>
                                                <Svg
                                                    width={20}
                                                    height={20}
                                                    viewBox="0 0 24 24"
                                                    fill="red">
                                                    <Path d="M12 2C6.485 2 2 6.485 2 12s4.485 10 10 10 10-4.485 10-10S17.515 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                                                </Svg>
                                            </View>
                                            <View style={{ paddingHorizontal: moderateScale(5) }}>
                                                <Text
                                                    style={{
                                                        color: 'red',
                                                        fontSize: responsiveFontSize(1.7),
                                                        fontWeight: '600',
                                                    }}>
                                                    {errors.newPassword}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                )}

                                {/* Confirm Password------------ */}

                                <View style={{}}>
                                    <View style={{ width: responsiveWidth(90), marginLeft: 'auto' }}>
                                        <Text
                                            style={{
                                                marginVertical: responsiveWidth(1),
                                                color: FourthColor,
                                                fontWeight: '600',
                                                fontSize: responsiveFontSize(1.7),
                                            }}>
                                            Confirm Password
                                        </Text>
                                    </View>
                                    <TextInputField
                                        onChangeText={handleChange('confirmPassword')}
                                        onPress={toggleShowPasswordConfir}
                                        showPassword={showPasswordConfirm}
                                        type="password"
                                        placeholderText="Enter here"
                                        value={values.confirmPassword}
                                    />
                                </View>

                                {errors.confirmPassword && (
                                    <View
                                        style={{
                                            width: responsiveWidth(90),
                                            marginLeft: 'auto',
                                            paddingBottom: responsiveWidth(2),
                                        }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View>
                                                <Svg
                                                    width={20}
                                                    height={20}
                                                    viewBox="0 0 24 24"
                                                    fill="red">
                                                    <Path d="M12 2C6.485 2 2 6.485 2 12s4.485 10 10 10 10-4.485 10-10S17.515 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                                                </Svg>
                                            </View>
                                            <View style={{ paddingHorizontal: moderateScale(5) }}>
                                                <Text
                                                    style={{
                                                        color: 'red',
                                                        fontSize: responsiveFontSize(1.7),
                                                        fontWeight: '600',
                                                    }}>
                                                    {errors.confirmPassword}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                )}
                            </View>

                            {/* Next------------ */}

                            <View style={{ paddingTop: responsiveWidth(70) }}>
                                <TouchableButton
                                    isLoading={isLoading}
                                    onPress={
                                        values.newPassword !== '' && values.confirmPassword
                                            ? handleSubmit
                                            : null
                                    }
                                    backgroundColor={
                                        values.newPassword !== '' && values.confirmPassword
                                            ? '#395E66'
                                            : 'rgba(57, 94, 102, 0.5)'
                                    }
                                    color="#FFF"
                                    text="Save"
                                />
                            </View>
                        </View>

                        {isVisible && (
                            <ResetPasswordModal
                                setVisible={setVisible}
                                isVisible={isVisible}
                                text="Reset Password Complete!"
                                onPress={() => { }}
                            />
                        )}
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

export default ForgetConfirmPassword;
