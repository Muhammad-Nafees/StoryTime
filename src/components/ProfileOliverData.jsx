import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, } from 'react-native'
import React from 'react'
import { profile_oliverPierce } from '../../dummyData/DummyData'
import { SecondaryColor, TextColorGreen } from '../screens/Styles/Style'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { moderateScale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'


const ProfileOliverData = () => {

    const navigation = useNavigation();
    const SCREENHEIGHT = Dimensions.get("window").height;
    const SCREENWIDTH = Dimensions.get("window").width;

    return (
        <>
            {
                profile_oliverPierce?.map((item, index) => (
                    <>
                        <View key={index} style={{ backgroundColor: TextColorGreen, flexDirection: "row", justifyContent: "space-evenly", height: responsiveHeight(10), alignItems: "center", marginTop: responsiveWidth(2), }}>
                            <TouchableOpacity onPress={() => navigation?.navigate("profileStack", {
                                screen: "VoiceToTextProfile"
                            })} style={{ backgroundColor: "#56B6A4", flexDirection: "row", paddingHorizontal: moderateScale(24), width: 175, height: 47, justifyContent: "space-evenly", alignItems: "center", borderRadius: 10 }}>
                                <Image style={{ width: SCREENWIDTH * 0.1, height: SCREENHEIGHT * 0.1, resizeMode: "center" }} source={item.image1} />
                                <Text style={{ color: "#FFF", fontWeight: "700", fontSize: responsiveFontSize(2) }}>{item.text1}</Text>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: responsiveWidth(40), }}>
                                <TouchableOpacity style={styles.first_view}>
                                    <Image style={{ width: responsiveWidth(9), height: responsiveHeight(4.5), resizeMode: "center" }} source={item.image2} />
                                    <Text style={{ fontSize: responsiveFontSize(1.7), color: SecondaryColor, fontWeight: "300" }}>{item.text2}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.second_view}>
                                    <Image style={{ width: responsiveWidth(9), height: responsiveHeight(4.5), resizeMode: "center" }} source={item.imgae3} />
                                    <Text style={{ fontSize: responsiveFontSize(1.7), color: SecondaryColor, fontWeight: "300" }}>{item.text3}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.third_view}>
                                    <Image style={{ width: responsiveWidth(9), height: responsiveHeight(4.5), resizeMode: "center" }} source={item.imgae4} />
                                    <Text style={{ fontSize: responsiveFontSize(1.7), color: SecondaryColor, fontWeight: "300" }}>{item.text4}</Text>
                                </TouchableOpacity>
                            </View>
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

export default ProfileOliverData;
