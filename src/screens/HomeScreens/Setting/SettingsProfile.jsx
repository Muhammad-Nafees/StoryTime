import {
  Text,
  View,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  SPACING,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
} from '../../../constants/Constant';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {TextColorGreen, TextinputColor} from '../../Styles/Style';
import {
  getUserProfileData,
  updateUserProfileData,
} from '../../../../services/api/settings';

import {Formik} from 'formik';
import {base} from '../../../../services';
import {useDispatch, useSelector} from 'react-redux';
import {Img_Paths} from '../../../assets/Imagepaths';
import {useNavigation} from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import {login} from '../../../../store/slices/authSlice';
import React, {useState, useRef, useEffect} from 'react';
import SvgIcons from '../../../components/svgIcon/svgIcons';
import CustomInput from '../../../components/auth/CustomInput';
import TextInputField from '../../../components/TextInputField';
import {Inter_SemiBold} from '../../../constants/GlobalFonts';
import CustomPhoneInput from '../../../components/auth/CustomPhoneInput';
import {validationSettingsProfile} from '../../../../validation/validation';
import ScreenHeader from '../../../components/reusable-components/ScreenHeader';
import UploadImage from '../../../components/reusable-components/modals/UploadImage';
import {userinfocity} from '../../../../store/slices/authStatesandCity/userinfoCity';
import BackgroundWrapper from '../../../components/reusable-components/BackgroundWrapper';
import {userinfoState} from '../../../../store/slices/authStatesandCity/userInfoState_Slice';

