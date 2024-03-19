import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import BackButton from '../../components/reusable-components/addplayer/customBackButton/BackButton';
import { Img_Paths } from '../../assets/Imagepaths';
import { useNavigation } from '@react-navigation/native';


import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { Inter_SemiBold } from '../../constants/GlobalFonts';

const ScreenHeader = ({ title, clr }) => {

  const navigation = useNavigation();
  const { LEFT_ARROW_IMG } = Img_Paths;

  return (
    <View style={{ width: responsiveWidth(95), marginLeft: 'auto' }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: moderateVerticalScale(16),
          paddingTop: responsiveWidth(8),
        }}>
        <BackButton
          onPress={() => navigation.goBack()}
          leftarrow={LEFT_ARROW_IMG}
        />
        <View style={{ paddingHorizontal: moderateScale(14) }}>
          <Text
            style={{
              color: clr || '#000',
              fontWeight: '600',
              fontSize: responsiveFontSize(2.5),
              fontFamily: Inter_SemiBold.Inter_SemiBold,
            }}>
            {title}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default ScreenHeader

const styles = StyleSheet.create({})
