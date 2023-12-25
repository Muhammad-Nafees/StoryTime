import React, { useState } from 'react'
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native'
import { FourthColor, PrimaryColor, SecondaryColor, TextColorGreen, TextinputColor, ThirdColor } from '../Styles/Style';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions"
import TextInputField from '../../components/TextInputField';
import TouchableButton from '../../components/TouchableButton';
import SocialsLogin from '../../components/SocialsLogin';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import NavigationsString from '../../constants/NavigationsString';
import { moderateVerticalScale, moderateScale } from "react-native-size-matters"
import { useDispatch } from 'react-redux';
import { register, registeruser_city } from '../../../store/slices/Register_Slice';
import { userinfoState } from '../../../store/slices/userInfoState_Slice';


const items = [
    { label: "sindh", value: "sindh" },
    { label: "punjab", value: "punjab" },
]
const itemscity = [
    { label: "karachi", value: "karachi" },
    { label: "Islamabad", value: "Islamabad" },
]


const RegisterUserInformation = ({ route }) => {


    const { REGISTER_PASSWORD } = NavigationsString;
    const [isOpen, setIsOpen] = useState(false);
    const [currentvalue, setCurrentValue] = useState("")
    const [isOpenCity, setIsOpenCity] = useState(false);
    const [currentvalueCity, setCurrentValueCity] = useState("");
    const [zipCode, setIszipCode] = useState("");
    const navigation = useNavigation();
    const dispatch = useDispatch();

    console.log("route-=-", route?.params?.countryCode)
    const countryCode = route?.params?.countryCode;

    const handlezipcode = (value) => {
        setIszipCode(value)
    }

    const handlenext = () => {
        dispatch(userinfoState(countryCode))
        dispatch(registeruser_city({ state: currentvalue, city: currentvalueCity, zipCode: zipCode }))
        navigation.navigate(REGISTER_PASSWORD)

    }


    return (
        <View style={styles.container}>

            <View style={styles.img_container}>
                <Image style={styles.img_child} source={require("../../assets/create-account-img.png")} />
            </View>

            {/* City------------ */}

            <View>
                <View style={{ width: responsiveWidth(90), marginLeft: "auto" }}>
                    <Text style={[styles.text, { color: FourthColor, }]}>City</Text>
                </View>
                <View style={{ justifyContent: "center", alignItems: "center", zIndex: currentvalue == false ? 1000 : 1000, paddingVertical: moderateVerticalScale(14) }}>
                    <DropDownPicker
                        style={{ borderWidth: 0, backgroundColor: TextinputColor, }}
                        containerStyle={{ width: responsiveWidth(80), }}
                        items={itemscity}
                        showTickIcon={false}
                        open={isOpenCity}
                        autoScroll
                        setOpen={() => { setIsOpenCity(!isOpenCity) }}
                        value={currentvalueCity}
                        setValue={(val) => setCurrentValueCity(val)}
                        placeholder="Select here"
                        placeholderStyle={{ color: "#AAAAAA" }}
                        m
                    />
                </View>

                {/* State----------- */}

                <View style={{}}>
                    <View style={{ width: responsiveWidth(90), marginLeft: "auto" }}>
                        <Text style={[styles.text, { color: FourthColor, }]}>State</Text>
                    </View>
                    {/* <TextInputField placeholderText="Type here" /> */}
                    <View style={{ justifyContent: "center", alignItems: "center", zIndex: 999, paddingVertical: moderateVerticalScale(14) }}>
                        <DropDownPicker
                            style={{ borderWidth: 0, backgroundColor: TextinputColor }}
                            containerStyle={{ width: responsiveWidth(80), }}
                            items={items}
                            showTickIcon={false}
                            open={isOpen}
                            setOpen={() => { setIsOpen(!isOpen) }}
                            value={currentvalue}
                            setValue={(val) => setCurrentValue(val)}
                            placeholder="Select here"
                            placeholderStyle={{ color: "#AAAAAA" }}
                        />
                    </View>
                </View>

                {/* Zip------------ */}

                <View>
                    <View style={{ width: responsiveWidth(90), marginLeft: "auto" }}>
                        <Text style={[styles.text, { color: FourthColor, }]}>Zip Code</Text>
                    </View>
                    <TextInputField
                        placeholderText="Type here"
                        type="zipcode"
                        value={zipCode}
                        onChangeText={(val) => handlezipcode(val)}
                    />
                </View>
            </View>

            {/* Next and Back------------ */}

            <View style={{ marginTop: responsiveWidth(30) }}>
                <TouchableButton onPress={handlenext} backgroundColor="#395E66" color="#FFF" text="Next" />
                <View style={{ paddingVertical: moderateVerticalScale(7) }}>
                    <TouchableButton onPress={() => navigation.goBack()} backgroundColor="#FFF" borderWidth="1" color="#395E66" text="Back" />
                </View>
            </View>


        </View>
    )
}

export default RegisterUserInformation;


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: SecondaryColor,
        flex: 1,
    },
    text: {
        fontSize: responsiveFontSize(1.9),
        fontWeight: "600"
    },
    img_container: {
        paddingVertical: moderateVerticalScale(22),
        justifyContent: "center",
        alignItems: "center"
    },
    img_child: {
        width: responsiveWidth(50),
        height: responsiveHeight(20),
        resizeMode: "center"
    },


})
