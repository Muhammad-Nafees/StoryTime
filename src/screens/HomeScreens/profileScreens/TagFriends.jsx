import React from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet, FlatList, ScrollView, TextInput } from 'react-native'
import { PrimaryColor, SecondaryColor, TextColorGreen, ThirdColor, pinkColor } from '../../Styles/Style';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
import FrameContent from '../../../components/FrameContent';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from '../../../assets/Imagepaths';
import NavigationsString from '../../../constants/NavigationsString';
import StoryUsers from '../../../components/StoryUsers';
import AddFriendUsers from '../../../components/AddFriendUsers';
import TouchableButton from ' ../../../components/TouchableButton';

const TagFriends = () => {
    const { width, height } = Dimensions.get('window');
    const { SPLASH_SCREEN_IMAGE, LEFT_ARROW_IMG, SEARCH_ADD_ICON, FIRST_PROFILE,
        SECOND_PROFILE, THIRD_PROFILE, FOURTH_PROFILE, FIFTH_PROFILE, SIXTH_PROFILE } = Img_Paths;
    const { ADD_FRIENDS } = NavigationsString;
    const navigation = useNavigation();


    return (
        <ImageBackground style={styles.container} source={SPLASH_SCREEN_IMAGE}>
            <ScrollView>
                {/* Frame Content Close----------- */}

                <View style={styles.first_container}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back_button}>
                        <Image style={styles.left_arrow} source={LEFT_ARROW_IMG} />
                    </TouchableOpacity>
                    <View style={styles.categories_text_container}>
                        <Text style={styles.categories_text}>Tag Friends</Text>
                    </View>
                </View>

                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <View style={{ backgroundColor: "#FFF", borderRadius: 50, width: responsiveWidth(90), flexDirection: "row", alignItems: "center" }}>
                        <View style={{ paddingLeft: responsiveWidth(6), paddingHorizontal: moderateVerticalScale(10), paddingVertical: 14, }}>
                            <Image style={{ width: responsiveWidth(6), height: responsiveHeight(3), }} source={SEARCH_ADD_ICON} />
                        </View>
                        <TextInput placeholder="Search" placeholderTextColor={"#393939"} style={{ color: "#000" }} />
                    </View>
                </View>

                <View style={{ paddingVertical: responsiveWidth(5), justifyContent: "center", alignItems: "center" }}>
                    <AddFriendUsers profileimage={FIRST_PROFILE} text="@chrislee" userchoice="Tag" />
                    <AddFriendUsers profileimage={SECOND_PROFILE} text="@Cedrick101" userchoice="Tag" />
                    <AddFriendUsers profileimage={THIRD_PROFILE} text="@itsmeMike" userchoice="Tag" />
                    <AddFriendUsers profileimage={FOURTH_PROFILE} text="@christine02" userchoice="Tag" />
                    <AddFriendUsers profileimage={FIFTH_PROFILE} text="@deniseperkins" userchoice="Tag" />
                    <AddFriendUsers profileimage={SIXTH_PROFILE} text="@nolanjames_1" userchoice="Tag" />
                </View>

                <View style={{ paddingTop: responsiveWidth(55) }}>
                    <TouchableButton backgroundColor={TextColorGreen} color="#FFF" text="Tag" />
                </View>

            </ScrollView>
        </ImageBackground>

    )
}




const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        flex: 1,
    },
    first_container: {
        paddingTop: responsiveWidth(6),
        paddingVertical: moderateVerticalScale(12),
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
        fontWeight: "600",
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
        width: responsiveWidth(70),
        backgroundColor: '#FFF',
        color: "#000",
        borderRadius: 50,
    },
    add_button: {
        borderRadius: 50,
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


export default TagFriends;
