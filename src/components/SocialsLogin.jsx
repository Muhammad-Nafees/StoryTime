import React from "react"
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { SecondaryColor } from "../screens/Styles/Style";

const SocialsLogin = ({ ImageSource }) => {
    return (
        <TouchableOpacity style={{ marginVertical: 20, borderWidth: 1, borderColor: "#DEDEDE", paddingVertical: 14, paddingHorizontal: 18, borderRadius: 12, width: "30%", justifyContent: "center", alignItems: "center" }}>
            <Image style={{ width: 24, height: 24, resizeMode: "center" }} source={ImageSource} />
        </TouchableOpacity>
    )
}

export default SocialsLogin;
