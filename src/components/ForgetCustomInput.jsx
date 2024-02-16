import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Field } from 'formik';
import PhoneInput from 'react-native-phone-number-input';
import Icon from 'react-native-vector-icons/Ionicons';
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters';
import { responsiveFontSize, responsiveScreenFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { FourthColor, TextColorGreen, TextinputColor } from '../screens/Styles/Style';
import reset_email, { username_api } from '../../services/api/auth_mdule/auth';
import _ from 'lodash';
import TouchableButton from './TouchableButton';
import NavigationsString from '../constants/NavigationsString';
import { useNavigation } from '@react-navigation/native';
import { Path, Svg } from 'react-native-svg';
import { Inter_Regular } from '../constants/GlobalFonts';

const ForgetCustomInput = ({
    handleChange,
    error,
    value,
    touched,
    setFieldValue,
    phoneInput,
    isError,
    setIsError,
    setPhoneCode,
    setFieldError,
    setPhoneError,
    disabled = false,
    handleSubmit,
    isLoading,
    isValid,
    dirty
}) => {

    const [responses, setResponse] = useState("");
    const [textphone, setPhone] = useState("");
    const { OTP_FORGET, FORGET_EMAIL } = NavigationsString;
    const navigation = useNavigation();

    const debouncedApiCall = useRef(_.debounce(async (phoneNumber, setFieldError) => {

        try {

            const response = await reset_email({ phone: phoneNumber });
            setPhone(phoneNumber)
            setResponse(response?.data?.code)

            if (response?.statusCode !== 200) {
                setPhoneError("Invalid Information, Record Not Found!")
                setFieldError('phone', `Invalid Information, Record Not Found!`);
            }
        } catch (error) {
            console.log(error)
        }
    }, 300)
    ).current;


    const handleCountryChange = () => {
        phoneInput.current?.setState({ number: '' });
        setFieldValue('phone', '');
        setIsError('Phone number is required!');
    };

    useEffect(() => {
        if (touched && value === '') {
            setIsError('Phone number is required!');
        }
    }, [touched, value]);

    return (
        <View style={{ paddingVertical: 10 }}>
            <Text
                style={{
                    color: FourthColor,
                    fontWeight: '600',
                    marginBottom: verticalScale(7),
                }}>
                Phone Number
            </Text>
            <Field name="phone">
                {() => (
                    <PhoneInput
                        ref={phoneInput}
                        disabled={disabled}
                        placeholder=" "
                        defaultCode={'AU'}
                        codeTextStyle={{ color: "rgba(170, 170, 170, 1)", fontFamily: Inter_Regular.Inter_Regular, fontWeight: "400", fontSize: responsiveFontSize(1.8) }}
                        onChangeFormattedText={phone => {
                            handleChange(phone)
                            setFieldError('phone', '');
                            setIsError('');
                            debouncedApiCall(phone, setFieldError);
                            console.log("--==", phone)
                            const checkValid = phoneInput.current?.isValidNumber(phone);
                            if (!checkValid) {
                                setFieldError('phone', 'Invalid phone number');
                                setIsError('Invalid phone number');
                            }
                        }
                        }
                        containerStyle={styles.phoneContainer}
                        renderDropdownImage={
                            <Svg width="19" height="10" viewBox="0 0 19 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M17.3625 1.21094L10.8425 7.73094C10.0725 8.50094 8.81246 8.50094 8.04246 7.73094L1.52246 1.21094" stroke="#696969" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            </Svg>
                        }
                        textContainerStyle={styles.phoneTextContainer}
                        textInputStyle={styles.phoneTextInput}
                        flagButtonStyle={{ width: 87 }}
                        value={value}
                        onChangeText={phoneNumber => {
                        }}
                        onChangeCountry={country => {
                            setPhoneCode(country.callingCode);
                            console.log(country.callingCode, 'phoneCode');
                            handleCountryChange();
                        }}
                    />
                )}
            </Field>

            {
                !isError && !error ? null :
                    <>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 2,
                                marginTop: 2,
                            }}>
                            <Icon name="alert-circle" size={22} color="red" />
                            <Text style={{ color: 'red' }}>{error ? error : isError}</Text>
                        </View>
                        <View style={{ height: 0 }} />
                    </>
            }

            <View style={{ paddingTop: responsiveWidth(80) }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate(FORGET_EMAIL)}>
                    <Text
                        style={{
                            color: TextColorGreen,
                            fontWeight: '600',
                            textAlign: 'center',
                            paddingVertical: moderateVerticalScale(22),
                        }}>
                        Use email address instead
                    </Text>
                </TouchableOpacity>
                <TouchableButton
                    isLoading={isLoading}
                    isValid={isValid}
                    dirty={dirty}
                    type="register"
                    onPress={() => {
                        value !== '' ? handleSubmit : null;
                        const checkValid = phoneInput.current?.isValidNumber(textphone);
                        if (!error && !isError && checkValid) {
                            navigation.navigate(OTP_FORGET, {
                                code: responses,
                                phone: textphone
                            })
                        }
                    }
                    }
                    backgroundColor={
                        value !== '' ? '#395E66' : 'rgba(57, 94, 102, 0.5)'
                    }
                    color="#FFF"
                    text="Next"
                />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    phoneInput: {
        width: responsiveWidth(80),
        borderRadius: 12,
        backgroundColor: TextinputColor,
        color: FourthColor,
        height: 40,
    },
    phoneTextInput: {
        padding: 0,
        fontSize: responsiveFontSize(2),
        color: '#000',
        marginTop: verticalScale(1.5),
    },
    phoneTextContainer: {
        backgroundColor: '#F3F3F3',
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
    },
    phoneContainer: {
        width: responsiveWidth(80),
        backgroundColor: 'rgba(232, 232, 232, 1)',
        borderRadius: 12,
    },
});

