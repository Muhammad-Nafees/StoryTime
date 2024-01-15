import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Button,
    Alert,
    Dimensions,
    FlatList,
    ScrollView,
    SafeAreaView,
    ActivityIndicator,
} from 'react-native';
import {
    FourthColor,
    PrimaryColor,
    SecondaryColor,
    TextColorGreen,
    TextinputColor,
    ThirdColor,
} from '../Styles/Style';
import {
    responsiveFontSize,
    responsiveWidth,
    responsiveHeight,
    responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import TextInputField from '../../components/TextInputField';
import TouchableButton from '../../components/TouchableButton';
import { useNavigation } from '@react-navigation/native';
import NavigationsString from '../../constants/NavigationsString';
import { moderateVerticalScale, moderateScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { registeruser_city, } from '../../../store/slices/authSlice';
import { userinfocity } from '../../../store/slices/authStatesandCity/userinfoCity';
import { Path, Svg } from 'react-native-svg';
import { Formik } from 'formik';
import { zipCodeValidation } from '../../../validation/validation';
import SelectDropdown from 'react-native-select-dropdown';

const RegisterUserInformation = ({ }) => {
    const { REGISTER_PASSWORD } = NavigationsString;
    const [currentvalueState, setCurrentValueState] = useState('Select here');
    const [currentvalue, setCurrentValue] = useState('');
    const [isopenState, setIsOpenState] = useState(false);
    const [isOpenCity, setIsOpenCity] = useState(false);
    const [currentvalueCity, setCurrentValueCity] = useState('Selected Here');
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { userdata, loading } = useSelector(state => state?.userinfostate);
    const { userdatacity } = useSelector(state => state?.userinfocity);
    const cityloading = useSelector(state => state?.userinfocity?.loading);
    const { height } = Dimensions.get('window');
    const namesArray = userdata?.data?.map(item => item.name);
    const namesCities = userdatacity?.data?.map((item) => item?.name)
    const SCREENWIDTH = Dimensions.get("window").width
    const SCREENHEIGHT = Dimensions.get("window").height

    console.log("namesarray===", namesArray)
    const units = {
        vw: SCREENWIDTH.width / 100,
        vh: SCREENHEIGHT.height / 100,
    };

    //       export const { width, height } = Dimensions.get('screen'); 
    //  export const windowSizes = Dimensions.get('window'); 

    //  export const sW = width, 
    //    sH = height, 
    //    wW = windowSizes.width, 

    return (
        <Formik
            initialValues={{
                zipCode: '',
                state: '',
                city: '',
            }}
            validationSchema={zipCodeValidation}
            validateOnChange={false}
            onSubmit={async (values, { setSubmitting }) => {
                dispatch(
                    registeruser_city({
                        state: values.state,
                        city: values.city,
                        zipCode: values.zipCode,
                    }),
                );
                navigation.navigate(REGISTER_PASSWORD);
            }}>
            {({
                values,
                error,
                errors,
                touched,
                handleSubmit,
                setFieldValue,
                handleChange,
            }) => (

                <SafeAreaView style={{ flex: 1 }}>
                    <View style={styles.container}>
                        <View style={styles.img_container}>
                            <Image
                                style={styles.img_child}
                                source={require('../../assets/create-account-img.png')}
                            />
                        </View>

                        {/* City------------ */}

                        <View>
                            <View style={{ width: responsiveWidth(89), marginLeft: 'auto' }}>
                                <Text style={[styles.text, { color: FourthColor }]}>State</Text>
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
                                    // searchPlaceHolder='grey'
                                    // searchPlaceHolderColor='grey'

                                    buttonStyle={[
                                        {
                                            width: '80%',
                                            backgroundColor: TextinputColor,
                                            borderRadius: 10,
                                            justifyContent: 'flex-start',
                                            paddingHorizontal: 25,
                                        },
                                        errors.state && { borderColor: 'red', borderWidth: 2 },
                                    ]}
                                    rowTextStyle={{ textAlign: 'left', fontSize: responsiveFontSize(1.9), }}
                                    rowStyle={{ paddingHorizontal: 8, }}
                                    dropdownStyle={{ borderRadius: 10, }}
                                    buttonTextStyle={{
                                        textAlign: 'left',
                                        fontSize: responsiveFontSize(1.9),
                                    }}
                                    renderDropdownIcon={() => (
                                        <Image style={{ width: 16, height: 16, resizeMode: "center" }} source={require("../../assets/bottom-icon.png")} />
                                    )}
                                    onSelect={(selectedItem, index) => {
                                        setFieldValue('state', selectedItem);
                                        const cities = userdata?.data?.find((data) => data?.name === selectedItem)
                                        if (cities) {
                                            dispatch(userinfocity({
                                                countryCode: cities?.countryCode,
                                                isoCode: cities?.isoCode
                                            }))
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

                            {/* State----------- */}

                            <View>
                                <View style={{ width: responsiveWidth(89), marginLeft: 'auto' }}>
                                    <Text style={[styles.text, { color: FourthColor }]}>City</Text>
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
                                        // plac
                                        // searchPlaceHolderColor={"red"}
                                        renderDropdownIcon={() => (
                                            <Image style={{ width: 16, height: 16, resizeMode: "center" }} source={require("../../assets/bottom-icon.png")} />
                                        )}
                                        buttonStyle={[
                                            {
                                                width: '80%',
                                                backgroundColor: TextinputColor,
                                                borderRadius: 10,
                                                justifyContent: 'flex-start',
                                                paddingHorizontal: 25,
                                            },
                                            errors.state && { borderColor: 'red', borderWidth: 2 },
                                        ]}
                                        rowTextStyle={{ textAlign: 'left', fontSize: responsiveFontSize(1.9) }}
                                        rowStyle={{ paddingHorizontal: 8 }}
                                        dropdownStyle={{ borderRadius: 10 }}
                                        buttonTextStyle={{
                                            textAlign: 'left',
                                            fontSize: responsiveFontSize(1.9),
                                        }}
                                        onSelect={(selectedItem, index) => {
                                            setFieldValue('city', selectedItem);
                                            console.log("selectitem", selectedItem)
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

                            <View>
                                <View style={{ width: responsiveWidth(89), marginLeft: 'auto' }}>
                                    <Text style={[styles.text, { color: FourthColor }]}>
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

                            {errors.zipCode && (
                                <View
                                    style={{
                                        width: responsiveWidth(90),
                                        marginLeft: 'auto',
                                        paddingBottom: responsiveWidth(2),
                                    }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View>
                                            <Svg
                                                width={20}
                                                height={20}
                                                viewBox="0 0 24 24"
                                                fill="red">
                                                <Path d="M12 2C6.485 2 2 6.485 2 12s4.485 10 10 10 10-4.485 10-10S17.515 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                                            </Svg>
                                        </View>
                                        <View style={{ paddingHorizontal: moderateScale(5) }}>
                                            <Text
                                                style={{
                                                    color: 'red',
                                                    fontSize: responsiveFontSize(1.7),
                                                    fontWeight: '600',
                                                }}>
                                                {errors.zipCode}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            )}
                        </View>

                        {/* Next and Back------------ */}

                        <View style={{ marginTop: responsiveWidth(30) }}>
                            <TouchableButton
                                onPress={
                                    values.city !== '' && values.state !== '' && values.zip !== ''
                                        ? handleSubmit
                                        : null
                                }
                                backgroundColor={
                                    values.city !== '' && values.state !== '' && values.zip !== ''
                                        ? '#395E66'
                                        : 'rgba(57, 94, 102, 0.5)'
                                }
                                color="#FFF"
                                text="Next"
                            />
                            <View style={{ paddingVertical: moderateVerticalScale(7) }}>
                                <TouchableButton
                                    onPress={() => navigation.goBack()}
                                    backgroundColor="#FFF"
                                    borderWidth="1"
                                    color="#395E66"
                                    text="Back"
                                />
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            )}
        </Formik>
    );
};

export default RegisterUserInformation;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: SecondaryColor,
        flex: 1,
    },
    text: {
        fontSize: responsiveFontSize(1.7),
        fontWeight: '600',
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
