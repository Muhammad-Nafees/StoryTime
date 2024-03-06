import React, { useEffect, useRef, useState } from 'react'
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
import { addFriends_api } from '../../../../services/api/add-members';
import AddFriends_Categories from '../../../components/AddPlayers_Categories';
import { Inter_Regular, PassionOne_Regular } from '../../../constants/GlobalFonts';
import _ from 'lodash';
import { tag_Friends } from '../../../../services/api/profile';
import { useSelector } from 'react-redux';
import { addTagPlayers } from '../../../../store/slices/addplayers/addPlayersSlice';
import RemoveUsers_Categories from '../../../components/RemoveUsers_Categories';


const TagFriends = ({ route }) => {
    const { width, height } = Dimensions.get('window');
    const { SPLASH_SCREEN_IMAGE, LEFT_ARROW_IMG, SEARCH_ADD_ICON, FIRST_PROFILE,
        SECOND_PROFILE, THIRD_PROFILE, FOURTH_PROFILE, FIFTH_PROFILE, SIXTH_PROFILE } = Img_Paths;
    const { ADD_FRIENDS } = NavigationsString;
    const navigation = useNavigation();
    const [isNoFriends, setIsNoFriends] = useState(true);
    const [inputText, setInputText] = useState("");
    const [ResponseapiFriends, setResponseapiFriends] = useState([]);
    const tagPlayersRTK = useSelector((state) => state.addPlayers?.addTagPlayers)
    console.log("tagPlayersRTK---------- :", tagPlayersRTK);
    const storyId = route?.params?.storyId;


    const addFriends_api_handler = async () => {

        try {
            const responseData = await addFriends_api();
            setResponseapiFriends(responseData.data.users);
            return responseData;
        } catch (error) {
            console.log("err", error)
        }
    };
    useEffect(() => {
        addFriends_api_handler();
    }, []);

    const debonceApiCall = useRef(_.debounce(async (text) => {
        try {
            const responseData = await addFriends_api({ search: text });
            if (responseData?.data == null) {
                setIsNoFriends(false)
            } else {
                setIsNoFriends(true)
            }
            setResponseapiFriends(responseData.data?.users)
            return responseData
        } catch (error) {
            console.log("error=====", error)
        }
    }, 700)
    ).current;

    const handlenavigation = () => {
        navigation.navigate("ProfileScreens", { screen: "AddUrl" })
    };

    const lodashTextHandler = (text) => {
        setInputText(text)
        debonceApiCall(text)
    };

    return (
        <View style={{ height: responsiveHeight(100) }}>
            <ImageBackground style={styles.container} source={SPLASH_SCREEN_IMAGE}>
                {/* Frame Content Close----------- */}

                <View style={{ height: responsiveHeight(85), }}>
                    <View style={styles.first_container}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back_button}>
                            <Image style={styles.left_arrow} source={LEFT_ARROW_IMG} />
                        </TouchableOpacity>
                        <View style={styles.categories_text_container}>
                            <Text style={styles.categories_text}>Add Players</Text>
                        </View>
                    </View>

                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <View style={{ backgroundColor: "#FFF", borderRadius: 50, width: responsiveWidth(90), flexDirection: "row", alignItems: "center" }}>
                            <View style={{ paddingLeft: responsiveWidth(6), paddingHorizontal: moderateVerticalScale(10), paddingVertical: moderateVerticalScale(14), }}>
                                <Image style={{ width: responsiveWidth(6), height: responsiveHeight(3), }} source={SEARCH_ADD_ICON} />
                            </View>
                            <TextInput value={inputText} onChangeText={(text) => lodashTextHandler(text)} placeholder="Search" placeholderTextColor={"#393939"} style={{ color: "#000", width: 260 }} />
                        </View>
                    </View>

                    <ScrollView>
                        <View style={{ paddingTop: responsiveWidth(2), justifyContent: "center", alignItems: "center" }}>

                            <ScrollView>
                                {
                                    tagPlayersRTK?.map((item, index) => (
                                        <RemoveUsers_Categories
                                            key={item?.userid}
                                            item={item}
                                            userid={item.userid}
                                            username={item.username}
                                            type="tagFriends"
                                        />
                                    ))
                                }
                            </ScrollView>

                            <View style={[styles.categories_text_container2, { paddingTop: responsiveWidth(6) }]}>
                                <Text style={styles.categories_text}>Friends</Text>
                            </View>

                            <View style={{ paddingVertical: responsiveWidth(2), justifyContent: "center", alignItems: "center" }}>
                                {
                                    !isNoFriends ?
                                        (<View style={{ justifyContent: "center", alignItems: "center", height: responsiveHeight(50) }}>
                                            <Text style={{ fontSize: responsiveFontSize(3.5), color: PrimaryColor, textAlign: "center", fontFamily: PassionOne_Regular.passionOne }}>No Friends Found</Text>
                                        </View>)
                                        :
                                        ResponseapiFriends?.map((item, index) => {
                                            console.log("item====", item._id);
                                            return (
                                                <AddFriends_Categories
                                                    key={item?._id}
                                                    indexNo={index}
                                                    username={item?.username}
                                                    userchoice="Tag"
                                                    profileimage={SECOND_PROFILE}
                                                    item={item}
                                                    userid={item?._id}
                                                    storyId={storyId}
                                                    type="tagFriends"
                                                />
                                            )
                                        })
                                }
                            </View>
                        </View>
                    </ScrollView>
                </View>

                <View style={{ paddingTop: responsiveWidth(5) }}>
                    <TouchableButton onPress={handlenavigation} backgroundColor={TextColorGreen} text="Tag" color="#FFF" />
                </View>

            </ImageBackground>
        </View>


    )
}





const styles = StyleSheet.create({
    container: {
        height: responsiveHeight(100)
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
        color: '#E44173',
        fontSize: responsiveFontSize(2.4),
        fontWeight: '800',
        letterSpacing: 0.36,
        fontFamily: Inter_Regular.Inter_Regular
    },
    text_Input_container: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: moderateVerticalScale(2)
    },
    categories_text_container: {
        paddingHorizontal: moderateScale(20)
    },
    categories_text_container2: {
        width: responsiveWidth(90)
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
