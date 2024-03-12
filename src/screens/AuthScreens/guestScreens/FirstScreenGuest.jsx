import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
} from 'react-native';
import { PrimaryColor, SecondaryColor, TextColorGreen, pinkColor } from '../../Styles/Style';
import { useNavigation } from '@react-navigation/native';
import {
    responsiveWidth,
    responsiveHeight,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';
import NavigationsString from '../../../constants/NavigationsString';
import {
    moderateScale,
    scale,
    moderateVerticalScale,
} from 'react-native-size-matters';
import { Img_Paths } from '../../../assets/Imagepaths';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { PassionOne_Regular } from '../../../constants/GlobalFonts';
import SvgIcons from '../../../components/svgIcon/svgIcons';

const FirstScreenGuest = () => {
    const { SPLASH_SCREEN_IMAGE, STORY_TIME_IMG } = Img_Paths;
    const { PLAY_STORY_TIME } = NavigationsString;
    const { width, height } = Dimensions.get('window');
    const navigation = useNavigation();
    const [toggleCheckBox, setToggleCheckBox] = useState(false);

    return (
        <View style={{ height: responsiveHeight(100) }}>
            <ImageBackground style={[styles.container,]} source={SPLASH_SCREEN_IMAGE}>

                <View style={{}}>
                    <View style={[styles.story_time_container, { paddingVertical: responsiveWidth(20), }]}>
                        <Image
                            style={[
                                styles.story_time_img,
                                {
                                    width: width * 0.8,
                                    height: height * 0.3,
                                },
                            ]}
                            source={STORY_TIME_IMG}
                        />
                    </View>

                    <View style={[styles.container_img,]}>
                        <TouchableOpacity disabled={!toggleCheckBox}
                            onPress={() => navigation.navigate(PLAY_STORY_TIME)}
                        >
                            <Image
                                style={{
                                    marginVertical: moderateVerticalScale(12),
                                    width: width * 0.3,
                                    height: height * 0.12,
                                    resizeMode: 'center',
                                    opacity: toggleCheckBox ? 1 : 0.5,
                                }}
                                source={require('../../../assets/play-btn.png')}
                            />
                        </TouchableOpacity>

                        {/* <Image style={styles.get_started} source={GET_STARTED_IMAGE} /> */}
                        <Text style={{
                            color: "rgba(228, 65, 115, 1)",
                            opacity: toggleCheckBox ? 1 : 0.5,
                            fontFamily: PassionOne_Regular.passionOne,
                            fontSize: 32
                        }}>Get Started</Text>

                        <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: responsiveWidth(2) }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    width: responsiveWidth(72),
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}>
                                <BouncyCheckbox
                                    size={35}
                                    fillColor="#395E66"
                                    unfillColor="transparent"
                                    iconStyle={{
                                        borderColor: 'red',
                                        borderRadius: 0,
                                        size: 5
                                    }}
                                    innerIconStyle={{
                                        borderWidth: 2,
                                        borderRadius: 0,
                                    }}
                                    onPress={isChecked => {
                                        setToggleCheckBox(isChecked);
                                    }}
                                    iconComponent={
                                        toggleCheckBox &&
                                        <View style={{ marginBottom: 'auto', marginTop: 'auto' }}>
                                            <SvgIcons name={'Check'} width={20} height={20} />
                                        </View>
                                    }

                                />
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        width: responsiveWidth(70),
                                    }}>
                                    <Text
                                        style={{
                                            color: '#000',
                                            color: '#000',
                                            fontSize: responsiveFontSize(1.6),
                                        }}>
                                        By checking this box, you agree to our{' '}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate('GuestStack', {
                                                screen: 'TermsAndConditions',
                                            })
                                        }>
                                        <Text style={[styles.text, { color: TextColorGreen }]}>
                                            Terms & Conditions{' '}
                                        </Text>
                                    </TouchableOpacity>
                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(1.6) }}>
                                        {' '}
                                        and
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate('GuestStack', {
                                                screen: 'PrivacyAndPolicy',
                                            })
                                        }>
                                        <Text style={[styles.text, { color: TextColorGreen }]}>
                                            {' '}
                                            Privacy Policy
                                        </Text>
                                    </TouchableOpacity>
                                </View>


                            </View>
                        </View>
                    </View>

                </View>

            </ImageBackground>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        height: responsiveHeight(100),
    },
    container_img: {
        paddingTop: responsiveWidth(35),
        justifyContent: 'center',
        alignItems: 'center',
        // paddingVertical: moderateVerticalScale(20),
        // height: responsiveHeight(50),
    },
    story_time_container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: responsiveWidth(20)
    },
    text: {
        fontWeight: '500',
        fontSize: responsiveFontSize(1.6),
    },

    story_time_img: {
        // marginVertical: moderateVerticalScale(100),
        resizeMode: 'center',
    },
    get_started: {
        resizeMode: 'center',
        width: responsiveWidth(50),
        height: responsiveHeight(5),
    },
});

export default FirstScreenGuest;
