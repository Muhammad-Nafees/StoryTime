import React, { useState } from 'react'
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native'
import { FourthColor, PrimaryColor, SecondaryColor, TextColorGreen, TextinputColor, ThirdColor } from '../../Styles/Style';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions"

import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import TextInputField from '../../../components/TextInputField';
import TouchableButton from '../../../components/TouchableButton';
import PhoneNumber from '../../../components/PhoneNumber';



const ForgetPhoneNumber = () => {

    const navigation = useNavigation()
    const [phoneNumber, setPhoneNumber] = useState('');

    const toggleCountryPicker = () => {
        setCountryPickerVisible(!countryPickerVisible);
    };

    return (

        <View style={styles.container}>
            <View style={styles.img_container}>
                <Image style={styles.img_child} source={require("../../../assets/forget-bg-img.png")} />
            </View>

            {/* Password------------ */}

            <View>
                <View>
                    <View style={{ width: "90%", marginLeft: "auto" }}>
                        <Text style={{ color: FourthColor, fontWeight: "600" }}>Email Address</Text>
                    </View>
                    <PhoneNumber value={phoneNumber} onPressFlag={toggleCountryPicker} onchangeState={setPhoneNumber} />
                    {/* <TextInputField placeholderText="Type here" /> */}

                </View>

                {/* Confirm Password------------ */}

                {/* Next and Back------------ */}

                <View style={{ marginTop: responsiveWidth(80) }}>
                    <Text style={{ color: TextColorGreen, fontWeight: "600", textAlign: "center", marginVertical: 20 }}>Use email address instead</Text>
                    <TouchableButton onPress={() => navigation.navigate("OtpForget")} backgroundColor="#395E66" color="#FFF" text="Next" />
                </View>

            </View>

        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: SecondaryColor
    },
    text: {
        fontSize: responsiveFontSize(1.8),
        fontWeight: "400"
    },
    img_container: {
        marginVertical: 22,
        justifyContent: "center",
        alignItems: "center"
    },
    img_child: {
        width: responsiveWidth(50),
        height: responsiveHeight(20),
        resizeMode: "center"
    },
    text_container: {
        marginTop: 20,
        flexDirection: "row",
        flexWrap: "wrap",
        width: "90%",
        justifyContent: "center",
        alignItems: "center"
    },

})


export default ForgetPhoneNumber;


