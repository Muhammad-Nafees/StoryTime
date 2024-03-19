import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { TextColorGreen } from '../../../screens/Styles/Style'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters'
import UserNames from '../../UserNames'
import { Camera } from 'react-native-vision-camera'
import { Img_Paths } from '../../../assets/Imagepaths'

const MainContentVideo = ({
    showCamera,
    activeCamera,
    started,
    cameraPermission,
    cameraRef,
    isActive,
    toggleCamera,
    user,
    currentDisplayUser

}) => {
    const { PLAYFLOW_FRAME } = Img_Paths;

    return (

        <View>
            <ImageBackground
                style={styles.img_backgroung_content}
                resizeMode="stretch"
                source={PLAYFLOW_FRAME}>
                <View
                    activeOpacity={0.9}
                    style={[styles.bg_content, { backgroundColor: TextColorGreen }]}>
                    {!showCamera ? (
                        <ImageBackground
                            style={{
                                borderRadius: 20,
                                width: responsiveWidth(72),
                                height: responsiveHeight(39),
                                backgroundColor: '#EA89A7',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingBottom: responsiveWidth(6),
                            }}
                            source={require('../../../assets/bgImage-video.png')}>
                            <UserNames backgroundColor="rgba(0,0,0,0.5)" />
                            <View>
                                {!activeCamera && !started && (
                                    <Text
                                        style={{
                                            paddingHorizontal: moderateScale(32),
                                            lineHeight: moderateScale(22),
                                            color: '#FFF',
                                            fontWeight: '700',
                                            fontSize: responsiveFontSize(2.1),
                                            textAlign: 'center',
                                        }}>
                                        {' '}
                                        Hold microphone icon and share your story
                                    </Text>
                                )}
                            </View>
                        </ImageBackground>
                    ) : (
                        <>
                            <View>
                                <View
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        zIndex: 9999,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    {user ? (
                                        <UserNames
                                            backgroundColor="rgba(0,0,0,0.5)"
                                            currentDisplayUser={currentDisplayUser}
                                        />
                                    ) : (
                                        <></>
                                    )}
                                </View>

                                {cameraPermission && (
                                    <Camera
                                        ref={cameraRef}
                                        style={{
                                            borderRadius: 50,
                                            width: responsiveWidth(72),
                                            height: responsiveHeight(40),
                                        }}
                                        device={activeCamera}
                                        isActive={isActive}
                                        video={true}
                                        resizeMode="cover"
                                    />
                                )}
                            </View>
                        </>
                    )}
                </View>
            </ImageBackground>

            <TouchableOpacity
                onPress={toggleCamera}
                activeOpacity={0.7}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 150,
                    width: responsiveWidth(20),
                    height: responsiveHeight(6),
                    backgroundColor: '#4B7A84',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Image
                    style={{
                        width: responsiveWidth(7),
                        height: responsiveHeight(3.5),
                        resizeMode: 'center',
                    }}
                    source={require('../../../assets/camera-image.png')}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    img_backgroung_content: {
        width: responsiveWidth(90),
        height: responsiveHeight(45),
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: moderateVerticalScale(6),
        alignSelf: 'center'
    },
    bg_content: {
        // backgroundColor: PrimaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        width: responsiveWidth(76),
        height: responsiveHeight(42),
        marginLeft: responsiveWidth(1),
        marginTop: responsiveWidth(1),
        // marginBottom: responsiveWidth(2.5)
    },

})

export default MainContentVideo;
