import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { Img_Paths } from '../assets/Imagepaths';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { addFriends, userId } from '../../store/slices/addplayers/addPlayersSlice';
import { playerContributorsIds } from '../../store/slices/getCategoriesSlice';

const AddFriends_Categories = ({ profileimage, username, userchoice, userid, indexNo, removeAdduserList }) => {

    const dispatch = useDispatch();
    const [friendsArr, setFriendsArr] = useState([]);

    console.log("userid----", userid)

    const addFriendHandler = () => {
        const friend = { username, userid, };
        dispatch(addFriends(friend));
        dispatch(userId(userid));
        dispatch(playerContributorsIds(userid));
        removeAdduserList(friend);
        console.log("Add-button-Pressed")
    };


    return (

        <>
            <View style={{ paddingVertical: moderateVerticalScale(3), flexDirection: "row", justifyContent: "space-between", width: responsiveWidth(90), alignItems: "center" }}>
                <View style={{ flexDirection: "row", width: responsiveWidth(31), justifyContent: "space-between", alignItems: "center" }}>
                    <Image style={{ width: responsiveWidth(11.5), height: responsiveHeight(5.5), resizeMode: "center" }} source={profileimage} />
                    <View style={{ width: responsiveWidth(45), paddingLeft: moderateScale(8), }}>
                        <Text style={{ color: "#000", fontWeight: "400", fontSize: responsiveFontSize(1.8) }}>{`@${username}`}</Text>
                    </View>
                </View>

                <TouchableOpacity onPress={() => addFriendHandler()}>
                    <Text style={{ color: "#209BCC", fontSize: responsiveFontSize(1.9) }}>{userchoice}</Text>
                </TouchableOpacity>
            </View>

        </>

    )
};

export default AddFriends_Categories;

const styles = StyleSheet.create({
    categories_text_container: {
        paddingHorizontal: moderateScale(20)
    },
    categories_text: {
        color: "#E44173",
        fontSize: responsiveFontSize(2.4),
        fontWeight: "600",
        letterSpacing: 0.36
    },
})
