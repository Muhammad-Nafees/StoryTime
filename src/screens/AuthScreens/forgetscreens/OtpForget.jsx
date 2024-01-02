import { useEffect, useRef } from 'react';
import React, { useState } from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import {
    FourthColor,
    PrimaryColor,
    SecondaryColor,
    TextColorGreen,
} from '../../Styles/Style';
import {
    responsiveFontSize,
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';
import TouchableButton from '../../../components/TouchableButton';
import { useNavigation } from '@react-navigation/native';
import NavigationsString from '../../../constants/NavigationsString';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from '../../../assets/Imagepaths';
import reset_email, {
    otp_forget,
} from '../../../../services/api/auth_mdule/auth';
import { useDispatch, useSelector } from 'react-redux';
import { forgetResetToken } from '../../../../store/slices/authSlice';
import Toast from 'react-native-toast-message';

const OtpForget = ({ length, value, disabled, onChange, route }) => {
    const navigation = useNavigation();
    const { FORGET_CONFIRM_PASSWORD } = NavigationsString;
    const { FORGET_BG_IMG } = Img_Paths;
    const [otptext, setOtptext] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [timer, setTimer] = useState(30);
    const inputRefs = useRef([]);
    const [timeLeft, setTimeLeft] = useState(30);
    const [timeText, setTimeText] = useState('30');
    const [otp, setOtp] = useState('');
    const dispatch = useDispatch();

    console.log('route--', route?.params?.code);

    const handlechange = (text, index) => {
        const updatedText =
            otptext.slice(0, index) + text + otptext.slice(index + 1);

        setOtptext(updatedText);
        if (text.length !== 0) {
            return inputRefs.current[index + 1]?.focus();
        }
        return inputRefs.current[index - 1]?.focus();
    };

    const handleBackspace = (event, index) => {
        const { nativeEvent } = event;
        if (nativeEvent.key === 'Backspace') {
            handlechange('', index);
        }
    };

    const handleButtonClick = async () => {
        setTimeLeft(30);

        try {
            const response = await reset_email({
                phone: route?.params?.phone,
                email: route?.params?.email,
            });
            console.log('res=-=-', response?.data?.code);
            setOtp(response?.data?.code);
            if (response?.statusCode === 200) {
                route?.params?.code;
                Toast.show({
                    type: 'success',
                    text1: String(response?.data?.code),
                });
                setIsLoading(false);
            } else if (response?.stack) {
                Toast.show({
                    type: 'error',
                    text1: response?.message,
                });
                setIsLoading(false);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const otp_forget_api = async () => {
        setIsLoading(true);
        try {
            const response = await otp_forget(otptext);
            console.log('response', response);
            if (response?.statusCode === 200) {
                navigation.navigate(FORGET_CONFIRM_PASSWORD);
                Toast.show({
                    type: 'success',
                    text1: response?.message,
                });
                dispatch(forgetResetToken(response?.data?.accessToken));
                setIsLoading(false);
            } else if (response?.stack) {
                Toast.show({
                    type: 'error',
                    text1: response?.message,
                });
                setIsLoading(false);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const seconds = timeLeft % 60;
        const formattedTime = `${seconds.toString()}`;
        setTimeText(formattedTime);
    }, [timeLeft]);

    useEffect(() => {
        let countdown;
        if (timeLeft > 0) {
            countdown = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            clearInterval(countdown);
        }
        return () => clearInterval(countdown);
    }, [timeLeft]);

    const handleResendClick = () => {
        // handleButtonClick();
    };

    return (
        <View style={styles.container}>
            <View style={styles.img_container}>
                <Image style={styles.img_child} source={FORGET_BG_IMG} />
            </View>

            {/* Code------------ */}

            <View>
                <View>
                    <View
                        style={{
                            width: responsiveWidth(92),
                            marginLeft: 'auto',
                            flexDirection: 'row',
                        }}>
                        <Text
                            style={{
                                color: FourthColor,
                                fontWeight: '600',
                                fontSize: responsiveFontSize(1.7),
                                paddingHorizontal: moderateScale(5),
                            }}>
                            Your Verification Code is:
                        </Text>
                        <Text
                            style={{
                                color: FourthColor,
                                fontWeight: '400',
                                fontSize: responsiveFontSize(1.7),
                            }}>
                            {otp ? otp : route?.params?.code}
                        </Text>
                    </View>

                    {/* OtpPassword----------- */}

                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: responsiveWidth(5),
                        }}>
                        <View
                            style={{
                                width: responsiveWidth(80),
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                            {[...new Array(6)].map((item, index) => (
                                <TextInput
                                    ref={ref => {
                                        if (ref && !inputRefs.current.includes(ref)) {
                                            inputRefs.current = [...inputRefs.current, ref];
                                        }
                                    }}
                                    style={{
                                        width: responsiveWidth(12.5),
                                        height: responsiveHeight(6),
                                        borderWidth: 1,
                                        fontSize: responsiveFontSize(1.8),
                                        color: '#000',
                                        textAlign: 'center',
                                        borderRadius: 12,
                                        borderColor: '#AAAAAA',
                                        backgroundColor: SecondaryColor,
                                    }}
                                    key={index}
                                    maxLength={1}
                                    contextMenuHidden
                                    selectTextOnFocus
                                    editable={!disabled}
                                    keyboardType="decimal-pad"
                                    testID={`OTPInput-${index}`}
                                    onChangeText={text => handlechange(text, index)}
                                    onKeyPress={event => handleBackspace(event, index)}
                                />
                            ))}
                        </View>
                    </View>
                </View>

                {/* Confirm Password------------ */}

                {/* Next and Back------------ */}

                <View style={{ marginTop: responsiveWidth(88) }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <TouchableOpacity onPress={handleButtonClick}>
                            <Text
                                style={{
                                    color: TextColorGreen,
                                    fontWeight: '600',
                                    textAlign: 'center',
                                    paddingVertical: moderateVerticalScale(22),
                                    fontSize: responsiveFontSize(1.7),
                                }}>
                                Resend
                            </Text>
                        </TouchableOpacity>
                        <View>
                            <Text style={{ color: TextColorGreen, fontWeight: '300' }}>
                                {' '}
                                {`in ${timeText}s`}
                            </Text>
                        </View>
                    </View>
                    <TouchableButton
                        isLoading={isLoading}
                        onPress={otptext.length === 6 ? otp_forget_api : null}
                        backgroundColor={
                            otptext.length === 6 ? '#395E66' : 'rgba(57, 94, 102, 0.5)'
                        }
                        color="#FFF"
                        text="Verify"
                    />
                </View>
            </View>
            <Toast />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: SecondaryColor,
    },
    text: {
        fontSize: responsiveFontSize(1.8),
        fontWeight: '400',
    },
    img_container: {
        paddingVertical: moderateVerticalScale(22),
        justifyContent: 'center',
        alignItems: 'center',
    },
    img_child: {
        width: responsiveWidth(50),
        height: responsiveHeight(20),
        resizeMode: 'center',
    },
});

export default OtpForget;
