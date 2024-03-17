// imports libraries
import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet, ScrollView, TextInput, ActivityIndicator } from 'react-native'
import { PrimaryColor, TextColorGreen, } from '../../Styles/Style';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import _ from 'lodash';
// imports components and fuctions

import { Img_Paths } from '../../../assets/Imagepaths';
import CustomButton from '../../../components/reusable-components/CustomButton/CustomButton';
import AddFriends_Categories from '../../../components/reusable-components/addplayer/AddPlayers_Categories';
import { addFriends_api } from '../../../../services/api/add-members';
import RemoveUsers_Categories from '../../../components/RemoveUsers_Categories';
import { PassionOne_Regular } from '../../../constants/GlobalFonts';


const AddPlayers = () => {
    const { SPLASH_SCREEN_IMAGE, LEFT_ARROW_IMG, SEARCH_ADD_ICON, FIRST_PROFILE, } = Img_Paths;
    const { height, } = Dimensions.get("window")
    const [responseApi, setresponseApi] = useState([]);
    const navigation = useNavigation();
    const addedUsers = useSelector((state) => state.addPlayers.addFriends);
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const addFriends_api_handler = async () => {
            setIsLoading(true);
            try {
                const responseData = await addFriends_api();
                console.log(responseData, "RESPONSE FROM ADDFRIENDS");
                setresponseApi(responseData.data);
                setIsLoading(false);
                return responseData;
            } catch (error) {
                console.log("err", error)
            }
        };
        addFriends_api_handler();
    }, [])

    const debonceApiCall = useRef(_.debounce(async (text) => {
        try {
            const responseData = await addFriends_api({ search: text });
            setresponseApi(responseData.data)
            return responseData
        } catch (error) {
            console.log("error=====", error)
        }
    }, 700)
    ).current;

    const lodashTextHandler = (text) => {
        setInputText(text)
        debonceApiCall(text)
    };

    const handlenavigation = () => {
        navigation.navigate("Categories");
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
                                    <RemoveUsers_Categories
                                        key={`added_users_${item?.userid}`}
                                        item={item}
                                        userid={item.userid}
                                        username={item.username}
                                    />
                                ))
                            }
                        </ScrollView>

                        <View style={[styles.categories_text_container2, { paddingTop: responsiveWidth(6) }]}>
                            <Text style={styles.categories_text}>Friends</Text>
                        </View>

                        <ScrollView>
                            {
                                responseApi === null ?
                                    (<View style={{ justifyContent: "center", alignItems: "center", height: responsiveHeight(50) }}>
                                        <Text style={{ fontSize: responsiveFontSize(3.5), color: "#E44173", textAlign: "center", fontFamily: PassionOne_Regular.passionOne }}>No Friends Found</Text>
                                    </View>)
                                    : isLoading ?
                                        <View style={{ justifyContent: "center", alignItems: 'center', height: height / 2 }}>
                                            <ActivityIndicator size={24} color={PrimaryColor} />
                                        </View>
                                        :
                                        responseApi?.users?.map((item, index) => {
                                            console.log("index====", index);
                                            return (
                                                <AddFriends_Categories
                                                    key={`friends_${item?._id}`}
                                                    indexNo={index}
                                                    username={item?.username}
                                                    userchoice="Add"
                                                    profileimage={FIRST_PROFILE}
                                                    item={item}
                                                    userid={item?._id}
                                                />
                                            )
                                        })
                            }
                        </ScrollView>

                    </View>
                </ScrollView>
            </View>

            <View style={{ paddingTop: responsiveWidth(5) }}>
                <CustomButton
                    onPress={handlenavigation}
                    backgroundColor={TextColorGreen}
                    type={"addPlayers"}
                    text="Add" color="#FFF" />
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


})


export default AddPlayers;
