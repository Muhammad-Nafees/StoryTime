import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Field } from 'formik';
import PhoneInput from 'react-native-phone-number-input';
import Icon from 'react-native-vector-icons/Ionicons';
import { verticalScale } from 'react-native-size-matters';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { FourthColor, TextinputColor } from '../../screens/Styles/Style';
import _ from 'lodash';
import { Path, Svg } from 'react-native-svg';
import { Inter_Regular, Inter_SemiBold } from '../../constants/GlobalFonts';

const CustomPhoneInput = ({
  handleChange,
  error,
  value,
  phoneInput,
  isError,
  setIsError,
  setPhoneCode,
  setFieldError,
  disabled = false,
  setFormatText,
  defaultCode,
  labelStyles
}) => {
  // console.log("error && isError", error,"//",isError)

  // const [isFocused, setIsFocused] = useState(false);
  // const [response, setResponse] = useState();
  // const [statusCodePhone, setStatusCodePhone] = useState();

  // const debouncedApiCall = useRef(
  //   _.debounce(async (phoneNumber, setFieldError) => {
  //     const code = phoneInput?.current?.state?.code;
  //     setResponse(response?.status);
  //     const response = await username_api({
  //       completePhone: `+${code}${phoneNumber}`,
  //     });
  //     setphoneNumberStatusCode(response?.statusCode);
  //     setStatusCodePhone(response?.statusCode);
  //     console.log(response?.statusCode);
  //     if (response?.statusCode !== 200) {
  //       setPhoneError('Phone Number already exists'); //no need for this
  //       setIsError('Phone Number already exists');
  //       setFieldError('phoneNo', `Phone Number already exists`);
  //     }
  //   }, 300),
  // ).current;

  const handleCountryChange = () => {
    phoneInput.current?.setState({ number: '' });
  };

  // useEffect(() => {
  //   if (touched && value === '') {
  //     setIsError('Phone number is required!');
  //   }
  // }, [touched, value]);

  // console.log('statusPhoneCOde===', statusCodePhone);
  // // ----------------------

  // const handleFocus = () => {
  //   setIsFocused(true);
  // };

  // const handleBlur = () => {
  //   setIsFocused(false);
  // };

  return (
    <View style={{}}>
      <Text
        style={[{
          color:FourthColor,
          fontWeight: '600',
          marginBottom: verticalScale(7),
        },
        labelStyles]}>
        Phone Number
      </Text>

      <Field name="phoneNo">
        {() => (
          <PhoneInput

            ref={phoneInput}
            disabled={disabled}
            placeholder=" "
            defaultCode={defaultCode || 'AU'}
            onChangeFormattedText={text => setFormatText(text)}
            containerStyle={styles.phoneContainer}
            textContainerStyle={styles.phoneTextContainer}
            textInputStyle={styles.phoneTextInput}
            flagButtonStyle={{ width: 90 }}
            value={value}
            codeTextStyle={{
              color: 'rgba(170, 170, 170, 1)',
              fontFamily: Inter_Regular.Inter_Regular,
              fontWeight: '400',
              fontSize: responsiveFontSize(1.8),
            }}
            onChangeText={phoneNumber => {
              handleChange(phoneNumber);
              setFieldError('phoneNo', '');
              setIsError('');
              const checkValid = phoneInput.current?.isValidNumber(phoneNumber);
            }}
            renderDropdownImage={
              <Svg
                width="19"
                height="10"
                viewBox="0 0 19 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <Path
                  d="M17.3625 1.21094L10.8425 7.73094C10.0725 8.50094 8.81246 8.50094 8.04246 7.73094L1.52246 1.21094"
                  stroke="#696969"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </Svg>
            }
            onChangeCountry={country => {
              setPhoneCode(country.callingCode);
              console.log(country.callingCode, 'phoneCode');
              handleCountryChange();
            }}
            onCopy={() => {
              console.log('Copy event triggered');
              // Add any additional debugging statements here
            }}
          />
        )}
      </Field>

      {/* { */}
      {/* (value !== "" && !isFocused && (!error || !isError)) && ( */}

      {/* )} */}

      {value !== '' && (error || isError) && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2,
            marginTop: 2,
          }}>
          <Icon name="alert-circle" size={22} color="red" />
          <Text style={{ color: 'red' }}>{error || isError}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  phoneInput: {
    width: responsiveWidth(80),
    borderRadius: 12,
    backgroundColor: TextinputColor,
    color: FourthColor,
    height: 40,
  },
  phoneTextInput: {
    padding: 0,
    fontSize: responsiveFontSize(2),
    color: '#000',
    marginTop: verticalScale(1.5),
  },
  phoneTextContainer: {
    backgroundColor: '#F3F3F3',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  phoneContainer: {
    width: responsiveWidth(80),
    backgroundColor: 'rgba(232, 232, 232, 1)',
    borderRadius: 12,
  },
});

export default CustomPhoneInput;
