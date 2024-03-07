import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { SecondaryColor, ThirdColor, TextColorGreen } from '../../screens/Styles/Style';
import {
    responsiveHeight,
    responsiveFontSize,
    responsiveWidth,
} from 'react-native-responsive-dimensions';

const SaveStoryBtn = ({

    text,
    onPress,
    isNext,
    isUserGuest,
    timeLeft,
    isDisabled

}) => {

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
                onPress={onPress}
                disabled={!isNext && timeLeft == 0 ? false : true || isDisabled}
                style={isUserGuest ? styles.guestWrapper : styles.wrapper}>

                <Text
                    style={{
                        fontSize: responsiveFontSize(1.9),
                        fontWeight: '600',
                        letterSpacing: 0.28,
                        paddingHorizontal: 14,
                        paddingVertical: 6,
                        color: isUserGuest ? "#FFF" : !isNext && timeLeft == 0 ? "rgba(57, 94, 102, 1)" : "rgba(57, 94, 102, 0.3)",
                    }}>
                    {text}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default SaveStoryBtn;

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    guestWrapper: {
        backgroundColor: TextColorGreen,
        width: responsiveWidth(70),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: responsiveHeight(6.6),

    }
});
