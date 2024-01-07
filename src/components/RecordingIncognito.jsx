import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, } from 'react-native'
import React from 'react'
import { profile_oliverPierce } from '../../dummyData/DummyData'
import { SecondaryColor, TextColorGreen } from '../screens/Styles/Style'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { moderateScale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'


const RecordingIncognito = () => {
    const navigation = useNavigation();
    const SCREENHEIGHT = Dimensions.get("window").height;
    const SCREENWIDTH = Dimensions.get("window").width;
    return (
        <>
            {
                profile_oliverPierce?.map((item, index) => (
                    <>
                        <View key={index} style={{ backgroundColor: "rgba(57, 57, 57, 1)", flexDirection: "row", justifyContent: "space-evenly", height: responsiveHeight(10), alignItems: "center", marginTop: responsiveWidth(2), }}>
                            <TouchableOpacity onPress={() => navigation?.navigate("profileStack", {
                                screen: "VoiceToTextProfile"
                            })} style={{ backgroundColor: "#AAA", flexDirection: "row", paddingHorizontal: moderateScale(90), width: responsiveWidth(85), height: responsiveHeight(7), justifyContent: "space-evenly", alignItems: "center", borderRadius: 10 }}>
                                <Image style={{ width: SCREENWIDTH * 0.1, height: SCREENHEIGHT * 0.1, resizeMode: "center" }} source={item.image1} />
                                <Text style={{ color: "#FFF", fontWeight: "700", fontSize: responsiveFontSize(2) }}>{item.text1}</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                ))
            }
        </>
    )
};



const styles = StyleSheet.create({
    fourth_container: {
        flexDirection: "row",
        alignItems: "center",
        width: responsiveWidth(65),
    },

    first_view: {
        justifyContent: "center",
        alignItems: "center"
    },
    second_view: {
        justifyContent: "center",
        alignItems: "center"
    },
    third_view: {
        justifyContent: "center",
        alignItems: "center"
    },
})
export default RecordingIncognito;
