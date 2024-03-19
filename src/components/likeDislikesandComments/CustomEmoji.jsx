//used in profile..
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { FourthColor } from '../../screens/Styles/Style';

const CustomEmoji = ({ text, image }) => {
    return (
        <TouchableOpacity style={styles.first_view}>
            <Image style={{ width: responsiveWidth(8), height: responsiveHeight(4), resizeMode: "center" }} source={image} />
            <Text style={{ fontSize: responsiveFontSize(1.7), color: FourthColor, fontWeight: "300" }}>{text}</Text>
        </TouchableOpacity>
    )
};


const styles = StyleSheet.create({
    first_view: {
        justifyContent: "center",
        alignItems: "center"
    },
})


export default CustomEmoji;

