import React from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet, FlatList, ScrollView } from 'react-native'
import { PrimaryColor, SecondaryColor, TextColorGreen, ThirdColor, pinkColor } from '../Styles/Style';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import FrameContent from '../../components/FrameContent';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from '../../assets/Imagepaths';
import NavigationsString from '../../constants/NavigationsString';



const Categories = () => {

    const { width, height } = Dimensions.get('window');
    const { STORY_TIME_IMG, SPLASH_SCREEN_IMAGE } = Img_Paths
    const { PLAY_STORY_TIME } = NavigationsString
    const navigation = useNavigation()


    return (
        <ScrollView>
            <ImageBackground style={styles.container} source={SPLASH_SCREEN_IMAGE}>
                {/* Frame Content Close----------- */}
                <View>
                    <Text>Nafees</Text>
                    <Text>Nafees</Text>
                    <Text>Nafees</Text>
                    <Text>Nafees</Text>
                    <Text>Nafees</Text>
                    <Text>Nafees</Text>
                    <Text>Nafees</Text>
                    <Text>Nafees</Text>
                    <Text>Nafees</Text>
                </View>
            </ImageBackground>
        </ScrollView>

    )
}


export default Categories;


const styles = StyleSheet.create({
    container: {
        backgroundColor: pinkColor,
        width: "100%",
        height: "100%",
        flex: 1,
    },
})
