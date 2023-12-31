import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { verticalScale } from 'react-native-size-matters';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { FourthColor, TextinputColor } from '../screens/Styles/Style';
import _ from 'lodash';
import reset_email, { username_api } from '../../services/api/auth_mdule/auth';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { Img_Paths } from '../assets/Imagepaths';
import NavigationsString from '../constants/NavigationsString';

const CustomInputForgetEmail = (props,) => {

    console.log(props?.value)
    const { FORGET_BG_IMG } = Img_Paths;
    const [isFocused, setIsFocused] = useState(false);
    const { FORGET_PHONE_NO, OTP_FORGET } = NavigationsString;
    const [isLoading, setIsLoading] = useState(false);
    const [emailError, setEmailError,] = useState()
    const navigation = useNavigation();

    const handleInputFocus = () => {
        setIsFocused(true);
    };
    const handleInputBlur = () => {
        setIsFocused(false);
    };

    // setTimeout(() => {
    //     navigation.navigate(OTP_FORGET, {
    //         code: response?.data?.code,
    //         email: text,
    //         type: 'email',
    //     });
    // }, 1000);

    const debouncedApiCall = useRef(_.debounce(async (text) => {
        const response = await reset_email({ email: text });

        try {
            if (response?.statusCode === 200) {
                return;
                // Toast.show({
                //     type: 'success',
                //     text1: response?.message,
                // });
            } else if (response?.stack) {
                setEmailError(response?.message)
                // Toast.show({
                //     type: 'error',
                //     text1: response?.message,
                // });
                setIsLoading(false);
            }
        }
        catch (err) {
            console.log(err)
        }
    }, 1000)
    ).current;



    const handleChangeText = async (text, fieldName) => {
        props.handleChange(text);
        debouncedApiCall(text,)
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
        <View style={{ paddingVertical: 10 }}>
            <Text
                style={[
                    {
                        color: FourthColor,
                        fontWeight: '600',
                        marginBottom: verticalScale(7),
                    },
                    props.labelStyles,
                ]}
            >
                {props.label}
            </Text>

            <View>
                <TextInput
                    style={inputStyle}
                    placeholder={isFocused ? '' : props.placeholder}
                    value={props.value}
                    onChangeText={(text) => handleChangeText(text, props.fieldName)}
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

            {
                console.log("propserr", props?.error)
            }


            {props.error && (
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
                    <Text style={[{ color: 'red' }]}>{props.error ? props.error : emailError}</Text>
                </View>
            )}

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
