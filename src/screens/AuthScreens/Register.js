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
import NavigationsString from '../../constants/NavigationsString';
import { Img_Paths } from '../../assets/Imagepaths';
import { moderateVerticalScale, moderateScale } from "react-native-size-matters"

const Register = () => {
    const { CREATE_ACCOUNT_ICON } = Img_Paths;

    const navigation = useNavigation()
    const { REGISTER_USER_INFO } = NavigationsString
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

    const toggleCountryPicker = () => {
        setCountryPickerVisible(!countryPickerVisible);
    };
    return (
        <View style={styles.container}>

            <View style={styles.img_container}>
                <Image style={styles.img_child} source={CREATE_ACCOUNT_ICON} />
            </View>

            <View>
                <View style={{ width: responsiveWidth(90), marginLeft: "auto" }}>
                    <Text style={{ color: FourthColor, fontWeight: "600", fontSize: responsiveFontSize(1.9) }}>First Name</Text>
                </View>
                <TextInputField placeholderText="Type here" />

                <View style={{ width: responsiveWidth(90), marginLeft: "auto" }}>
                    <Text style={{ color: FourthColor, fontWeight: "600", fontSize: responsiveFontSize(1.9) }}>Last Name</Text>
                </View>

                <TextInputField placeholderText="Type here" />

                <View>
                    <View style={{ width: responsiveWidth(90), marginLeft: "auto" }}>
                        <Text style={{ color: FourthColor, fontWeight: "600", fontSize: responsiveFontSize(1.9) }}>Phone Number</Text>
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
                    <View style={{ width: responsiveWidth(90), marginLeft: "auto" }}>
                        <Text style={{ color: FourthColor, fontWeight: "600", fontSize: responsiveFontSize(1.9) }}>Email Address</Text>
                    </View>
                    <TextInputField placeholderText="Type here" />
                </View>

                <View style={{ paddingTop: responsiveWidth(6) }}>
                    <TouchableButton onPress={() => navigation.navigate(REGISTER_USER_INFO)} backgroundColor="#395E66" color="#FFF" text="Next" />
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
        backgroundColor: SecondaryColor,
        flex: 1,
    },
    text: {
        fontSize: responsiveFontSize(1.8),
        fontWeight: "400"
    },
    img_container: {
        paddingVertical: moderateVerticalScale(22),
        justifyContent: "center",
        alignItems: "center"
    },
    img_child: {
        width: responsiveWidth(50),
        height: responsiveHeight(20),
        resizeMode: "center",
    },
})
