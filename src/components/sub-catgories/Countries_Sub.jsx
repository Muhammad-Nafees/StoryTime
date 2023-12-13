import { View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import BackButton from '../BackButton'
import StoryUsers from '../StoryUsers'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { Img_Paths } from '../../assets/Imagepaths'
import { pinkColor } from '../../screens/Styles/Style'
import { moderateVerticalScale, moderateScale } from 'react-native-size-matters'
import MainInputField from '../MainInputField'

const Countries_Sub = () => {

    const { LUDO_ICON,
        SPAIN_ICON,
        FRANCE_ICON,
        GERMANY_ICON,
        TURKEY_ICON,
        JAPAN_ICON,
        SOUTHKOREA_ICON,
        CHINA_ICON,
        POLAND_ICON,
        EGYPT_ICON,
        SOUTHAFRICA_ICON,
        UNITEDSTATE_ICON,
        CANADA_ICON,
        BRAZIL_ICON,
        ARGENTINA_ICON,
        AUSTRALIA_ICON,
        NEWZEALAND_ICON,
        INDIA_ICON,
        TREASURE_ICON } = Img_Paths;

    return (
        <>
            <View style={styles.first_container}>
                <BackButton />
                <View style={styles.categories_text_container}>
                    <Text style={styles.categories_text}>Countries</Text>
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
                    <StoryUsers images={SPAIN_ICON} text="Spain" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={FRANCE_ICON} text="France" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={GERMANY_ICON} text="Germany" mainbgColor="#395E66" backgroundColor="#497780" />
                </View>
                <View style={{ paddingTop: responsiveWidth(3), paddingBottom: moderateVerticalScale(12), flexDirection: 'row', width: responsiveWidth(90), justifyContent: "space-between", alignItems: "center" }}>
                    <StoryUsers images={TURKEY_ICON} text="Turkey" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={JAPAN_ICON} text="japan" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={SOUTHKOREA_ICON} text="South Korea" mainbgColor="#395E66" backgroundColor="#497780" />
                </View>
                <View style={{ paddingBottom: moderateVerticalScale(12), flexDirection: 'row', width: responsiveWidth(90), justifyContent: "space-between", alignItems: "center" }}>
                    <StoryUsers images={CHINA_ICON} text="China" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={POLAND_ICON} text="Poland" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={EGYPT_ICON} text="Egypt" mainbgColor="#395E66" backgroundColor="#497780" />
                </View>
                <View style={{ paddingBottom: moderateVerticalScale(12), flexDirection: 'row', width: responsiveWidth(90), justifyContent: "space-between", alignItems: "center" }}>
                    <StoryUsers images={SOUTHAFRICA_ICON} text="South Africa" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={UNITEDSTATE_ICON} text="United States" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={CANADA_ICON} text="Canada" mainbgColor="#395E66" backgroundColor="#497780" />
                </View>
                <View style={{ paddingBottom: moderateVerticalScale(12), flexDirection: 'row', width: responsiveWidth(90), justifyContent: "space-between", alignItems: "center" }}>
                    <StoryUsers images={BRAZIL_ICON} text="Brazil" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={ARGENTINA_ICON} text="Argentina" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={AUSTRALIA_ICON} text="Australia" mainbgColor="#395E66" backgroundColor="#497780" />
                    {/* <StoryUsers images={ANIMAL_FIREFLY} text="Tyre" mainbgColor="#395E66" backgroundColor="#497780" /> */}
                </View>
                <View style={{ paddingBottom: moderateVerticalScale(20), flexDirection: 'row', width: responsiveWidth(90), justifyContent: "space-between", alignItems: "center" }}>
                    <StoryUsers images={NEWZEALAND_ICON} text="New Zealand" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={INDIA_ICON} text="India" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={LUDO_ICON} text="Random" mainbgColor="#E44173" backgroundColor="#EE5F8A" />
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



export default Countries_Sub;
