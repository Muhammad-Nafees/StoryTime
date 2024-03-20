import React, { useEffect, useState, useRef, useTransition } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { moderateVerticalScale, verticalScale } from 'react-native-size-matters';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  FourthColor,
  TextColorGreen,
  TextinputColor,
} from '../../screens/Styles/Style';
import _ from 'lodash';
import reset_email, { username_api } from '../../../services/api/auth_mdule/auth';
import { useNavigation } from '@react-navigation/native';
import NavigationsString from '../../constants/NavigationsString';
import CustomButton from '../reusable-components/CustomButton/CustomButton';
import { Inter_SemiBold } from '../../constants/GlobalFonts';

const CustomInputForgetEmail = props => {
  const [isFocused, setIsFocused] = useState(false);
  const { FORGET_PHONE_NO, OTP_FORGET } = NavigationsString;
  const [isLoading, setIsLoading] = useState(false);
  const [responses, setResponse] = useState('');
  const [isStatusCodeSuccess, setIsStatusCodeSuccess] = useState(false);
  const [invalidPhoneNumber, setInvalidPhoneNumber] = useState("");
  const [textval, seText] = useState('');
  const navigation = useNavigation();



  // const debouncedApiCall = useRef(
  //   _.debounce(async text => {
  //     try {
  //       const response = await reset_email({ email: text });
  //       console.log("response --- :", response);
  //       seText(text);
  //       setResponse(response?.data?.code);
  //       console.log('response---', response?.data?.code);
  //       if (response?.message === "Invalid Information, Record Not Found!") {
  //         setInvalidPhoneNumber("Invalid Information, Record Not Found!");
  //       } else {
  //         setInvalidPhoneNumber("Invalid email");
  //       }
  //       if (response?.statusCode === 200) {
  //         setIsStatusCodeSuccess(true);
  //         setInvalidPhoneNumber("");
  //       } else {
  //         setIsStatusCodeSuccess(false);
  //       };

  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }, 300),
  // ).current;

  // const handleInputFocus = () => {
  //   setIsFocused(true);
  // };

  // const handleInputBlur = () => {
  //   setIsFocused(false);
  // };

  // const reset_email_Api = async () => {
  //   try {
  //     const responseData = await reset_email({ email: textval })
  //     console.log(responseData, "RESPONSE FROM EMAIL")
  //   } catch (error) {
  //     console.log(error?.response?.data?.message, "ERROE FROM EMAIL")
  //   }
  // }


  const handleChangeText = async (text, fieldName) => {
    console.log("handletext-- :", text);
    props.handleChange(text);
  };


  const [keyboardStatus, setKeyboardStatus] = useState('');

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus('KeyboardShown');
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus('KeyboardHidden');
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  console.log("keyboard status", keyboardStatus);
  const inputStyle = {
    width: responsiveWidth(80),
    backgroundColor: TextinputColor,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    height: verticalScale(50),
    textAlignVertical: 'center',
    paddingHorizontal: 20,
    color: 'black',
    fontWeight: '400',
  };

  return (
    // <>
    <View style={{ paddingVertical: 10, flex: 1 }}>
      <Text
        style={[
          {
            color: FourthColor,
            fontWeight: '600',
            marginBottom: verticalScale(7),
          },
          props.labelStyles,
        ]}>
        {props.label}
      </Text>

      <View>
        <TextInput
          style={inputStyle}
          placeholder={isFocused ? '' : props.placeholder}
          value={props.value}
          onChangeText={text => handleChangeText(text, props.fieldName)}
          underlineColorAndroid="transparent"
          placeholderTextColor="gray"
          multiline={props.multiline ? props.multiline : false}
          keyboardType={props.keyboardType}
          autoCapitalize={props.autoCapitalize}
          // onFocus={handleInputFocus}
          // onBlur={handleInputBlur}
          editable={props.editable}
        />
      </View>

      {/* {!props.error && props.customError && (
                <View
                    style={[
                        {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 2,
                            marginTop: verticalScale(7),
                        },
                    ]}
                >
                    <Icon name="alert-circle" size={22} color="red" />
                    <Text style={[{ color: 'red' }]}>{props.customError}</Text>
                </View>
            )} */}
      {/* {console.log('res-=', responses)} */}

      {
        props?.isSubmitted && props?.touched && props?.error &&
        <>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 2,
              marginTop: 2,
            }}>
            <Icon name="alert-circle" size={22} color="red" />
            <Text style={{ color: 'red' }}>{props?.error}</Text>
          </View>
          <View style={{ height: 0 }} />
        </>
      }

      <View style={{ marginTop: keyboardStatus === "KeyboardShown" ? "auto" : responsiveWidth(80), }}>
        <TouchableOpacity onPress={() => navigation.navigate(FORGET_PHONE_NO)}>
          <Text
            style={{
              color: TextColorGreen,
              fontWeight: '600',
              textAlign: 'center',
              paddingVertical: moderateVerticalScale(20),
              fontSize: responsiveFontSize(1.7),
              fontFamily: Inter_SemiBold.Inter_SemiBold
            }}>
            Use phone number instead
          </Text>
        </TouchableOpacity>

        <CustomButton
          isLoading={props?.isLoading}
          setIsLoading={setIsLoading}
          type="forgetemail"
          // StatusCodeSuccess={isStatusCodeSuccess}
          value={props?.value}
          isValid={props?.isValid}
          dirty={props?.dirty}
          onPress={() => {
            props?.setIsSubmitted(true);
            props?.handleSubmit();
            console.log("CALLING")
            // if (isStatusCodeSuccess) {
            // navigation.navigate(OTP_FORGET, {
            //   code: responses,
            //   email: textval,
            //   type: 'email',
            // });
            // }
          }}
          backgroundColor={props?.value !== "" ? '#395E66' : 'rgba(57, 94, 102, 0.5)'}
          color="#FFF"
          text="Next"
        />
      </View>
    </View>


  );
};

export default CustomInputForgetEmail;

const styles = StyleSheet.create({
  input: {
    width: responsiveWidth(80),
    backgroundColor: TextinputColor,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
