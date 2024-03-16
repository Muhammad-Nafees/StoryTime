// imports from libraries
import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
// imports from components
import { Inter_Regular } from '../../constants/GlobalFonts'
import { moderateScale } from 'react-native-size-matters';
import { moderateVerticalScale } from 'react-native-size-matters';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';


const ShowAddedPlayers = () => {
    // redux state 
    const addUsersGame = useSelector(state => state.addPlayers.addFriends);

    return (
        <View
            style={{
                paddingVertical: moderateVerticalScale(6),
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <View
                style={{
                    width: responsiveWidth(90),
                    flexDirection: 'row',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                }}>
                <View>
                    <Text
                        style={{
                            color: '#393939',
                            fontWeight: '600',
                            textAlign: 'center',
                            fontSize: responsiveHeight(1.9),
                            fontFamily: Inter_Regular.Inter_Regular,
                        }}>
                        Players:
                    </Text>
                </View>

                {addUsersGame?.map((item) => (
                    <View
                        style={{
                            margin: 4,
                            backgroundColor: '#395E66',
                            paddingHorizontal: moderateScale(14),
                            paddingVertical: moderateVerticalScale(4.5),
                            borderRadius: 40,
                        }}>
                        <Text
                            style={{
                                color: '#FFF',
                                fontSize: responsiveFontSize(1.9),
                                fontFamily: Inter_Regular.Inter_Regular,
                            }}>{`@${item.username}`}</Text>
                    </View>
                ))}
            </View>
        </View>
    )
};

export default ShowAddedPlayers;
