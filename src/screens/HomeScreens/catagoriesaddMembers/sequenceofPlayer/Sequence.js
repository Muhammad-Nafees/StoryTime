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
import { PassionOne_Regular } from '../../../../constants/GlobalFonts'

const Sequence = () => {

    const { FIRSTSCREENPLAYFLOW } = NavigationsString;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { SPLASH_SCREEN_IMAGE } = Img_Paths;
    const counters = useSelector((state) => state?.SequencePlayer?.counters);
    const addedUsers = useSelector((state) => state.addPlayers.addFriends);
    const [randomNumbers, setRandomNumbers] = useState([])
    const { LEFT_ARROW_IMG } = Img_Paths;
    const [selectedIndices, setSelectedIndices] = useState([]);

    const handlePress = (index) => {
        const updatedIndices = [...selectedIndices];

        const selectedIndex = updatedIndices.indexOf(index);

        if (selectedIndex !== -1) {
            // If the index is already selected, remove it
            updatedIndices.splice(selectedIndex, 1);
        } else {
            // If the index is not selected, add it
            updatedIndices.push(index);
        }

        // Update the state with individual counts for each selected index
        const numberedIndices = updatedIndices.reduce((acc, val, idx) => {
            acc[val] = idx + 1;
            return acc;
        }, {});

        console.log("selecindex----", selectedIndex);
        console.log("updaed-----", numberedIndices);

        // Update the state
        setSelectedIndices(updatedIndices);
    };

    const handlesequence = () => {
        const allValuesSelected = selectedIndices.length === addedUsers.length;
        if (allValuesSelected) {
            navigation.navigate("PLayFlowScreens", {
                screen: FIRSTSCREENPLAYFLOW,
            })
        }
    };

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
                        addedUsers.map((item, index) => (
                            <>
                                <View key={index} style={{ paddingVertical: moderateVerticalScale(8), flexDirection: "row", justifyContent: 'space-between', width: responsiveWidth(90) }}>
                                    <TouchableOpacity onPress={() => handlePress(index)} activeOpacity={0.7} style={{ flexDirection: "row" }}>
                                        <View style={{ backgroundColor: TextColorGreen, justifyContent: "center", alignItems: "center", width: responsiveWidth(14), height: responsiveHeight(6), borderWidth: 4, borderRadius: 10, borderColor: TextColorGreen, flexDirection: 'row' }}>
                                            <Text style={{ color: "#FFF", fontFamily: PassionOne_Regular.passionOne, fontSize: responsiveFontSize(4) }}>
                                                {selectedIndices.includes(index) ? selectedIndices.indexOf(index) + 1 : ''}
                                            </Text>
                                            {/* <View style={{ justifyContent: "flex-end", alignItems: "center", height: responsiveHeight(2), paddingHorizontal: 2 }}>
                                                <View style={{ width: responsiveWidth(1.8), height: responsiveHeight(0.7), backgroundColor: "#FFF", borderRadius: 50 }} />
                                            </View> */}
                                        </View>
                                    </TouchableOpacity>

                                    <View style={{ width: responsiveWidth(71), borderLeftColor: "#000", borderLeftWidth: 4, backgroundColor: TextColorGreen, padding: moderateScale(14) }}>
                                        <Text style={{ color: "#FFFFFF", fontWeight: "500", fontSize: responsiveFontSize(1.9) }}>{item.username}</Text>
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
