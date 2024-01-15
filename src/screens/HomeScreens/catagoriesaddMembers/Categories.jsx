import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet, FlatList, ScrollView, TextInput, ActivityIndicator } from 'react-native'
import { PrimaryColor, SecondaryColor, TextColorGreen, ThirdColor, pinkColor } from '../../Styles/Style';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import FrameContent from '../../../components/FrameContent';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from '../../../assets/Imagepaths';
import NavigationsString from '../../../constants/NavigationsString';
import StoryUsers from '../../../components/StoryUsers';
import BackButton from '../../../components/BackButton';
import MainInputField from '../../../components/MainInputField';
import { CategoriesData } from '../../../../dummyData/DummyData';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../../store/slices/getCategoriesSlice';
import { randomCategory } from '../../../../store/slices/randomCategorySlice';



const Categories = () => {

    const { width, height } = Dimensions.get('window');
    const { SPLASH_SCREEN_IMAGE, LOCATION_ICON, LUDO_ICON, } = Img_Paths;
    const { data, loading } = useSelector((state) => state.getcategories);
    const randomRes = useSelector((state) => state?.randomCategory?.data);
    const loadingrandom = useSelector((state) => state?.randomCategory?.loading);
    const [isRandom, setIsRandom] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const categoriesData = data?.data?.categories;
    const RandomCateg = randomRes?.data;

    console.log("randomCat", RandomCateg?.name);
    console.log("loadingrandom-=-", loadingrandom)

    useFocusEffect(
        useCallback(() => {
            dispatch(getCategories());
        }, [])
    );

    const handleRandomClick = () => {
        dispatch(randomCategory())
        setIsRandom(true)
    };

    const handleStoryUser = (id) => {
        navigation.navigate("SubCategories", { id: id })
    };

    return (
        <ImageBackground style={styles.container} source={SPLASH_SCREEN_IMAGE}>
            <ScrollView>
                {/* Frame Content Close----------- */}

                <View style={styles.first_container}>
                    <BackButton onPress={() => navigation.goBack()} />
                    <View style={styles.categories_text_container}>
                        <Text style={styles.categories_text}>Categories</Text>
                    </View>
                </View>

                {/* IMainnputField-----*/}
                <MainInputField placeholder="Username" />
                {/* MainInputField----- */}

                <View style={{ paddingVertical: moderateVerticalScale(6), justifyContent: "center", alignItems: "center" }}>
                    <View style={{ width: responsiveWidth(90), flexDirection: 'row', alignItems: "center", flexWrap: "wrap" }}>
                        <View style={{ marginHorizontal: moderateScale(10), }}>
                            <Text style={{ color: "#393939", fontWeight: "500", textAlign: "center" }}>Players:</Text>
                        </View>

                        <View style={{ backgroundColor: "#395E66", paddingHorizontal: moderateScale(14), paddingVertical: moderateVerticalScale(4.5), borderRadius: 40 }}>
                            <Text style={{ color: "#FFF", fontSize: responsiveFontSize(1.9) }}>@chrislee</Text>
                        </View>
                        <View style={{ marginHorizontal: 6, backgroundColor: "#395E66", paddingHorizontal: 14, paddingVertical: moderateVerticalScale(4.5), borderRadius: 40 }}>
                            <Text style={{ color: "#FFF", fontSize: responsiveFontSize(1.9) }}>@Cedrick101</Text>
                        </View>
                        <View style={{ backgroundColor: "#395E66", paddingHorizontal: 14, paddingVertical: moderateVerticalScale(4.5), borderRadius: 40 }}>
                            <Text style={{ color: "#FFF", fontSize: responsiveFontSize(1.9) }}>@alfred</Text>
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', flexWrap: "wrap", justifyContent: "space-evenly", alignItems: "center" }}>
                    {
                        loading ? <ActivityIndicator size={40} color={"#000"} /> : !isRandom ?
                            categoriesData?.map((category) => (
                                console.log("category", category),
                                <View key={category?.id} style={{ backgroundColor: TextColorGreen, width: responsiveWidth(29), borderRadius: 10, height: responsiveHeight(18.5), alignItems: 'center', margin: responsiveWidth(1.2) }}>
                                    <StoryUsers onPress={() => handleStoryUser(category?.id)} images={category?.image} text={category?.name}
                                        mainbgColor={TextColorGreen}
                                        backgroundColor="rgba(199, 152, 97, 1)"
                                    />
                                </View>
                            ))
                            :
                            <View style={{ backgroundColor: TextColorGreen, width: responsiveWidth(29), borderRadius: 10, height: responsiveHeight(18.5), alignItems: 'center', margin: responsiveWidth(1.2) }}>
                                <View style={{ backgroundColor: TextColorGreen, width: responsiveWidth(29), borderRadius: 10, height: responsiveHeight(18.5), alignItems: "center", }}>
                                    <TouchableOpacity onPress={() => handleStoryUser(RandomCateg?._id)} style={{ marginVertical: moderateVerticalScale(10), borderRadius: 10, width: responsiveWidth(25), height: responsiveHeight(11), backgroundColor: "rgba(199, 152, 97, 1)", justifyContent: "center", alignItems: "center" }}>
                                        <Image style={{ width: responsiveWidth(16), height: responsiveHeight(8), resizeMode: "center" }} source={{ uri: "http://storytime.yameenyousuf.com/" + RandomCateg?.image }} />
                                    </TouchableOpacity>
                                    <Text style={{ color: "#FFF", fontWeight: "700", fontSize: responsiveFontSize(1.9) }}>{RandomCateg?.name}</Text>
                                </View>
                            </View>
                    }
                </View>

                <View style={{ flexDirection: 'row', flexWrap: "wrap", justifyContent: "space-evenly", alignItems: "center" }}>
                </View>

                <View style={{ paddingLeft: moderateScale(10), paddingVertical: moderateVerticalScale(10) }}>
                    <View style={{ backgroundColor: "#E44173", width: responsiveWidth(29), borderRadius: 10, height: responsiveHeight(18.5), alignItems: "center", }}>
                        <TouchableOpacity onPress={() => handleRandomClick()} style={{ marginVertical: moderateVerticalScale(10), borderRadius: 10, width: responsiveWidth(25), height: responsiveHeight(11), backgroundColor: "#EE5F8A", justifyContent: "center", alignItems: "center" }}>
                            <Image style={{ width: responsiveWidth(16), height: responsiveHeight(8), resizeMode: "center" }} source={LUDO_ICON} />
                        </TouchableOpacity>
                        <Text style={{ color: "#FFF", fontWeight: "700", fontSize: responsiveFontSize(1.9) }}>Random</Text>
                    </View>
                </View>

            </ScrollView>
        </ImageBackground>

    )
};



