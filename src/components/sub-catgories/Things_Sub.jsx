import { View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import BackButton from '../reuseable-components/BackButton'
import StoryUsers from '../StoryUsers'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { Img_Paths } from '../../assets/Imagepaths'
import { pinkColor } from '../../screens/Styles/Style'
import { moderateVerticalScale, moderateScale } from 'react-native-size-matters'
import MainInputField from '../MainInputField'
import { useNavigation } from '@react-navigation/native'

const Things_Sub = () => {
    const { LUDO_ICON,
        TELEPHONE_MOBILE,
        CAMERA_ICON,
        MONEY_ICON,
        SHOES_ICON,
        WEDDING_ICON,
        TYRE_ICON,
        BBG_GRILL,
        FRYING_PAN,
        TEDDY_BEAR,
        ROPE_ICON,
        TREE_ICON,
        POT_ICON,
        FLOWER_ICON,
        ANIMAL_BUTTERFLY,
        SAND_CASTLE_ICON,
        TREASURE_ICON } = Img_Paths;
    const navigation = useNavigation();
    return (
        <>
            <View style={styles.first_container}>
                <BackButton onPress={() => navigation.goBack()} />
                <View style={styles.categories_text_container}>
                    <Text style={styles.categories_text}>Things</Text>
                </View>
            </View>

            {/* IMainnputField-----*/}
            <MainInputField placeholder="Username" />
            {/* MainInputField----- */}

            <View style={{ paddingVertical: moderateVerticalScale(6), justifyContent: "center", alignItems: "center" }}>
                <View style={{ width: responsiveWidth(90), flexDirection: 'row', alignItems: "center", flexWrap: "wrap" }}>
                    <View style={{ marginHorizontal: moderateScale(10), }}>
                        <Text style={{ color: "#393939", fontWeight: "500", textAlign: "center" }}>Players:</Text>
                    </View>
                    <View style={{ backgroundColor: "#395E66", paddingHorizontal: moderateScale(14), paddingVertical: moderateVerticalScale(4.5), borderRadius: 40 }}>
                        <Text style={{ color: "#FFF", fontSize: responsiveFontSize(1.9) }}>@chrislee</Text>
                    </View>
                    <View style={{ marginHorizontal: moderateVerticalScale(6), backgroundColor: "#395E66", paddingHorizontal: 14, paddingVertical: moderateVerticalScale(4.5), borderRadius: 40 }}>
                        <Text style={{ color: "#FFF", fontSize: responsiveFontSize(1.9) }}>@Cedrick101</Text>
                    </View>
                    <View style={{ marginTop: responsiveWidth(2), backgroundColor: "#395E66", paddingHorizontal: 14, paddingVertical: moderateVerticalScale(4.5), borderRadius: 40 }}>
                        <Text style={{ color: "#FFF", fontSize: responsiveFontSize(1.9) }}>@its me Like</Text>
                    </View>
                </View>
            </View>

            <View style={{ paddingTop: responsiveWidth(3), justifyContent: "center", alignItems: "center" }}>
                <View style={{ flexDirection: 'row', width: responsiveWidth(90), justifyContent: "space-between", alignItems: "center" }}>
                    <StoryUsers images={TELEPHONE_MOBILE} text="Phone" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={CAMERA_ICON} text="Camera" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={MONEY_ICON} text="Money" mainbgColor="#395E66" backgroundColor="#497780" />
                </View>
                <View style={{ paddingTop: responsiveWidth(3), paddingBottom: moderateVerticalScale(12), flexDirection: 'row', width: responsiveWidth(90), justifyContent: "space-between", alignItems: "center" }}>
                    <StoryUsers images={SHOES_ICON} text="Shoes" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={WEDDING_ICON} text="Wedding" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={TYRE_ICON} text="Tyre" mainbgColor="#395E66" backgroundColor="#497780" />
                </View>
                <View style={{ paddingBottom: moderateVerticalScale(12), flexDirection: 'row', width: responsiveWidth(90), justifyContent: "space-between", alignItems: "center" }}>
                    <StoryUsers images={BBG_GRILL} text="BBQ-Grill" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={TEDDY_BEAR} text="Favourite-Toy" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={ROPE_ICON} text="Rope" mainbgColor="#395E66" backgroundColor="#497780" />
                </View>
                <View style={{ paddingBottom: moderateVerticalScale(12), flexDirection: 'row', width: responsiveWidth(90), justifyContent: "space-between", alignItems: "center" }}>
                    <StoryUsers images={TREE_ICON} text="Tree" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={ANIMAL_BUTTERFLY} text="Pot" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={FLOWER_ICON} text="Flowers" mainbgColor="#395E66" backgroundColor="#497780" />
                </View>
                <View style={{ paddingBottom: moderateVerticalScale(12), flexDirection: 'row', width: responsiveWidth(90), justifyContent: "space-between", alignItems: "center" }}>
                    <StoryUsers images={SAND_CASTLE_ICON} text="Sandcastle" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={TREASURE_ICON} text="Treasure" mainbgColor="#395E66" backgroundColor="#497780" />
                    {/* <StoryUsers images={ANIMAL_FIREFLY} text="Tyre" mainbgColor="#395E66" backgroundColor="#497780" /> */}
                    <StoryUsers images={LUDO_ICON} text="Lion" mainbgColor="#E44173" backgroundColor="#EE5F8A" />
                </View>
                <View style={{ paddingBottom: moderateVerticalScale(20), flexDirection: 'row', width: responsiveWidth(90), justifyContent: "space-between", alignItems: "center" }}>
                    {/* <StoryUsers images={ANIMAL_OSTRICH} text="Ostrich" mainbgColor="#395E66" backgroundColor="#56B6A4" /> */}
                </View>

            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: pinkColor,
        width: "100%",
        height: "100%",
        flex: 1,
    },
    first_container: {
        paddingTop: responsiveWidth(6),
        paddingVertical: moderateVerticalScale(8),
        flexDirection: 'row',
        marginLeft: "auto",
        width: responsiveWidth(95),
        alignItems: "center"
    },
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
    categories_text_container: {
        paddingHorizontal: moderateScale(20)
    },
    categories_text: {
        color: "#E44173",
        fontSize: responsiveFontSize(2.4),
        fontWeight: "500",
        letterSpacing: 0.36
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



export default Things_Sub
