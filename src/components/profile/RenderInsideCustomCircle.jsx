import { View, Text } from 'react-native'
import React from 'react'


const RenderInsideCustomCircle = () => {
    return (
        <>
            <View style={{ marginLeft: 20 }}>
                <View style={{ width: 21, height: 21, borderRadius: 50, backgroundColor: "#FFF" }} />
            </View>
        </>
    )
}

export default RenderInsideCustomCircle;
