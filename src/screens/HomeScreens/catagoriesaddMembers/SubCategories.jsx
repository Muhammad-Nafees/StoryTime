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



const SubCategories = ({ route }) => {

    console.log("route---", route.params?.id)
    const { width, height } = Dimensions.get('window');
    const { SPLASH_SCREEN_IMAGE } = Img_Paths;

    const { PROFILE, ADD_PLAYERS } = NavigationsString;
    const navigation = useNavigation();
    const id = route?.params?.id;

    console.log("id---", id)
    return (
        <ImageBackground style={styles.container} source={SPLASH_SCREEN_IMAGE}>
            <ScrollView>

                {/* Things SubCategory */}
                {
                    id === 0 &&
                    <>
                        <Human_Sub />
                    </>
                }
                {/* Things SubCategory */}

                {
                    id === 1 &&
                    <>
                        <Things_Sub />
                    </>
                }
                {/* Things SubCategory */}


                {
                    id === 2 &&
                    <>
                        <Animals_Sub />
                    </>
                }
                {
                    id === 3 &&
                    <>
                        <Places_Sub />
                    </>
                }
                {
                    id === 4 &&
                    <>
                        <Food_Sub />
                    </>
                }
                {
                    id === 5 &&
                    <>
                        <Work_Sub />
                    </>
                }

                {
                    id === 6 &&
                    <>
                        <Event_Sub />
                    </>
                }
                {
                    id === 7 &&
                    <>
                        <Travel_Sub />
                    </>
                }
                {
                    id === 8 &&
                    <>
                        <School_Sub />
                    </>
                }
                {
                    id === 9 &&
                    <>
                        <Vehicles_Sub />
                    </>
                }
                {
                    id === 10 &&
                    <>
                        <Element_Sub />
                    </>
                }
                {
                    id === 11 &&
                    <>
                        <Countries_Sub />
                    </>
                }



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
