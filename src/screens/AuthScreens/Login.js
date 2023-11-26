import React, { useState } from 'react'
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { FourthColor, PrimaryColor, SecondaryColor, TextColorGreen, TextinputColor } from '../Styles/Style';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions"
import TextInputField from '../../components/TextInputField';
import TouchableButton from '../../components/TouchableButton';
import SocialsLogin from '../../components/SocialsLogin';
import { useNavigation } from '@react-navigation/native';
// import { Image } from 'react-native-reanimated/lib/typescript/Animated';

const Login = () => {
    const navigation = useNavigation()
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');

    const toggleShowPassword = () => {
        setShowPassword(!showPassword); // Toggle the state between true and false
    };



    return (
        <View style={styles.container}>

            <View style={styles.img_container}>
                <Image style={styles.img_child} source={require("../../assets/story-time-without.png")} />
            </View>

            <View>
                <View style={{ width: "90%", marginLeft: "auto" }}>
                    <Text style={{ color: FourthColor, fontWeight: "600" }}>Username</Text>
                </View>
                <TextInputField placeholderText="Type here" />

                <View style={{ width: "90%", marginLeft: "auto" }}>
                    <Text style={{ color: FourthColor, fontWeight: "600" }}>Password</Text>
                </View>

                <TextInputField onPress={toggleShowPassword} showPassword={showPassword} placeholderText="Type here" type="password" />

                <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                    <Text style={{ color: FourthColor, fontWeight: "600" }}>Forgot password?</Text>
                </TouchableOpacity>

                <View style={{ marginTop: 14 }}>
                    <TouchableButton color="#FFF" backgroundColor="#395E66" text="Login" />
                </View>

                <View style={{ justifyContent: "center", alignItems: "center" }}>

                    <View style={styles.text_container}>
                        <Text style={[styles.text, { color: FourthColor }]}>By logging in, you agree to our </Text>
                        <TouchableOpacity>
                            <Text style={[styles.text, { color: TextColorGreen }]}> Terms & Conditions </Text>
                        </TouchableOpacity>
                        <Text style={[styles.text, { color: FourthColor }]}> and </Text>
                        <TouchableOpacity>
                            <Text style={[styles.text, { color: TextColorGreen }]}>Privacy Policy</Text>
                        </TouchableOpacity>
                    </View>

                </View>


                <View>
                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: 12 }}>
                        <Text style={[styles.text, { color: FourthColor, fontWeight: "400" }]}>or login with</Text>
                        <View style={{ flexDirection: "row", width: "78%", justifyContent: "space-between" }}>
                            <SocialsLogin ImageSource={require("../../assets/google-icon.png")} />
                            <SocialsLogin ImageSource={require("../../assets/facebook-icon.png")} />
                            <SocialsLogin ImageSource={require("../../assets/apple-icon.png")} />
                        </View>
                    </View>

                    <View style={{ marginTop: responsiveWidth(12), flexDirection: "row", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
                        <Text style={[styles.text, { color: FourthColor, }]}>Don’t have an account yet? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                            <Text style={[styles.text, { color: TextColorGreen, fontWeight: "600", }]}>Create one</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

        </View>
    )
}

export default Login;


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
    }
})
