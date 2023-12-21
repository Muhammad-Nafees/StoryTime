import React, { useEffect, useState } from 'react'
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native'
import { FourthColor, PrimaryColor, SecondaryColor, TextColorGreen, TextinputColor, ThirdColor } from '../Styles/Style';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions"
import TextInputField from '../../components/TextInputField';
import TouchableButton from '../../components/TouchableButton';
import SocialsLogin from '../../components/SocialsLogin';
import { useNavigation } from '@react-navigation/native';
import PhoneInput
    from 'react-native-phone-input';
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
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [countryPickerVisible, setCountryPickerVisible] = useState(false);
    const dispatch = useDispatch();

    const onSelectCountry = (country) => {
        setCountryCode(country.cca2);
        setSelectedCountry(country);
        setCountryPickerVisible(false);
    };

    const toggleCountryPicker = () => {
        setCountryPickerVisible(!countryPickerVisible);
    };

    // const validationSchema = Yup.object().shape({
    //     firstName: Yup.string().required('First name is required'),
    //     lastName: Yup.string().required('Last name is required'),
    //     phoneNumber: Yup.string().required('Phone number is required'),
    //     // Add more validations for email, etc.
    // });

    return (
        <Formik initialValues={{
            firstName: '',
            lastName: '',
            phoneNo: '',
            emailAdress: ''
        }}
            // validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                dispatch(registeruser(values))
            }}
        >
            {({ values, errors, handleChange, handleSubmit, setFieldValue }) => (
                <View style={styles.container}>
                    <View style={styles.img_container}>
                        <Image style={styles.img_child} source={CREATE_ACCOUNT_ICON} />
                    </View>

                    <View>
                        <View style={{ width: responsiveWidth(90), marginLeft: "auto" }}>
                            <Text style={{ color: FourthColor, fontWeight: "600", fontSize: responsiveFontSize(1.9) }}>First Name</Text>
                        </View>

                        <TextInputField
                            placeholderText="Type here"
                            onChangeText={handleChange("firstName")}
                            value={values.firstName}
                        />

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
                            <PhoneNumber value={values.phoneNo} onchangeState={(number) => { setFieldValue("phoneNo", number) }} onPressFlag={toggleCountryPicker} />
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

                        <View>
                            <View style={{ paddingTop: responsiveWidth(5), width: responsiveWidth(90), marginLeft: "auto" }}>
                                <Text style={{ color: FourthColor, fontWeight: "600", fontSize: responsiveFontSize(1.9) }}>Email Address</Text>
                            </View>
                            <TextInputField placeholderText="Type here"
                                onChangeText={handleChange("emailAdress")}
                                value={values.emailAdress}
                            />
                        </View>

                        <View style={{ paddingTop: responsiveWidth(6) }}>
                            <TouchableButton onPress={() => navigation.navigate(REGISTER_USER_INFO, {
                                firstName: values.firstName,
                                lastName: values.lastName,
                                emailAdress: values.emailAdress,
                                phoneNumber: values.phoneNumber,
                            })} backgroundColor="#395E66" color="#FFF" text="Next" />
                            {/* <TouchableButton onPress={handleSubmit} backgroundColor="#395E66" color="#FFF" text="Next" /> */}
                            <View style={{ marginVertical: moderateVerticalScale(7) }}>
                                <TouchableButton onPress={() => navigation.goBack()} backgroundColor="#FFF" borderWidth="1" color="#395E66" text="Back" />
                            </View>
                        </View>

                    </View>
                </View>
            )}
        </Formik>

    )
}

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
