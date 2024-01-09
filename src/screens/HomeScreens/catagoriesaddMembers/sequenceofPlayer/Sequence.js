import { View, Text, Image, TouchableOpacity, ScrollView, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import BackButton from '../../../../components/BackButton'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import NavigationsString from '../../../../constants/NavigationsString'
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters'
import { Img_Paths } from '../../../../assets/Imagepaths'
import { TextColorGreen } from '../../../Styles/Style'
import TouchableButton from '../../../../components/TouchableButton'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { UpdateSequencePlayers } from '../../../../../store/slices/SequencePlayer'

const Sequence = () => {

    const { FIRSTSCREENPLAYFLOW } = NavigationsString;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { SPLASH_SCREEN_IMAGE } = Img_Paths;
    const counters = useSelector((state) => state?.SequencePlayer?.counters);
    const { LEFT_ARROW_IMG } = Img_Paths;



    const handlePress = (index) => {

        const newCounters = [...counters];
        if (newCounters[index] === null) {
            const existingValues = new Set(newCounters.filter(Boolean)); // Get existing values
            const availableValues = [1, 2, 3, 4,].filter((value) => !existingValues.has(value)); // Get available values
            if (availableValues.length > 0) {
                newCounters[index] = availableValues[0];
            }
        } else {
            newCounters[index] = null;
        }
        dispatch(UpdateSequencePlayers(newCounters));
    };



    const handlesequence = () => {
        const filterlength = counters.filter(Boolean).length;
        if (filterlength === counters.length) {
            navigation.navigate("PLayFlowScreens", {
                screen: FIRSTSCREENPLAYFLOW,
            })
        }
    };



    const sequenceplayers = [
        {
            text: "@Cedrick101",
            backgroundColor: TextColorGreen,
            textindex: counters[0],
            id: 0
        },
        {
            text: "@Cedrick101",
            backgroundColor: TextColorGreen,
            textindex: counters[1],
            id: 1
        }
        ,
        {
            text: "@Cedrick101",
            backgroundColor: TextColorGreen,
            textindex: counters[2],
            id: 2
        },
        {
            text: "@oliverpierce",
            backgroundColor: "#E44173",
            textindex: counters[3],
            id: 3
        },
    ];



    return (
        <ImageBackground source={SPLASH_SCREEN_IMAGE} style={{ height: "100%", width: "100%" }}>
            <View style={{ justifyContent: "center", alignItems: "center", }}>
                <View style={{ paddingVertical: moderateVerticalScale(18), paddingTop: responsiveWidth(5), flexDirection: "row", width: responsiveWidth(90), justifyContent: "space-between", alignItems: "center" }}>
                    <View style={{ flexDirection: "row", alignItems: "center", }}>
                        <BackButton backimage={LEFT_ARROW_IMG} onPress={() => navigation.goBack()} />
                        <Text style={{ color: "#E44173", fontSize: responsiveFontSize(2.2), paddingHorizontal: moderateScale(10), fontWeight: "600" }}>Sequence</Text>
                    </View>

                    <TouchableOpacity style={{
                        borderRadius: 10,
                        width: responsiveWidth(12.9),
                        height: responsiveHeight(6.3),
                        backgroundColor: "#395E66",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Image style={{
                            width: responsiveWidth(8),
                            height: responsiveHeight(4),
                            resizeMode: "center"
                        }} source={require("../../../../assets/subCategory/sequence-dice.png")} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={{ height: responsiveHeight(72) }}>
                    {
                        sequenceplayers.map((item, index) => (
                            <>
                                <View key={index} style={{ paddingVertical: moderateVerticalScale(8), flexDirection: "row", justifyContent: 'space-between', width: responsiveWidth(90) }}>
                                    <TouchableOpacity onPress={() => handlePress(index)} activeOpacity={0.7} style={{ flexDirection: "row" }}>
                                        <View style={{ backgroundColor: item.textindex ? item.backgroundColor : null, justifyContent: "center", alignItems: "center", width: responsiveWidth(13), height: responsiveHeight(6), borderWidth: 4, borderRadius: 10, borderColor: item.backgroundColor, flexDirection: 'row' }}>
                                            <Text style={{ color: "#FFF", fontWeight: "700", fontSize: responsiveFontSize(2.5) }}>{item.textindex}</Text>
                                            <View style={{ justifyContent: "flex-end", alignItems: "center", height: responsiveHeight(2), paddingHorizontal: 2 }}>
                                                <View style={{ width: responsiveWidth(1.8), height: responsiveHeight(0.7), backgroundColor: "#FFF", borderRadius: 50 }} />
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                    <View style={{ width: responsiveWidth(73), borderLeftColor: "#000", borderLeftWidth: 4, backgroundColor: item.backgroundColor, padding: moderateScale(14) }}>
                                        <Text style={{ color: "#FFFFFF", fontWeight: "500", fontSize: responsiveFontSize(1.9) }}>{item.text}</Text>
                                    </View>
                                </View>
                            </>
                        ))
                    }
                </ScrollView>

                <View>
                    <TouchableButton onPress={() => handlesequence()} backgroundColor={TextColorGreen} text="Next" color="#FFF" />
                </View>

            </View>
        </ImageBackground>

    )
};


export default Sequence;