const styles = StyleSheet.create({
    container: {
        backgroundColor: pinkColor,
        width: "100%",
        height: "100%",
        flex: 1,
    },
    first_container: {
        paddingTop: responsiveWidth(6),
        paddingVertical: moderateVerticalScale(8),
        flexDirection: 'row',
        marginLeft: "auto",
        width: responsiveWidth(95),
        alignItems: "center"
    },
    back_button: {
        borderRadius: 10,
        width: responsiveWidth(12.9),
        height: responsiveHeight(6.3),
        backgroundColor: "#395E66",
        justifyContent: "center",
        alignItems: "center"
    },
    left_arrow: {
        width: responsiveWidth(5),
        height: responsiveHeight(2.5),
        resizeMode: "center"
    },
    categories_text_container: {
        paddingHorizontal: moderateScale(20)
    },
    categories_text: {
        color: "#E44173",
        fontSize: responsiveFontSize(2.4),
        fontWeight: "500",
        letterSpacing: 0.36
    },
    text_Input_container: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: moderateVerticalScale(2)
    },
    text_input_child: {
        flexDirection: 'row',
        width: responsiveWidth(90),
    },
    input_field: {
        paddingLeft: 30,
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        width: responsiveWidth(70),
        backgroundColor: '#FFF',
        color: "#000"
    },
    add_button: {
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
        width: responsiveWidth(21.5),
        height: responsiveHeight(7),
        backgroundColor: '#395E66',
        justifyContent: "center",
        alignItems: "center"
    },
    add_text: {
        fontSize: responsiveFontSize(1.9),
        color: "#FFF",
        fontWeight: "500",
        textAlign: "center",
        letterSpacing: -0.2
    }
})


export default Categories;