



import { View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import BackButton from '../reusable-components/addplayer/customBackButton/BackButton'
import StoryUsers from '../categories/StoryUsers'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { Img_Paths } from '../../assets/Imagepaths'
import { pinkColor } from '../../screens/Styles/Style'
import { moderateVerticalScale, moderateScale } from 'react-native-size-matters'
import MainInputField from '../MainInputField'
import { useNavigation } from '@react-navigation/native'

const School_Sub = () => {

    const { LUDO_ICON,
        BAG_ICON,
        LIBRARY_ICON,
        COMPUTER_ICON,
        BOOK_ICON,
        PAPER_ICON,
        CLASSROOM_ICON,
        CHALKBOARD_ICON,
        LOCKER_ICON,
        DESKCHAIR_ICON,
        PENCIL_ICON,
    } = Img_Paths;
    const navigation = useNavigation();

    return (
        <>
            <View style={styles.first_container}>
                <BackButton onPress={() => navigation.goBack()} />
                <View style={styles.categories_text_container}>
                    <Text style={styles.categories_text}>School</Text>
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
                    <StoryUsers images={BAG_ICON} text="Bag" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={LIBRARY_ICON} text="Library" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={COMPUTER_ICON} text="Computer" mainbgColor="#395E66" backgroundColor="#497780" />
                </View>
                <View style={{ paddingTop: responsiveWidth(3), paddingBottom: moderateVerticalScale(12), flexDirection: 'row', width: responsiveWidth(90), justifyContent: "space-between", alignItems: "center" }}>
                    <StoryUsers images={BOOK_ICON} text="Book" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={PAPER_ICON} text="Paper" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={CLASSROOM_ICON} text="Classroom" mainbgColor="#395E66" backgroundColor="#497780" />
                </View>
                <View style={{ paddingBottom: moderateVerticalScale(12), flexDirection: 'row', width: responsiveWidth(90), justifyContent: "space-between", alignItems: "center" }}>
                    <StoryUsers images={CHALKBOARD_ICON} text="Chalkboard " mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={LOCKER_ICON} text="Locker" mainbgColor="#395E66" backgroundColor="#497780" />
                    <StoryUsers images={DESKCHAIR_ICON} text="Desk Chair" mainbgColor="#395E66" backgroundColor="#497780" />
                </View>
                <View style={{ paddingBottom: moderateVerticalScale(12), flexDirection: 'row', width: responsiveWidth(90), justifyContent: "space-between", alignItems: "center" }}>
                    <StoryUsers images={PENCIL_ICON} text="Pencil Case" mainbgColor="#395E66" backgroundColor="#497780" />
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


export default School_Sub;
