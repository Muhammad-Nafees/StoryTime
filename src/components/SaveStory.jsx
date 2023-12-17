import React from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet, FlatList, ScrollView, Modal, TouchableOpacityBase } from 'react-native'
import { PrimaryColor, SecondaryColor, TextColorGreen, ThirdColor, pinkColor } from "../screens/Styles/Style";
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from "../assets/Imagepaths/index";
import BackButton from '../components/BackButton';
import NavigationsString from '../constants/NavigationsString';
import TouchableButton from './TouchableButton';


const SaveStory = ({ isVisible, setVisible }) => {

    const { width, height } = Dimensions.get('window');
    const { STORY_TIME_IMG, BG_PLAYFLOW, HOME_FRAME, FULL_BORDER_FRAME, EXTEND_STORY_IMG, NEXT_PLAYER_IMG } = Img_Paths;
    const SCREENWIDTH = Dimensions.get("window").width
    const SCREENHEIGHT = Dimensions.get("window").height;
    const { VIDEO_SECOND_USER, FIRST_USER } = NavigationsString;
    const navigation = useNavigation();

    return (
        <Modal visible={isVisible} >
            <ImageBackground style={styles.container} source={BG_PLAYFLOW}>
                <View>
                    {/* Back Button */}
                    <View style={{ width: responsiveWidth(90), marginLeft: "auto" }}>
                        <BackButton onPress={() => setVisible(false)} />
                    </View>
                    <View style={styles.container}>
                        <TouchableButton backgroundColor={TextColorGreen} text="Save" color="#FFF" />
                        <TouchableButton text="Save as Pdf" />

                    </View>

                </View>
            </ImageBackground>
        </Modal>

    )
};



const styles = StyleSheet.create({
    container: {
        backgroundColor: SecondaryColor,
        width: "100%",
        height: "100%",
        flex: 1,
    },
    img: {
        resizeMode: "center"
    },
    container: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: moderateVerticalScale(10),
        flex: 1
    },
    img_backgroung_content: {
        width: responsiveWidth(90),
        height: responsiveHeight(32),
        justifyContent: "center",
        alignItems: "center",
    },
    bg_content: {
        backgroundColor: PrimaryColor,
        justifyContent: "center",
        alignItems: "center",
        width: responsiveWidth(78),
        height: responsiveHeight(27),
        marginLeft: responsiveWidth(1),
        marginBottom: responsiveWidth(2)
    },
    child_bg: {
        backgroundColor: pinkColor,
        width: responsiveWidth(70),
        height: responsiveHeight(28),
        marginTop: responsiveWidth(5),
        borderRadius: 18,
    },

    second_childbg: {
        marginLeft: "auto",
        width: responsiveWidth(67)
    },

    third_childbg: {
        flexDirection: "row",
        width: responsiveWidth(21),
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: moderateVerticalScale(8)
    },
    child_bg_img: {
        width: responsiveWidth(6.25),
        height: responsiveHeight(3.5),
        resizeMode: "center",
    },
    text_container: {
        paddingTop: responsiveWidth(4),
    },
    second_container: {
        position: 'relative',
        bottom: responsiveWidth(5),
        justifyContent: "center",
        alignItems: "center",
    },
    sec_container_firstchild: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: moderateVerticalScale(50),
        width: responsiveWidth(92),
        marginLeft: responsiveWidth(1),
        backgroundColor: "#E44173",
        height: responsiveHeight(7.5),
    },
    third_container: {
        justifyContent: "center",
        alignItems: "center",
    },
    fourth_container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: responsiveWidth(36),
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
    sophia_container: {
        flexDirection: "row",
        width: responsiveWidth(21),
        justifyContent: "space-between",
        alignItems: "center",
        margin: responsiveWidth(2.8)
    }
});

export default SaveStory;

