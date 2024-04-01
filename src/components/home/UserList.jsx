/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {
  setFriendId,
  setRandomForProfileUpdate,
} from '../../../store/slices/categoriesSlice/categoriesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { PrimaryColor } from '../../screens/Styles/Style';
import { PassionOne_Regular } from '../../constants/GlobalFonts';
import { addFriends_api } from '../../../services/api/add-members';
import { refresh_token_api } from '../../../services/api/auth_mdule/auth';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';

const UserList = () => {
  // States
  const [Responseapi, setResponseapi] = useState([]);

  // Redux states
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const responseLogin = useSelector(state => state?.authSlice?.user);

  // Consts
  const REFRESH_TOKEN = responseLogin?.data?.refreshToken;

  // Effects
  useEffect(() => {
    addFriends_api_handler();
  }, []);

  // Functions
  const addFriends_api_handler = async () => {
    try {
      const responseData = await addFriends_api();
      setResponseapi(responseData?.data?.users);
      if (responseData?.statusCode === 401) {
        const responseToken = await refresh_token_api(REFRESH_TOKEN);
        console.log('responseTokenfunc-----', responseToken);
        return responseToken;
      }
      return responseData;
    } catch (error) {
      console.log('err', error);
    }
  };

  const handleFriends = friendId => {
    const randomNumbers = Math.floor(Math.random() * 100);
    dispatch(setRandomForProfileUpdate(randomNumbers));

    dispatch(setFriendId(friendId));
    navigation.navigate('profileStack', {
      screen: 'Profile',
    });
    console.log('friendId---- : ', friendId);
  };

  //render functions

  const renderItem = ({ item }) => {
    return (
      <View style={styles.friendContainer}>
        <TouchableOpacity
          onPress={() => handleFriends(item?._id)}
          style={styles.friendImageContainer}>
          <Image
            style={styles.friendImage}
            source={require('../../assets/first-img.png')}
          />
        </TouchableOpacity>
        <Text style={styles.friendName}>{item?.firstName}</Text>
      </View>
    );
  };

  return (
    <>
      {!!Responseapi?.length && (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>My Friend’s Story Time</Text>
        </View>
      )}
      <FlatList horizontal data={Responseapi} renderItem={renderItem} />
    </>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    width: responsiveWidth(95),
    marginLeft: "auto",
    paddingTop: responsiveWidth(6),

  },
  title: {
    color: PrimaryColor,
    fontSize: responsiveFontSize(3),
    fontFamily: PassionOne_Regular.passionOne,
  },
  friendContainer: {
    alignItems: 'center',
  },
  friendImageContainer: {
    alignItems: 'center',
    paddingVertical: moderateVerticalScale(6),
    paddingHorizontal: moderateScale(12),
  },
  friendImage: {
    width: responsiveWidth(15.2),
    height: responsiveHeight(7.7),
    resizeMode: 'center',
  },
  friendName: {
    color: PrimaryColor,
    fontWeight: '600',
    fontSize: responsiveFontSize(1.8),
    textTransform: 'capitalize',
  },
});

export default UserList;
