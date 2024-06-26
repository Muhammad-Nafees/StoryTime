import React from 'react';
import {
  View,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Img_Paths } from '../../../assets/Imagepaths';
import ListView from '../../../components/ListView';
import { useNavigation } from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useSelector } from 'react-redux';
import { base } from '../../../../services';
import LogoutBtn from '../../../components/LogoutBtn';
import Typography from '../../../components/Typography';
import SvgIcons from '../../../components/svgIcon/svgIcons';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import NavigationsString from '../../../constants/NavigationsString';
import {SecondaryColor, FourthColor} from '../../Styles/Style';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

const { width, height } = Dimensions.get('window');

const Setting = () => {
  const navigation = useNavigation();
  const { LEFT_ARROW_IMG, DEFAULT_ICON } = Img_Paths;
  const { NOTIFICATION, SUBSCRIPTION_DETAILS, FAQ_ROUTE, BLOCK_USER, PROFILE, DELETE_ACCOUNT} =
    NavigationsString;
  const { user } = useSelector(state => state?.authSlice);

  console.log("user", user)
  const generalData = [
    { key: '1', text: 'Profile', iconName: 'ProfileIcon', routeName: PROFILE },
    {
      key: '2',
      text: 'Notifications',
      iconName: 'Notifications',
      routeName: NOTIFICATION,
    },
    { key: '3', text: 'Payment Settings', iconName: 'PaymentSettings' },
    {
      key: '4',
      text: 'Subscriptions',
      iconName: 'Subscription',
      routeName: SUBSCRIPTION_DETAILS,
    },
    { key: '5', text: 'Report a problem', iconName: 'ReportAProblem' },
    {
      key: '6',
      text: 'Block Users',
      iconName: 'BlockUser',
      routeName: BLOCK_USER,
    },
    { key: '7', text: 'Delete Account', iconName: 'DeleteAccount' },
  ];
  const legalData = [
    {
      key: '8',
      text: 'Terms & Conditions',
      iconName: 'TermsConditions',
      stack: 'GuestStack',
      routeName: 'TermsAndConditions',
    },
    {
      key: '9',
      text: 'Privacy Policy',
      iconName: 'PrivacyPolicy',
      stack: 'GuestStack',
      routeName: 'PrivacyAndPolicy',
    },
    { key: '10', text: 'FAQ', iconName: 'FAQ', routeName: FAQ_ROUTE },
  ];

  const USER = user?.data?.user || user?.data;

  return (
    <BackgroundWrapper>
      <View style={styles.first_container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.back_button}>
          <Image style={styles.left_arrow} source={LEFT_ARROW_IMG} />
        </TouchableOpacity>
        <View style={styles.categories_text_container}>
          <Typography style={styles.categories_text}>Settings</Typography>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: responsiveWidth(6),
          width: width - 50,
        }}>
        <View style={{ flexDirection: 'row', marginBottom: responsiveWidth(4) }}>
          <Image
            style={{ width: 57, height: 57, borderRadius: 100 }}
            source={USER?.profileImage ? { uri: `${base}${USER?.profileImage}` } : DEFAULT_ICON}
            // source={USER?.profileImage ? USER?.profileImage:DEFAULT_ICON}
            resizeMode={'contain'}
          />

          <View style={{ marginLeft: responsiveWidth(3) }}>
            <Typography
              style={{
                fontSize: 14,
                fontWeight: 600,
                marginTop: responsiveWidth(3),
              }}>
              {USER?.username}
            </Typography>
            <Typography style={{ fontSize: 12, fontWeight: 600 }}>
              {USER?.email}
            </Typography>
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.3}
          onPress={() => navigation.navigate(PROFILE)}>
          <View style={styles.svgIcon}>
            <SvgIcons name={'PencilIcon'} width={18} height={18} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.listView}>
        <Typography
          style={{
            fontWeight: '400',
            fontSize: 14,
            marginBottom: responsiveWidth(4),
          }}>
          GENERAL
        </Typography>
        <FlatList
          data={generalData}
          renderItem={({ item, index }) => (
            <ListView
              item={item}
              isLastItem={index !== generalData.length - 1}
            />
          )}
          keyExtractor={item => item.key}
        />
      </View>
      <View style={styles.listView}>
        <Typography
          style={{
            fontWeight: '400',
            fontSize: 14,
            marginBottom: responsiveWidth(4),
          }}>
          LEGAL TERMS
        </Typography>

        <FlatList
          data={legalData}
          renderItem={({ item, index }) => (
            <ListView item={item} isLastItem={index !== legalData.length - 1} />
          )}
          keyExtractor={item => item.key}
        />
      </View>
      <LogoutBtn />
    </BackgroundWrapper>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    backgroundColor: SecondaryColor,
    flex: 1,
  },
  first_container: {
    paddingTop: responsiveWidth(6),
    paddingVertical: moderateVerticalScale(12),
    flexDirection: 'row',
    marginLeft: 'auto',
    width: responsiveWidth(95),
    alignItems: 'center',
  },
  back_button: {
    borderRadius: 10,
    width: responsiveWidth(12.9),
    height: responsiveHeight(6.3),
    backgroundColor: '#395E66',
    justifyContent: 'center',
    alignItems: 'center',
  },
  left_arrow: {
    width: responsiveWidth(5),
    height: responsiveHeight(2.5),
    resizeMode: 'center',
  },
  categories_text: {
    color: FourthColor,
    fontSize: responsiveFontSize(2.4),
    fontWeight: '600',
    letterSpacing: 0.36,
  },
  categories_text_container: {
    paddingHorizontal: moderateScale(20),
  },
  listView: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginHorizontal: responsiveWidth(6),
  },
  svgIcon: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});
