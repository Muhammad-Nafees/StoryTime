import React, { useEffect, useState } from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet, FlatList, ScrollView, Modal, TouchableOpacityBase, ActivityIndicator, Alert } from 'react-native'
import { FourthColor, PrimaryColor, SecondaryColor, TextColorGreen, TextinputColor, ThirdColor, pinkColor } from "../../../screens/Styles/Style";
import { useNavigation, useNavigationBuilder } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import BackButton from '../../../components/reuseable-components/BackButton';
import { Img_Paths } from '../../../assets/Imagepaths/index';
import SelectDropdown from 'react-native-select-dropdown';
import TouchableButton from '../../../components/TouchableButton';
import CustomSelectDropDown from '../../../components/profile/SelectDropDown';
import TextInputField from '../../../components/TextInputField';
import { PassionOne_Regular } from '../../../constants/GlobalFonts';
import { get_Categories_Sub_Categories } from '../../../../services/api/categories';
import { useDispatch, useSelector } from 'react-redux';
import { setAddUrlId } from '../../../../store/slices/addplayers/addPlayersSlice';
import { createStory_api } from '../../../../services/api/storyfeed';
import { userLoginid } from '../../../../store/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserErrors from '../../../components/auth/UserErrors';



const AddUrl = () => {

    const { BG_PLAYFLOW, BG_URL_PAGE } = Img_Paths;
    const navigation = useNavigation();

    const addUrlId = useSelector((state) => state?.addPlayers?.addUrlid);
    const categoryId = useSelector((state) => state?.addPlayers?.urlCategoryname);
    const subCategoryId = useSelector((state) => state?.addPlayers?.urlSubcategoryname);


    const [changeColor, setChangeColor] = useState("#AAA");
    const [secondChangeColor, setSecondChangeColor] = useState("#AAA");
    const [textInputValue, setTextInputValue] = useState("");
    const [HasMorePages, setHasMorePages] = useState(false);
    const [isLoadMore, setIsLoadMore] = useState(false);
    const [responseCategories, setResponseCategories] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [pageSubCategory, setPageSubCategory] = useState(1);
    const [responseSubCategories, setResponseSubCategories] = useState([]);
    const dispatch = useDispatch();



    const categories_Api = async () => {
        try {
            const responseData = await get_Categories_Sub_Categories({
                page: page,
                id: addUrlId,
                page2: pageSubCategory
            });
            if (addUrlId) {
                setResponseSubCategories(responseData?.data?.categories);
            } else {
                setResponseCategories(responseData?.data?.categories);
            };
            setHasMorePages(responseData?.data?.pagination?.hasNextPage);
            console.log("responseData----- :", responseData);

            return responseData;
        } catch (error) {

        }
    };


    const createStory_video = async () => {
        setIsLoading(true);
        try {
            const userLoginId = await AsyncStorage.getItem('isUserId');
            console.log("userloginId---- :", userLoginId)
            const response = await createStory_api({
                type: "video",
                creator: userLoginId,
                category: categoryId,
                subCategory: subCategoryId,
                content: textInputValue
            });
            setIsVisible(true);
            setIsLoading(false);
            console.log("response---- :", response)
            return response;
        } catch (error) {
            console.log(error)
        };
    };

    useEffect(() => {
        categories_Api();
        return () => {
            dispatch(setAddUrlId(""))
        }
    }, [page, addUrlId, pageSubCategory]);



    const categoriesNames = responseCategories?.map((category) => category?.name);
    const subCategoriesNames = responseSubCategories?.map((category) => category?.name);



    return (
        <View style={{ height: responsiveHeight(100), }}>
            <ImageBackground style={{ height: responsiveHeight(100), }} source={BG_URL_PAGE}>
                <View style={{ width: responsiveWidth(95), marginLeft: "auto", paddingVertical: responsiveWidth(8) }}>
                    <BackButton onPress={() => navigation.goBack()} />
                </View>
                <View style={{ justifyContent: "center", alignItems: "center", paddingTop: responsiveWidth(4) }}>
                    <View style={{ backgroundColor: "#FFF", height: responsiveHeight(70), width: responsiveWidth(90), }}>
                        <View style={{ justifyContent: "center", alignItems: "center", paddingVertical: moderateVerticalScale(20) }}>
                            <Text style={{ color: "rgba(47, 79, 86, 1)", fontSize: responsiveFontSize(3), fontWeight: "400", fontFamily: PassionOne_Regular.passionOne }}>Add URL</Text>
                        </View>

                        <View style={{ width: responsiveWidth(80), marginLeft: "auto", }}>
                            <View style={{ paddingVertical: moderateVerticalScale(10) }}>
                                <Text style={{ color: "#000", fontWeight: "500" }}>Category</Text>
                            </View>

                            <CustomSelectDropDown
                                categoriesNames={categoriesNames}
                                addUrlid={addUrlId}
                                setResponseCategories={setResponseCategories}
                                responseCategories={responseCategories}
                                defaultText="Select a Category"
                                changeColor={changeColor}
                                setChangeColor={setChangeColor}
                                setResponseSubCategories={setResponseSubCategories}
                                HasMorePages={HasMorePages}
                                setIsLoadMore={setIsLoadMore}
                            />
                        </View>

                        <View style={{ width: responsiveWidth(80), marginLeft: "auto", paddingVertical: 6 }}>
                            <View style={{ paddingVertical: moderateVerticalScale(10) }}>
                                <Text style={{ color: "#000", fontWeight: "500" }}>Sub-Category</Text>
                            </View>

                            <CustomSelectDropDown
                                subCategoriesNames={subCategoriesNames}
                                subResponseCategories={responseSubCategories}
                                defaultText="Select a Sub-Category"
                                changeColor={secondChangeColor}
                                addUrlid={addUrlId}
                                setChangeColor={setSecondChangeColor}
                                setResponseSubCategories={setResponseSubCategories}
                                HasMorePages={HasMorePages}
                                setPageSubCategory={setPageSubCategory}
                                setIsLoadMore={setIsLoadMore}
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
                                onChangeText={(val) => setTextInputValue(val)}
                            />
                        </View>

                        <View style={{ paddingTop: responsiveWidth(24), justifyContent: "center", alignItems: "center", }}>
                            <TouchableOpacity
                                disabled={changeColor === "#000"
                                    && secondChangeColor == "#000"
                                    && textInputValue !== "" ? false : true}
                                onPress={() => createStory_video()}
                                style={{
                                    width: responsiveWidth(72),
                                    backgroundColor: changeColor === "#000"
                                        && secondChangeColor == "#000"
                                        && textInputValue !== "" ? TextColorGreen : "'rgba(57, 94, 102, 0.4)'",
                                    borderRadius: 10,
                                    borderColor: '#395E66',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: responsiveHeight(6.6),
                                }}>

                                {
                                    !isLoading ?
                                        <Text
                                            style={{
                                                fontSize: responsiveFontSize(1.9),
                                                fontWeight: '600',
                                                letterSpacing: 0.28,
                                                color: "#FFF",
                                            }}>
                                            Post
                                        </Text>
                                        :
                                        <ActivityIndicator />
                                }

                            </TouchableOpacity>
                        </View>

                    </View>
                </View>

                {
                    isVisible &&
                    <UserErrors
                        bgImage={BG_URL_PAGE}
                        text={"Back"}
                        isVisible={isVisible}
                        setVisible={setIsVisible}
                        text1={"Successfully Added!"}
                        onPress={() => navigation.navigate("Profile")}
                    />
                }
            </ImageBackground>
        </View>

    )
};



const styles = StyleSheet.create({

    img: {
        resizeMode: "center"
    },
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