export default ForgetCustomInput;


// import React, { useEffect, useRef, useState } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { Field } from 'formik';
// import PhoneInput from 'react-native-phone-number-input';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { moderateScale, verticalScale } from 'react-native-size-matters';
// import { responsiveFontSize, responsiveScreenFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
// import { FourthColor, TextinputColor } from '../screens/Styles/Style';
// import { username_api } from '../../services/api/auth_mdule/auth';
// import _ from 'lodash';

// const ForgetCustomInput = ({
//     handleChange,
//     error,
//     value,
//     touched,
//     setFieldValue,
//     phoneInput,
//     isError,
//     setIsError,
//     setPhoneCode,
//     setFieldError,
//     countryCode,
//     placeholder,
//     setPhoneError,
//     disabled = false,
//     extraStyles,
//     setFormatText,
//     phoneError
// }) => {

//     const handleCountryChange = () => {
//         phoneInput.current?.setState({ number: '' });
//         setFieldValue('phoneNo', '');
//         setIsError('Phone number is required!');
//     };

//     const debouncedApiCall = useRef(_.debounce(async (phone) => {

//         try {
//             const response = await reset_email({ phone: text });
//             console.log('responsephonenu', response?.data?.code);
//             if (response?.statusCode === 200) {
//                 Toast.show({
//                     type: 'success',
//                     text1: response?.message,
//                 });

//                 // setPhoneError()
//                 setIsLoading(false);
//             } else if (response?.stack) {
//                 setPhoneError(response?.message)
//                 Toast.show({
//                     type: 'error',
//                     text1: response?.message,
//                 });
//                 setIsLoading(false);
//             }
//         } catch (err) {
//             console.log(err);
//         }
//     }, 1000)
//     ).current;

//     // useEffect(() => {
//     //     if (touched && value === '') {
//     //         setPhoneError('Phone number is required!');
//     //     }
//     // }, [touched, value]);

//     return (
//         <View style={{ paddingVertical: 10 }}>
//             <Text
//                 style={{
//                     color: FourthColor,
//                     fontWeight: '600',
//                     marginBottom: verticalScale(7),
//                 }}>
//                 Phone Number
//             </Text>
//             <Field name="phoneNo">
//                 {() => (
//                     <PhoneInput
//                         ref={phoneInput}
//                         disabled={disabled}
//                         placeholder=" "
//                         defaultCode={'AU'}
//                         onChangeFormattedText={(formatNo) => {
//                             setFormatText(formatNo)
//                             handleChange(formatNo);
//                             setFieldError('phoneNo', '');
//                             setIsError('');
//                             const checkValid = phoneInput.current?.isValidNumber(formatNo);
//                             if (!checkValid) {
//                                 setFieldError('phoneNo', 'Invalid phone number');
//                                 setIsError('Invalid phone number');
//                             }
//                         }
//                         }

//                         containerStyle={styles.phoneContainer}
//                         textContainerStyle={styles.phoneTextContainer}
//                         textInputStyle={styles.phoneTextInput}
//                         flagButtonStyle={{ width: 87 }}
//                         value={value}
//                         onChangeText={phoneNumber => {
//                         }}
//                         onChangeCountry={country => {
//                             console.log(country.callingCode, 'phoneCode');
//                             handleCountryChange();
//                         }}
//                     />
//                 )}
//             </Field>

//             <>
//                 {/* <View
//                     style={{
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         gap: 2,
//                         marginTop: 2,
//                     }}>
//                     <Icon name="alert-circle" size={22} color="red" />
//                     <Text style={{ color: 'red' }}>{phoneError}</Text>
//                 </View>
//                 <View style={{ height: 0 }} /> */}
//             </>

//         </View>
//     );
// };


// const styles = StyleSheet.create({
//     phoneInput: {
//         width: responsiveWidth(80),
//         borderRadius: 12,
//         backgroundColor: TextinputColor,
//         color: FourthColor,
//         height: 40,
//     },
//     phoneTextInput: {
//         padding: 0,
//         fontSize: responsiveFontSize(2),
//         color: '#000',
//         marginTop: verticalScale(1.5),
//     },
//     phoneTextContainer: {
//         backgroundColor: '#F3F3F3',
//         borderTopRightRadius: 12,
//         borderBottomRightRadius: 12,
//     },
//     phoneContainer: {
//         width: responsiveWidth(80),
//         backgroundColor: 'rgba(232, 232, 232, 1)',
//         borderRadius: 12,
//     },
// });

// export default ForgetCustomInput;

// setTimeout(() => {
//     navigation.navigate(OTP_FORGET, {
//         code: response?.data?.code,
//         phone: phone,
//         type: 'phone',
//     });
// }, 1000);
