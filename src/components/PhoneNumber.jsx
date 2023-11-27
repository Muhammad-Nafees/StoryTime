import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PhoneInput
    from 'react-native-phone-input';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions"
import { FourthColor, TextinputColor } from '../screens/Styles/Style';

const PhoneNumber = ({ value, onchangeState, onPressFlag }) => {
    return (
        <>

            <View style={{ justifyContent: "center", alignItems: "center", marginTop: responsiveWidth(5) }}>
                <PhoneInput
                    value={value}
                    onChangePhoneNumber={(number) => onchangeState(number)}
                    onPressFlag={onPressFlag}
                    style={{ ...styles.phoneInput, }}
                    textStyle={{ color: "#000" }}
                />
            </View>
        </>
    )
}


const styles = StyleSheet.create({

    phoneInput: {
        height: responsiveHeight(6.5),
        width: '80%',
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 12,
        backgroundColor: TextinputColor,
        color: FourthColor
    },
})


export default PhoneNumber


