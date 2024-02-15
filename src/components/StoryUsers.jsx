import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { moderateVerticalScale } from 'react-native-size-matters';
import { TextColorGreen } from '../screens/Styles/Style';
import { useDispatch } from 'react-redux';
import { setStoryUserImage } from '../../store/slices/addplayers/addPlayersSlice';
import SvgIcons from './svgIcon/svgIcons';

const StoryUsers = ({ images, text, backgroundColor, mainbgColor, onPress, disabled }) => {
  const dispatch = useDispatch();
  const imageLink = "http://storytime.yameenyousuf.com/" + images;

  const handlePress = () => {
    if (!disabled) {
      onPress();
      dispatch(setStoryUserImage(imageLink));
    }
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity
        onPress={handlePress}
        style={{
          marginVertical: moderateVerticalScale(10),
          borderRadius: 10,
          width: responsiveWidth(25),
          height: responsiveHeight(11),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:'#56B6A4',
        }}
        disabled={disabled}
      >
    {disabled && (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
            {/* You can replace the following Text with an Image component or your lock icon */}
            <View style={{ marginTop: 'auto', marginBottom: 'auto',}}>
            <SvgIcons name={'Lock'} width={47} height={47} />
          </View>   
        </View>
        )}
        <Image
          style={{ width: 90, height: 80, borderRadius: 10 }}
          resizeMode="cover"
          source={{ uri: imageLink }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default StoryUsers;
