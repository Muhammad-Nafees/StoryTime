import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { Img_Paths } from '../../assets/Imagepaths';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { addFriends, addTagPlayers, removeUser, tagRemoveUsers } from '../../../store/slices/categoriesSlice/categoriesSlice';
import { tag_Friends } from '../../../services/api/profile';
import { removeContributors } from '../../../store/slices/categoriesSlice/categoriesSlice';

const RemoveUsers_Categories = ({
    item,
    userid,
    username,
    type,
    storyId
}) => {

    const dispatch = useDispatch();
    const removeFriends = useSelector((state) => state?.getcategories?.addFriends);
    console.log("removeFrieds===", removeFriends);
    console.log("userid===", userid);

    const { FIRST_PROFILE } = Img_Paths;

    const removeUsers = () => {
        if (type !== "tagFriends") {
            const removeuser = { userid, username }
            dispatch(removeUser(removeuser));
            // dispatch(removeContributors({ userid: userid }));
        } else {
            tagFriendsRemove()
        }
    };

    const tagFriendsRemove = async () => {
        const responseData = await tag_Friends({ userid, storyId });
        if (responseData) {
            const removeuser = { userid, username }
            dispatch(tagRemoveUsers(removeuser));
        }
        console.log("responseDataTag----", responseData)
        return responseData;
    }

    console.log("remvoeFriends------------- :", removeFriends);

    return (
        <>
            <View style={{ paddingVertical: moderateVerticalScale(3), flexDirection: "row", justifyContent: "space-between", width: responsiveWidth(90), alignItems: "center" }}>
                <View style={{ flexDirection: "row", width: responsiveWidth(31), justifyContent: "space-between", alignItems: "center" }}>
                    <Image style={{ width: responsiveWidth(11.5), height: responsiveHeight(5.5), resizeMode: "center" }} source={FIRST_PROFILE} />
                    <View style={{ width: responsiveWidth(45), paddingLeft: moderateScale(8), }}>
                        <Text style={{ color: "#000", fontWeight: "400", fontSize: responsiveFontSize(1.8) }}>{`@${item.username}`}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={removeUsers}>
                    <Text style={{ color: "#209BCC", fontSize: responsiveFontSize(1.9) }}>Remove</Text>
                </TouchableOpacity>
            </View>
        </>

    )
};

export default RemoveUsers_Categories;

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