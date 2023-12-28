import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { memo } from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

const FlatlistItems = ({ setIsOpenState, setCurrentValueState, item, cityloading }) => {
    return (
        <>
            <View>
                <TouchableOpacity onPress={() => {
                    setIsOpenState(false),
                        setCurrentValueState(item?.name)
                }
                }
                    style={{
                        width: responsiveWidth(65),
                        borderBottomWidth: 0.2,
                        height: responsiveHeight(5.4),
                        alignSelf: 'center',
                        borderColor: '#D0D0D0',
                        justifyContent: 'center',
                    }}>
                    <Text style={{ color: "#000" }}>{item?.name}</Text>
                </TouchableOpacity>
            </View>
        </>

    )
};

export default memo(FlatlistItems)
