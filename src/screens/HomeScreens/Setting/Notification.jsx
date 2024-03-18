import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Switch } from 'react-native-switch';
import { Img_Paths } from '../../../assets/Imagepaths';
import { useNavigation } from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  FourthColor,
  SecondaryColor,
} from '../../Styles/Style';
import Typography from '../../../components/Typography';
import { notificationToggle } from '../../../../services/api/settings';
import BackgroundWrapper from '../../../components/reuseable-components/BackgroundWrapper';
import ScreenHeader from '../../../components/reuseable-components/ScreenHeader';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { Inter_Regular } from '../../../constants/GlobalFonts';

const NotificationOptBox = ({ title, sectionName = '' }) => {
  const [isEnabled, setIsEnabled] = useState(null);

  const titleToKeyMapping = {
    'System Notifications': 'systemNotification',
    'In-App Notifications': 'inAppNotifications',
    'Enable App Vibrations': 'appVibrations',
  };

  const key = titleToKeyMapping[title];

  const toggleSwitch = async (apiKey = null) => {
    setIsEnabled(previousState => !previousState)
    let response = await notificationToggle(apiKey)
    //console.log("responsekey",response,key)
  };

  const getInitialToggleValue = async () => {
    let response = await notificationToggle()
    setIsEnabled(response.data.settings[key])
  };

  useEffect(() => {
    getInitialToggleValue()
  }, []);


  return (
    <View style={styles.box_container}>
      <View style={styles.box}>
        {!!sectionName && (
          <Typography size={14} mb={moderateScale(10)}>
            {sectionName}
          </Typography>
        )}
        <View style={styles.row}>
          <Typography>{title}</Typography>
          {isEnabled !== null ?
            <Switch
              value={isEnabled}
              onValueChange={() => toggleSwitch(key)}
              circleSize={25}
              barHeight={15}
              backgroundActive={'#68AEBD'}
              backgroundInactive={'#D4D4D4'}
              circleActiveColor={'#2F4F56'}
              circleInActiveColor={'#68AEBD'}
              changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
              renderActiveText={false}
              renderInActiveText={false}
            /> : <ActivityIndicator />
          }
        </View>
      </View>
    </View>
  );
};

const Notification = () => {
  const navigation = useNavigation();
  const { LEFT_ARROW_IMG } = Img_Paths;

  return (
    <BackgroundWrapper>
      {/* <View style={styles.first_container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.back_button}>
          <Image style={styles.left_arrow} source={LEFT_ARROW_IMG} />
        </TouchableOpacity>
        <View style={styles.categories_text_container}>
          <Text style={styles.categories_text}>Notifications</Text>
        </View>
      </View> */}
        <ScreenHeader title={'Notifications'}/>

      <Typography style={styles.typography_spacing}>
        Control your notifications depending on your prefereces.
      </Typography>
      <Typography style={styles.typography_spacing} mb={moderateScale(20)}>
        If you disable this notification, you will not get notify when someone
        messages you.
      </Typography>
      <NotificationOptBox title={'System Notifications'} />
      <NotificationOptBox title={'In-App Notifications'} />
      <NotificationOptBox
        title={'Enable App Vibrations'}
        sectionName={'Vibrations'}
      />
    </BackgroundWrapper>
  );
};

export default Notification;

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
  typography_spacing: {
    paddingVertical: moderateVerticalScale(12),
    paddingHorizontal: moderateScale(20),
    fontFamily:Inter_Regular.Inter_Regular
  },
  box: {
    marginHorizontal: moderateScale(10),
    paddingVertical: moderateVerticalScale(30),

    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 2,
  },
  row: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    fontFamily:Inter_Regular.Inter_Regular
  },
  box_container: {
    marginHorizontal: moderateScale(20),
    backgroundColor: '#F3F3F3',
  },
});
