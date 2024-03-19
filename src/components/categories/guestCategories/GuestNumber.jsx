
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { moderateVerticalScale } from 'react-native-size-matters'
import SvgIcons from '../../svgIcon/svgIcons'
import { Inter_Regular } from '../../../constants/GlobalFonts'


const GuestNumber = ({ guestNumber }) => {
    return (
        <View style={{ marginTop: moderateVerticalScale(10) }}>
            <View
                style={{
                    marginBottom: 'auto',
                    marginTop: 'auto',
                    marginLeft: 5,
                }}>
                <SvgIcons name={'Guest'} width={36} height={36} />
            </View>
            <Text style={styles.text}>Guest{guestNumber}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 10,
        color: 'black',
        textAlign: 'center',
        fontFamily: Inter_Regular.Inter_Regular,
    },
})

export default GuestNumber;
