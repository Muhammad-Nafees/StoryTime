import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {PrimaryColor, SecondaryColor} from '../../Styles/Style';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {Img_Paths} from '../../../assets/Imagepaths';
import FeedChatFrame from '../../../components/home/FeedChatFrame';
import {useNavigation} from '@react-navigation/native';
import {PassionOne_Regular} from '../../../constants/GlobalFonts';
import {addFriends_api} from '../../../../services/api/add-members';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../constants/Constant';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

const FeedChat = () => {
  //hooks
  const navigation = useNavigation();

  //detructures
  const {STORY_TIME_IMG, SPLASH_SCREEN_IMAGE} = Img_Paths;

  //states
  const [ResponseapiChat, setResponseapiChat] = useState([]);

  //consts
  const AVATAR = require('../../../assets/avatar.png');
  const PLUS_ICON = require('../../../assets/plus-icon.png');
  const FIRST_IMG = require('../../../assets/first-img.png');
  const AVATAR_IN = require('../../../assets/avatar-inn.png');

  //effects
  useEffect(() => {
    addFriends_api_handler();
  }, []);

  //functions
  const addFriends_api_handler = async () => {
    try {
      const responseData = await addFriends_api();
      setResponseapiChat(responseData?.data?.users);
      return responseData;
    } catch (error) {
      console.log('err', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView>
        <ImageBackground style={styles.container} source={SPLASH_SCREEN_IMAGE}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Image style={styles.headerImage} source={STORY_TIME_IMG} />
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity
                onPress={() => navigation.navigate('AddFiends')}
                style={styles.plusButton}>
                <Image style={styles.plusIcon} source={PLUS_ICON} />
              </TouchableOpacity>
              <View style={styles.avatarContainer}>
                <Image style={styles.avatar} source={AVATAR} />
              </View>
            </View>
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>My Friend’s Story Time</Text>
          </View>

          <View style={styles.flatlistContainer}>
            <FlatList
              data={ResponseapiChat}
              scrollEnabled={true}
              horizontal
              renderItem={({item}) => {
                return (
                  <View style={styles.flatlistItem}>
                    <TouchableOpacity style={styles.friendButton}>
                      <Image style={styles.friendImage} source={FIRST_IMG} />
                    </TouchableOpacity>
                    <Text style={styles.friendName}>{item?.firstName}</Text>
                  </View>
                );
              }}
            />
          </View>

          {/* Frame Content Start----------- */}
          <View>
            <FeedChatFrame type="lilibeth" profileImage={AVATAR_IN} />
          </View>
          {/* Frame Content Close----------- */}
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FeedChat;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    backgroundColor: SecondaryColor,
    width: '100%',
    height: '100%',
    flex: 1,
  },
  header: {
    paddingTop: responsiveWidth(4),
    flexDirection: 'row',
    width: responsiveWidth(90),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerImage: {
    width: SCREEN_WIDTH * 0.23,
    height: SCREEN_HEIGHT * 0.075,
  },
  plusButton: {
    paddingHorizontal: moderateVerticalScale(8),
  },
  plusIcon: {
    width: SCREEN_WIDTH * 0.11,
    height: SCREEN_HEIGHT * 0.05,
  },
  avatarContainer: {},
  avatar: {
    width: SCREEN_WIDTH * 0.1,
    height: SCREEN_HEIGHT * 0.05,
    resizeMode: 'center',
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
  flatlistItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  friendButton: {
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
