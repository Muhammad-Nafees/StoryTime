import React, { useState } from 'react'
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native'
import { FourthColor, PrimaryColor, SecondaryColor, TextColorGreen, TextinputColor, ThirdColor } from '../Styles/Style';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions"
import TextInputField from '../../components/TextInputField';
import TouchableButton from '../../components/TouchableButton';
import { useNavigation } from '@react-navigation/native';
import { moderateVerticalScale, moderateScale } from "react-native-size-matters"
import { Formik } from 'formik';
import * as  Yup from "yup"

const RegisterPassword = ({ route }) => {

    const navigation = useNavigation()
    const [showPassword, setShowPassword] = useState(false)
    const [confirmShowPassword, setConfirmShowPassword] = useState(false)

    const toggleShowPassword = () => {
        setShowPassword(!showPassword); // Toggle the state between true and false
    };

    const toggleconfirmshowpassword = () => {
        setConfirmShowPassword(!confirmShowPassword); // Toggle the state between true and false
    };



    return (

        <Formik initialValues={{
            password: "",
            confirmPassword: "",
        }}
            // validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {

            }}
        >
            {({ values, errors, handleChange, handleSubmit, setFieldValue }) => (


                <View style={styles.container}>
                    <View style={styles.img_container}>
                        <Image style={styles.img_child} source={require("../../assets/create-account-img.png")} />
                    </View>

                    {/* Password------------ */}

                    <View>
                        <View>
                            <View style={{ width: responsiveWidth(90), marginLeft: "auto" }}>
                                <Text style={{ color: FourthColor, fontWeight: "600", fontSize: responsiveFontSize(1.9) }}>Password</Text>
                            </View>
                            <TextInputField
                                onPress={toggleconfirmshowpassword}
                                showPassword={confirmShowPassword}
                                value={values.password}
                                onChangeText={handleChange("password")}
                                type="password"
                                placeholderText="Type here" />
                        </View>

                        {/* Confirm Password------------ */}

                        <View>
                            <View style={{ width: responsiveWidth(90), marginLeft: "auto" }}>
                                <Text style={{ color: FourthColor, fontWeight: "600" }}>Confirm Password</Text>
                            </View>
                            <TextInputField onPress={toggleShowPassword}
                                showPassword={showPassword}
                                value={values.confirmPassword}
                                onChangeText={handleChange("confirmPassword")}
                                type="password" placeholderText="Type here" />
                        </View>

                        {/* Next and Back------------ */}

                        <View style={{ paddingTop: responsiveWidth(60) }}>
                            <TouchableButton backgroundColor="#395E66" color="#FFF" text="Create" />
                            <View style={{ marginVertical: 7 }}>
                                <TouchableButton onPress={() => navigation.goBack()} backgroundColor="#FFF" borderWidth="1" color="#395E66" text="Back" />
                            </View>
                        </View>

                    </View>

                </View>
            )}
        </Formik>
    )
}



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
        resizeMode: "center"
    },

})

export default RegisterPassword;
