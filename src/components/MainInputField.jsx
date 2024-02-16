import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { pinkColor } from '../screens/Styles/Style';
import { moderateVerticalScale, moderateScale } from 'react-native-size-matters';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import { Img_Paths } from '../assets/Imagepaths';
import NavigationsString from '../constants/NavigationsString';

const MainInputField = ({ placeholder, OnchangeText, onPress, inputValue }) => {
    const navigation = useNavigation();
    const { ADD_PLAYERS } = NavigationsString;
    return (
        <View style={styles.text_Input_container}>
            <View style={styles.text_input_child}>
                <TextInput onChangeText={(value) => OnchangeText(value)} value={inputValue} placeholder={placeholder} placeholderTextColor={"#000"} style={styles.input_field} />
                <TouchableOpacity onPress={onPress} style={styles.add_button}>
                    <Text style={styles.add_text}>Add</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};



const styles = StyleSheet.create({
    container: {
        backgroundColor: pinkColor,
        flex: 1,
    },
    text_Input_container: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: moderateVerticalScale(2)
    },
    text_input_child: {
        flexDirection: 'row',
        width: responsiveWidth(90),
    },
    input_field: {
        paddingLeft: 30,
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        width: responsiveWidth(70),
        backgroundColor: '#FFF',
        color: "#000"
    },
    add_button: {
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
        width: responsiveWidth(21.5),
        height: responsiveHeight(7),
        backgroundColor: '#395E66',
        justifyContent: "center",
        alignItems: "center"
    },
    add_text: {
        fontSize: responsiveFontSize(1.9),
        color: "#FFF",
        fontWeight: "500",
        textAlign: "center",
        letterSpacing: -0.2
    }
})


export default MainInputField;
