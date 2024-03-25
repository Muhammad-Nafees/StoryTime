import React, { useEffect, useState } from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet, FlatList, ScrollView, Modal, TouchableOpacityBase, ActivityIndicator, Alert } from 'react-native'
import { FourthColor, PrimaryColor, SecondaryColor, TextColorGreen, TextinputColor, ThirdColor, pinkColor } from "../../../screens/Styles/Style";
import { useNavigation, useNavigationBuilder } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import BackButton from '../../../components/reusable-components/addplayer/customBackButton/BackButton';
import { Img_Paths } from '../../../assets/Imagepaths/index';
import CustomSelectDropDown from '../../../components/profile/SelectDropDown';
import TextInputField from '../../../components/TextInputField';
import { PassionOne_Regular } from '../../../constants/GlobalFonts';
import { get_Categories_Sub_Categories } from '../../../../services/api/categories';
import { useDispatch, useSelector } from 'react-redux';
import { setAddUrlId, setRandomForProfileUpdate } from '../../../../store/slices/categoriesSlice/categoriesSlice';
import { createStory_api } from '../../../../services/api/storyfeed';
import UserErrors from '../../../components/auth/UserErrors';
import Toast from 'react-native-toast-message';



const AddUrl = () => {

    const { BG_URL_PAGE } = Img_Paths;
    const navigation = useNavigation();

    // states
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

    // redux

    const addUrlId = useSelector((state) => state?.getcategories?.addUrlid);
    const categoryId = useSelector((state) => state?.getcategories?.urlCategoryname);
    const subCategoryId = useSelector((state) => state?.getcategories?.urlSubcategoryname);
    const dispatch = useDispatch();
    const { user } = useSelector(state => state?.authSlice);
    const USER = user?.data?.user || user?.data;


    console.log("PAGE----", page)
    console.log("ADDURL----------------------", !!addUrlId);
    console.log("pageSubCategory----", pageSubCategory)
    console.log("textInputValue---- :", textInputValue)

    useEffect(() => {
        const categories_Api = async () => {
            try {

                const responseData = await get_Categories_Sub_Categories({
                    id: addUrlId,
                });

                const SortingData = responseData?.data?.reverse();
                if (!!addUrlId) {
                    setResponseSubCategories(SortingData);
                } else {
                    setResponseCategories(SortingData);
                };
                console.log("END DEBUGGING")
                return responseData;
            } catch (error) {
                console.log("ERROR FROM CATEGORIES", error?.response)
            }
        };
        categories_Api();
        return () => {
            dispatch(setAddUrlId(""))
        }
    }, [page, addUrlId]);



    const isURLValid = (url) => {
        const pattern = /^(https?:\/\/)?([\w.]+)\.([a-z]{2,})([\w\/]*)*$/i;
        return pattern.test(url);
    };


    const createStory_video = async () => {
        setIsLoading(true);
        if (!isURLValid(textInputValue)) {
            Toast.show({
                type: "error",
                text1: "Invalid URL"
            })
            setIsLoading(false);
            return;
        }
        try {
            const response = await createStory_api({
                type: "video",
                creator: USER?._id,
                category: categoryId,
                subCategory: subCategoryId,
                content: textInputValue
            });
            setIsVisible(true);
            setIsLoading(false);
            console.log("RESPONSE FROM VIDEO_STORY:", response?.data)
            return response;
        } catch (error) {
            console.log(error)
        };
    };



    const categoriesNames = responseCategories?.map(category => category?.name);
    const subCategoriesNames = responseSubCategories?.map((category) => category?.name);

    console.log("categoriesNames--------- :", categoriesNames)
    console.log("subCategoriesNames------ :", subCategoriesNames)

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
                                responseCategories={responseCategories}
                                defaultText="Select a Category"
                                changeColor={changeColor}
                                setChangeColor={setChangeColor}
                                HasMorePages={HasMorePages}
                                setIsLoadMore={setIsLoadMore}
                                setPage={setPage}
                            />
                        </View>

                        <View style={{ width: responsiveWidth(80), marginLeft: "auto", paddingVertical: 6 }}>
                            <View style={{ paddingVertical: moderateVerticalScale(10) }}>
                                <Text style={{ color: "#000", fontWeight: "500" }}>Sub-Category</Text>
                            </View>

                            {/* sub category dropdown */}
                            <CustomSelectDropDown
                                categoriesNames={subCategoriesNames}
                                subResponseCategories={responseSubCategories}
                                defaultText="Select a Sub-Category"
                                changeColor={secondChangeColor}
                                setPage={setPage}
                                // addUrlid={addUrlId}
                                setChangeColor={setSecondChangeColor}
                                HasMorePages={HasMorePages}
                                setIsLoadMore={setIsLoadMore}
                            // setResponseSubCategories={setResponseSubCategories}
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
                        onPress={() => {
                            const randomNumbers = Math.floor(Math.random() * 100);
                            dispatch(setRandomForProfileUpdate(randomNumbers));
                            console.log("randomNumbers :", randomNumbers)
                            navigation.navigate("Profile");
                        }}
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
