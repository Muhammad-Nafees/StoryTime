import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { TextColorGreen } from '../../../screens/Styles/Style';
import { Inter_Regular } from '../../../constants/GlobalFonts';

const CustomHeaderTimer = ({
    isCancelingStory,
    timeText,
    user,
    GuestModalRefForAds,
    modalOpen
}) => {
    const navigation = useNavigation();
    return (
        <View
            style={{
                paddingVertical: moderateVerticalScale(18),
                paddingHorizontal: moderateScale(22),
            }}>
            <View
                style={{
                    paddingTop: responsiveWidth(5),
                    flexDirection: 'row',
                    width: isCancelingStory
                        ? responsiveWidth(60)
                        : responsiveWidth(90),
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ width: responsiveWidth(10) }}>
                    <Image
                        style={{
                            width: responsiveWidth(5),
                            height: responsiveHeight(2.5),
                            resizeMode: 'center',
                        }}
                        source={require('../../../assets/back-playflowicon.png')}
                    />
                </TouchableOpacity>

                <View style={{}}>
                    {isCancelingStory ? (
                        <View
                            style={{
                                borderWidth: 4,
                                borderColor: 'rgba(255, 153, 166, 1)',
                                borderRadius: 8,
                            }}>
                            <LinearGradient
                                colors={['rgba(255, 164, 164, 0.8)', '#FFFFFF']}
                                start={{ x: 1, y: 0.5 }}
                                end={{ x: 1, y: 0 }}
                                locations={[0, 1]}
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingVertical: moderateVerticalScale(10),
                                    paddingHorizontal: moderateScale(12),
                                }}>
                                <Text
                                    style={{
                                        fontWeight: '600',
                                        color: TextColorGreen,
                                        fontSize: responsiveFontSize(2),
                                    }}>
                                    Time: {timeText}
                                </Text>
                            </LinearGradient>
                        </View>
                    ) : !user ? (
                        <TouchableOpacity
                            onPress={() => {
                                modalOpen(
                                    GuestModalRefForAds,
                                    'Support Story Time',
                                    'Watch the add to continue playing',
                                    'Watch ads',
                                    'Subscribe for Ad FREE experience',
                                );
                            }}
                            style={{
                                borderRadius: 10,
                                borderWidth: 4,
                                borderColor: TextColorGreen,
                                backgroundColor: TextColorGreen,
                                paddingVertical: moderateVerticalScale(6),
                                paddingHorizontal: moderateScale(25),
                            }}>
                            <Text
                                style={{
                                    color: 'white',
                                    fontWeight: '400',
                                    fontSize: responsiveFontSize(1.9),
                                    fontFamily: Inter_Regular.Inter_Regular,
                                }}>
                                Done
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <></>
                    )}
                </View>
            </View>
        </View>
    )
}

export default CustomHeaderTimer;
