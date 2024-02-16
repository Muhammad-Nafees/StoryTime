import React, { useState } from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Button,
    Alert,
    ActivityIndicator,
} from 'react-native';
import {
    FourthColor,
    PrimaryColor,
    SecondaryColor,
    TextColorGreen,
    TextinputColor,
    ThirdColor,
} from '../../Styles/Style';
import {
    responsiveFontSize,
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';

import { useNavigation } from '@react-navigation/native';
import TextInputField from '../../../components/TextInputField';
import TouchableButton from '../../../components/TouchableButton';
import NavigationsString from '../../../constants/NavigationsString';
import { moderateVerticalScale, moderateScale } from 'react-native-size-matters';
import { Img_Paths } from '../../../assets/Imagepaths';
import reset_email from '../../../../services/api/auth_mdule/auth';
import Toast from 'react-native-toast-message';
import { Formik } from 'formik';
import { validationforgetEmail } from '../../../../validation/validation';
import { Path, Svg } from 'react-native-svg';
import _ from 'lodash';
import CustomInputForgetEmail from '../../../components/CustomInputForgetEmail';


const ForgetEmail = () => {
    const { FORGET_PHONE_NO, OTP_FORGET } = NavigationsString;
    const { FORGET_BG_IMG } = Img_Paths;
    const [EmailError, setEmailError] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();

    return (
        <Formik
            initialValues={{
                email: '',
            }}
            validationSchema={validationforgetEmail}
            onSubmit={async values => {

            }}>
            {({ values, errors, handleChange, handleSubmit, setFieldError, touched, setFieldValue, dirty, isValid }) => (

                <>
                    <View style={styles.container}>
                        <View style={styles.img_container}>
                            <Image style={styles.img_child} source={FORGET_BG_IMG} />
                        </View>

                        {/* Password------------ */}

                        <View>
                            <View>
                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <CustomInputForgetEmail
                                        label="Email Adress"
                                        placeholder="Type here"
                                        value={values.email}
                                        error={errors.email}
                                        touched={touched.email}
                                        initialTouched={true}
                                        setFieldError={setFieldError}
                                        erroremail={errors?.email}
                                        handleSubmit={handleSubmit}
                                        fieldName="email"
                                        dirty={dirty}
                                        isValid={isValid}
                                        handleChange={text => setFieldValue('email', text)}
                                    />
                                </View>
                            </View>
                            {/* Next------------ */}

                        </View>
                        <Toast />
                    </View>
                </>
            )}
        </Formik>
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

export default ForgetEmail;
