import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions
} from 'react-native';
import {Img_Paths} from '../../../assets/Imagepaths';
import ListView from '../../../components/ListView';
import {useNavigation} from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import SvgIcons from '../../../components/svgIcon/svgIcons';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import NavigationsString from '../../../constants/NavigationsString';
import {SecondaryColor, FourthColor, Red02 } from '../../Styles/Style';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

const {width, height} = Dimensions.get('window');

const Setting = () => {
  const navigation = useNavigation();
  const {LEFT_ARROW_IMG ,SETTING_USER} = Img_Paths;
  const { NOTIFICATION, SUBSCRIPTION_DETAILS, FAQ_ROUTE, BLOCK_USER } = NavigationsString;


  const generalData = [
    {key: '1', text: 'Profile', iconName: 'ProfileIcon'},
    {key: '2', text: 'Notifications', iconName: 'Notifications',routeName: NOTIFICATION},
    {key: '3', text: 'Payment Settings', iconName: 'PaymentSettings'},
    {key: '4', text: 'Subscriptions', iconName: 'Subscription',routeName: SUBSCRIPTION_DETAILS},
    {key: '5', text: 'Report a problem', iconName: 'ReportAProblem'},
    {key: '6', text: 'Block Users', iconName: 'BlockUser',routeName: BLOCK_USER},
    {key: '7', text: 'Delete Account', iconName: 'DeleteAccount'},
  ];
  const legalData = [
    {key: '8', text: 'Terms & Conditions', iconName: 'TermsConditions',stack:'GuestStack',routeName:'TermsAndConditions'},
    {key: '9', text: 'Privacy Policy', iconName: 'PrivacyPolicy',stack:'GuestStack',routeName:'PrivacyAndPolicy'},
    {key: '10', text: 'FAQ', iconName: 'FAQ',routeName: FAQ_ROUTE},
  ];

  return (
    <BackgroundWrapper>
      <View style={styles.first_container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.back_button}>
          <Image style={styles.left_arrow} source={LEFT_ARROW_IMG} />
        </TouchableOpacity>
        <View style={styles.categories_text_container}>
          <Text style={styles.categories_text}>Settings</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: responsiveWidth(6),
          width:width-50,
        }}>
        <View style={{flexDirection: 'row', marginBottom: responsiveWidth(4)}}>
          <Image
            style={{width: 57, height: 57}}
            source={SETTING_USER}
            resizeMode = {'contain'}
          />
          <View style={{marginLeft: responsiveWidth(3)}}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 600,
                marginTop: responsiveWidth(3),
              }}>
              Oliver Pierce
            </Text>
            <Text style={{fontSize: 12, fontWeight: 600}}>
              oliverpierce@gmail.com
            </Text>
          </View>
        </View>
        <TouchableOpacity
        activeOpacity={0.3}>
        <View style={styles.svgIcon}>
          <SvgIcons name={'PencilIcon'} width={18} height={18} />
        </View>
        </TouchableOpacity>
      </View>
      <View style={styles.listView}>
        <Text
          style={{
            fontWeight: '400',
            fontSize: 14,
            marginBottom: responsiveWidth(4),
          }}>
          GENERAL
        </Text>
        <FlatList
          data={generalData}
          renderItem={({item, index}) => (
            <ListView
              item={item}
              isLastItem={index !== generalData.length - 1} 
            />
          )}
          keyExtractor={item => item.key}
        />
      </View>
      <View style={styles.listView}>
        <Text
          style={{
            fontWeight: '400',
            fontSize: 14,
            marginBottom: responsiveWidth(4),

          }}>
          LEGAL TERMS
        </Text>

        <FlatList
          data={legalData}
          renderItem={({item, index}) => (
            <ListView item={item} isLastItem={index !== legalData.length - 1}/>
          )}
          keyExtractor={item => item.key}
        />
      </View>
      <TouchableOpacity 
      activeOpacity={0.3}
      style={styles.btn}>
        <Text style={styles.txt}>Log out</Text>
      </TouchableOpacity>
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
  btn: {
    marginTop: 10,
    borderRadius: 5,
    paddingVertical: 10,
    backgroundColor: Red02,
    width:width-70,
    alignSelf:"center"
  },
  svgIcon:{
    marginTop:"auto",
    marginBottom:"auto",
    },
  txt: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: 'white',
  },
});