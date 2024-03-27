import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFriends,
  addTagPlayers,
  userId
} from '../../../../store/slices/categoriesSlice/categoriesSlice';
import { playerContributorsIds } from '../../../../store/slices/categoriesSlice/categoriesSlice';
import { tag_Friends } from '../../../../services/api/profile';


const AddFriends_Categories = ({
  profileimage,
  username,
  userchoice,
  userid,
  type,
  storyId,

}) => {

  const addedUsers = useSelector(state => state.getcategories.addFriends);
  const isUserAdded = addedUsers.some(user => user.userid === userid);
  const { playerscontributorsIds } = useSelector((state) => state?.getcategories)
  const tagPlayersRTK = useSelector((state) => state.getcategories?.addTagPlayers)
  const isAddedtagPlayers = tagPlayersRTK.some(user => user.userid === userid);
  const { user } = useSelector(state => state?.authSlice);

  console.log("isAddedtagPlayers----- :", isAddedtagPlayers);
  console.log("PLAYER_CONTRIBUTORS----- :", playerscontributorsIds);

  const dispatch = useDispatch();

  const addFriendHandler = () => {
    if (type !== "tagFriends") {
      const friend = { username, userid };
      dispatch(addFriends(friend));
      dispatch(playerContributorsIds(userid));
      dispatch(userId(userid));
    } else {
      tag_FriendsApi_Handler();
    }
  };

  console.log("addIdsCOntributors", playerscontributorsIds);

  const tag_FriendsApi_Handler = async () => {
    const responseData = await tag_Friends({ userid, storyId });
    if (responseData) {
      dispatch(addTagPlayers({ username, userid }))
    }
    console.log("responseDataTag----", responseData)
    return responseData;
  };

  return (
    <>
      {
        type !== "tagFriends" ? !isUserAdded && (
          <View
            style={{
              paddingVertical: moderateVerticalScale(3),
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: responsiveWidth(90),
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: responsiveWidth(31),
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  width: responsiveWidth(11.5),
                  height: responsiveHeight(5.5),
                  resizeMode: 'center',
                }}
                source={profileimage}
              />
              <View
                style={{
                  width: responsiveWidth(45),
                  paddingLeft: moderateScale(8),
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontWeight: '400',
                    fontSize: responsiveFontSize(1.8),
                  }}>{`@${username}`}</Text>
              </View>
            </View>

            <TouchableOpacity onPress={() => addFriendHandler()}>
              <Text style={{ color: '#209BCC', fontSize: responsiveFontSize(1.9) }}>
                {userchoice}
              </Text>
            </TouchableOpacity>
          </View>
        )
          :
          !isAddedtagPlayers && (
            <View
              style={{
                paddingVertical: moderateVerticalScale(3),
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: responsiveWidth(90),
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: responsiveWidth(31),
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    width: responsiveWidth(11.5),
                    height: responsiveHeight(5.5),
                    resizeMode: 'center',
                  }}
                  source={profileimage}
                />
                <View
                  style={{
                    width: responsiveWidth(45),
                    paddingLeft: moderateScale(8),
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontWeight: '400',
                      fontSize: responsiveFontSize(1.8),
                    }}>{`@${username}`}</Text>
                </View>
              </View>

              <TouchableOpacity onPress={() => addFriendHandler()}>
                <Text style={{ color: '#209BCC', fontSize: responsiveFontSize(1.9) }}>
                  {userchoice}
                </Text>
              </TouchableOpacity>
            </View>
          )
      }


    </>
  );
};

export default AddFriends_Categories;

const styles = StyleSheet.create({
  categories_text_container: {
    paddingHorizontal: moderateScale(20),
  },
  categories_text: {
    color: '#E44173',
    fontSize: responsiveFontSize(2.4),
    fontWeight: '600',
    letterSpacing: 0.36,
  },
});
