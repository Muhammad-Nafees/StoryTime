
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions'
import { useNavigation } from '@react-navigation/native'
import { Img_Paths } from '../../assets/Imagepaths'
import RandomIcon from '../svgIcon/RandomIcon'
import BackButton from '../BackButton'

const HeaderSequence = ({ handleShuffle }) => {
    const navigation = useNavigation();
    const { LEFT_ARROW_IMG } = Img_Paths;

    return (
        <View
            style={{
                paddingVertical: moderateVerticalScale(18),
                paddingTop: responsiveWidth(5),
                flexDirection: 'row',
                width: responsiveWidth(90),
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <BackButton
                    backimage={LEFT_ARROW_IMG}
                    onPress={() => navigation.goBack()}
                />
                <Text
                    style={{
                        color: '#E44173',
                        fontSize: responsiveFontSize(2.2),
                        paddingHorizontal: moderateScale(10),
                        fontWeight: '600',
                    }}>
                    Sequence
                </Text>
            </View>
            <TouchableOpacity
                onPress={handleShuffle}
                style={{
                    borderRadius: 10,
                    width: responsiveWidth(12.9),
                    height: responsiveHeight(6.3),
                    backgroundColor: '#395E66',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <RandomIcon />
                {/* ---------- */}
            </TouchableOpacity>
        </View>
    )
}

export default HeaderSequence;
