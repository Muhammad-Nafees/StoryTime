import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import Typography from '../reusable-components/Typography';
import { Switch } from 'react-native-switch';
import { Inter_Regular } from '../../constants/GlobalFonts';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { notificationToggle } from '../../../services/api/settings';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';

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
          <Typography size={12} mb={moderateScale(10)}>
            {sectionName}
          </Typography>
        )}
        <View style={styles.row}>
          <Typography size={12} >{title}</Typography>
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
              innerCircleStyle={{
                borderColor: isEnabled ? '#2F4F56' : '#68AEBD'
              }}
            /> : <ActivityIndicator />
          }
        </View>
      </View>
    </View>
  );
};

export default NotificationOptBox

const styles = StyleSheet.create({
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
    fontFamily: Inter_Regular.Inter_Regular
  },
  box_container: {
    marginHorizontal: moderateScale(20),
    backgroundColor: '#F3F3F3',
    paddingHorizontal: responsiveWidth(3)
  },
});
