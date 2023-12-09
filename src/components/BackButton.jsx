import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Img_Paths } from '../assets/Imagepaths';
import { useNavigation } from '@react-navigation/native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const BackButton = () => {

    const { LEFT_ARROW_IMG } = Img_Paths;
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.back_button}>
            <Image style={styles.left_arrow} source={LEFT_ARROW_IMG} />
        </TouchableOpacity>
    )
}

export default BackButton;

const styles = StyleSheet.create({
    back_button: {
        borderRadius: 10,
        width: responsiveWidth(12.9),
        height: responsiveHeight(6.3),
        backgroundColor: "#395E66",
        justifyContent: "center",
        alignItems: "center"
    },
    left_arrow: {
        width: responsiveWidth(5),
        height: responsiveHeight(2.5),
        resizeMode: "center"
    },
});
