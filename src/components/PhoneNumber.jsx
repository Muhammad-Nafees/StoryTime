import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PhoneInput
    from 'react-native-phone-number-input';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions"
import { FourthColor, TextinputColor } from '../screens/Styles/Style';
import { moderateVerticalScale, moderateScale } from "react-native-size-matters"


const PhoneNumber = ({ value, onchangeState, onPressFlag, setCountryCode, setFormatText, formatText }) => {

    const getCode = PhoneInput.current?.getCountryCode()
    console.log("getcode", getCode)

    return (
        <>
            <View style={{ justifyContent: "center", alignItems: "center", paddingTop: responsiveWidth(5) }}>

                <PhoneInput
                    ref={PhoneInput}
                    defaultValue={value}
                    onChangeText={(number) => onchangeState(number)}
                    onChangeFormattedText={(val) => setFormatText(val)}
                    onPressFlag={onPressFlag}
                    withShadow
                    autoFocus
                    defaultCode="AU"
                    textInputStyle={{ color: "#000", }}
                    containerStyle={{
                        width: responsiveWidth(80),
                        borderRadius: 12,
                        color: FourthColor,
                        backgroundColor: '#E8E8E8'
                    }}
                    onChangeCountry={(val) => setCountryCode(val)}
                    textContainerStyle={{}}
                    textStyle={{ color: "#000" }}
                />
            </View>
        </>
    )
};

const styles = StyleSheet.create({

    phoneInput: {
        // height: responsiveHeight(4),
        width: responsiveWidth(80),
        // paddingHorizontal: moderateVerticalScale(20),
        borderRadius: 12,
        backgroundColor: TextinputColor,
        color: FourthColor
    },
})

export default PhoneNumber;



// import React, { useEffect, useRef, useState } from 'react';
// import { Dimensions, StyleSheet, Text, View } from 'react-native';
// import {
//     horizontalScale,
//     moderateScale,
//     verticalScale,
// } from '../../../utils/metrics';
// import PhoneInput from 'react-native-phone-number-input';
// import { redColor, secondaryTextColor } from '../../../utils/colors';
// import ChevronBottomIconTwo from '../../../../assets/icons/ChevronBottomIconTwo';
// import CustomError from '../CustomError';

// interface Props {
//     label: string;
//     placeholder: string;
//     value: string;
//     error: string;
//     touched: boolean;
//     phoneInput: any;
//     setFieldValue: any;
//     initialTouched: boolean;
//     setPhoneCode?: any;
//     countryCode?: any;
//     handleChange: () => void;
// }
// const { width, height } = Dimensions.get('screen');

// const CustomPhoneInput = ({
//     label,
//     placeholder,
//     value,
//     error,
//     touched,
//     phoneInput,
//     countryCode,
//     setFieldValue,
//     setPhoneCode,
//     handleChange,
// }: Props) => {
//     const isError = error && ((touched && !value) || (error && value));
//     const [isValidNumber, setIsValidNumber] = useState < string > ('');

//     return (
//         <View
//             style={{
//                 gap: 8,
//             }}>
//             <Text
//                 style={{
//                     color: secondaryTextColor,
//                     fontFamily: 'SpaceGrotesk-Medium',
//                     fontSize: width * 0.038,
//                 }}>
//                 {label}
//             </Text>
//             <PhoneInput
//                 ref={phoneInput}
//                 placeholder={placeholder}
//                 defaultCode={countryCode === undefined ? 'US' : countryCode}
//                 textInputStyle={styles.input}
//                 textInputProps={{ placeholderTextColor: 'rgba(22, 26, 29, 0.3)' }}
//                 codeTextStyle={styles.codeText}
//                 textContainerStyle={{
//                     backgroundColor: 'transparent',
//                 }}
//                 containerStyle={[
//                     styles.container,
//                     { borderBottomColor: isError ? redColor : '#EDEDED' },
//                 ]}
//                 flagButtonStyle={styles.flagButton}
//                 renderDropdownImage={
//                     <View style={styles.iconContainer}>
//                         <ChevronBottomIconTwo />
//                         <View
//                             style={[
//                                 styles.line,
//                                 {
//                                     backgroundColor:
//                                         value.length > 0
//                                             ? 'rgba(22, 26, 29, 0.9)'
//                                             : 'rgba(22, 26, 29, 0.3)',
//                                 },
//                             ]}
//                         />
//                     </View>
//                 }
//                 value={value}
//                 onChangeText={phoneNumber => {
//                     const checkValid = phoneInput.current?.isValidNumber(phoneNumber);
//                     if (checkValid) {
//                         setIsValidNumber('');
//                     } else {
//                         setIsValidNumber('Invalid Number');
//                     }
//                     setFieldValue('phone', phoneNumber);
//                     // setFieldError('phone', '');
//                     // setIsError('');
//                 }}
//                 onChangeCountry={country => {
//                     setPhoneCode(country.callingCode as any);
//                     phoneInput.current?.setState({ number: '' });
//                     setFieldValue('phone', '');
//                 }}
//             />

//             {/* {isError || isValidNumber !== '' ? (
//         <CustomError error={(error as string) || isValidNumber} />
//       ) : (
//         <View style={{height: 24}} />
//       )} */}
//         </View>
//     );
// };

// export default CustomPhoneInput;

// const styles = StyleSheet.create({
//     container: {
//         height: 45,
//         width: '100%',
//         borderBottomWidth: 1,
//     },
//     input: {
//         // height: 40,
//         width: '40%',
//         padding: 0,
//         margin: 0,
//         color: 'rgba(22, 26, 29, 0.9)',
//         fontFamily: 'SpaceGrotesk-Medium',
//         fontSize: 13,
//     },
//     codeText: {
//         fontSize: 13,
//         marginTop: -verticalScale(5.8),
//         marginLeft: -horizontalScale(9),
//         marginRight: -horizontalScale(-3),
//         fontFamily: 'SpaceGrotesk-Medium',
//         color: 'rgba(22, 26, 29, 0.9)',
//     },
//     flagButton: {
//         width: horizontalScale(75),
//         marginRight: horizontalScale(-5),
//     },
//     iconContainer: {
//         marginLeft: -6,
//         flexDirection: 'row',
//         marginRight: 10,
//         alignItems: 'center',
//         gap: 6,
//     },
//     line: { width: 1, height: 20 },
// });
