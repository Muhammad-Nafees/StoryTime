import React, { useState } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FourthColor, SecondaryColor, TextColorGreen } from '../Styles/Style';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import TextInputField from '../../components/TextInputField';
import TouchableButton from '../../components/TouchableButton';
import SocialsLogin from '../../components/SocialsLogin';
import { useNavigation } from '@react-navigation/native';
import { login } from '../../../store/slices/User_Slice';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import NavigationsString from '../../constants/NavigationsString';




const SignInSchema = Yup.object().shape({
    username: Yup.string().min(4, 'Too Short').max(40, 'Too Long!').required('Please Enter Your Full Name'),
    password: Yup.string()
        .min(8)
        .required('Please enter your password')
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            'Must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character'
        ),
});

const Login = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const { REGISTER, FORGET_EMAIL } = NavigationsString

    const toggleShowPassword = () => {
        setShowPassword(!showPassword); // Toggle the state between true and false
    };

    return (
        <Formik
            initialValues={{
                username: '',
                password: '',
            }}
            validationSchema={SignInSchema}
            onSubmit={(values, { setSubmitting }) => {
                if (!values.username || !values.password) {
                    return;
                }
                dispatch(login(values));
                setSubmitting(false);
            }}
        >
            {({ values, errors, handleChange, handleSubmit }) => (
                <View style={styles.container}>
                    <View style={styles.img_container}>
                        <Image style={styles.img_child} source={require('../../assets/story-time-without.png')} />
                    </View>
                    <View>
                        <View style={{ width: '90%', marginLeft: 'auto' }}>
                            <Text style={{ color: FourthColor, fontWeight: '600' }}>Username</Text>
                        </View>
                        <TextInputField
                            value={values.username}
                            onChangeText={handleChange('username')}
                            placeholderText="Type here"
                        />
                        <View style={{ width: '90%', marginLeft: 'auto' }}>
                            {errors.username && <Text style={{ color: 'red', fontSize: responsiveFontSize(1.9) }}>{errors.username}</Text>}
                        </View>
                        <View style={{ width: '90%', marginLeft: 'auto' }}>
                            <Text style={{ color: FourthColor, fontWeight: '600' }}>Password</Text>
                        </View>
                        <TextInputField
                            value={values.password}
                            onChangeText={handleChange('password')}
                            onPress={toggleShowPassword}
                            showPassword={showPassword}
                            placeholderText="Type here"
                            type="password"
                        />
                        <View style={{ width: '90%', marginLeft: 'auto' }}>
                            {errors.password && <Text style={{ color: 'red', fontSize: responsiveFontSize(1.9) }}>{errors.password}</Text>}
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate(FORGET_EMAIL)} style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ color: FourthColor, fontWeight: '600', fontSize: responsiveFontSize(1.9) }}>Forgot password?</Text>
                        </TouchableOpacity>
                        <View style={{ marginTop: 14 }}>
                            <TouchableButton onPress={handleSubmit} color="#FFF" backgroundColor="#395E66" text="Login" />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <View style={styles.text_container}>
                                <Text style={[styles.text, { color: FourthColor }]}>By logging in, you agree to our </Text>
                                <TouchableOpacity>
                                    <Text style={[styles.text, { color: TextColorGreen }]}> Terms & Conditions </Text>
                                </TouchableOpacity>
                                <Text style={[styles.text, { color: FourthColor }]}> and </Text>
                                <TouchableOpacity>
                                    <Text style={[styles.text, { color: TextColorGreen }]}>Privacy Policy</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 12 }}>
                                <Text style={[styles.text, { color: FourthColor, fontWeight: '400' }]}>or login with</Text>
                                <View style={{ flexDirection: 'row', width: '78%', justifyContent: 'space-between' }}>
                                    <SocialsLogin ImageSource={require('../../assets/google-icon.png')} />
                                    <SocialsLogin ImageSource={require('../../assets/facebook-icon.png')} />
                                    <SocialsLogin ImageSource={require('../../assets/apple-icon.png')} />
                                </View>
                            </View>

                            <View style={{ marginTop: responsiveWidth(6), flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[styles.text, { color: FourthColor }]}>Don’t have an account yet? </Text>
                                <TouchableOpacity onPress={() => navigation.navigate(REGISTER)}>
                                    <Text style={[styles.text, { color: TextColorGreen, fontWeight: '600' }]}>Create one</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            )}
        </Formik>
    );
};


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: responsiveHeight(100),
        backgroundColor: SecondaryColor,
        flex: 1,
    },
    text: {
        fontSize: responsiveFontSize(1.8),
        fontWeight: '400',
    },
    img_container: {
        marginVertical: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img_child: {
        width: responsiveWidth(50),
        height: responsiveHeight(20),
        resizeMode: 'center',
    },
    text_container: {
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Login;
