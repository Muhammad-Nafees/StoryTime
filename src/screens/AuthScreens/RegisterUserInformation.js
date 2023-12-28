import React, { useEffect, useState } from 'react'
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet, Button, Alert, Dimensions, FlatList, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native'
import { FourthColor, PrimaryColor, SecondaryColor, TextColorGreen, TextinputColor, ThirdColor } from '../Styles/Style';
import { responsiveFontSize, responsiveWidth, responsiveHeight, responsiveScreenWidth } from "react-native-responsive-dimensions"
import TextInputField from '../../components/TextInputField';
import TouchableButton from '../../components/TouchableButton';
import SocialsLogin from '../../components/SocialsLogin';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import NavigationsString from '../../constants/NavigationsString';
import { moderateVerticalScale, moderateScale } from "react-native-size-matters"
import { useDispatch, useSelector } from 'react-redux';
import { register, registeruser_city } from '../../../store/slices/Register_Slice';
import Iconarrow from "react-native-vector-icons/MaterialIcons"
import { userinfocity } from '../../../store/slices/userinfoCity';
import FlatlistItems from '../../components/FlatlistItems';
import { Path, Svg } from 'react-native-svg';
import { Formik } from 'formik';
import { zipCodeValidation } from '../../../validation/validation';


const RegisterUserInformation = ({ }) => {

    const { REGISTER_PASSWORD } = NavigationsString;
    const [currentvalueState, setCurrentValueState] = useState("Select here");
    const [currentvalue, setCurrentValue] = useState("");
    const [isopenState, setIsOpenState] = useState(false);
    const [isOpenCity, setIsOpenCity] = useState(false);
    const [currentvalueCity, setCurrentValueCity] = useState("Selected Here");
    const [showError, setShowError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { userdata, loading } = useSelector((state) => state?.userinfostate)
    const userdatacity = useSelector((state) => state?.userinfocity?.userdatacity)
    const cityloading = useSelector((state) => state?.userinfocity?.loading)
    const { height } = Dimensions.get("window");

    return (
        <Formik initialValues={{
            zipCode: ""
        }}

            validationSchema={zipCodeValidation}
            onSubmit={async (values, { setSubmitting }) => {
                const { zipCode } = values
                dispatch(registeruser_city({ state: currentvalueState, city: currentvalueCity, zipCode: zipCode }))
                navigation.navigate(REGISTER_PASSWORD)
            }}
        >
            {({ values, error, errors, touched, handleSubmit, setFieldValue, handleChange, isValid, dirty, }) => (

                <SafeAreaView style={{ flex: 1 }}>
                    <View style={styles.container}>

                        <View style={styles.img_container}>
                            <Image style={styles.img_child} source={require("../../assets/create-account-img.png")} />
                        </View>

                        {/* City------------ */}

                        <View>
                            <View style={{ width: responsiveWidth(90), marginLeft: "auto" }}>
                                <Text style={[styles.text, { color: FourthColor, }]}>State</Text>
                            </View>

                            <View style={{ justifyContent: "center", alignItems: "center", zIndex: 9999, paddingVertical: moderateVerticalScale(14) }}>

                                <TouchableOpacity onPress={() => setIsOpenCity(!isOpenCity)} style={{ flexDirection: "row", width: responsiveScreenWidth(80), backgroundColor: TextinputColor, justifyContent: 'space-between', paddingVertical: moderateVerticalScale(14), paddingHorizontal: moderateScale(12), borderRadius: 10, alignItems: "center" }}>
                                    <Text style={{ color: currentvalueCity ? "#000" : "#AAAAAA", }}>{currentvalueCity}</Text>
                                    {
                                        isOpenCity ?
                                            <Iconarrow name="keyboard-arrow-down" size={22} color={"#AAAAAA"} />
                                            :
                                            <Iconarrow name="keyboard-arrow-up" size={22} color={"#AAAAAA"} />
                                    }
                                </TouchableOpacity>


                                {isOpenCity ?
                                    (
                                        <View style={{
                                            width: responsiveWidth(79), height: height / 3.5, elevation: 5, backgroundColor: '#FFF',
                                            borderRadius: 10, alignSelf: 'center', position: 'absolute',
                                        }}>
                                            <FlatList
                                                data={userdata?.data}
                                                nestedScrollEnabled
                                                scrollEnabled
                                                renderItem={({ item, index }) => {
                                                    return (
                                                        <View>
                                                            {
                                                                !isLoading ?
                                                                    <TouchableOpacity onPress={() => {
                                                                        setIsOpenCity(false),
                                                                            setCurrentValueCity(item?.name)
                                                                        const selectedItem = userdata?.data?.find(data => data?.name === item?.name);

                                                                        if (selectedItem) {
                                                                            dispatch(userinfocity({
                                                                                countryCode: selectedItem?.countryCode,
                                                                                isoCode: selectedItem?.isoCode
                                                                            }))
                                                                        }
                                                                    }
                                                                    }
                                                                        style={{
                                                                            width: responsiveWidth(65),
                                                                            borderBottomWidth: 0.2,
                                                                            height: responsiveHeight(5.4),
                                                                            alignSelf: 'center',
                                                                            borderColor: '#D0D0D0',
                                                                            justifyContent: 'center',
                                                                        }}>
                                                                        <Text style={{ color: "#000", }}>{item?.name}</Text>
                                                                    </TouchableOpacity>
                                                                    :
                                                                    <ActivityIndicator size={22} color={"#000"} />
                                                            }

                                                        </View>
                                                    );
                                                }}
                                            />
                                        </View>
                                    ) : null
                                }
                            </View>

                            {/* State----------- */}

                            <View style={{}}>
                                <View style={{ width: responsiveWidth(90), marginLeft: "auto" }}>
                                    <Text style={[styles.text, { color: FourthColor, }]}>City</Text>
                                </View>
                                <View style={{ justifyContent: "center", alignItems: "center", paddingVertical: 12 }}>
                                    <TouchableOpacity onPress={() => setIsOpenState(!isopenState)} style={{ flexDirection: "row", width: responsiveScreenWidth(80), backgroundColor: TextinputColor, justifyContent: 'space-between', paddingVertical: moderateVerticalScale(14), paddingHorizontal: moderateScale(12), borderRadius: 10, alignItems: "center" }}>
                                        <Text style={{ color: currentvalueState ? "#000" : "#AAAAAA", }}>{currentvalueState}</Text>
                                        {
                                            isopenState ?
                                                <Iconarrow name="keyboard-arrow-down" size={22} color={"#AAAAAA"} />
                                                :
                                                <Iconarrow name="keyboard-arrow-up" size={22} color={"#AAAAAA"} />
                                        }
                                    </TouchableOpacity>
                                </View>

                                <View>
                                    {isopenState ?
                                        (
                                            <View
                                                style={{
                                                    width: responsiveWidth(79),
                                                    height: height / 3.5,
                                                    elevation: 5,
                                                    backgroundColor: '#FFFFFF',
                                                    borderRadius: 10,
                                                    alignSelf: 'center',
                                                    position: 'absolute',
                                                    top: responsiveWidth(3),
                                                    zIndex: 999,

                                                }}>
                                                <FlatList
                                                    data={userdatacity?.data}
                                                    nestedScrollEnabled
                                                    initialNumToRender={7}
                                                    scrollEnabled
                                                    showsVerticalScrollIndicator
                                                    renderItem={({ item, index }) => {
                                                        console.log("flatlist-item-=-", item)
                                                        return (
                                                            <FlatlistItems
                                                                item={item}
                                                                setCurrentValueState={setCurrentValueState}
                                                                setIsOpenState={setIsOpenState}
                                                                cityloading={cityloading}
                                                            />
                                                        );
                                                    }}
                                                />
                                            </View>
                                        ) : null
                                    }
                                </View>
                            </View>

                            {/* Zip------------ */}

                            <View>
                                <View style={{ width: responsiveWidth(90), marginLeft: "auto" }}>
                                    <Text style={[styles.text, { color: FourthColor, }]}>Zip Code</Text>
                                </View>


                                <TextInputField
                                    placeholderText="Type here"
                                    type="zipcode"
                                    value={values.zipCode}
                                    // onChangeText={(val) => handlezipcode(val)}
                                    onChangeText={handleChange("zipCode")}
                                />
                            </View>

                            {errors.zipCode &&
                                <View style={{ width: responsiveWidth(90), marginLeft: 'auto', paddingBottom: responsiveWidth(2) }}>
                                    <View style={{ flexDirection: "row", }}>
                                        <View>
                                            <Svg width={20} height={20} viewBox="0 0 24 24" fill="red">
                                                <Path
                                                    d="M12 2C6.485 2 2 6.485 2 12s4.485 10 10 10 10-4.485 10-10S17.515 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
                                                />
                                            </Svg>
                                        </View>
                                        <View style={{ paddingHorizontal: moderateScale(5) }}>
                                            <Text style={{ color: 'red', fontSize: responsiveFontSize(1.9), fontWeight: "600" }}>{errors.zipCode}</Text>
                                        </View>
                                    </View>
                                </View>
                            }
                        </View>

                        {/* Next and Back------------ */}

                        <View style={{ marginTop: responsiveWidth(30) }}>
                            <TouchableButton onPress={handleSubmit} type="register" isValid={isValid} dirty={dirty} backgroundColor="#395E66" color="#FFF" text="Next" />
                            <View style={{ paddingVertical: moderateVerticalScale(7) }}>
                                <TouchableButton onPress={() => navigation.goBack()} backgroundColor="#FFF" borderWidth="1" color="#395E66" text="Back" />
                            </View>
                        </View>

                    </View>
                </SafeAreaView>
            )}

        </Formik>

    )
}

export default RegisterUserInformation;


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: SecondaryColor,
        flex: 1,
    },
    text: {
        fontSize: responsiveFontSize(1.9),
        fontWeight: "600"
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
