import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet, FlatList, ScrollView, TextInput } from 'react-native'
import { PrimaryColor, SecondaryColor, TextColorGreen, ThirdColor, pinkColor } from '../../Styles/Style';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import FrameContent from '../../../components/FrameContent';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from '../../../assets/Imagepaths';
import NavigationsString from '../../../constants/NavigationsString';
import StoryUsers from '../../../components/StoryUsers';
import BackButton from '../../../components/BackButton';
import MainInputField from '../../../components/MainInputField';





const Categories = () => {

    const { width, height } = Dimensions.get('window');
    const { SPLASH_SCREEN_IMAGE, COUNTRIES_ICON, ANIMAL_IMG, BAG_IMG,
        CALENDER_ICON, ELEMENTS_ICON, SHOPPING_ICON, TEAM_ICON, VEHICLE_ICON,
        FRUIT_ICON, LEFT_ARROW_IMG, LIFENEED_ICON,
        LOCATION_ICON, LUDO_ICON, SCHOOL_ICON } = Img_Paths;
    const [randomItem, setRandomItem] = useState(null);
    const navigation = useNavigation()



    const CategoriesData = [
        {
            name: "Humans",
            backgroundColor: TextColorGreen,
            image: require("../../../assets/Categories-image/team-icon.png"),
            subCategoryBGColor: "rgba(199, 152, 97, 1)",
            id: 0
        },
        {
            name: "Things",
            backgroundColor: TextColorGreen,
            image: require("../../../assets/Categories-image/lifeneed-icon.png"),
            subCategoryBGColor: "#79905C",

            id: 1
        },
        {
            name: "Animals",
            backgroundColor: TextColorGreen,
            image: require("../../../assets/Categories-image/animal-icon.png"),
            subCategoryBGColor: "#56B6A4",

            id: 2
        },

        {
            name: "Places",
            backgroundColor: TextColorGreen,
            image: require("../../../assets/Categories-image/location-icon.png"),
            subCategoryBGColor: "#C45E89",

            id: 3
        },
        {
            name: "Food",
            backgroundColor: TextColorGreen,
            image: require("../../../assets/Categories-image/fruit-icon.png"),
            subCategoryBGColor: "#8482D1",

            id: 4
        },
        {
            name: "Work",
            backgroundColor: TextColorGreen,
            image: require("../../../assets/Categories-image/bag-icon.png"),
            subCategoryBGColor: "#974444",

            id: 5
        },
        {
            name: "Event",
            backgroundColor: TextColorGreen,
            image: require("../../../assets/Categories-image/calender-icon.png"),
            subCategoryBGColor: "#A4C857",

            id: 6
        },
        {
            name: "Travels",
            backgroundColor: TextColorGreen,
            image: require("../../../assets/Categories-image/shopping-icon.png"),
            subCategoryBGColor: "rgba(209, 130, 130, 1)",

            id: 7
        },
        {
            name: "School",
            backgroundColor: TextColorGreen,
            image: require("../../../assets/Categories-image/school-icon.png"),
            subCategoryBGColor: "#56C488",

            id: 8
        },
        {
            name: "Vehicles",
            backgroundColor: TextColorGreen,
            image: require("../../../assets/Categories-image/vehicle-icon.png"),
            subCategoryBGColor: "#C07632",

            id: 9
        },
        {
            name: "Elements",
            backgroundColor: TextColorGreen,
            image: require("../../../assets/Categories-image/elements-icon.png"),
            subCategoryBGColor: "#82BED1",

            id: 10
        },
        {
            name: "Countries",
            backgroundColor: TextColorGreen,
            image: require("../../../assets/Categories-image/countries-icon.png"),
            subCategoryBGColor: "#C453D7",
            id: 11
        },
    ]


    const handleRandomClick = () => {
        const RandomInd = Math.floor(Math.random() * CategoriesData.length)
        setRandomItem(RandomInd)
    }

    // useEffect(() => {
    //     return () => {
    //         setRandomItem(null)
    //     }
    // }, [])



    const handleStoryUser = (id) => {
        navigation.navigate("SubCategories", { id: id },)

    }

    return (
        <ImageBackground style={styles.container} source={SPLASH_SCREEN_IMAGE}>
            <ScrollView>
                {/* Frame Content Close----------- */}

                <View style={styles.first_container}>
                    <BackButton />
                    <View style={styles.categories_text_container}>
                        <Text style={styles.categories_text}>Categories</Text>
                    </View>
                </View>

                {/* <View style={styles.text_Input_container}>
                    <View style={styles.text_input_child}>
                        <TextInput placeholder="Username" placeholderTextColor={"#000"} style={styles.input_field} />
                        <TouchableOpacity style={styles.add_button}>
                            <Text style={styles.add_text}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View> */}

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

                    {randomItem === null && CategoriesData.map((category) => (
                        <View key={category.id} style={{ backgroundColor: category.backgroundColor, width: responsiveWidth(29), borderRadius: 10, height: responsiveHeight(18.5), alignItems: 'center', margin: responsiveWidth(1.2) }}>
                            <StoryUsers onPress={() => handleStoryUser(category.id)} images={category.image} text={category.name} mainbgColor={category.backgroundColor} backgroundColor={category.subCategoryBGColor} />
                        </View>
                    ))}

                    {randomItem !== null && CategoriesData.map((category) => (
                        category.id === randomItem &&
                        <View key={category.id} style={{ backgroundColor: category.backgroundColor, width: responsiveWidth(29), borderRadius: 10, height: responsiveHeight(18.5), alignItems: 'center', margin: responsiveWidth(1.2) }}>
                            <StoryUsers onPress={() => handleStoryUser(category.id)} images={category.image} text={category.name} mainbgColor={category.backgroundColor} backgroundColor={category.subCategoryBGColor} />
                        </View>
                    ))}
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
