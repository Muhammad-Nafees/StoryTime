import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SecondaryColor, ThirdColor } from '../screens/Styles/Style';
import {
    responsiveHeight,
    responsiveFontSize,
    responsiveWidth,
} from 'react-native-responsive-dimensions';

const SaveStoryBtn = ({
    text,
    onPress,
    backgroundColor,
    timeLeft,
    color
}) => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
                onPress={onPress}
                // disabled={timeLeft == 0 ? false : true}
                style={{
                    // width: responsiveWidth(80),
                    borderRadius: 10,
                    // borderColor: '#395E66',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // height: responsiveHeight(6.6),
                }}>

                <Text
                    style={{
                        fontSize: responsiveFontSize(1.9),
                        fontWeight: '600',
                        letterSpacing: 0.28,
                        color: "rgba(57, 94, 102, 1)",
                    }}>
                    {text}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default SaveStoryBtn;
