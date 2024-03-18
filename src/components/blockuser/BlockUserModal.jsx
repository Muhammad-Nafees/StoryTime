import React, { useState, useMemo, useEffect } from 'react'
import { Dimensions, Image, Platform, ImageBackground, Text, TouchableOpacity, View, StyleSheet, FlatList, ScrollView, Modal, ProgressBarAndroid } from 'react-native'
import { PrimaryColor, TextColorGreen, ThirdColor, pinkColor } from "../../screens/Styles/Style";
import { useNavigation, } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from "../../assets/Imagepaths/index";
import BackButton from '../reuseable-components/BackButton';
import NavigationsString from '../../constants/NavigationsString';

import { useDispatch, useSelector } from 'react-redux';
import { Inter_Regular, PassionOne_Regular } from '../../constants/GlobalFonts';
import { SPACING } from '../../constants/Constant';
import { blockUser_Story } from '../../../services/api/storyfeed';
import UserErrors from '../auth/UserErrors';


const BlockUserStory = ({ isVisible, setIsVisible }) => {

    const { width, height } = Dimensions.get('window');
    const { BGIMAGE_BLOCKUSER } = Img_Paths;
    const SCREENWIDTH = Dimensions.get("window").width;
    const SCREENHEIGHT = Dimensions.get("window").height;
    const [isVisibleSuccess, setIsVisibleSuccess] = useState(false)
    const { VIDEO_SECOND_USER, BLOCK_USER } = NavigationsString;
    const storyUserIdBlock = useSelector((state) => state.storyFeed?.storyUserId)
    const dispatch = useDispatch();
    const navigation = useNavigation();


    const blockUserStory = async () => {

        try {
            const responseData = await blockUser_Story({ blockId: storyUserIdBlock })
            if (responseData?.message === "Blocked Successfully") {
                setIsVisibleSuccess(true);
                // await setIsVisible(false);
            };

            console.log("responseData====`", responseData)
            return responseData;
        } catch (error) {

        }
    };



    // useEffect(() => {
    //     blockUserStory()
    // }, [])

    return (
        <>
            <Modal onRequestClose={() => setIsVisible(false)} visible={isVisible} >

                <ImageBackground style={styles.container} source={BGIMAGE_BLOCKUSER}>

                    <View style={{ width: responsiveWidth(90), marginLeft: "auto", paddingTop: responsiveWidth(10) }}>
                        <BackButton onPress={() => setIsVisible(false)} />
                    </View>

                    <View style={{ height: responsiveHeight(80), justifyContent: "center", alignItems: "center" }}>
                        <View style={{ width: responsiveWidth(80), height: responsiveHeight(28), backgroundColor: "#FFF", borderRadius: 32, alignItems: "center", justifyContent: "space-around" }}>
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ color: TextColorGreen, fontFamily: Inter_Regular.Inter_Regular, fontSize: responsiveFontSize(2.9), paddingVertical: moderateVerticalScale(18), fontWeight: "700", }}>Block user</Text>
                                <Text style={{ paddingVertical: 2, width: responsiveWidth(40), textAlign: "center", color: "#000", lineHeight: 22, fontWeight: "500", }}>Are you sure you want to block this user?</Text>
                            </View>

                            <View style={{ borderTopWidth: 1, borderColor: "red", }}>
                                <View style={{ flexDirection: "row", width: responsiveWidth(80), justifyContent: "space-evenly", alignItems: "center", height: 40 }}>
                                    <TouchableOpacity onPress={() => {
                                        setIsVisible(false);
                                    }} style={{ width: responsiveWidth(40), borderRightWidth: 1, height: 40, borderColor: "red", justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ color: "#B72D2D", fontWeight: "600" }}>No</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        blockUserStory();
                                    }} style={{ width: responsiveWidth(40), justifyContent: "center", alignItems: "center" }} >
                                        <Text style={{ color: TextColorGreen, fontWeight: "600" }}>Block</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </View>


                    {/* Back Button */}

                    {/* <ImageBackground
                        style={styles.img_frame}
                        resizeMode="stretch"
                        source={BGIMAGE_BLOCKUSER}>
                        <View style={{ justifyContent: "center", alignSelf: 'center', marginTop: -SPACING * 8, alignItems: 'center' }}>
                            
                            <Text style={{ fontFamily: PassionOne_Regular.passionOne, color: TextColorGreen, fontSize: 24, paddingVertical: 10 }}>Block user</Text>
                            <Text style={{ paddingVertical: 2, width: responsiveWidth(40), textAlign: "center", color: TextColorGreen, lineHeight: 22, fontWeight: "400", marginBottom: responsiveHeight(2) }}>Are you sure you want to
                                block this user?</Text>

                            
                        </View>
                    </ImageBackground> */}

                    {
                        isVisibleSuccess && (
                            <UserErrors
                                isVisible={isVisibleSuccess}
                                setVisible={setIsVisibleSuccess}
                                text={"Ok"}
                                bgImage={BGIMAGE_BLOCKUSER}
                                text1={"User Blocked"}
                                onPress={() => {
                                    navigation.navigate(BLOCK_USER);
                                    setIsVisible(false);
                                }}
                            />
                        )
                    }

                </ImageBackground>
            </Modal>

        </>
    )
};



const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,

    },
    img: {
        resizeMode: "center"
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
    container2: {
        justifyContent: "center",
        alignItems: "center",
        // flex: 1,
        backgroundColor: "#FFF",
        height: responsiveHeight(28),
        width: responsiveWidth(80),
        borderWidth: 4,
        borderColor: TextColorGreen
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
    },
    img_frame: {
        height: '70%',
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 'auto',
        marginBottom: 'auto'
    },




});

export default BlockUserStory;



