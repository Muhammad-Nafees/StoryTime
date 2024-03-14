import React from 'react';
import { Image, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from '../../assets/Imagepaths';
import NavigationsString from '../../constants/NavigationsString';
import { useDispatch, useSelector } from 'react-redux';
import { setFriendId } from '../../../store/slices/addplayers/addPlayersSlice';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants/Constant';

const HomeHeader = () => {
    // Destructures
    const { STORY_TIME_IMG } = Img_Paths;
    const { ADD_FRIENDS } = NavigationsString;
  
    // Hooks
    const dispatch = useDispatch();
    const navigation = useNavigation();
  
    // Redux states
    const { user } = useSelector(state => state?.authSlice);
  
    // Constants
    const USER = user?.data?.user || user?.data;
  
    return (
        <View style={styles.header}>
            <View style={styles.logoContainer}>
                <Image style={[styles.img, styles.logo]} source={STORY_TIME_IMG} />
            </View>
            <View style={styles.iconsContainer}>
                <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate(ADD_FRIENDS)}>
                    <Image style={styles.iconImage} source={require('../../assets/plus-icon.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon} onPress={() => {
                    navigation.navigate('profileStack', { screen: 'Profile' });
                    dispatch(setFriendId(USER?._id)); // through route param
                }}>
                    <Image style={styles.iconImage} source={require('../../assets/avatar.png')} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default HomeHeader;

const styles = StyleSheet.create({
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
