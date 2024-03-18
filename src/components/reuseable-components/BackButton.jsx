import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Img_Paths } from '../../assets/Imagepaths';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';



const BackButton = ({ leftarrow, onPress }) => {
    const { LEFT_ARROW_IMG } = Img_Paths;

    return (
        <TouchableOpacity activeOpacity={0.3} onPress={onPress} style={styles.back_button}>
            <Image resizeMode="contain" style={styles.left_arrow} source={LEFT_ARROW_IMG} />
        </TouchableOpacity>
    )

};

export default BackButton;

const styles = StyleSheet.create({
    back_button: {
        borderRadius: 10,
        width: 45,
        height: 45,
        backgroundColor: "#395E66",
        justifyContent: "center",
        alignItems: "center"
    },
    left_arrow: {
        width: 8,
        height: 12,
    },
});
