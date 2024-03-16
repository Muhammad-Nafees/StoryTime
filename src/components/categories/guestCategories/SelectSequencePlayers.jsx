import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Inter_Medium, PassionOne_Regular } from '../../../constants/GlobalFonts'
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

const SelectSequencePlayers = ({
    bgColor,
    selectedIndices,
    handlePress,
    index,
    item
}) => {
    return (
        <View
            style={{
                paddingVertical: moderateVerticalScale(8),
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: responsiveWidth(90),
            }}>
            <TouchableOpacity
                onPress={() => handlePress(index)}
                activeOpacity={0.7}
                style={{ flexDirection: 'row' }}>
                <View
                    style={{
                        backgroundColor: selectedIndices.includes(index)
                            ? bgColor
                            : 'transparent',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: responsiveWidth(14),
                        height: responsiveWidth(14),
                        borderWidth: 4,
                        borderRadius: 10,
                        borderColor: bgColor,
                        flexDirection: "row"
                    }}>
                    <Text
                        style={{
                            color: '#FFF',
                            fontFamily: PassionOne_Regular.passionOne,
                            fontSize: responsiveFontSize(4),
                        }}>{selectedIndices.includes(index) ? selectedIndices.indexOf(index) + 1 : ''}
                    </Text>

                    <View style={{ justifyContent: "flex-end", alignItems: "center", height: responsiveHeight(2.5), paddingHorizontal: 2 }}>
                        <View style={{ width: responsiveWidth(1.9), height: responsiveHeight(0.7), backgroundColor: "#FFF", borderRadius: 50 }} />
                    </View>

                </View>
            </TouchableOpacity>

            <View
                style={{
                    width: responsiveWidth(71),
                    borderLeftColor: '#000',
                    borderLeftWidth: 4,
                    backgroundColor: bgColor,
                    padding: moderateScale(14),
                }}>
                <Text
                    style={{
                        color: '#FFFFFF',
                        fontWeight: '500',
                        fontSize: responsiveFontSize(1.9),
                        fontFamily: Inter_Medium.Inter_Medium
                    }}>
                    {`@${item?.username}`}
                </Text>
            </View>
        </View>

    )
}

export default SelectSequencePlayers;
