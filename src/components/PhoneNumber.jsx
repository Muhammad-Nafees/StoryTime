import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PhoneInput
    from 'react-native-phone-number-input';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions"
import { FourthColor, TextinputColor } from '../screens/Styles/Style';
import { moderateVerticalScale, moderateScale } from "react-native-size-matters"


const PhoneNumber = ({ value, onchangeState, onPressFlag, setCountryCode }) => {
    return (
        <>
            <View style={{ justifyContent: "center", alignItems: "center", paddingTop: responsiveWidth(5) }}>

                <PhoneInput
                    defaultValue={value}
                    onChangeText={(number) => onchangeState(number)}
                    onPressFlag={onPressFlag}
                    withShadow
                    autoFocus
                    defaultCode="PK"
                    textInputStyle={{ color: "#000", }}
                    containerStyle={{
                        // height: responsiveHeight(6.5),
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
