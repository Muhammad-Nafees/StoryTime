import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
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
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import NavigationsString from '../../../constants/NavigationsString';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from '../../../assets/Imagepaths';
import reset_email, {
  otp_forget,
} from '../../../../services/api/auth_mdule/auth';
import { useDispatch } from 'react-redux';
import { forgetResetToken } from '../../../../store/slices/authSlice';
import VerifyingCodeModal from '../../../components/forget-screens-modal/VerifyingCodeModal';
import Toast from 'react-native-toast-message';

const OtpForget = ({ route }) => {
  const navigation = useNavigation();
  const { FORGET_CONFIRM_PASSWORD } = NavigationsString;
  const { ANOTHER_FORGET_BG_IMG } = Img_Paths;
  const [otptext, setOtptext] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timeText, setTimeText] = useState('30');
  const [isVisible, setVisible] = useState(false);
  const [statusCodeForget, setStatusCodeForget] = useState(false);
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const inputRefs = useRef([]);

  const handlechange = (text, index) => {
    const updatedText =
      otptext.slice(0, index) + text + otptext.slice(index + 1);
    setOtptext(updatedText);

    if (text.length !== 0) {
      return inputRefs.current[index + 1]?.focus();
    } else {
      return inputRefs.current[index - 1]?.focus();
    }
  };

  useFocusEffect(
    useCallback(() => {
      setVisible(false);
    }, []),
  );

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
      setOtp(response?.data?.code);

      if (response?.statusCode === 200) {
        setIsLoading(false);
        setVisible(false);
        // navigation.navigate(FORGET_CONFIRM_PASSWORD);
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
    setVisible(true);
    try {
      const response = await otp_forget(otptext);
      if (response?.statusCode === 200) {
        setStatusCodeForget(true);
        setTimeout(() => {
          navigation.navigate(FORGET_CONFIRM_PASSWORD);
        }, 1500);
        dispatch(forgetResetToken(response?.data?.accessToken));
        setIsLoading(false);
      } else if (response?.stack) {
        setStatusCodeForget(false);
        Toast.show({
          type: 'error',
          text1: response?.message,
        });
        setIsLoading(false);
        setVisible(false);
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

  let countdown;
  useEffect(() => {
    if (timeLeft > 0) {
      countdown = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(countdown);
    }
    return () => clearInterval(countdown);
  }, [timeLeft]);

  return (
    <View style={{ flex: 1, backgroundColor: SecondaryColor }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.img_container}>
            <Image style={styles.img_child} source={ANOTHER_FORGET_BG_IMG} />
          </View>

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
                Code:
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
                    editable={!isLoading}
                    keyboardType="decimal-pad"
                    testID={`OTPInput-${index}`}
                    onChangeText={text => handlechange(text, index)}
                    onKeyPress={event => handleBackspace(event, index)}
                  />
                ))}
              </View>
            </View>
          </View>
        </View>

        {isVisible && (
          <VerifyingCodeModal
            setVisible={setVisible}
            isVisible={isVisible}
            onPress={() => { }}
            statusCodeForget={statusCodeForget}
          />
        )}

        <Toast />
      </ScrollView>

      <View style={{ marginBottom: responsiveWidth(15) }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            disabled={timeLeft !== 0 ? true : false}
            onPress={handleButtonClick}>
            <Text
              style={{
                color:
                  timeLeft !== 0 ? 'rgba(57, 94, 102, 0.5)' : TextColorGreen,
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
          onPress={otptext.length === 6 ? otp_forget_api : null}
          type="optForget"
          backgroundColor={
            otptext.length === 6 ? '#395E66' : 'rgba(57, 94, 102, 0.5)'
          }
          color="#FFF"
          text="Verify"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    // height: '100%',
    // backgroundColor: SecondaryColor,
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
