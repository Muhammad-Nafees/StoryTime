import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { SecondaryColor, ThirdColor,TextColorGreen } from '../../screens/Styles/Style';
import {
    responsiveHeight,
    responsiveFontSize,
    responsiveWidth,
} from 'react-native-responsive-dimensions';

const SaveStoryBtn = ({

    text,
    onPress,
    isNext,
    isUserGuest

}) => {

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
                onPress={onPress}
                disabled={!isNext ? false : true}
                style={isUserGuest?styles.guestWrapper:styles.wrapper}>

                <Text
                    style={{
                        fontSize: responsiveFontSize(1.9),
                        fontWeight: '600',
                        letterSpacing: 0.28,
                        color: isUserGuest?"#FFF": !isNext ? "rgba(57, 94, 102, 1)" : "rgba(57, 94, 102, 0.3)",
                    }}>
                    {text}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default SaveStoryBtn;

const styles = StyleSheet.create({
    wrapper : {
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    guestWrapper : {
        backgroundColor:TextColorGreen,
        width:responsiveWidth(70),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: responsiveHeight(6.6),

    }
});
