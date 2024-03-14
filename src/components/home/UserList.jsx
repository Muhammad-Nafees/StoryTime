import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
} from 'react-native';
import {PrimaryColor, SecondaryColor} from '../../screens/Styles/Style';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {PassionOne_Regular} from '../../constants/GlobalFonts';
import {useSelector} from 'react-redux';
import {addFriends_api} from '../../../services/api/add-members';
import {refresh_token_api} from '../../../services/api/auth_mdule/auth';
import {
  setFriendId,
  setRandomForProfileUpdate,
} from '../../../store/slices/addplayers/addPlayersSlice';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/Constant';
const UserList = () => {
    //states
    const [Responseapi, setResponseapi] = useState([]);
  
    //redux states
    const {user} = useSelector(state => state?.authSlice);
    const responseLogin = useSelector(state => state?.authSlice?.user);
  
    //consts
    const REFRESH_TOKEN = responseLogin?.data?.refreshToken;
  
    //effects
    useEffect(() => {
      addFriends_api_handler();
    }, []);
  
    //functions
    const addFriends_api_handler = async () => {
      try {
        const responseData = await addFriends_api();
        setResponseapi(responseData?.data?.users);
        if (responseData?.statusCode == 401) {
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
      console.log('randomNumbers :', randomNumbers);
  
      dispatch(setFriendId(friendId));
      navigation.navigate('profileStack', {
        screen: 'Profile',
      });
      console.log('friendId---- : ', friendId);
    };
  
    return (
      <>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>My Friend’s Story Time</Text>
        </View>
  
        <View style={styles.flatlistContainer}>
          <FlatList
            data={Responseapi}
            scrollEnabled={true}
            horizontal
            renderItem={({item}) => {
              console.log('item---- :', item?._id);
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
            }}
          />
        </View>
      </>
    );
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: SecondaryColor,
      width: '100%',
      height: '100%',
      flex: 1,
    },
    header: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: responsiveWidth(5),
      flexDirection: 'row',
      width: responsiveWidth(90),
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logoContainer: {
      width: SCREEN_WIDTH * 0.23,
      height: SCREEN_HEIGHT * 0.075,
    },
    iconsContainer: {
      flexDirection: 'row',
    },
    icon: {
      paddingHorizontal: moderateVerticalScale(8),
    },
    titleContainer: {
      width: responsiveWidth(94),
      marginLeft: 'auto',
      marginVertical: responsiveWidth(1.5),
      marginTop: responsiveWidth(6),
    },
    title: {
      color: PrimaryColor,
      fontSize: responsiveFontSize(3),
      fontFamily: PassionOne_Regular.passionOne,
    },
    flatlistContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: responsiveWidth(95),
      marginLeft: 'auto',
    },
    friendContainer: {
      justifyContent: 'center',
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
    loadingContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      height: SCREEN_HEIGHT / 1.5,
    },
    noDataContainer: {
      position: 'absolute',
      top: 300,
      left: 45,
      alignItems: 'center',
      justifyContent: 'center',
      height: SCREEN_HEIGHT / 20,
    },
    noDataText: {
      color: PrimaryColor,
      fontSize: responsiveFontSize(3.5),
      fontFamily: PassionOne_Regular.passionOne,
    },
    img: {
      resizeMode: 'center',
    },
    logo: {
      width: SCREEN_WIDTH * 0.23,
      height: SCREEN_HEIGHT * 0.075,
    },
    iconImage: {
      width: SCREEN_WIDTH * 0.11,
      height: SCREEN_HEIGHT * 0.05,
    },
  });

  export default UserList