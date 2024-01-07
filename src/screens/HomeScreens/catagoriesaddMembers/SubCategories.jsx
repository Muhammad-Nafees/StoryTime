import React, { useEffect } from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet, FlatList, ScrollView, TextInput } from 'react-native'
import { PrimaryColor, SecondaryColor, TextColorGreen, ThirdColor, pinkColor } from '../../Styles/Style';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import FrameContent from '../../../components/FrameContent';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from '../../../assets/Imagepaths';
import NavigationsString from '../../../constants/NavigationsString';
import StoryUsers from '../../../components/StoryUsers';
import BackButton from '../../../components/BackButton';
import Human_Sub from '../../../components/sub-catgories/Human_Sub';
import Things_Sub from '../../../components/sub-catgories/Things_Sub';
import Animals_Sub from '../../../components/sub-catgories/AnimalsSub';
import Places_Sub from '../../../components/sub-catgories/Places_Sub';
import Food_Sub from '../../../components/sub-catgories/Foods_Sub';
import Work_Sub from '../../../components/sub-catgories/Work_Sub';
import Event_Sub from '../../../components/sub-catgories/Event_Sub';
import Travel_Sub from '../../../components/sub-catgories/Travel_Sub';
import School_Sub from '../../../components/sub-catgories/School_Sub';
import Vehicles_Sub from '../../../components/sub-catgories/Vehicles_Sub';
import Element_Sub from '../../../components/sub-catgories/Elements_Sub';
import Countries_Sub from '../../../components/sub-catgories/Countries_Sub';
import MainInputField from '../../../components/MainInputField';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../../store/slices/getCategoriesSlice';



const SubCategories = ({ route }) => {

    console.log("route---", route.params?.id)
    const { width, height } = Dimensions.get('window');
    const { SPLASH_SCREEN_IMAGE } = Img_Paths;

    const { PROFILE, ADD_PLAYERS } = NavigationsString;
    const navigation = useNavigation();
    const id = route?.params?.id;
    const { TEACHER_ICON, POLICE_ICON, FAMILY_ICON, LUDO_ICON, } = Img_Paths;
    const { PLAYER_SEQUENCE } = NavigationsString;
    const { data, loading } = useSelector((state) => state.getcategories);
    const SubcategoriesData = data?.data?.categories;
    const dispatch = useDispatch();
    console.log("id-", id)

    useEffect(() => {
        dispatch(getCategories(id))
    }, []);


    return (
        <ImageBackground style={styles.container} source={SPLASH_SCREEN_IMAGE}>
            <ScrollView>

                {/* Things SubCategory */}

                <View style={styles.first_container}>
                    <BackButton onPress={() => navigation.goBack()} />
                    <View style={styles.categories_text_container}>
                        <Text style={styles.categories_text}>Humans</Text>
                    </View>
                </View>

                {/* IMainnputField-----*/}

                <MainInputField placeholder="Username" />

                {/* MainInputField----- */}
                <View style={{ flexDirection: 'row', flexWrap: "wrap", justifyContent: "space-evenly", alignItems: "center" }}>

                    {
                        SubcategoriesData?.map((category) => (
                            console.log("category", category),
                            <View key={category?.id} style={{ backgroundColor: TextColorGreen, width: responsiveWidth(29), borderRadius: 10, height: responsiveHeight(18.5), alignItems: 'center', margin: responsiveWidth(1.2) }}>
                                <StoryUsers onPress={() => handleStoryUser(category?.id)} images={category?.image} text={category?.name}
                                    mainbgColor={TextColorGreen}
                                    backgroundColor="rgba(199, 152, 97, 1)"
                                />
                            </View>
                        ))
                    }
                </View>

                {/* <View style={{ paddingVertical: moderateVerticalScale(6), justifyContent: "center", alignItems: "center" }}>
                    <View style={{ width: responsiveWidth(90), flexDirection: 'row', alignItems: "center", flexWrap: "wrap" }}>
                        <View style={{ marginHorizontal: moderateScale(10), }}>
                            <Text style={{ color: "#393939", fontWeight: "500", textAlign: "center" }}>Players:</Text>
                        </View>
                        <View style={{ backgroundColor: "#395E66", paddingHorizontal: moderateScale(14), paddingVertical: moderateVerticalScale(4.5), borderRadius: 40 }}>
                            <Text style={{ color: "#FFF", fontSize: responsiveFontSize(1.9) }}>@chrislee</Text>
                        </View>
                        <View style={{ marginHorizontal: moderateVerticalScale(6), backgroundColor: "#395E66", paddingHorizontal: 14, paddingVertical: moderateVerticalScale(4.5), borderRadius: 40 }}>
                            <Text style={{ color: "#FFF", fontSize: responsiveFontSize(1.9) }}>@Cedrick101</Text>
                        </View>
                        <View style={{ marginTop: responsiveWidth(2), backgroundColor: "#395E66", paddingHorizontal: 14, paddingVertical: moderateVerticalScale(4.5), borderRadius: 40 }}>
                            <Text style={{ color: "#FFF", fontSize: responsiveFontSize(1.9) }}>@its me Like</Text>
                        </View>
                    </View>
                </View>

                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <View style={{ paddingTop: responsiveWidth(2), flexDirection: 'row', width: responsiveWidth(90), justifyContent: "space-between", alignItems: "center" }}>
                        <StoryUsers onPress={() => navigation.navigate(PLAYER_SEQUENCE)} images={TEACHER_ICON} text="Teacher" mainbgColor="#395E66" backgroundColor="#56B6A4" />
                        <StoryUsers images={POLICE_ICON} text="Police" mainbgColor="#395E66" backgroundColor="#56B6A4" />
                        <StoryUsers images={FAMILY_ICON} text="Family" mainbgColor="#395E66" backgroundColor="#56B6A4" />
                    </View>
                    <View style={{ paddingTop: responsiveWidth(3), flexDirection: 'row', width: responsiveWidth(90), justifyContent: "space-between", alignItems: "center" }}>
                        {/* <StoryUsers images={ANIMAL_OSTRICH} text="Ostrich" mainbgColor="#395E66" backgroundColor="#56B6A4" /> */}
                {/* <StoryUsers images={LUDO_ICON} text="Random" mainbgColor="#E44173" backgroundColor="#EE5F8A" />
                    </View>
                </View> */}

                {/* Things SubCategory */}

                {/* {
                        categoriesData?.map((category) => (
                            console.log("category", category),
                            <View key={category?.id} style={{ backgroundColor: TextColorGreen, width: responsiveWidth(29), borderRadius: 10, height: responsiveHeight(18.5), alignItems: 'center', margin: responsiveWidth(1.2) }}>
                                <StoryUsers onPress={() => handleStoryUser(category?.id)} images={category?.image} text={category?.name}
                                    mainbgColor={TextColorGreen}
                                    backgroundColor="rgba(199, 152, 97, 1)"
                                />
                            </View>
                        ))
                    } */}

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


export default SubCategories;
