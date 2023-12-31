import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Field } from 'formik';
import PhoneInput from 'react-native-phone-number-input';
import Icon from 'react-native-vector-icons/Ionicons';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { responsiveFontSize, responsiveScreenFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { FourthColor, TextinputColor } from '../screens/Styles/Style';
import reset_email, { username_api } from '../../services/api/auth_mdule/auth';
import _ from 'lodash';

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
    countryCode,
    placeholder,
    setPhoneError,
    disabled = false,
    extraStyles,
    setFormatText
}) => {

    console.log("error", error)
    console.log("isError", isError)
    const debouncedApiCall = useRef(_.debounce(async (phoneNumber, setFieldError) => {
        const code = phoneInput?.current?.state?.code;
        const response = await reset_email({ phone: phoneNumber });
        if (response?.statusCode !== 200) {
            setPhoneError("Invalid Information, Record Not Found!")
            setFieldError('phone', `Invalid Information, Record Not Found!`);
        }
    }, 1000)
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
