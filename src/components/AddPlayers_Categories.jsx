import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useId, useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { Img_Paths } from '../assets/Imagepaths';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { allusers, getAllUsers } from '../../store/slices/storyfeedslices/getAllUsersSlice';
import { followandUnfollow, followunfollow } from '../../store/slices/storyfeedslices/followUnfollowSlice';
import { follow_unfollow_api } from '../../services/api/storyfeed';


const AddFriends_Categories = ({ profileimage, username, userchoice, item, userid }) => {

    const dispatch = useDispatch();
    // console.log("item========", item)
    // console.log("username===", username)
    // console.log("userid===", userid)
    const [previousData, setPreviousData] = useState([])

    const addFriendHandler = () => {
        if (username && userid) {
            previousData.push({ username, userid })
            setPreviousData((PrevData) => PrevData)
        };

        console.log("previousData=======", previousData)
        // console.log("friendaArryy", FriendsArray)
    };

    return (
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

    )
};

export default AddFriends_Categories;