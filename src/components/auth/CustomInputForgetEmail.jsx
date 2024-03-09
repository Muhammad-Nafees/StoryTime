import React, { useEffect, useState, useRef, useTransition } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
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
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { Img_Paths } from '../../assets/Imagepaths';
import NavigationsString from '../../constants/NavigationsString';
import TouchableButton from '../TouchableButton';
import { Inter_Medium, Inter_SemiBold } from '../../constants/GlobalFonts';

const CustomInputForgetEmail = props => {
  const { FORGET_BG_IMG } = Img_Paths;
  const [isFocused, setIsFocused] = useState(false);
  const { FORGET_PHONE_NO, OTP_FORGET } = NavigationsString;
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState();
  const [navigatee, setNavigate] = useState(false);
  const [responses, setResponse] = useState('');
  const [isStatusCodeSuccess, setIsStatusCodeSuccess] = useState(false);
  const [invalidPhoneNumber, setInvalidPhoneNumber] = useState("");
  const [textval, seText] = useState('');
  const navigation = useNavigation();

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const debouncedApiCall = useRef(
    _.debounce(async text => {
      try {
        const response = await reset_email({ email: text });
        seText(text);
        setResponse(response?.data?.code);
        console.log('response---', response?.data?.code);
        if (response?.message === "Invalid Information, Record Not Found!") {
          setInvalidPhoneNumber("Invalid Information, Record Not Found!");
        } else {
          setInvalidPhoneNumber("Invalid email")
        }

        if (response?.statusCode === 200) {
          setIsStatusCodeSuccess(true);
          setInvalidPhoneNumber("");
        } else {
          setIsStatusCodeSuccess(false);
        };

      } catch (err) {
        console.log(err);
      }
    }, 300),
  ).current;

  const handleChangeText = async (text, fieldName) => {
    props.handleChange(text);
    debouncedApiCall(text);
  };

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
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
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
      {console.log('res-=', responses)}

      {
        invalidPhoneNumber &&
        <>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 2,
              marginTop: 2,
            }}>
            <Icon name="alert-circle" size={22} color="red" />
            <Text style={{ color: 'red' }}>{invalidPhoneNumber}</Text>
          </View>
          <View style={{ height: 0 }} />
        </>
      }

      <View style={{ marginTop: 'auto', paddingBottom: responsiveWidth(12) }}>
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

        <TouchableButton
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          type="forgetemail"
          StatusCodeSuccess={isStatusCodeSuccess}
          isValid={props?.isValid}
          dirty={props?.dirty}
          onPress={() => {
            props?.value === !'' ? props?.handleSubmit : null;
            if (isStatusCodeSuccess) {
              navigation.navigate(OTP_FORGET, {
                code: responses,
                email: textval,
                type: 'email',
              });
            }
          }}
          backgroundColor={isStatusCodeSuccess ? '#395E66' : 'rgba(57, 94, 102, 0.5)'}

          color="#FFF"
          text="Next"
        />
      </View>
    </View>

    /* <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate(FORGET_PHONE_NO)}>
                    <Text
                        style={{
                            color: TextColorGreen,
                            fontWeight: '600',
                            textAlign: 'center',
                            paddingVertical: moderateVerticalScale(20),
                            fontSize: responsiveFontSize(1.7),
                        }}>
                        Use phone number instead
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableButton
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                onPress={() => {
                    props?.value !== '' ? props?.handleSubmit : null
                    navigation.navigate(OTP_FORGET, {
                        // code: responses?.data?.code,
                        // email: text,
                        type: 'email',
                    });
                }}

                backgroundColor={
                    props?.email !== '' ? '#395E66' : 'rgba(57, 94, 102, 0.5)'
                }
                color="#FFF"
                text="Next"
            /> */
    /* </> */
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