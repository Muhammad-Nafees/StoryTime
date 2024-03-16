import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { PrimaryColor } from '../../../screens/Styles/Style'
import { SPACING } from '../../../constants/Constant'

const CustomLoader = () => {
    return (
        <View style={{ alignItems: 'center', paddingVertical: SPACING }}>
            <ActivityIndicator size={22} color={PrimaryColor} />
        </View>
    )
}

export default CustomLoader;
