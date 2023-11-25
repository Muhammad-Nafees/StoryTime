import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from "react-native"

const AuthImage = () => {
    return (
        <TouchableOpacity activeOpacity={0.7} style={styles.container}>
            <Image style={{ width: 270, height: 200, justifyContent: "center", alignItems: "center" }} resizeMode="center" source={require("../assets/background-frame-img.png")} />
        </TouchableOpacity>

    )
}

export default AuthImage


const styles = StyleSheet.create({
    container: {
        width: "75%",
        justifyContent: "center",
        alignItems: "center"
    }
})
