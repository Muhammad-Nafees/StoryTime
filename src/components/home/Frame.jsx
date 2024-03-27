import React from 'react';
import {
  Text,
  View,
  Image,
  Linking,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { Img_Paths } from '../../assets/Imagepaths';
import { SCREEN_WIDTH } from '../../constants/Constant';
import LinearGradient from 'react-native-linear-gradient';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { PassionOne_Regular } from '../../constants/GlobalFonts';
import { SecondaryColor, TextColorGreen } from '../../screens/Styles/Style';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';

const Frame = ({ item }) => {
  // destructure
  const { HOME_FRAME } = Img_Paths;
  const {
    type,
    creator: { username },
    content,
    subCategory: { image: subCategoryimage } = {},
    subCategory: { name: subCategoryname } = {},
  } = item || {};
  // const
  const profileImage = require('../../assets/avatar-inn.png');

  // functions
  const linkTo = async url => {

    try {
      if (!(await InAppBrowser.isAvailable())) {
        Linking.openURL(url); // If the in-app browser is not available, open the link in the device's default browser
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ImageBackground
      style={styles.img_backgroung_content}
      resizeMode="contain"
      source={HOME_FRAME}>
      <View style={styles.bg_content}>
        {type === 'text' && (
          <LinearGradient
            colors={['rgba(234, 137, 167, 1)', 'rgba(0,0,0,0.4)']}
            start={{ x: 1, y: 1 }}
            end={{ x: 1, y: 0 }}
            locations={[0.8, 1]}
            style={styles.child_bg}>
            <View style={styles.second_childbg}>
              <View style={styles.third_childbg}>
                <Image style={styles.child_bg_img} source={profileImage} />
                <Text style={styles.username}>{username}</Text>
              </View>
              <ScrollView>
                <View style={styles.text_container}>
                  <Text style={styles.content_text}>{content}</Text>
                </View>
              </ScrollView>
            </View>
          </LinearGradient>
        )}

        {type === 'video' && (
          <LinearGradient
            colors={['rgba(234, 137, 167, 1)', 'rgba(0,0,0,0.4)']}
            start={{ x: 1, y: 1 }}
            end={{ x: 1, y: 0 }}
            locations={[0.8, 1]}
            style={styles.child_bg}>
            <View style={styles.second_childbg}>
              <View style={styles.third_childbg}>
                <Image style={styles.child_bg_img} source={profileImage} />
                <Text style={styles.username}>{username}</Text>
              </View>
            </View>

            <View style={styles.video_buttons}>
              <View style={styles.subCategoryimageContainer}>
                <Image
                  style={styles.subCategoryimage}
                  source={{
                    uri:
                      'http://storytime.yameenyousuf.com/' + subCategoryimage,
                  }}
                />
                <Text style={styles.subCategoryname}>{subCategoryname}</Text>
              </View>

              <TouchableOpacity
                onPress={() => linkTo(content)}
                style={styles.url_button}>
                <Image
                  style={styles.url_icon}
                  source={require('../../assets/profileurl_icon.png')}
                />
                <Text style={styles.url_text}>Url</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  img_backgroung_content: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_WIDTH * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  subCategoryimageContainer: {
    width: responsiveWidth(46),
    borderRadius: 10,
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: '#56B6A4',
    alignItems: 'center',
    paddingHorizontal: moderateVerticalScale(10),
    height: responsiveHeight(7),
    marginVertical: moderateVerticalScale(10),
  },
  bg_content: {
    backgroundColor: TextColorGreen,
    justifyContent: 'center',
    alignItems: 'center',
    width: responsiveWidth(78),
    marginLeft: responsiveWidth(1),
    marginTop: responsiveWidth(0.5),
    height: SCREEN_WIDTH * 0.595,
  },
  child_bg: {
    width: responsiveWidth(71),
    height: responsiveHeight(28),
    marginTop: responsiveWidth(2),
    borderRadius: 18,
  },
  second_childbg: {
    marginLeft: 'auto',
    width: responsiveWidth(69),
  },
  third_childbg: {
    flexDirection: 'row',
    width: responsiveWidth(40),
    alignItems: 'center',
    paddingVertical: moderateVerticalScale(8),
  },
  child_bg_img: {
    width: responsiveWidth(6.25),
    height: responsiveHeight(3.5),
    resizeMode: 'center',
  },
  username: {
    paddingLeft: moderateScale(12),
    color: SecondaryColor,
    fontSize: responsiveFontSize(1.7),
    fontWeight: '600',
  },
  text_container: {
    paddingTop: responsiveWidth(3),
  },
  content_text: {
    fontSize: responsiveWidth(3.7),
    color: SecondaryColor,
    lineHeight: 16,
  },
  subCategoryimage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  subCategoryname: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: responsiveFontSize(2.2),
    fontFamily: PassionOne_Regular.passionOne,
  },
  video_buttons: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: responsiveWidth(4),
  },
  url_button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: responsiveWidth(4),
  },
  url_icon: {
    width: 30,
    height: 30,
    resizeMode: 'center',
  },
  url_text: {
    color: '#FFF',
    fontWeight: '300',
    fontSize: responsiveFontSize(1.8),
    paddingVertical: moderateVerticalScale(6),
  },
});

export default Frame;
