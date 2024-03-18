import {
    View,
    Text,
    ImageBackground,
    Image,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import React from 'react';
import { Img_Paths } from '../../../../assets/Imagepaths';
import { PrimaryColor, TextColorGreen } from '../../../Styles/Style';
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import { moderateVerticalScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { PassionOne_Regular } from '../../../../constants/GlobalFonts';
import { useDispatch, useSelector } from 'react-redux';
import {
    checkVideoTrue,
    extendStoryCheckVideo,
    extendVideo,
    resetVideoRecording,
} from '../../../../../store/slices/categoriesSlice/categoriesSlice';

const VideoFirstStartScreen = () => {
    const { SPLASH_SCREEN_IMAGE } = Img_Paths;
    const navigation = useNavigation();
    const windowWidth = Dimensions.get('window').width;
    const squareSize = windowWidth * 0.9;
    const randomName = useSelector(state => state.getcategories.randomnames?.payload,);
    const storyUserImage = useSelector(
        state => state.getcategories.storyUserImage?.payload,
    );

    const dispatch = useDispatch();

    return (
        <ImageBackground style={styles.container} source={SPLASH_SCREEN_IMAGE}>
            <View style={styles.backplay_flow}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ width: responsiveWidth(10), paddingTop: responsiveWidth(12) }}>
                    <Image
                        style={{
                            width: responsiveWidth(5),
                            height: responsiveHeight(2.5),
                            resizeMode: 'center',
                        }}
                        source={require('../../../../assets/back-playflowicon.png')}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.circle_container}>
                <View
                    style={[
                        styles.sub_circle,
                        {
                            width: squareSize,
                            height: squareSize,
                            borderRadius: squareSize / 2,
                        },
                    ]}>
                    <View>
                        <Image
                            style={[
                                styles.img_dog,
                                {
                                    width: squareSize / 4,
                                    height: squareSize / 4,
                                },
                            ]}
                            resizeMode="contain"
                            source={{ uri: storyUserImage }}
                        />
                    </View>

                    <View style={{ paddingVertical: moderateVerticalScale(20) }}>
                        <Text
                            style={{
                                fontSize: responsiveFontSize(2.3),
                                fontWeight: '400',
                                color: '#FFF',
                            }}>
                            Your Word is{' '}
                        </Text>
                    </View>

                    <View>
                        <Text
                            style={{
                                color: '#F3F3F3',
                                fontSize: responsiveFontSize(5.5),
                                fontWeight: '500',
                                fontFamily: PassionOne_Regular.passionOne,
                            }}>
                            {randomName}
                        </Text>
                    </View>
                </View>

                <View style={{ paddingVertical: moderateVerticalScale(45) }} />
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("VideoFirstUser");
                            dispatch(resetVideoRecording());
                            dispatch(extendStoryCheckVideo(true));
                            dispatch(extendVideo(null));
                            dispatch(checkVideoTrue(false));
                        }}>
                        <Image source={require('../../../../assets/pause-img.png')} />
                    </TouchableOpacity>
                    <Text style={styles.start}>Start</Text>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flex: 1,
    },
    backplay_flow: {
        marginLeft: 'auto',
        width: responsiveWidth(95),
    },
    circle_container: {
        paddingVertical: moderateVerticalScale(10),
        justifyContent: 'center',
        alignItems: 'center',
    },
    sub_circle: {
        backgroundColor: TextColorGreen,
        borderRadius: responsiveWidth(60),
        height: 340,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img_dog: {
        width: responsiveWidth(25),
        height: responsiveHeight(11),
    },
    start: {
        paddingVertical: moderateVerticalScale(12),
        color: PrimaryColor,
        // fontWeight: "bold",
        textAlign: 'center',
        marginRight: 'auto',
        fontSize: responsiveFontSize(4.5),
        fontFamily: PassionOne_Regular.passionOne,
    },
});
export default VideoFirstStartScreen;