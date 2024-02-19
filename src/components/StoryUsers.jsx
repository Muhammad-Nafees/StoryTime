import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { moderateVerticalScale } from 'react-native-size-matters';
import { TextColorGreen } from '../screens/Styles/Style';
import { useDispatch } from 'react-redux';
import { setStoryUserImage } from '../../store/slices/addplayers/addPlayersSlice';
import SvgIcons from './svgIcon/svgIcons';

const StoryUsers = ({ images, text, backgroundColor, mainbgColor, onPress, disabled, item, handleRandomClick }) => {
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
        onPress={item?.namerandom == "Random" ? handleRandomClick : handlePress}
        style={{
          marginVertical: moderateVerticalScale(10),
          borderRadius: 10,
          width: responsiveWidth(25),
          height: responsiveHeight(11),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: item?.namerandom == "Random" && "rgba(238, 95, 138, 1)"
        }}
        disabled={disabled}
      >
        {
          item?.namerandom == "Random" ?
            <Image
              style={{ width: 70, height: 57, borderRadius: 10 }}
              resizeMode="center"
              source={item?.imageludo}
            />
            :
            <Image
              style={{ width: 90, height: 80, borderRadius: 10 }}
              resizeMode="cover"
              source={{ uri: imageLink }}
            />
        }
      </TouchableOpacity>
      <Text style={{ color: "#FFF", fontWeight: "700", fontSize: responsiveFontSize(1.9) }}>{item?.namerandom == "Random" ? item?.namerandom : text}</Text>
    </View>
  );
};

export default StoryUsers;
