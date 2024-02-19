import { moderateScale, scale, moderateVerticalScale } from 'react-native-size-matters';
import { Platform, Dimensions } from 'react-native';

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;
export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';

export const VERTICAL = moderateVerticalScale(10)
export const SPACING = moderateScale(SCREEN_WIDTH*0.035)
export const URL =  "http://storytime.yameenyousuf.com/" 