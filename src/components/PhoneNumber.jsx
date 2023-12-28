import React, { useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PhoneInput
    from 'react-native-phone-number-input';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions"
import { FourthColor, TextinputColor } from '../screens/Styles/Style';
import { verticalScale } from "react-native-size-matters"



const PhoneNumber = ({ value, onchangeState, onPressFlag, setCountryCode, setFormatText, formatText, countrycode, setPhoneCode, setShowError, phoneInput }) => {

    return (
        <>
            <View style={{ justifyContent: "center", alignItems: "center", paddingTop: responsiveWidth(5) }}>
                <PhoneInput
                    ref={phoneInput}
                    defaultValue={value}
                    onChangeText={(number) => onchangeState(number)}
                    onChangeFormattedText={(val) => setFormatText(val)}
                    onPressFlag={onPressFlag}
                    withShadow
                    autoFocus
                    defaultCode={"AU"}
                    layout="first"
                    placeholder=" "
                    containerStyle={styles.phoneContainer}
                    textContainerStyle={styles.phoneTextContainer}
                    textInputStyle={styles.phoneTextInput}
                    onChangeCountry={val => {
                        setCountryCode(val?.cca2),
                            setPhoneCode(val.callingCode)
                    }
                    }
                    textStyle={{ color: "#000" }}
                />
            </View>
        </>
    )
};



const styles = StyleSheet.create({

    phoneInput: {
        width: responsiveWidth(80),
        borderRadius: 12,
        backgroundColor: TextinputColor,
        color: FourthColor,
    },
    phoneTextInput: {
        padding: 0,
        fontSize: responsiveFontSize(2),
        color: '#000',
    },
    phoneTextContainer: {
        backgroundColor: '#F3F3F3',
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
    },
    phoneContainer: {
        height: verticalScale(50),
        width: responsiveWidth(80),
        backgroundColor: 'rgba(232, 232, 232, 1)',
        borderRadius: 12,
    },
})

export default PhoneNumber;
