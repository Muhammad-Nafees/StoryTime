import {
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {Img_Paths} from '../../../assets/Imagepaths';
import SvgIcons from '../../../components/svgIcon/svgIcons';
import ScreenHeader from '../../../components/ScreenHeader';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SPACING,
} from '../../../constants/Constant';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Formik} from 'formik';
import {validationSettingsProfile} from '../../../../validation/validation';
import CustomInput from '../../../components/CustomInput';
import UploadImage from '../../../components/UploadImage';
import CustomPhoneInput from '../../../components/CustomPhoneInput';
import TouchableButton from '../../../components/TouchableButton';
import {
  FourthColor,
  PrimaryColor,
  SecondaryColor,
  TextColorGreen,
  TextinputColor,
  ThirdColor,
} from '../../Styles/Style';
import SelectDropdown from 'react-native-select-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import TextInputField from '../../../components/TextInputField';
import {Path, Svg} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {
  getUserProfileData,
  updateUserProfileData,
} from '../../../../services/api/settings';
import {userinfocity} from '../../../../store/slices/authStatesandCity/userinfoCity';
import {
  userinfoState,
  userdata,
} from '../../../../store/slices/authStatesandCity/userInfoState_Slice';

const SettingsProfile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {BG_CONTAINER, AVATAR, DROP_ICON, DEFAULT_ICON} = Img_Paths;

  const uploadImageRef = useRef(null);
  const phoneInput = useRef(null);
  const [isError, setIsError] = useState('');

  const phoneCode = phoneInput?.current?.state?.code;
  const countryCode = phoneInput?.current?.state?.countryCode;

  const [formatText, setFormatText] = useState('');
  const [countryCodeState, setCountryCodeState] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [phoneNumberStatusCode, setphoneNumberStatusCode] = useState(); //checks of phone no is valid

  const {userdata, loading} = useSelector(state => state?.userinfostate);
  const {userdatacity} = useSelector(state => state?.userinfocity);
  const cityloading = useSelector(state => state?.userinfocity?.loading);
  const namesArray = userdata?.data?.map(item => item.name);
  console.log('🚀 ~ SettingsProfile ~ namesArray:', namesArray);
  const namesCities = userdatacity?.data?.map(item => item?.name);
  const {user} = useSelector(state => state?.authSlice);
  const [initialData, setinitialData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    phoneNo: '',
    email: '',
    role: 'user',
    fcmToken: '1234567',
    zipCode: '',
    state: '',
    city: '',
  });

  const handleFormSubmit = async values => {
    console.log('values', values);
    const res = await updateUserProfileData(values);
    console.log('🚀 ~ handleFormSubmit ~ res:', res);
    navigation.goBack();
  };

  const getData = async () => {
    const uid = user?.data?.user?._id;
    let {data} = await getUserProfileData(uid);
    console.log('🚀 ~ getData ~ data:', data);

    const payload = {
      username: data?.username || '',
      firstName: data?.firstName || '',
      lastName: data?.lastName || '',
      phoneCode: data?.phoneCode || '',
      countryCode: data?.countryCode || '',
      phoneNo: data?.phoneNo || '',
      email: data?.email || '',
      city: data?.city || '',
      state: data?.state || '',
      zipCode: data?.zipCode || '',
    };
    setinitialData(payload);
    setCountryCodeState(data?.countryCode);
    dispatch(userinfoState(data?.countryCode)); ///look
  };

  useEffect(() => {
    getData();
  }, []);

  const modalOpen = item => {
    if (uploadImageRef.current) {
      uploadImageRef.current.open();
    }
  };

  return (
    <BackgroundWrapper>
      <ImageBackground
        source={
          user?.data?.user?.coverImage
            ? user?.data?.user?.coverImage
            : BG_CONTAINER
        }
        style={styles.bg_img_container}>
        <ScreenHeader title={'Profile'} clr={'#fff'} />
      </ImageBackground>
      <View style={{width: SCREEN_WIDTH}}>
        <View style={styles.avatar_wrapper}>
          <Image
            source={
              user?.data?.user?.profileImage
                ? user?.data?.user?.profileImage
                : DEFAULT_ICON
            }
            style={styles.avatar}
            resizeMode="stretch"
          />
          <TouchableOpacity
            onPress={() => modalOpen()}
            style={styles.icon_container}>
            <SvgIcons name={'PencilEdit'} width={40} height={40} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => modalOpen()}
          style={styles.icon_container2}>
          <SvgIcons name={'PencilEdit'} width={40} height={40} />
        </TouchableOpacity>
      </View>

      <Formik
        enableReinitialize
        initialValues={initialData}
        validationSchema={validationSettingsProfile}
        onSubmit={handleFormSubmit}>
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          setFieldValue,
          touched,
          isValid,
          dirty,
          setFieldError,
        }) => (
          <>
          {console.log("values",values.state)}
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <CustomInput
                label="Username"
                placeholder="Type here"
                value={values.username}
                error={errors.username}
                // customError={usernameError}
                touched={touched.username}
                initialTouched={true}
                setFieldError={setFieldError}
                // isVisible={isVisible}
                // setVisible={setVisible}
                fieldName="username"
                handleChange={text => setFieldValue('username', text)}
              />

              <CustomInput
                label="First Name"
                placeholder="Type here"
                value={values.firstName}
                error={errors.firstName}
                touched={touched.firstName}
                initialTouched={true}
                setFieldError={setFieldError}
                fieldName="firstName"
                handleChange={text => setFieldValue('firstName', text)}
              />

              <CustomInput
                label="Last Name"
                placeholder="Type here"
                value={values.lastName}
                error={errors.lastName}
                touched={touched.lastName}
                initialTouched={true}
                setFieldError={setFieldError}
                fieldName="lastName"
                handleChange={text => setFieldValue('lastName', text)}
              />

              {countryCodeState && (
                <CustomPhoneInput
                  value={values.phoneNo}
                  error={errors.phoneNo}
                  touched={touched.phoneNo}
                  handleChange={handleChange('phoneNo')}
                  setFieldValue={setFieldValue}
                  phoneInput={phoneInput}
                  setIsError={setIsError}
                  setFieldError={setFieldError}
                  setFormatText={setFormatText}
                  isError={isError}
                  defaultCode={countryCodeState}
                  setPhoneCode={setCountryCodeState}
                  setPhoneError={setPhoneError}
                  setphoneNumberStatusCode={setphoneNumberStatusCode}
                />
              )}

              <CustomInput
                label="Email Address"
                placeholder="Type here"
                value={values.email}
                error={errors.email}
                // customError={emailError}
                touched={touched.email}
                initialTouched={true}
                // setFieldError={setEmailError}
                // setEmailstatusCode={setEmailstatusCode}
                fieldName="email"
                handleChange={text => setFieldValue('email', text)}
              />
            </View>
            <View>
              {/* City----------- */}

              <View>
                <View style={{width: responsiveWidth(89), marginLeft: 'auto'}}>
                  <Text style={[styles.text, {color: FourthColor}]}>City</Text>
                </View>
                <View
                  style={{
                    paddingVertical: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <SelectDropdown
                    data={namesCities}
                    defaultButtonText="Select here"
                    defaultValue={values.city}
                    // plac
                    // searchPlaceHolderColor={"red"}
                    renderDropdownIcon={() => (
                      <Image
                        style={{width: 16, height: 16, resizeMode: 'center'}}
                        source={DROP_ICON}
                      />
                    )}
                    buttonStyle={[
                      {
                        width: '80%',
                        backgroundColor: TextinputColor,
                        borderRadius: 10,
                        justifyContent: 'flex-start',
                        paddingHorizontal: 25,
                      },
                      errors.state && {borderColor: 'red', borderWidth: 2},
                    ]}
                    rowTextStyle={{
                      textAlign: 'left',
                      fontSize: responsiveFontSize(1.9),
                    }}
                    rowStyle={{paddingHorizontal: 8}}
                    dropdownStyle={{borderRadius: 10}}
                    buttonTextStyle={{
                      textAlign: 'left',
                      fontSize: responsiveFontSize(1.9),
                    }}
                    onSelect={(selectedItem, index) => {
                      setFieldValue('city', selectedItem);
                      console.log('selectitem', selectedItem);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item;
                    }}
                  />
                </View>
              </View>
              {/* State----------- */}
              <>
                <View style={{width: responsiveWidth(89), marginLeft: 'auto'}}>
                  <Text style={[styles.text, {color: FourthColor}]}>State</Text>
                </View>

                <View
                  style={{
                    paddingVertical: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                 {namesArray?.length >0 && <SelectDropdown
                    data={namesArray}
                    defaultButtonText="Select here"
                    defaultValue={values.state}
                    buttonStyle={[
                      {
                        width: '80%',
                        backgroundColor: TextinputColor,
                        borderRadius: 10,
                        justifyContent: 'flex-start',
                        paddingHorizontal: 25,
                      },
                      errors.state && {borderColor: 'red', borderWidth: 2},
                    ]}
                    rowTextStyle={{
                      textAlign: 'left',
                      fontSize: responsiveFontSize(1.9),
                    }}
                    rowStyle={{paddingHorizontal: 8}}
                    dropdownStyle={{borderRadius: 10}}
                    buttonTextStyle={{
                      textAlign: 'left',
                      fontSize: responsiveFontSize(1.9),
                    }}
                    renderDropdownIcon={() => (
                      <Image
                        style={{width: 16, height: 16, resizeMode: 'center'}}
                        source={DROP_ICON}
                      />
                    )}
                    onSelect={(selectedItem, index) => {
                      setFieldValue('state', selectedItem);
                      const cities = userdata?.data?.find(
                        data => data?.name === selectedItem,
                      );
                      if (cities) {
                        dispatch(
                          userinfocity({
                            countryCode: cities?.countryCode,
                            isoCode: cities?.isoCode,
                          }),
                        );
                      }
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item;
                    }}
                  />}
                </View>
              </>

              <View>
                <View style={{width: responsiveWidth(89), marginLeft: 'auto'}}>
                  <Text style={[styles.text, {color: FourthColor}]}>
                    Zip Code
                  </Text>
                </View>

                <TextInputField
                  placeholderText="Type here"
                  type="zipcode"
                  value={values.zipCode}
                  // onChangeText={(val) => handlezipcode(val)}
                  onChangeText={handleChange('zipCode')}
                />
              </View>

              <View
                style={{
                  paddingVertical: responsiveWidth(6),
                  alignSelf: 'center',
                }}>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={{
                    width: responsiveWidth(80),
                    backgroundColor:
                      values.email &&
                      values.firstName &&
                      values.lastName &&
                      values.phoneNo &&
                      values.username
                        ? '#395E66'
                        : 'rgba(57, 94, 102, 0.6)',
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#395E66',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: responsiveHeight(6.6),
                  }}
                  disabled={
                    !(
                      values.email &&
                      values.firstName &&
                      values.lastName &&
                      values.phoneNo &&
                      values.username
                    )
                  }>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.9),
                      fontWeight: '600',
                      letterSpacing: 0.28,
                      color: 'white',
                    }}>
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* <Toast /> */}
          </>
        )}
      </Formik>
      <UploadImage uploadImageRef={uploadImageRef} />
    </BackgroundWrapper>
  );
};

export default SettingsProfile;

const styles = StyleSheet.create({
  bg_img_container: {
    height: SCREEN_HEIGHT / 4.5,
    width: SCREEN_WIDTH,
    // opacity:0.8,
    // backgroundColor:"#000"
  },
  text: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: '600',
  },
  avatar_wrapper: {
    height: responsiveWidth(30),
    width: responsiveWidth(30),
    alignSelf: 'center',
    marginTop: -responsiveWidth(30) / 2,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#395E66',
    backgroundColor: 'white',
  },
  avatar: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    // backgroundColor:'red',
  },
  icon_container: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  icon_container2: {
    position: 'absolute',
    top: 0,
    right: 0,
    marginRight: SPACING,
    marginTop: -20,
  },
});
