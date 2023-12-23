import React, { useEffect, useState } from 'react'
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


const Register = () => {
    const { CREATE_ACCOUNT_ICON } = Img_Paths;

    const navigation = useNavigation()
    const { REGISTER_USER_INFO } = NavigationsString
    const [countryCode, setCountryCode] = useState('');
    const [countryCodeNumber, setCountryCodeNumber] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [countryPickerVisible, setCountryPickerVisible] = useState(false);
    const dispatch = useDispatch();

    // const onSelectCountry = (country) => {
    //     setCountryCode(country.cca2);
    //     setCountryCodeNumber(country.callingCode);
    //     setSelectedCountry(country);
    //     setCountryPickerVisible(false);
    // };
    // console.log(countryCode)
    // console.log("countrycode---", countryCode.callingCode)
    // console.log("phonecoding---", countryCode.cca2)
    // const phoneCode = countryCode?.callingCode?.[0];
    // const countrycoding = countryCode?.cca2;
    // console.log("phonecode-=", phoneCode)
    // console.log("countrycoding", countrycoding)
    const toggleCountryPicker = () => {
        setCountryPickerVisible(!countryPickerVisible);
    };

    const validationSignUp = Yup.object().shape({
        username: Yup.string().min(3, 'Too Short').max(50, 'Too Long!').required('Please fill the field'),
        firstName: Yup.string().min(4, 'Too Short').max(50, 'Too Long!').required('Please fill the field'),
        lastName: Yup.string().required(),
        phoneNo: Yup.string().required('Please fill the field'),
        email: Yup.string()
            .email('Invalid email')
            .required('Email is required')
            .matches(
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                'Must be a valid email'
            )
    });

    return (
        <Formik initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            phoneNo: '',
            fcmToken: "fcmtoken11212",
            role: "user",
            countryCode: "PK",
            phoneCode: "+92",
            username: "",
        }}
            validationSchema={validationSignUp}
            onSubmit={(values, { setSubmitting }) => {
                dispatch(register(values))
                navigation.navigate(REGISTER_USER_INFO, {
                })
            }}
        >

            {({ values, errors, handleChange, handleSubmit, setFieldValue }) => (

                <ScrollView keyboardShouldPersistTaps="handled">
                    <View style={styles.container}>
                        <View style={styles.img_container}>
                            <Image style={styles.img_child} source={CREATE_ACCOUNT_ICON} />
                        </View>

                        <View>

                            <View style={{ width: responsiveWidth(90), marginLeft: "auto" }}>
                                <Text style={{ color: FourthColor, fontWeight: "600", fontSize: responsiveFontSize(1.9) }}>Username</Text>
                            </View>

                            <TextInputField
                                placeholderText="Type here"
                                onChangeText={handleChange("username")}
                                value={values.username}
                            />

                            <View style={{ width: responsiveWidth(90), marginLeft: "auto" }}>
                                <Text style={{ color: FourthColor, fontWeight: "600", fontSize: responsiveFontSize(1.9) }}>First Name</Text>
                            </View>

                            <TextInputField
                                placeholderText="Type here"
                                onChangeText={handleChange("firstName")}
                                value={values.firstName}
                            />

                            <View style={{ width: responsiveWidth(90), marginLeft: 'auto' }}>
                                {/* {errors.password && <Text style={{ color: 'red', fontSize: responsiveFontSize(1.9) }}>{errors.password}</Text>} */}
                                {errors.firstName && <Text style={{ color: 'red', fontSize: responsiveFontSize(1.9) }}>{errors.firstName}</Text>}
                            </View>
                            <View style={{ width: responsiveWidth(90), marginLeft: "auto" }}>
                                <Text style={{ color: FourthColor, fontWeight: "600", fontSize: responsiveFontSize(1.9) }}>Last Name</Text>
                            </View>

                            <TextInputField placeholderText="Type here"
                                onChangeText={handleChange("lastName")}
                                value={values.lastName}
                            />

                            <View>
                                <View style={{ width: responsiveWidth(90), marginLeft: "auto" }}>
                                    <Text style={{ color: FourthColor, fontWeight: "600", fontSize: responsiveFontSize(1.9) }}>Phone Number</Text>
                                </View>

                                <PhoneNumber
                                    value={values.phoneNo}
                                    onchangeState={(number) => { setFieldValue("phoneNo", number) }}
                                    setCountryCode={setCountryCode}
                                    onPressFlag={toggleCountryPicker} />
                                <View>

                                </View>
                                {countryPickerVisible && (
                                    <CountryPicker
                                        withFilter={true}
                                        withFlagButton={false}
                                        withCountryNameButton={false}
                                        onSelect={onSelectCountry}
                                        onClose={() => setCountryPickerVisible(false)}
                                        visible={countryPickerVisible}
                                        containerButtonStyle={styles.countryPickerButton}
                                        closeButtonImageStyle={styles.countryPickerCloseButton}
                                    />
                                )}
                            </View>

                            <View style={{ width: responsiveWidth(90), marginLeft: 'auto' }}>
                                {errors.phoneNo && <Text style={{ color: "red", fontSize: responsiveFontSize(1.9) }}>{errors.phoneNo}</Text>}
                                {/* {errors.password && <Text style={{ color: 'red', fontSize: responsiveFontSize(1.9) }}>{errors.password}</Text>} */}
                            </View>

                            <View>
                                <View style={{ paddingTop: responsiveWidth(5), width: responsiveWidth(90), marginLeft: "auto" }}>
                                    <Text style={{ color: FourthColor, fontWeight: "600", fontSize: responsiveFontSize(1.9) }}>Email Address</Text>
                                </View>
                                <TextInputField placeholderText="Type here"
                                    onChangeText={handleChange("email")}
                                    value={values.email}
                                />
                                <View style={{ width: responsiveWidth(90), marginLeft: 'auto' }}>
                                    {/* {errors.phoneNo && <Text style={{ color: "red", }}>{errors.phoneNo}</Text>} */}
                                    {errors.email && <Text style={{ color: "red", fontSize: responsiveFontSize(1.9) }}>{errors.email}</Text>}
                                    {/* {errors.password && <Text style={{ color: 'red', fontSize: responsiveFontSize(1.9) }}>{errors.password}</Text>} */}
                                </View>
                            </View>

                            <View style={{ paddingVertical: responsiveWidth(6) }}>
                                {/* <TouchableButton onPress={handleNext} backgroundColor="#395E66" color="#FFF" text="Next" /> */}
                                <TouchableButton onPress={handleSubmit} backgroundColor="#395E66" color="#FFF" text="Next" />
                                <View style={{ marginVertical: moderateVerticalScale(7) }}>
                                    <TouchableButton onPress={() => navigation.goBack()} backgroundColor="#FFF" borderWidth="1" color="#395E66" text="Back" />
                                </View>
                            </View>

                        </View>

                    </View>
                </ScrollView>

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
