import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet, FlatList, ScrollView, TextInput } from 'react-native'
import { PrimaryColor, SecondaryColor, TextColorGreen, ThirdColor, pinkColor } from '../../Styles/Style';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from '../../../assets/Imagepaths';
import NavigationsString from '../../../constants/NavigationsString';
import TouchableButton from '../../../components/TouchableButton';
import AddFriends_Categories from '../../../components/AddPlayers_Categories';
import { addFriends_api } from '../../../../services/api/add-members';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import RemoveUsers_Categories from '../../../components/RemoveUsers_Categories';
import { Inter_Regular } from '../../../constants/GlobalFonts';


const AddPlayers = () => {
    const { SPLASH_SCREEN_IMAGE, LEFT_ARROW_IMG, SEARCH_ADD_ICON, FIRST_PROFILE, } = Img_Paths;
    const { ADD_FRIENDS } = NavigationsString;
    const [Responseapi, setResponseapi] = useState([]);
    const navigation = useNavigation();
    const addedUsers = useSelector((state) => state.addPlayers.addFriends);
    const { CATEGORIES } = NavigationsString;
    const [isNoFriends, setIsNoFriends] = useState(true);
    const [inputText, setInputText] = useState("");


    const addFriends_api_handler = async () => {
        try {
            const responseData = await addFriends_api();
            setResponseapi(responseData.data.users);
            console.log("Responseapi----", Responseapi);
            return responseData;
        } catch (error) {
            console.log("err", error)
        }
    };

    const removeAdduserList = (responseData) => {
        let AddList = Responseapi.filter(item => item._id !== responseData.userid)
        setResponseapi(AddList);
    };

    const debonceApiCall = useRef(_.debounce(async (text) => {
        try {
            const responseData = await addFriends_api({ search: text });
            if (responseData?.data == null) {
                setIsNoFriends(false)
            } else {
                setIsNoFriends(true)
            }
            setResponseapi(responseData.data?.users)
            return responseData
        } catch (error) {
            console.log("error=====", error)
        }
    }, 700)
    ).current;

    useEffect(() => {
        addFriends_api_handler();
    }, []);

    const lodashTextHandler = (text) => {
        setInputText(text)
        debonceApiCall(text)
    };

    const handlenavigation = () => {
        navigation.navigate(CATEGORIES);
    };

    return (

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
                                addedUsers?.map((item, index) => (
                                    <RemoveUsers_Categories key={item?.userid} item={item} userid={item.userid} username={item.username} />
                                ))
                            }
                        </ScrollView>

                        <View style={[styles.categories_text_container2, { paddingTop: responsiveWidth(6) }]}>
                            <Text style={styles.categories_text}>Friends</Text>
                        </View>

                        <ScrollView>
                            {
                                !isNoFriends ?
                                    (<View style={{ justifyContent: "center", alignItems: "center", height: responsiveHeight(50) }}>
                                        <Text style={{ fontSize: 22, color: "#000", textAlign: "center", fontFamily: Inter_Regular.Inter_Regular }}>No Friends Found</Text>
                                    </View>)
                                    :
                                    Responseapi?.map((item, index) => {
                                        console.log("index====", index);
                                        return (
                                            <AddFriends_Categories key={item?._id} indexNo={index} username={item?.username} userchoice="Add" profileimage={FIRST_PROFILE} item={item} userid={item?._id} removeAdduserList={removeAdduserList} />
                                        )
                                    })
                            }
                        </ScrollView>

                    </View>
                </ScrollView>
            </View>

            <View style={{ paddingTop: responsiveWidth(5) }}>
                <TouchableButton onPress={handlenavigation} backgroundColor={TextColorGreen} text="Add" color="#FFF" />
            </View>

        </ImageBackground>

    )
};



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
    categories_text_container2: {
        width: responsiveWidth(90)
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


export default AddPlayers;
