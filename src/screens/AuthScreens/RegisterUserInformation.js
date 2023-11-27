import React, { useState } from 'react'
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native'
import { FourthColor, PrimaryColor, SecondaryColor, TextColorGreen, TextinputColor, ThirdColor } from '../Styles/Style';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions"
import TextInputField from '../../components/TextInputField';
import TouchableButton from '../../components/TouchableButton';
import SocialsLogin from '../../components/SocialsLogin';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';



const items = [
    { label: "Austin", value: "Austin" },
    { label: "Coding", value: "Coding" },
]
const itemscity = [
    { label: "Texas", value: "Texas" },
    { label: "Coding", value: "Coding" },
]


const RegisterUserInformation = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [currentvalue, setCurrentValue] = useState(false)
    console.log("CuRe", currentvalue)
    // const [isOpen,setIsOpen] = useState(false)
    const [isOpenCity, setIsOpenCity] = useState(false)
    const [currentvalueCity, setCurrentValueCity] = useState(false)

    const navigation = useNavigation()

    return (
        <View style={styles.container}>

            <View style={styles.img_container}>
                <Image style={styles.img_child} source={require("../../assets/create-account-img.png")} />
            </View>

            {/* City------------ */}

            <View>
                <View style={{ width: "90%", marginLeft: "auto" }}>
                    <Text style={{ color: FourthColor, fontWeight: "600" }}>City</Text>
                </View>
                <View style={{ justifyContent: "center", alignItems: "center", zIndex: currentvalue == false ? 1000 : 1000, marginVertical: 14 }}>
                    <DropDownPicker
                        style={{ borderWidth: 0, backgroundColor: TextinputColor, }}
                        containerStyle={{ width: "80%", }}
                        items={itemscity}
                        showTickIcon={false}
                        open={isOpenCity}
                        setOpen={() => { setIsOpenCity(!isOpenCity) }}
                        value={currentvalueCity}
                        setValue={(val) => setCurrentValueCity(val)}
                        placeholder="Select here"
                        placeholderStyle={{ color: "#AAAAAA" }}
                    />
                </View>

                {/* State----------- */}

                <View>
                    <View style={{ width: "90%", marginLeft: "auto" }}>
                        <Text style={{ color: FourthColor, fontWeight: "600" }}>State</Text>
                    </View>
                    {/* <TextInputField placeholderText="Type here" /> */}
                    <View style={{ justifyContent: "center", alignItems: "center", zIndex: 999, marginVertical: 14 }}>
                        <DropDownPicker
                            style={{ borderWidth: 0, backgroundColor: TextinputColor }}
                            containerStyle={{ width: "80%", }}
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
                    <View style={{ width: "90%", marginLeft: "auto" }}>
                        <Text style={{ color: FourthColor, fontWeight: "600" }}>Zip Code</Text>
                    </View>
                    <TextInputField placeholderText="Type here" />
                </View>

                {/* Next and Back------------ */}

                <View style={{ marginTop: responsiveWidth(30) }}>
                    <TouchableButton onPress={() => navigation.navigate("RegisterPassword")} backgroundColor="#395E66" color="#FFF" text="Next" />
                    <View style={{ marginVertical: 7 }}>
                        <TouchableButton onPress={() => navigation.goBack()} backgroundColor="#FFF" borderWidth="1" color="#395E66" text="Back" />
                    </View>
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
