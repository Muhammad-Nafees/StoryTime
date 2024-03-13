import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';



const CustomButton = ({

  text,
  onPress,
  backgroundColor,
  color,
  borderWidth,
  isLoading,
  setIsLoading,
  type,
  isValid,
  dirty,
  timeLeft,
  sequenceUser,
  selectedIndices,
  validate,
  values,
  StatusCodeSuccess

}) => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        disabled={
          type === 'register' && StatusCodeSuccess ? false :
            type === "login" ? false :
              type === "forgetemail" && StatusCodeSuccess ? false :
                type === "optForget" ? false :
                  type === "registeruserInfo" ? false :
                    type === "backuser" ? false :
                      type === "addPlayers" ? false :
                        type === "sequence" ? false :
                          type === "tagFriends" ? false :
                            type === "tag" ? false :
                              type == "savestoryphone" ? false :
                                type == "registerFirst" && !validate(values) ? true :
                                  type == "registerpassword" && !validate(values) ? true :
                                    false
        }
        onPress={onPress}
        style={{
          width:
            type == 'savestoryphone'
              ? responsiveWidth(70)
              : responsiveWidth(80),
          backgroundColor:
            selectedIndices?.length === sequenceUser?.length
              ? backgroundColor
              : 'rgba(57, 94, 102, 0.3)',
          borderRadius: 10,
          borderWidth: borderWidth == '1' ? 1 : 0,
          borderColor: borderWidth == '1' ? '#395E66' : null,
          justifyContent: 'center',
          alignItems: 'center',
          height: responsiveHeight(6.6),
        }}>
        {isLoading ? (
          <ActivityIndicator color={'#FFF'} />
        ) : (
          <Text
            style={{
              fontSize: responsiveFontSize(1.9),
              fontWeight: '600',
              letterSpacing: 0.28,
              color: color,
            }}>
            {text}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
