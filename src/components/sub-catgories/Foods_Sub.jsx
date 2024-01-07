

import { View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import BackButton from '../BackButton'
import StoryUsers from '../StoryUsers'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { Img_Paths } from '../../assets/Imagepaths'
import { pinkColor } from '../../screens/Styles/Style'
import { moderateVerticalScale, moderateScale } from 'react-native-size-matters'
import MainInputField from '../MainInputField'
import { useNavigation } from '@react-navigation/native'

const Food_Sub = () => {

    const { LUDO_ICON,
        PIE_ICON,
        BIRTAHDAY_ICON,
        BREAD_ICON,
        CAKE_ICON,
        BISCUIT_ICON,
        COFFEE_ICON,
        CURRY_ICON,
        PIZZA_ICON,
        CHINESE_ICON,
        SUSHI_ICON,
        BUFFET_ICON,
        BURGER_ICON,
        HOTDOG_ICON,
        STEAK_ICON,
        BBQ_ICON,
        ITALIAN_ICON,
        ZOO_ICON
    } = Img_Paths;
    const navigation = useNavigation();

    return (
        <>
            <View style={styles.first_container}>
                <BackButton onPress={() => navigation.goBack()} />
                <View style={styles.categories_text_container}>
                    <Text style={styles.categories_text}>Food</Text>
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
                    <StoryUsers images={PIE_ICON} text="Pie" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={BIRTAHDAY_ICON} text="Birthday" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={BREAD_ICON} text="Bread" mainbgColor="#395E66" backgroundColor="#497780" />
                </View>
                <View style={{ paddingTop: responsiveWidth(3), paddingBottom: moderateVerticalScale(12), flexDirection: 'row', width: responsiveWidth(90), justifyContent: "space-between", alignItems: "center" }}>
                    <StoryUsers images={CAKE_ICON} text="Cake" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={BISCUIT_ICON} text="Biscuits" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={COFFEE_ICON} text="Coffee" mainbgColor="#395E66" backgroundColor="#497780" />
                </View>
                <View style={{ paddingBottom: moderateVerticalScale(12), flexDirection: 'row', width: responsiveWidth(90), justifyContent: "space-between", alignItems: "center" }}>
                    <StoryUsers images={CURRY_ICON} text="Curry " mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={PIZZA_ICON} text="Pizza" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={ZOO_ICON} text="Chinese" mainbgColor="#395E66" backgroundColor="#497780" />
                </View>
                <View style={{ paddingBottom: moderateVerticalScale(12), flexDirection: 'row', width: responsiveWidth(90), justifyContent: "space-between", alignItems: "center" }}>
                    <StoryUsers images={SUSHI_ICON} text="Sushi" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={BUFFET_ICON} text="Buffet" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={BURGER_ICON} text="Burger" mainbgColor="#395E66" backgroundColor="#497780" />
                </View>
                <View style={{ paddingBottom: moderateVerticalScale(12), flexDirection: 'row', width: responsiveWidth(90), justifyContent: "space-between", alignItems: "center" }}>
                    <StoryUsers images={HOTDOG_ICON} text="Hotdog " mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={STEAK_ICON} text="Steak" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={BBQ_ICON} text="BBQ" mainbgColor="#395E66" backgroundColor="#56B6A4" />
                </View>
                <View style={{ paddingBottom: moderateVerticalScale(20), flexDirection: 'row', width: responsiveWidth(90), justifyContent: "space-between", alignItems: "center" }}>
                    <StoryUsers images={ITALIAN_ICON} text="Italian" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={LUDO_ICON} text="Random" mainbgColor="#E44173" backgroundColor="#EE5F8A" />
                </View>

            </View>
        </>
    )
};




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


export default Food_Sub;
