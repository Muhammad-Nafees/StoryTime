import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {PassionOne_Regular} from '../../../constants/GlobalFonts';

const UserVoiceContent = ({isFirstCall, recordingText, started}) => {
  return (
    <>
      <ScrollView>
        <View style={{paddingHorizontal: moderateVerticalScale(35)}}>
          <Text
            style={{
              paddingTop: responsiveWidth(3),
              color: isFirstCall
                ? 'rgba(255,255,255,0.3)'
                : 'rgba(255,255,255,1)',
              fontSize: responsiveFontSize(2.2),
              lineHeight: 20,
              textAlign: 'center',
              fontFamily: PassionOne_Regular.passionOne,
            }}>
            {recordingText}
          </Text>
        </View>
      </ScrollView>

      <View>
        {!started && (
          <Text
            style={{
              paddingHorizontal: moderateScale(32),
              lineHeight: moderateScale(22),
              color: '#FFF',
              fontSize: responsiveFontSize(2.1),
              textAlign: 'center',
              fontFamily: PassionOne_Regular.passionOne,
            }}>
            Hold microphone icon and share your story
          </Text>
        )}
      </View>
    </>
  );
};

export default UserVoiceContent;
