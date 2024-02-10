import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SecondaryColor, ThirdColor } from '../../screens/Styles/Style';
import {
    responsiveHeight,
    responsiveFontSize,
    responsiveWidth,
} from 'react-native-responsive-dimensions';

const SaveStoryBtn = ({

    text,
    onPress,
    isNext

}) => {

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
                onPress={onPress}
                disabled={!isNext ? false : true}
                style={{
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>

                <Text
                    style={{
                        fontSize: responsiveFontSize(1.9),
                        fontWeight: '600',
                        letterSpacing: 0.28,
                        color: !isNext ? "rgba(57, 94, 102, 1)" : "rgba(57, 94, 102, 0.3)",
                    }}>
                    {text}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default SaveStoryBtn;
