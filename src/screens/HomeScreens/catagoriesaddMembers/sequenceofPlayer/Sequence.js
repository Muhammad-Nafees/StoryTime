import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import BackButton from '../../../../components/BackButton'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import NavigationsString from '../../../../constants/NavigationsString'
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters'
import { Img_Paths } from '../../../../assets/Imagepaths'
import { TextColorGreen } from '../../../Styles/Style'
import TouchableButton from '../../../../components/TouchableButton'
import { useNavigation } from '@react-navigation/native'
import FirstScreenPlayFlow from '../../playslowscreens/FirstScreenPlayFlow'


const Sequence = () => {

    const { FIRSTSCREENPLAYFLOW } = NavigationsString;
    const [isSequence, setIsSequence] = useState(false);
    const [counters, setCounters] = useState([null, null, null, null]);
    const [initialClick, setInitialClick] = useState(false);
    const navigation = useNavigation()

    const { LEFT_ARROW_IMG } = Img_Paths;

    const handlePress = (index) => {

        const newCounters = [...counters];

        if (newCounters[index] === null) {
            const existingValues = new Set(newCounters.filter(Boolean)); // Get existing values
            console.log("existingvalues---", existingValues)
            const availableValues = [1, 2, 3, 4].filter((value) => !existingValues.has(value)); // Get available values
            console.log("avaiablevalues", availableValues)
            if (availableValues.length > 0) {
                newCounters[index] = availableValues[0];
            }
        } else {
            newCounters[index] = null;
        }
        setCounters(newCounters);
    };



    const handlesequence = () => {
        const filterlength = counters.filter(Boolean).length
        if (filterlength > 3) {
            navigation.navigate("PLayFlowScreens", {
                screen: FIRSTSCREENPLAYFLOW
            })
        }
    }



    return (

        <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View style={{ paddingVertical: moderateVerticalScale(18), paddingTop: responsiveWidth(5), flexDirection: "row", width: responsiveWidth(90), justifyContent: "space-between", alignItems: "center" }}>
                <View style={{ flexDirection: "row", alignItems: "center", }}>
                    <BackButton backimage={LEFT_ARROW_IMG} />
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

            <View style={{ paddingVertical: 8, flexDirection: "row", justifyContent: 'space-between', width: responsiveWidth(90) }}>

                <TouchableOpacity onPress={() => handlePress(0)} activeOpacity={0.7} style={{ backgroundColor: counters[0] ? TextColorGreen : null, justifyContent: "center", alignItems: "center", width: 45, height: 45, borderWidth: 4, borderRadius: 10, borderColor: TextColorGreen }}>
                    <Text style={{ color: "#FFF" }}>{counters[0]}</Text>
                </TouchableOpacity>

                <View style={{ width: responsiveWidth(73), borderLeftColor: "#000", borderLeftWidth: 4, backgroundColor: TextColorGreen, padding: moderateScale(14) }}>
                    <Text style={{ color: "#FFFFFF", fontWeight: "500", fontSize: responsiveFontSize(1.9) }}>@Cedrick101</Text>
                </View>
            </View>

            <View style={{ paddingVertical: 8, flexDirection: "row", justifyContent: 'space-between', width: responsiveWidth(90) }}>
                <TouchableOpacity onPress={() => handlePress(1)} activeOpacity={0.7} style={{ backgroundColor: counters[1] ? TextColorGreen : null, justifyContent: "center", alignItems: "center", width: 45, height: 45, borderWidth: 4, borderRadius: 10, borderColor: TextColorGreen }}>
                    <Text style={{ color: "#FFF" }}>{counters[1]}</Text>
                </TouchableOpacity>
                <View style={{ width: responsiveWidth(73), borderLeftColor: "#000", borderLeftWidth: 4, backgroundColor: TextColorGreen, padding: moderateScale(14) }}>
                    <Text style={{ color: "#FFFFFF", fontWeight: "500", fontSize: responsiveFontSize(1.9) }}>@Cedrick101</Text>
                </View>
            </View>

            <View style={{ paddingVertical: 8, flexDirection: "row", justifyContent: 'space-between', width: responsiveWidth(90) }}>
                <TouchableOpacity onPress={() => handlePress(2)} activeOpacity={0.7} style={{ backgroundColor: counters[2] ? TextColorGreen : null, justifyContent: "center", alignItems: "center", width: 45, height: 45, borderWidth: 4, borderRadius: 10, borderColor: TextColorGreen }}>
                    <Text style={{ color: "#FFFFFF" }}>{counters[2]}</Text>
                </TouchableOpacity>
                <View style={{ width: responsiveWidth(73), borderLeftColor: "#000", borderLeftWidth: 4, backgroundColor: TextColorGreen, padding: moderateScale(14) }}>
                    <Text style={{ color: "#FFFFFF", fontWeight: "500", fontSize: responsiveFontSize(1.9) }}>@Cedrick101</Text>
                </View>
            </View>


            <View style={{ flexDirection: "row", justifyContent: 'space-between', width: responsiveWidth(90) }}>
                <TouchableOpacity onPress={() => handlePress(3)} activeOpacity={0.7} style={{ backgroundColor: counters[3] ? "#E44173" : null, justifyContent: "center", alignItems: "center", width: 45, height: 45, borderWidth: 4, borderRadius: 10, borderColor: "#E44173" }}>
                    <Text style={{ color: "#FFFFFF" }}>{counters[3]}</Text>
                </TouchableOpacity>
                <View style={{ width: responsiveWidth(73), borderLeftColor: "#000", borderLeftWidth: 4, backgroundColor: "#E44173", padding: moderateScale(14) }}>
                    <Text style={{ color: "#FFFFFF", fontWeight: "500", fontSize: responsiveFontSize(1.9) }}>@oliverpierce</Text>
                </View>
            </View>



            {/* Third User */}

            {/* <View style={{ paddingVertical: moderateVerticalScale(14), flexDirection: "row", justifyContent: 'space-between', width: responsiveWidth(90) }}>
                <TouchableOpacity onPress={() => handlePress()} activeOpacity={0.7} style={{ justifyContent: "center", alignItems: "center", width: 45, height: 45, borderWidth: 4, borderRadius: 10, borderColor: TextColorGreen }}>
                    {
                        isSequence &&
                        <Text style={{ color: "#FFF", }}></Text>
                    }
                </TouchableOpacity>

                <View style={{ width: responsiveWidth(73), borderLeftColor: "#000", borderLeftWidth: 4, backgroundColor: TextColorGreen, padding: moderateScale(14) }}>
                    <Text style={{ color: "#FFFFFF", fontWeight: "500", fontSize: responsiveFontSize(1.9) }}>@alfred</Text>
                </View>
            </View> */}

            {/* Fourth User */}

            {/* <View style={{ flexDirection: "row", justifyContent: 'space-between', width: responsiveWidth(90) }}>
                <TouchableOpacity onPress={() => handlePress()} activeOpacity={0.7} style={{ justifyContent: "center", alignItems: "center", width: 45, height: 45, borderWidth: 4, borderRadius: 10, borderColor: TextColorGreen }}>
                    {
                        isSequence &&
                        <Text style={{ color: "#FFF", }}></Text>
                    }
                </TouchableOpacity>

                <View style={{ width: responsiveWidth(73), borderLeftColor: "#000", borderLeftWidth: 4, backgroundColor: TextColorGreen, padding: moderateScale(14) }}>
                    <Text style={{ color: "#FFFFFF", fontWeight: "500", fontSize: responsiveFontSize(1.9) }}>@oliverpierce</Text>
                </View>
            </View> */}

            <View style={{ paddingTop: responsiveWidth(85), }}>
                <TouchableButton onPress={() => handlesequence()} backgroundColor={TextColorGreen} text="Next" color="#FFF" />
            </View>
        </View>

    )
};


export default Sequence;