const CoverAndProfileContent = ({
  coverImage,
  profileImage,
  uploadProfileImageRef,
  uploadCoverImageRef,
}) => {
  const {BG_CONTAINER, DROP_ICON, DEFAULT_ICON} = Img_Paths;

  const modalOpen = ref => {
    if (ref.current) {
      ref.current.open();
    }
  };

  return (
    <>
      <ImageBackground
        source={coverImage?.uri ? {uri: coverImage?.uri} : BG_CONTAINER}
        style={styles.bg_img_container}>
        <ScreenHeader title={'Profile'} clr={'#fff'} />
      </ImageBackground>
      <View style={{width: SCREEN_WIDTH}}>
        <View style={styles.avatar_wrapper}>
          <Image
            source={profileImage?.uri ? {uri: profileImage?.uri} : DEFAULT_ICON}
            style={styles.avatar}
            resizeMode="contain"
          />
          <TouchableOpacity
            onPress={() => modalOpen(uploadProfileImageRef)}
            style={styles.icon_container}>
            <SvgIcons name={'PencilEdit'} width={40} height={40} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => modalOpen(uploadCoverImageRef)}
          style={styles.icon_container2}>
          <SvgIcons name={'PencilEdit'} width={40} height={40} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const SettingsProfile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {DROP_ICON} = Img_Paths;

  const uploadProfileImageRef = useRef(null);
  const uploadCoverImageRef = useRef(null);

  const phoneInput = useRef(null);
  const [isError, setIsError] = useState('');

  const [countryCodeState, setCountryCodeState] = useState('');

  const {userdata, loading} = useSelector(state => state?.userinfostate);
  console.log('🚀 ~ SettingsProfile ~ userdata:', userdata);
  const {userdatacity} = useSelector(state => state?.userinfocity);
  const cityloading = useSelector(state => state?.userinfocity?.loading);
  const namesArray = userdata?.data?.map(item => item.name); //state names
  const namesCities = userdatacity?.data?.map(item => item?.name);

  const {user} = useSelector(state => state?.authSlice);
  const [initialData, setinitialData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    phoneNo: '',
    email: '',
    zipCode: '',
    state: '',
    city: '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [userCity, setUserCity] = useState(null);
  const [initialLoading, setInitialLoading] = React.useState(true);

  const handleFormSubmit = async values => {
    // console.log('pImage',profileImage.uri)

    const payload = {
      ...(values || {}),
      ...(profileImage?.uri && {profileImage: profileImage?.uri}),
      ...(coverImage?.uri && {coverImage: coverImage?.uri}),
    };
    const response = await updateUserProfileData(payload);
    dispatch(login(response));
    navigation.goBack();
  };

  const getData = async () => {
    const uid = user?.data?.user?._id || user?.data?._id;
    let {data} = await getUserProfileData(uid);
    console.log('🚀 ~ getData ~ data:', data, data?.profileImage);

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

    if (data?.profileImage) {
      // console.log('profileimg',data?.profileImage)
      setProfileImage({uri: `${base}${data?.profileImage}`});
    }
    if (data?.coverImage) {
      setCoverImage({uri: `${base}${data?.coverImage}`});
    }
    if (data?.state) {
      setUserCity(data?.state);
    }
    handleCountryCodeChange(data?.countryCode);
    setinitialData(payload);
    setInitialLoading(false);
  };

  const handleCountryCodeChange = countryCode => {
    setCountryCodeState(countryCode);
    dispatch(userinfoState(countryCode)); ///look
  };

  useEffect(() => {
    getData();
  }, []);

  const handleInitCity = selected => {
    // console.log('🚀 ~ selectedItems ~ selected city data:', selected);
    const cities = userdata?.data?.find(data => data?.name === selected);
    // console.log('🚀 ~ handleInitCity ~ my - cities:', cities);
    if (cities) {
      dispatch(
        userinfocity({
          countryCode: cities?.countryCode,
          isoCode: cities?.isoCode,
        }),
      );
    }
  };

  useEffect(() => {
    if (userdata && userCity) {
      handleInitCity(userCity);
    }
  }, [userdata, userCity]);

  return (
    <>
      {initialLoading ? (
        <BackgroundWrapper contentContainerStyle={{flex: 1}} coverScreen>
          <View style={styles.container}>
            <ActivityIndicator size="large" />
          </View>
        </BackgroundWrapper>
      ) : (
        <BackgroundWrapper>
          <CoverAndProfileContent
            coverImage={coverImage}
            profileImage={profileImage}
            uploadProfileImageRef={uploadProfileImageRef}
            uploadCoverImageRef={uploadCoverImageRef}
          />
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
                {console.log('values', values.state)}
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <CustomInput
                    label="Username"
                    placeholder="Type here"
                    value={values.username}
                    error={errors.username}
                    touched={touched.username}
                    initialTouched={true}
                    setFieldError={setFieldError}
                    fieldName="username"
                    labelStyles={{
                      color: TextColorGreen,
                      fontFamily: Inter_SemiBold.Inter_SemiBold,
                      fontSize: 12,
                      marginTop: responsiveHeight(2),
                    }}
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
                    labelStyles={{
                      color: TextColorGreen,
                      fontFamily: Inter_SemiBold.Inter_SemiBold,
                      fontSize: 12,
                    }}
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
                    labelStyles={{
                      color: TextColorGreen,
                      fontFamily: Inter_SemiBold.Inter_SemiBold,
                      fontSize: 12,
                    }}
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
                      setFormatText={()=>{}}
                      isError={isError}
                      defaultCode={countryCodeState}
                      setPhoneCode={handleCountryCodeChange}
                      setPhoneError={()=>{}}
                      setphoneNumberStatusCode={()=>{}}
                      labelStyles={{
                        color: TextColorGreen,
                        fontFamily: Inter_SemiBold.Inter_SemiBold,
                        fontSize: 12,
                      }}
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
                    labelStyles={{
                      color: TextColorGreen,
                      fontFamily: Inter_SemiBold.Inter_SemiBold,
                      fontSize: 12,
                      marginTop: responsiveHeight(3.5),
                    }}
                    handleChange={text => setFieldValue('email', text)}
                  />
                </View>
                <View>
                  {/* City----------- */}

                  {namesCities?.length > 0 && (
                    <View>
                      <View
                        style={{
                          width: responsiveWidth(89),
                          marginLeft: 'auto',
                        }}>
                        <Text
                          style={[
                            styles.text,
                            {
                              color: TextColorGreen,
                              fontFamily: Inter_SemiBold.Inter_SemiBold,
                              fontSize: 12,
                            },
                          ]}>
                          City
                        </Text>
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
                              style={{
                                width: 16,
                                height: 16,
                                resizeMode: 'center',
                              }}
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
                            errors.state && {
                              borderColor: 'red',
                              borderWidth: 2,
                            },
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
                            handleInitCity(selectedItem);
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
                  )}

                  {/* State----------- */}
                  {namesArray?.length > 0 && (
                    <>
                      <View
                        style={{
                          width: responsiveWidth(89),
                          marginLeft: 'auto',
                        }}>
                        <Text
                          style={[
                            styles.text,
                            {
                              color: TextColorGreen,
                              fontFamily: Inter_SemiBold.Inter_SemiBold,
                              fontSize: 12,
                              marginTop: responsiveHeight(2),
                            },
                          ]}>
                          State
                        </Text>
                      </View>

                      <View
                        style={{
                          paddingVertical: 12,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <SelectDropdown
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
                            errors.state && {
                              borderColor: 'red',
                              borderWidth: 2,
                            },
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
                              style={{
                                width: 16,
                                height: 16,
                                resizeMode: 'center',
                              }}
                              source={DROP_ICON}
                            />
                          )}
                          onSelect={(selectedItem, index) => {
                            setFieldValue('state', selectedItem);
                            // selectedItems(selectedItem);
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
                        />
                      </View>
                    </>
                  )}

                  <View>
                    <View
                      style={{
                        width: responsiveWidth(89),
                        marginLeft: 'auto',
                      }}>
                      <Text
                        style={[
                          styles.text,
                          {
                            color: TextColorGreen,
                            fontFamily: Inter_SemiBold.Inter_SemiBold,
                            fontSize: 12,
                            marginTop: responsiveHeight(2),
                          },
                        ]}>
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
                  <Text></Text>
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
                          fontSize: 14,
                          fontWeight: '600',
                          letterSpacing: 0.28,
                          color: 'white',
                          fontFamily: Inter_SemiBold.Inter_SemiBold,
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
          <UploadImage
            setImage={setProfileImage}
            uploadImageRef={uploadProfileImageRef}
          />
          <UploadImage
            setImage={setCoverImage}
            uploadImageRef={uploadCoverImageRef}
          />
        </BackgroundWrapper>
      )}
    </>
  );
};

export default SettingsProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING,
  },
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
    borderRadius: 100,
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
