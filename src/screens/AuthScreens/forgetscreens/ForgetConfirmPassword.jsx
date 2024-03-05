import {useRef} from 'react';
import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
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
import TouchableButton from '../../../components/TouchableButton';
import TextInputField from '../../../components/TextInputField';
import {moderateVerticalScale, moderateScale} from 'react-native-size-matters';
import {Img_Paths} from '../../../assets/Imagepaths';
import {reset_password} from '../../../../services/api/auth_mdule/auth';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/native';
import NavigationsString from '../../../constants/NavigationsString';
import * as Yup from 'yup';
import ResetPasswordModal from '../../../components/forget-screens-modal/ResetpasswordModal';
import ErrorMessageForm from '../../../components/ErrorMessagesForm';

export const validationForgetConfirmPassword = Yup.object().shape({
  newPassword: Yup.string()
    .required('New Password is required')
    .min(8, 'Password length should be at least 8 characters'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .min(8, 'Password length should be at least 8 characters'),
});

const ForgetConfirmPassword = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(true);
  const {CREATE_NEW_PASSWORD_IMG} = Img_Paths;
  const {LOGIN} = NavigationsString;
  const [isVisible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const forgetuserToken = useSelector(
    state => state?.authSlice?.forgetAccesstoken,
  );
  const navigation = useNavigation();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowPasswordConfir = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const validate = values => {
    return values.newPassword && values.confirmPassword;
  };

  return (
    <Formik
      initialValues={{
        newPassword: '',
        confirmPassword: '',
      }}
      validationSchema={validationForgetConfirmPassword}
      validateOnChange={false}
      onSubmit={async values => {
        const {newPassword, confirmPassword} = values;
        setIsLoading(true);
        try {
          const response = await reset_password(
            newPassword,
            confirmPassword,
            forgetuserToken,
          );
          if (response?.statusCode === 200) {
            setVisible(true);
            setIsLoading(false),
              Toast.show({
                type: 'success',
                text1: response?.message,
              });
            setTimeout(() => {
              navigation.navigate(LOGIN);
            }, 1000);
          } else if (response?.stack) {
            if (
              response?.message ===
              'newPassword length must be at least 8 characters long'
            ) {
              setErrorMessage(
                'newPassword length must be at least 8 characters long',
              );
            }
            setIsLoading(false);
          }
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      }}>
      {({
        values,
        errors,
        handleChange,
        handleSubmit,
        touched,
        setFieldTouched,
      }) => (
        <View style={styles.container}>
          <ScrollView style={{}}>
            <View style={styles.img_container}>
              <Image
                style={styles.img_child}
                source={CREATE_NEW_PASSWORD_IMG}
              />
            </View>

            {/* Code------------ */}

            <View>
              <View>
                <View style={{width: responsiveWidth(90), marginLeft: 'auto'}}>
                  <Text
                    style={{
                      color: FourthColor,
                      fontWeight: '600',
                      fontSize: responsiveFontSize(1.9),
                    }}>
                    New Password
                  </Text>
                </View>
                <TextInputField
                  onChangeText={handleChange('newPassword')}
                  onPress={toggleShowPassword}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  value={values.newPassword}
                  type="password"
                  placeholderText="Enter here"
                  setFieldTouched={() => setFieldTouched('password')}
                />
              </View>

              <View style={{height: responsiveHeight(3.2)}}>
                <ErrorMessageForm
                  errorsField={errors.newPassword}
                  isSubmitted={isSubmitted}
                />
              </View>

              {/* <View */}
              {/* Confirm Password------------ */}

              <View>
                <View style={{width: responsiveWidth(90), marginLeft: 'auto'}}>
                  <Text style={{color: FourthColor, fontWeight: '600'}}>
                    Confirm Password
                  </Text>
                </View>
                <TextInputField
                  onChangeText={handleChange('confirmPassword')}
                  onPress={toggleShowPasswordConfir}
                  showPassword={showPasswordConfirm}
                  type="password"
                  placeholderText="Enter here"
                  value={values.confirmPassword}
                />
              </View>

              <ErrorMessageForm
                errorsField={errors.confirmPassword}
                isSubmitted={isSubmitted}
              />
              {/* Next and Back------------ */}

              <View style={{paddingTop: responsiveWidth(60)}}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <TouchableOpacity
                    disabled={validate(values) ? false : true}
                    onPress={() => {
                      setIsSubmitted(true);
                      handleSubmit();
                    }}
                    style={{
                      width: responsiveWidth(80),
                      backgroundColor: validate(values)
                        ? TextColorGreen
                        : 'rgba(57, 94, 102, 0.3)',
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: responsiveHeight(6.6),
                    }}>
                    {!isLoading ? (
                      <Text
                        style={{
                          fontSize: responsiveFontSize(1.9),
                          fontWeight: '600',
                          letterSpacing: 0.28,
                          color: '#FFF',
                        }}>
                        Save
                      </Text>
                    ) : (
                      <ActivityIndicator color={'#FFF'} />
                    )}
                  </TouchableOpacity>
                </View>

                {/*  */}
              </View>
            </View>

            {/* -------------------------------------------------------------------------- */}
            {/* <View>
                            <View>
                                {/*New Password----------- */}

            {isVisible && (
              <ResetPasswordModal
                setVisible={setVisible}
                isVisible={isVisible}
                text="Reset Password Complete!"
                onPress={() => {}}
              />
            )}
            <Toast />
          </ScrollView>
        </View>
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
    paddingTop: responsiveWidth(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  img_child: {
    width: responsiveWidth(50),
    height: responsiveHeight(20),
    resizeMode: 'center',
  },
});

export default ForgetConfirmPassword;
