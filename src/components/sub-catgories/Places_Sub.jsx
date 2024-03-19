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

const Places_Sub = () => {
    const { LUDO_ICON,
        MOUNTAINS_ICON,
        ISLAND_ICON,
        WATERFALL_ICON,
        JUNGLE_ICON,
        HILL_ICON,
        GARDEN_ICON,
        FARM_ICON,
        DESERT_ICON,
        ZOO_ICON,
        AMUSEMENT_ICON,
        MUSIC_FESTIVAL_ICON,
        MUSEUM_ICON,
        CONCERT_ICON,
        SCHOOL_ICON,
        LANDMARKS_ICON,
        POOL_ICON,
    } = Img_Paths;
    const navigation = useNavigation();

    return (
        <>
            <View style={styles.first_container}>
                <BackButton onPress={() => navigation.goBack()} />
                <View style={styles.categories_text_container}>
                    <Text style={styles.categories_text}>Places</Text>
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
                    <StoryUsers images={MOUNTAINS_ICON} text="Mountains" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={ISLAND_ICON} text="Island" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={WATERFALL_ICON} text="Waterfall" mainbgColor="#395E66" backgroundColor="#497780" />
                </View>
                <View style={{ paddingTop: responsiveWidth(3), paddingBottom: moderateVerticalScale(12), flexDirection: 'row', width: responsiveWidth(90), justifyContent: "space-between", alignItems: "center" }}>
                    <StoryUsers images={JUNGLE_ICON} text="Jungle" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={HILL_ICON} text="Hill" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={GARDEN_ICON} text="Garden" mainbgColor="#395E66" backgroundColor="#497780" />
                </View>
                <View style={{ paddingBottom: moderateVerticalScale(12), flexDirection: 'row', width: responsiveWidth(90), justifyContent: "space-between", alignItems: "center" }}>
                    <StoryUsers images={FARM_ICON} text="Farm" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={DESERT_ICON} text="Desert" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={ZOO_ICON} text="Zoo" mainbgColor="#395E66" backgroundColor="#497780" />
                </View>
                <View style={{ paddingBottom: moderateVerticalScale(12), flexDirection: 'row', width: responsiveWidth(90), justifyContent: "space-between", alignItems: "center" }}>
                    <StoryUsers images={AMUSEMENT_ICON} text="Amusement Park" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={MUSIC_FESTIVAL_ICON} text="Music Festival" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={MUSEUM_ICON} text="Museum" mainbgColor="#395E66" backgroundColor="#497780" />
                </View>
                <View style={{ paddingBottom: moderateVerticalScale(12), flexDirection: 'row', width: responsiveWidth(90), justifyContent: "space-between", alignItems: "center" }}>
                    <StoryUsers images={CONCERT_ICON} text="Concert" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={SCHOOL_ICON} text="School Camp" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={LANDMARKS_ICON} text="Landmarks" mainbgColor="#395E66" backgroundColor="#56B6A4" />
                </View>
                <View style={{ paddingBottom: moderateVerticalScale(20), flexDirection: 'row', width: responsiveWidth(90), justifyContent: "space-between", alignItems: "center" }}>
                    <StoryUsers images={POOL_ICON} text="Pool" mainbgColor="#395E66" backgroundColor="#497780" />
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



export default Places_Sub






