import React, { useState } from 'react'
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native'
import { FourthColor, PrimaryColor, SecondaryColor, TextColorGreen, TextinputColor, ThirdColor } from '../Styles/Style';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions"
import TextInputField from '../../components/TextInputField';
import TouchableButton from '../../components/TouchableButton';
import SocialsLogin from '../../components/SocialsLogin';
import { useNavigation } from '@react-navigation/native';
import PhoneInput
    from 'react-native-phone-input';
import CountryPicker
    from 'react-native-country-picker-modal';
import PhoneNumber from '../../components/PhoneNumber';

const Register = () => {
    const navigation = useNavigation()

    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [selectedCountry, setSelectedCountry] =
        useState(null);

    const [countryPickerVisible, setCountryPickerVisible] =
        useState(false);

    const onSelectCountry = (country) => {
        setCountryCode(country.cca2);
        setSelectedCountry(country);
        setCountryPickerVisible(false);
    };

    console.log(selectedCountry)
    console.log(countryPickerVisible)
    // console.log(selectedCountry)

    const onSubmit = () => {
        // Perform your desired action with 
        // the phone number and country code 
        Alert.alert('Form Submitted',
            `Phone Number: ${phoneNumber} 
                    \nCountry Code: ${countryCode}`);
    };

    const toggleCountryPicker = () => {
        setCountryPickerVisible(!countryPickerVisible);
    };

    return (
        <View style={styles.container}>

            <View style={styles.img_container}>
                <Image style={styles.img_child} source={require("../../assets/create-account-img.png")} />
            </View>

            <View>
                <View style={{ width: "90%", marginLeft: "auto" }}>
                    <Text style={{ color: FourthColor, fontWeight: "600" }}>First Name</Text>
                </View>
                <TextInputField placeholderText="Type here" />

                <View style={{ width: "90%", marginLeft: "auto" }}>
                    <Text style={{ color: FourthColor, fontWeight: "600" }}>Last Name</Text>
                </View>

                <TextInputField placeholderText="Type here" />

                <View>
                    <View style={{ width: "90%", marginLeft: "auto" }}>
                        <Text style={{ color: FourthColor, fontWeight: "600" }}>Phone Number</Text>
                    </View>

                    <PhoneNumber value={phoneNumber} onchangeState={setPhoneNumber} onPressFlag={toggleCountryPicker} />
                    <View>

                    </View>
                    {countryPickerVisible && (
                        <CountryPicker
                            withFilter={true}
                            withFlagButton={false}
                            withCountryNameButton={false}
                            onSelect={onSelectCountry}
                            onClose={() => setCountryPickerVisible(false)}
                            visible={countryPickerVisible}
                            containerButtonStyle={styles.countryPickerButton}
                            closeButtonImageStyle={styles.countryPickerCloseButton}
                        />
                    )}
                </View>



                <View>
                    <View style={{ width: "90%", marginLeft: "auto" }}>
                        <Text style={{ color: FourthColor, fontWeight: "600" }}>Email Address</Text>
                    </View>
                    <TextInputField placeholderText="Type here" />
                </View>
                <View style={{ marginTop: responsiveWidth(6) }}>
                    <TouchableButton onPress={() => navigation.navigate("RegisterUserInformation")} backgroundColor="#395E66" color="#FFF" text="Next" />
                    <View style={{ marginVertical: 7 }}>
                        <TouchableButton onPress={() => navigation.goBack()} backgroundColor="#FFF" borderWidth="1" color="#395E66" text="Back" />
                    </View>
                </View>

            </View>

        </View>
    )
}


export default Register;


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

    countryButton: {
        marginBottom: 20,
    },
    countryPickerButton: {
        borderRadius: 5,
        backgroundColor: 'red',
        marginBottom: 20,
    },
    countryPickerCloseButton: {
        width: 20,
        height: 20,
    },
    submitButton: {
        width: '100%',
    },
})
