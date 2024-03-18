import { View, Dimensions, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import { Img_Paths } from '../../../assets/Imagepaths';
import { moderateVerticalScale } from 'react-native-size-matters';
import { PrimaryColor, TextColorGreen } from '../../../screens/Styles/Style';
import { PassionOne_Regular } from '../../../constants/GlobalFonts';
import { resetRecordingData } from '../../../../store/slices/categoriesSlice/categoriesSlice';
import { isCheckValue, extendStoryCheck, isExtendStoryCheck } from '../../../../store/slices/categoriesSlice/categoriesSlice';
import { useDispatch, useSelector } from 'react-redux';

const StartGameContent = () => {
    // img paths
    const randomName = useSelector(state => state.getcategories.randomnames?.payload,);
    const storyUserImage = useSelector(
        state => state.getcategories.storyUserImage?.payload,
    );

    const { PAUSE_IMG } = Img_Paths;
    const windowWidth = Dimensions.get('window').width;
    // responsive size
    const squareSize = windowWidth * 0.9;
    // navigation
    const navigation = useNavigation();
    const dispatch = useDispatch();
    // redux state

    // function 
    const onpressNextHandler = () => {
        navigation.navigate("StartRecordingVoice");
        dispatch(resetRecordingData());
        dispatch(isExtendStoryCheck(null));
        dispatch(isCheckValue(null));
    };

    return (
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

                <View style={{ paddingBottom: moderateVerticalScale(30) }}>
                    <Image
                        style={styles.img_dog}
                        resizeMode="contain"
                        source={{ uri: storyUserImage }}
                    />
                </View>

                <View style={{ paddingVertical: moderateVerticalScale(10) }}>
                    <Text
                        style={{
                            fontSize: responsiveFontSize(3),
                            fontWeight: '400',
                            color: '#FFF',
                        }}>
                        Your word is{' '}
                    </Text>
                </View>

                <View>
                    <Text
                        style={{
                            width: responsiveWidth(80),
                            fontFamily: PassionOne_Regular.passionOne,
                            color: '#F3F3F3',
                            fontSize: 60,
                            letterSpacing: 0,
                            textAlign: 'center',
                        }}>
                        {randomName}
                    </Text>
                </View>
            </View>

            <View style={{ paddingVertical: moderateVerticalScale(35) }} />
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={{}} onPress={onpressNextHandler}>
                    <Image
                        resizeMode="contain"
                        source={PAUSE_IMG}
                    />
                </TouchableOpacity>
                <Text style={styles.start}>Start</Text>
            </View>

        </View>

    )
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#FFF"
    },

    circle_container: {
        paddingVertical: moderateVerticalScale(10),
        justifyContent: "center",
        alignItems: "center",
    },
    sub_circle: {
        backgroundColor: TextColorGreen,
        borderRadius: responsiveWidth(60),
        height: 340,
        justifyContent: "center",
        alignItems: "center"
    },
    img_dog: {
        width: responsiveWidth(25),
        height: responsiveHeight(11),
    },
    start: {
        paddingVertical: moderateVerticalScale(12),
        color: PrimaryColor,
        textAlign: 'center',
        marginRight: 'auto',
        fontSize: responsiveFontSize(4.5),
        fontFamily: PassionOne_Regular.passionOne,
    },
    backplay_flow: {
        marginLeft: "auto",
        width: responsiveWidth(95)
    },
});

export default StartGameContent;
