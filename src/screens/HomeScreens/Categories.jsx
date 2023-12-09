import React from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet, FlatList, ScrollView, TextInput } from 'react-native'
import { PrimaryColor, SecondaryColor, TextColorGreen, ThirdColor, pinkColor } from '../Styles/Style';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import FrameContent from '../../components/FrameContent';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from '../../assets/Imagepaths';
import NavigationsString from '../../constants/NavigationsString';
import StoryUsers from '../../components/StoryUsers';
import BackButton from '../../components/BackButton';



const Categories = () => {

    const { width, height } = Dimensions.get('window');
    const { SPLASH_SCREEN_IMAGE, COUNTRIES_ICON, ANIMAL_IMG, BAG_IMG,
        CALENDER_ICON, ELEMENTS_ICON, SHOPPING_ICON, TEAM_ICON, VEHICLE_ICON,
        FRUIT_ICON, LEFT_ARROW_IMG, LIFENEED_ICON,
        LOCATION_ICON, LUDO_ICON, SCHOOL_ICON } = Img_Paths;

    const { PLAY_STORY_TIME } = NavigationsString;
    const navigation = useNavigation();



    return (
        <ScrollView>
            <ImageBackground style={styles.container} source={SPLASH_SCREEN_IMAGE}>
                {/* Frame Content Close----------- */}
                <View style={styles.first_container}>
                    <BackButton />
                    <View style={styles.categories_text_container}>
                        <Text style={styles.categories_text}>Categories</Text>
                    </View>
                </View>

                <View style={styles.text_Input_container}>
                    <View style={styles.text_input_child}>
                        <TextInput placeholder="Username" placeholderTextColor={"#000"} style={styles.input_field} />
                        <TouchableOpacity style={styles.add_button}>
                            <Text style={styles.add_text}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={{ paddingVertical: moderateVerticalScale(6), justifyContent: "center", alignItems: "center" }}>
                    <View style={{ width: responsiveWidth(90), flexDirection: 'row', alignItems: "center", flexWrap: "wrap" }}>
                        <View style={{ marginHorizontal: moderateScale(10), }}>
                            <Text style={{ color: "#393939", fontWeight: "500", textAlign: "center" }}>Players:</Text>
                        </View>

                        <View style={{ backgroundColor: "#395E66", paddingHorizontal: moderateScale(14), paddingVertical: moderateVerticalScale(4.5), borderRadius: 40 }}>
                            <Text style={{ color: "#FFF", fontSize: responsiveFontSize(1.9) }}>@chrislee</Text>
                        </View>
                        <View style={{ marginHorizontal: 6, backgroundColor: "#395E66", paddingHorizontal: 14, paddingVertical: moderateVerticalScale(4.5), borderRadius: 40 }}>
                            <Text style={{ color: "#FFF", fontSize: responsiveFontSize(1.9) }}>@Cedrick101</Text>
                        </View>
                        <View style={{ backgroundColor: "#395E66", paddingHorizontal: 14, paddingVertical: moderateVerticalScale(4.5), borderRadius: 40 }}>
                            <Text style={{ color: "#FFF", fontSize: responsiveFontSize(1.9) }}>@alfred</Text>
                        </View>
                    </View>
                </View>

                <View style={{ paddingTop: responsiveWidth(3), justifyContent: "center", alignItems: "center" }}>
                    <View style={{ flexDirection: 'row', width: responsiveWidth(90), justifyContent: "space-between", alignItems: "center" }}>
                        <StoryUsers images={TEAM_ICON} text="Humans" mainbgColor="#395E66" backgroundColor="#F6A96C" />
                        <StoryUsers images={LIFENEED_ICON} text="Things" mainbgColor="#395E66" backgroundColor="#79905C" />
                        <StoryUsers images={ANIMAL_IMG} text="Animals" mainbgColor="#395E66" backgroundColor="#56B6A4" />
                    </View>
                    <View style={{ paddingVertical: moderateVerticalScale(12), flexDirection: 'row', width: responsiveWidth(90), justifyContent: "space-between", alignItems: "center" }}>
                        <StoryUsers images={LOCATION_ICON} text="Places" mainbgColor="#395E66" backgroundColor="#C45E89" />
                        <StoryUsers images={FRUIT_ICON} text="Food" mainbgColor="#395E66" backgroundColor="#8482D1" />
                        <StoryUsers images={BAG_IMG} text="Work" mainbgColor="#395E66" backgroundColor="#974444" />
                    </View>
                    <View style={{ paddingBottom: moderateVerticalScale(12), flexDirection: 'row', width: responsiveWidth(90), justifyContent: "space-between", alignItems: "center" }}>
                        <StoryUsers images={CALENDER_ICON} text="Event" mainbgColor="#395E66" backgroundColor="#A4C857" />
                        <StoryUsers images={SHOPPING_ICON} text="Travels" mainbgColor="#395E66" backgroundColor="#C67D66" />
                        <StoryUsers images={SCHOOL_ICON} text="School" mainbgColor="#395E66" backgroundColor="#56C488" />
                    </View>
                    <View style={{ paddingBottom: moderateVerticalScale(12), flexDirection: 'row', width: responsiveWidth(90), justifyContent: "space-between", alignItems: "center" }}>
                        <StoryUsers images={VEHICLE_ICON} text="Vehicles" mainbgColor="#395E66" backgroundColor="#C07632" />
                        <StoryUsers images={ELEMENTS_ICON} text="Elements" mainbgColor="#395E66" backgroundColor="#82BED1" />
                        <StoryUsers images={COUNTRIES_ICON} text="Countries" mainbgColor="#395E66" backgroundColor="#C453D7" />
                    </View>
                    <View style={{ paddingBottom: moderateVerticalScale(20), flexDirection: 'row', width: responsiveWidth(90), justifyContent: "space-between", alignItems: "center" }}>
                        <StoryUsers images={LUDO_ICON} text="Random" mainbgColor="#E44173" backgroundColor="#EE5F8A" />
                    </View>
                </View>

            </ImageBackground>
        </ScrollView>

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


export default Categories;
