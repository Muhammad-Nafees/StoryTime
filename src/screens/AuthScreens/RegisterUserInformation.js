import React, { useState } from 'react'
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
import { Dropdown, SelectCountry } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { userandcity_api } from '../../../services/api/auth_mdule/auth';
import { userinfocity } from '../../../store/slices/userinfoCity';


const RegisterUserInformation = ({ }) => {

    const { REGISTER_PASSWORD } = NavigationsString;
    const [currentvalueState, setCurrentValueState] = useState("Select here");
    const [currentvalue, setCurrentValue] = useState("");
    const [isopenState, setIsOpenState] = useState(false);
    const [isOpenCity, setIsOpenCity] = useState(false);
    const [currentvalueCity, setCurrentValueCity] = useState("Selected Here");
    const [zipCode, setIszipCode] = useState("");
    const [loading, setIsLoading] = useState(false)
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const userdata = useSelector((state) => state?.userinfostate?.userdata)
    const userdatacity = useSelector((state) => state?.userinfocity?.userdatacity?.data)
    const [CountryandState, setCountryAndState] = useState({})
    const [data, setData] = useState(userdata?.data);
    const [stateData, setStateData] = useState(userdatacity)
    const { height } = Dimensions.get("window");

    const handlezipcode = (value) => {
        setIszipCode(value)
    }

    console.log("statesese,", userdatacity)
    console.log("countryandstateVal-=-", CountryandState)

    const handlenext = () => {
        dispatch(registeruser_city({ state: currentvalueState, city: currentvalueCity, zipCode: zipCode }))
        navigation.navigate(REGISTER_PASSWORD)
    }

    const onSearch = search => {
        if (search !== '') {
            const newData = userdata?.data?.filter(item => {
                console.log('Filterda', item?.name);
                return (
                    item?.name?.toLowerCase()?.indexOf(search?.toLowerCase()) > -1
                );
            });
            setData(newData);
        } else {
            setData(userdata);
        }
    };

    const onSearchstate = search => {
        if (search !== '') {
            const newStateData = userdatacity?.filter(item => {
                console.log('Filterda', item.name);
                return (
                    item?.name?.toLowerCase()?.indexOf(search?.toLowerCase()) > -1
                );
            });
            setStateData(newStateData);
        } else {
            setStateData(userdatacity);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={styles.container}>

                <View style={styles.img_container}>
                    <Image style={styles.img_child} source={require("../../assets/create-account-img.png")} />
                </View>

                {/* City------------ */}

                <View>
                    <View style={{ width: responsiveWidth(90), marginLeft: "auto" }}>
                        <Text style={[styles.text, { color: FourthColor, }]}>City</Text>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", zIndex: currentvalue == false ? 1000 : 1000, paddingVertical: moderateVerticalScale(14) }}>

                        <TouchableOpacity onPress={() => setIsOpenCity(!isOpenCity)} style={{ flexDirection: "row", width: responsiveScreenWidth(80), backgroundColor: TextinputColor, justifyContent: 'space-between', paddingVertical: moderateVerticalScale(14), paddingHorizontal: moderateScale(12), borderRadius: 10, alignItems: "center" }}>
                            <Text style={{ color: currentvalueCity ? "#000" : "#AAAAAA", }}>{currentvalueCity}</Text>
                            {
                                isOpenCity ?
                                    <Iconarrow name="keyboard-arrow-down" size={22} color={"#AAAAAA"} />
                                    :
                                    <Iconarrow name="keyboard-arrow-up" size={22} color={"#AAAAAA"} />
                            }
                        </TouchableOpacity>

                        <View>
                            {isOpenCity ?
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
                                            top: responsiveWidth(3)
                                        }}>
                                        <View
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginTop: responsiveWidth(3),
                                            }}>
                                            <TextInput
                                                placeholder="Search"
                                                placeholderTextColor="#7C7C7C"
                                                onChangeText={txt => {
                                                    onSearch(txt);
                                                }}
                                                style={{
                                                    paddingLeft: moderateVerticalScale(20),
                                                    color: '#000',
                                                    borderWidth: 1,
                                                    width: responsiveWidth(70),
                                                    borderRadius: 10,
                                                    borderColor: '#D0D0D0',
                                                    height: responsiveHeight(5.5),
                                                }}
                                            />
                                        </View>

                                        <FlatList
                                            data={data}
                                            nestedScrollEnabled
                                            scrollEnabled
                                            renderItem={({ item, index }) => {
                                                return (
                                                    <View>
                                                        <TouchableOpacity onPress={() => {
                                                            setIsOpenCity(false),
                                                                onSearch('')
                                                            setCurrentValueCity(item?.name)
                                                            const selectedItem = userdata?.data?.find(data => data?.name === item?.name);

                                                            if (selectedItem) {
                                                                dispatch(userinfocity({
                                                                    countryCode: selectedItem?.countryCode,
                                                                    isoCode: selectedItem?.isoCode
                                                                }))
                                                            }
                                                            console.log("selecteditem", selectedItem)
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
                                                            <Text style={{ color: "#000" }}>{item?.name}</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                );
                                            }}
                                        />
                                    </View>
                                ) : null
                            }
                        </View>
                    </View>

                    {/* State----------- */}

                    <View style={{}}>
                        <View style={{ width: responsiveWidth(90), marginLeft: "auto" }}>
                            <Text style={[styles.text, { color: FourthColor, }]}>State</Text>
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
                                            zIndex: 999
                                        }}>
                                        <View
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginTop: responsiveWidth(3),
                                            }}>
                                            <TextInput
                                                placeholder="Search"
                                                placeholderTextColor="#7C7C7C"
                                                onChangeText={txt => {
                                                    onSearchstate(txt);
                                                }}
                                                style={{
                                                    paddingLeft: moderateScale(20),
                                                    color: '#000',
                                                    borderWidth: 1,
                                                    width: responsiveWidth(65),
                                                    borderRadius: 10,
                                                    borderColor: '#D0D0D0',
                                                    height: responsiveHeight(5.5),
                                                }}
                                            />
                                        </View>

                                        <FlatList
                                            data={stateData}
                                            nestedScrollEnabled
                                            scrollEnabled
                                            showsVerticalScrollIndicator
                                            renderItem={({ item, index }) => {
                                                return (
                                                    <View>
                                                        <TouchableOpacity onPress={() => {
                                                            setIsOpenState(false),
                                                                onSearchstate('')
                                                            setCurrentValueState(item?.name)
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
                                                            <Text style={{ color: "#000" }}>{item?.name}</Text>
                                                        </TouchableOpacity>
                                                    </View>

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
                            value={zipCode}
                            onChangeText={(val) => handlezipcode(val)}
                        />
                    </View>
                </View>

                {/* Next and Back------------ */}

                <View style={{ marginTop: responsiveWidth(30) }}>
                    <TouchableButton onPress={handlenext} backgroundColor="#395E66" color="#FFF" text="Next" />
                    <View style={{ paddingVertical: moderateVerticalScale(7) }}>
                        <TouchableButton onPress={() => navigation.goBack()} backgroundColor="#FFF" borderWidth="1" color="#395E66" text="Back" />
                    </View>
                </View>

            </View>
        </SafeAreaView>

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
