import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { moderateVerticalScale } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import { setStoryUserImage } from '../../store/slices/addplayers/addPlayersSlice';
import { URL } from '../constants/Constant'
import { PassionOne_Regular } from '../constants/GlobalFonts';

const StoryUsers = ({ images, text, backgroundColor, mainbgColor, onPress, disabled, item, handleRandomClick }) => {
  const dispatch = useDispatch();
  const imageLink = URL + images;
console.log(imageLink)
  const handlePress = () => {
    if (!disabled) {
      onPress();
      dispatch(setStoryUserImage(imageLink));
    }
  };

  console.log("item---bg", item)

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
          backgroundColor: item?.namerandom === "Random" ? "rgba(238, 95, 138, 1)" : (item.background ? item.background :(backgroundColor?backgroundColor: "#56B6A4"))
        }}
        disabled={disabled}
      >
        {
          item?.namerandom == "Random" ?
            <Image
              style={{ width: 65, height: 65, borderRadius: 10 }}
              resizeMode="center"
              source={item?.imageludo}
            />
            :
            <Image
              style={{ width: 60, height: 60, borderRadius: 10 }}
              resizeMode="center"
              source={{ uri: imageLink }}
            />
        }
      </TouchableOpacity>
      <Text style={{ color: "#FFF", fontWeight: "400", fontSize: responsiveFontSize(1.9), letterSpacing: 0.4, fontFamily: PassionOne_Regular.passionOne, textAlign: "center", }}>{item?.namerandom == "Random" ? item?.namerandom : text}</Text>
    </View>
  );
};

export default StoryUsers;
