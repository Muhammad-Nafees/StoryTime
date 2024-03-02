import React, { useState } from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet, FlatList, ScrollView, Modal, TouchableOpacityBase, ActivityIndicator, Alert } from 'react-native'
import { FourthColor, PrimaryColor, SecondaryColor, TextColorGreen, TextinputColor, ThirdColor, pinkColor } from "../../../screens/Styles/Style";
import { useNavigation, useNavigationBuilder } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import BackButton from '../../../components/BackButton';
import { Img_Paths } from '../../../assets/Imagepaths/index';
import SelectDropdown from 'react-native-select-dropdown';
import TouchableButton from '../../../components/TouchableButton';
import CustomSelectDropDown from '../../../components/SelectDropDown';
import TextInputField from '../../../components/TextInputField';
import { PassionOne_Regular } from '../../../constants/GlobalFonts';



const AddUrl = () => {

    const { BG_PLAYFLOW, BG_URL_PAGE } = Img_Paths;
    const navigation = useNavigation();

    const [changeColor, setChangeColor] = useState("#AAA");
    const [secondChangeColor, setSecondChangeColor] = useState("#AAA");
    const [textInputValue, setTextInputValue] = useState("")

    const arrayurl = ["Animals"]
    const SubCategory = ["Dog"]
    const urlArr = ["http://example.com"]
    console.log("textInputValue----", textInputValue)
    return (

        <ImageBackground style={styles.container} source={BG_URL_PAGE}>
            <View style={{ width: responsiveWidth(95), marginLeft: "auto", paddingVertical: responsiveWidth(8) }}>
                <BackButton onPress={() => navigation.goBack()} />
            </View>

            <View style={{ backgroundColor: "#FFF", height: responsiveHeight(70), width: responsiveWidth(90), }}>
                <View style={{ justifyContent: "center", alignItems: "center", paddingVertical: moderateVerticalScale(20) }}>
                    <Text style={{ color: "rgba(47, 79, 86, 1)", fontSize: responsiveFontSize(3), fontWeight: "400", fontFamily: PassionOne_Regular.passionOne }}>Add URL</Text>
                </View>

                <View style={{ width: responsiveWidth(80), marginLeft: "auto", }}>
                    <View style={{ paddingVertical: moderateVerticalScale(10) }}>
                        <Text style={{ color: "#000", fontWeight: "500" }}>Category</Text>
                    </View>



                    <CustomSelectDropDown
                        arrayurl={arrayurl}
                        defaultText="Select a Category"
                        changeColor={changeColor}
                        setChangeColor={setChangeColor}
                    />

                </View>


                <View style={{ width: responsiveWidth(80), marginLeft: "auto", paddingVertical: 6 }}>
                    <View style={{ paddingVertical: moderateVerticalScale(10) }}>
                        <Text style={{ color: "#000", fontWeight: "500" }}>Sub-Category</Text>
                    </View>

                    {/* <SelectDropdown
                        data={SubCategory}
                        defaultButtonText="Select a Sub-Category"
                        buttonStyle={[
                            {
                                width: '90%',
                                backgroundColor: TextinputColor,
                                borderRadius: 10,
                                justifyContent: 'flex-start',
                                paddingHorizontal: 25,
                            },
                        ]}

                        rowTextStyle={{ textAlign: 'left', fontSize: responsiveFontSize(1.9) }}
                        rowStyle={{ paddingHorizontal: 8, }}
                        dropdownStyle={{ borderRadius: 10, }}
                        buttonTextStyle={{
                            textAlign: 'left',
                            fontSize: responsiveFontSize(1.9),
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem;
                        }}
                        rowTextForSelection={(item, index) => {
                            return item;
                        }}
                    /> */}
                    <CustomSelectDropDown
                        arrayurl={SubCategory}
                        defaultText="Select a Sub-Category"
                        changeColor={secondChangeColor}
                        setChangeColor={setSecondChangeColor}

                    />

                </View>


                <View>
                    <View style={{ width: responsiveWidth(80), marginLeft: 'auto' }}>
                        <Text style={[styles.text, { color: FourthColor }]}>
                            URL
                        </Text>
                    </View>


                    <TextInputField
                        placeholderText="Paste URL here"
                        type="URL"
                        value={textInputValue}
                        //   value={values.zipCode}
                        onChangeText={(val) => setTextInputValue(val)}
                    //   onChangeText={handleChange('zipCode')}
                    //   setFieldTouched={() => setFieldTouched("zipcode")}
                    />


                </View>
                <View style={{ paddingTop: responsiveWidth(24), justifyContent: "center", alignItems: "center", }}>
                    <TouchableOpacity
                        style={{
                            width: responsiveWidth(72),
                            backgroundColor: TextColorGreen,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: '#395E66',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: responsiveHeight(6.6),
                        }}>

                        <Text
                            style={{
                                fontSize: responsiveFontSize(1.9),
                                fontWeight: '600',
                                letterSpacing: 0.28,
                                color: "#FFF",
                            }}>
                            Post
                        </Text>

                    </TouchableOpacity>
                </View>

            </View>
        </ImageBackground>
    )
};



const styles = StyleSheet.create({
    container: {
        flex: 1,

        alignItems: "center"
    },
    img: {
        resizeMode: "center"
    },
    // container: {
    //     justifyContent: "center",
    //     alignItems: "center",
    //     paddingVertical: moderateVerticalScale(10),
    //     flex: 1
    // },
    text: {
        fontSize: responsiveFontSize(1.7),
        fontWeight: '600',
    },

    img_backgroung_content: {
        width: responsiveWidth(90),
        height: responsiveHeight(32),
        justifyContent: "center",
        alignItems: "center",
    },
    bg_content: {
        backgroundColor: PrimaryColor,
        justifyContent: "center",
        alignItems: "center",
        width: responsiveWidth(78),
        height: responsiveHeight(27),
        marginLeft: responsiveWidth(1),
        marginBottom: responsiveWidth(2)
    },
    child_bg: {
        backgroundColor: pinkColor,
        width: responsiveWidth(70),
        height: responsiveHeight(28),
        marginTop: responsiveWidth(5),
        borderRadius: 18,
    },
    second_childbg: {
        marginLeft: "auto",
        width: responsiveWidth(67)
    },

    third_childbg: {
        flexDirection: "row",
        width: responsiveWidth(21),
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: moderateVerticalScale(8)
    },
    child_bg_img: {
        width: responsiveWidth(6.25),
        height: responsiveHeight(3.5),
        resizeMode: "center",
    },
    text_container: {
        paddingTop: responsiveWidth(4),
    },
    second_container: {
        position: 'relative',
        bottom: responsiveWidth(5),
        justifyContent: "center",
        alignItems: "center",
    },
    sec_container_firstchild: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: moderateVerticalScale(50),
        width: responsiveWidth(92),
        marginLeft: responsiveWidth(1),
        backgroundColor: "#E44173",
        height: responsiveHeight(7.5),
    },
    third_container: {
        justifyContent: "center",
        alignItems: "center",
    },
    fourth_container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: responsiveWidth(36),
    },

    first_view: {
        justifyContent: "center",
        alignItems: "center"
    },
    second_view: {
        justifyContent: "center",
        alignItems: "center"
    },
    third_view: {
        justifyContent: "center",
        alignItems: "center"
    },
    sophia_container: {
        flexDirection: "row",
        width: responsiveWidth(21),
        justifyContent: "space-between",
        alignItems: "center",
        margin: responsiveWidth(2.8)
    }
});

export default AddUrl;
