import { View, StyleSheet } from 'react-native'
import React from 'react'
import { BlurView } from '@react-native-community/blur'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import SvgIcons from '../../svgIcon/svgIcons'

const BlurViewGuest = () => {
    return (
        <View style={styles.blur_wrapper}>
            {/* <BlurViewGuest /> */}
            <BlurView
                style={styles.blur_view}
                blurAmount={20}
                overlayColor="transparent">
                <View style={styles.blur_content_container}>
                    <View
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            justifyContent: 'center',
                            alignItems: 'center',
                            top: responsiveHeight(5),
                        }}>
                        <SvgIcons name={'Lock'} width={47} height={47} />
                    </View>
                </View>
            </BlurView>
        </View>
    )
}

const styles = StyleSheet.create({
    blur_view: {
        flex: 1,
    },
    blur_wrapper: {
        position: 'absolute',
        width: responsiveWidth(30),
        height: responsiveHeight(18.5),
        borderRadius: 10,
        overflow: 'hidden',
    },
    blur_content_container: {
        backgroundColor: 'transparent', //this is a hacky solution fo bug in react native blur to wrap childrens in such a view
    },
})
export default BlurViewGuest;
