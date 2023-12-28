import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet, Button, Alert, ScrollView } from 'react-native'
import { FourthColor, PrimaryColor, SecondaryColor, TextColorGreen, TextinputColor, ThirdColor } from '../Styles/Style';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions"
import TextInputField from '../../components/TextInputField';
import TouchableButton from '../../components/TouchableButton';
import SocialsLogin from '../../components/SocialsLogin';
import { useNavigation } from '@react-navigation/native';
import CountryPicker
    from 'react-native-country-picker-modal';
import PhoneNumber from '../../components/PhoneNumber';
import NavigationsString from '../../constants/NavigationsString';
import { Img_Paths } from '../../assets/Imagepaths';
import { moderateVerticalScale, moderateScale } from "react-native-size-matters"
import { registeruser } from '../../../store/slices/Register_Slice';
import { register } from '../../../store/slices/Register_Slice';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { validationSignUp } from '../../../validation/validation';
import Svg, { Path } from 'react-native-svg';
import Toast from 'react-native-toast-message';
import { userdata, userinfoState } from '../../../store/slices/userInfoState_Slice';


const Register = () => {

    const { CREATE_ACCOUNT_ICON } = Img_Paths;
    const navigation = useNavigation()
    const { REGISTER_USER_INFO } = NavigationsString
    const [countryCode, setCountryCode] = useState("");
    const [formatText, setFormatText] = useState("");
    const [phoneCode, setPhoneCode] = useState("");
    const [countryPickerVisible, setCountryPickerVisible] = useState(false);
    const dispatch = useDispatch();
    const inputRef = useRef();

    const toggleCountryPicker = () => {
        setCountryPickerVisible(!countryPickerVisible);
    };

    console.log(phoneCode)
    console.log(formatText)

    const countryinfo = {}

    if (countryCode === "") {
        countryinfo.countryCode = "AU"
    } else {
        countryinfo.countryCode = countryCode
    }



    if (phoneCode === "") {
        countryinfo.phonecodee = "61"
    } else {
        countryinfo.phonecodee = phoneCode
    }

    return (
        <Formik initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            phoneNo: '',
            fcmToken: "fcmtoken11212",
            role: "user",
            username: '',
        }}

            validationSchema={validationSignUp}
            onSubmit={async (values, { setSubmitting }) => {
                dispatch(userinfoState(countryinfo))
                dispatch(register({ values: values, countryCode: countryinfo }))
                navigation.navigate(REGISTER_USER_INFO, {
                })
            }}
        >

            {({ values, errors, handleChange, handleSubmit, setFieldValue, touched, isValid, dirty }) => (
                <>

                    <ScrollView keyboardShouldPersistTaps="handled">
                        <View style={styles.container}>
                            <View style={styles.img_container}>
                                <Image style={styles.img_child} source={CREATE_ACCOUNT_ICON} />
                            </View>

                            <View>

                                {/* User Name----- */}

                                <View>
                                    <View style={{ width: responsiveWidth(90), marginLeft: "auto" }}>
                                        <Text style={{ color: FourthColor, fontWeight: "600", fontSize: responsiveFontSize(1.9) }}>Username</Text>
                                    </View>

                                    <TextInputField
                                        placeholderText="Type here"
                                        onChangeText={handleChange("username")}
                                        value={values.username}
                                    />

                                    {errors.username &&
                                        <View style={{ width: responsiveWidth(90), marginLeft: 'auto', paddingBottom: responsiveWidth(2) }}>
                                            <View style={{ flexDirection: "row", }}>
                                                <View>
                                                    <Svg width={20} height={20} viewBox="0 0 24 24" fill="red">
                                                        <Path
                                                            d="M12 2C6.485 2 2 6.485 2 12s4.485 10 10 10 10-4.485 10-10S17.515 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
                                                        />
                                                    </Svg>
                                                </View>
                                                <View style={{ paddingHorizontal: moderateScale(5) }}>
                                                    <Text style={{ color: 'red', fontSize: responsiveFontSize(1.9), fontWeight: "600" }}>{errors.username}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    }
                                </View>

                                {/* First Name----- */}

                                <View>
                                    <View style={{ width: responsiveWidth(90), marginLeft: "auto" }}>
                                        <Text style={{ color: FourthColor, fontWeight: "600", fontSize: responsiveFontSize(1.9) }}>First Name</Text>
                                    </View>
                                    <TextInputField
                                        placeholderText="Type here"
                                        onChangeText={handleChange("firstName")}
                                        value={values.firstName}
                                    />

                                    {errors.firstName &&
                                        <View style={{ width: responsiveWidth(90), marginLeft: 'auto', paddingBottom: responsiveWidth(2) }}>
                                            <View style={{ flexDirection: "row", }}>
                                                <View>
                                                    <Svg width={20} height={20} viewBox="0 0 24 24" fill="red">
                                                        <Path
                                                            d="M12 2C6.485 2 2 6.485 2 12s4.485 10 10 10 10-4.485 10-10S17.515 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
                                                        />
                                                    </Svg>
                                                </View>
                                                <View style={{ paddingHorizontal: moderateScale(5) }}>
                                                    <Text style={{ color: 'red', fontSize: responsiveFontSize(1.9), fontWeight: "600" }}>{errors.firstName}</Text>
                                                </View>
                                            </View>

                                        </View>
                                    }
                                </View>

                                {/* Last Name----- */}

                                <View>
                                    <View style={{ width: responsiveWidth(90), marginLeft: "auto" }}>
                                        <Text style={{ color: FourthColor, fontWeight: "600", fontSize: responsiveFontSize(1.9) }}>Last Name</Text>
                                    </View>

                                    <TextInputField placeholderText="Type here"
                                        onChangeText={handleChange("lastName")}
                                        value={values.lastName}
                                    />

                                    {errors.lastName &&
                                        <View style={{ width: responsiveWidth(90), marginLeft: 'auto', paddingBottom: responsiveWidth(2) }}>
                                            <View style={{ flexDirection: "row", }}>
                                                <View>
                                                    <Svg width={20} height={20} viewBox="0 0 24 24" fill="red">
                                                        <Path
                                                            d="M12 2C6.485 2 2 6.485 2 12s4.485 10 10 10 10-4.485 10-10S17.515 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
                                                        />
                                                    </Svg>
                                                </View>
                                                <View style={{ paddingHorizontal: moderateScale(5) }}>
                                                    <Text style={{ color: 'red', fontSize: responsiveFontSize(1.9), fontWeight: "600" }}>{errors.lastName}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    }
                                </View>


                                <View>
                                    <View style={{ width: responsiveWidth(90), marginLeft: "auto" }}>
                                        <Text style={{ color: FourthColor, fontWeight: "600", fontSize: responsiveFontSize(1.9) }}>Phone Number</Text>
                                    </View>

                                    <PhoneNumber
                                        value={values.phoneNo}
                                        setFormatText={setFormatText}
                                        onchangeState={(number) => { setFieldValue("phoneNo", number) }}
                                        setCountryCode={setCountryCode}
                                        countrycode={countryCode}
                                        setPhoneCode={setPhoneCode}
                                        onPressFlag={toggleCountryPicker} />
                                    <View>

                                    </View>
                                    {countryPickerVisible && (
                                        <CountryPicker
                                            withFilter={true}
                                            withFlagButton={false}
                                            withCountryNameButton={false}
                                            onClose={() => setCountryPickerVisible(false)}
                                            visible={countryPickerVisible}
                                        />
                                    )}

                                    {errors.phoneNo &&
                                        <View style={{ width: responsiveWidth(90), marginLeft: 'auto', paddingTop: responsiveWidth(3), }}>
                                            <View style={{ flexDirection: "row", }}>
                                                <View>
                                                    <Svg width={20} height={20} viewBox="0 0 24 24" fill="red">
                                                        <Path
                                                            d="M12 2C6.485 2 2 6.485 2 12s4.485 10 10 10 10-4.485 10-10S17.515 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
                                                        />
                                                    </Svg>
                                                </View>
                                                <View style={{ paddingHorizontal: moderateScale(5) }}>
                                                    <Text style={{ color: 'red', fontSize: responsiveFontSize(1.9), fontWeight: "600" }}>{errors.phoneNo}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    }
                                </View>

                                <View>
                                    <View style={{ paddingTop: responsiveWidth(4), width: responsiveWidth(90), marginLeft: "auto" }}>
                                        <Text style={{ color: FourthColor, fontWeight: "600", fontSize: responsiveFontSize(1.9) }}>Email Address</Text>
                                    </View>
                                    <TextInputField placeholderText="Type here"
                                        onChangeText={handleChange("email")}
                                        value={values.email}
                                    />
                                    {errors.email &&
                                        <View style={{ width: responsiveWidth(90), marginLeft: 'auto', }}>
                                            <View style={{ flexDirection: "row", }}>
                                                <View>
                                                    <Svg width={20} height={20} viewBox="0 0 24 24" fill="red">
                                                        <Path
                                                            d="M12 2C6.485 2 2 6.485 2 12s4.485 10 10 10 10-4.485 10-10S17.515 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
                                                        />
                                                    </Svg>
                                                </View>
                                                <View style={{ paddingHorizontal: moderateScale(5) }}>
                                                    <Text style={{ color: 'red', fontSize: responsiveFontSize(1.9), fontWeight: "600" }}>{errors.email}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    }
                                </View>

                                <View style={{ paddingVertical: responsiveWidth(6) }}>

                                    <TouchableButton type="register" onPress={handleSubmit} isValid={isValid} dirty={dirty} backgroundColor="#395E66" color="#FFF" text="Next" />
                                    <View style={{ marginVertical: moderateVerticalScale(7) }}>
                                        <TouchableButton onPress={() => navigation.goBack()} backgroundColor="#FFF" borderWidth="1" color="#395E66" text="Back" />
                                    </View>
                                </View>

                            </View>

                        </View>
                    </ScrollView>
                    <Toast />
                </>
            )}
        </Formik>
    )
};



export default Register;


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: SecondaryColor,
        flex: 1,
    },
    text: {
        fontSize: responsiveFontSize(1.8),
        fontWeight: "400"
    },
    img_container: {
        paddingVertical: moderateVerticalScale(22),
        justifyContent: "center",
        alignItems: "center"
    },
    img_child: {
        width: responsiveWidth(50),
        height: responsiveHeight(20),
        resizeMode: "center",
    },
});
