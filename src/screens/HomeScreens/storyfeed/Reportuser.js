import { View, Text, SafeAreaView, ImageBackground, StyleSheet, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Img_Paths } from '../../../assets/Imagepaths'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { SecondaryColor, TextColorGreen } from '../../Styles/Style';
import BackButton from '../../../components/BackButton';
import { useNavigation } from '@react-navigation/native';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { Inter_Regular } from '../../../constants/GlobalFonts';
import CustomButton from '../../../components/reusable-components/CustomButton/CustomButton';
import { reportUser_Story } from '../../../../services/api/storyfeed';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';

const Reportuser = () => {
    const { SPLASH_SCREEN_IMAGE, USERNAME_IMAGE_REPORT } = Img_Paths;
    const navigation = useNavigation();
    const [textinputValue, setTextInputValue] = useState("");
    const storyUserIdReport = useSelector((state) => state.storyFeed?.storyUserId)
    const [isLoading, setIsLoading] = useState(false);
    const [response_Report, setResponse_Report] = useState({})


    const report_StoryUser = async () => {
        setIsLoading(true);

        try {
            const responseData = await reportUser_Story({ text: textinputValue, storyId: storyUserIdReport });
            setResponse_Report({
                username: responseData?.data?.user?.username,
                createdAt: responseData?.data?.createdAt,
            });

            setIsLoading(false);
            if (responseData?.statusCode === 200) {
                Toast.show({
                    type: "success",
                    text1: "Report submitted successfully! ",
                    text2: "Report submitted successfully!",
                    text2Style: { color: "#000" }
                })
            };

            if (textinputValue === "") {
                Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: "Text is not allowed to be empty",
                    text2Style: { color: "#000" }
                })
            };
            setTextInputValue("");
            console.log("responseDataReport----", responseData);
            return responseData;
        } catch (error) {
        }
    };



    return (

        <ImageBackground style={styles.containeRreport} source={SPLASH_SCREEN_IMAGE}>
            <SafeAreaView>

                <View style={styles.first_container}>
                    <BackButton onPress={() => navigation.goBack()} />
                    <View style={styles.categories_text_container}>
                        <Text style={styles.categories_text}>Report User</Text>
                    </View>
                </View>

                <View style={{
                    width: responsiveWidth(95),
                    marginLeft: "auto",
                    paddingTop: responsiveWidth(4),
                }}>
                    <View style={{ flexDirection: "row", width: responsiveWidth(55), justifyContent: "space-between", alignItems: "center" }}>
                        <View>
                            <Image style={{ width: 50, height: 50, resizeMode: "cover" }} source={USERNAME_IMAGE_REPORT} />
                        </View>

                        <View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ color: "#000", paddingVertical: 2, fontFamily: Inter_Regular.Inter_Regular, fontSize: responsiveFontSize(1.7) }}>02/10/2023 | 6:00 AM</Text>
                            </View>
                            <View>
                                <Text style={{ color: "#000", fontSize: responsiveFontSize(1.8), fontWeight: "400" }}>{response_Report?.username || "Reported User"}</Text>
                            </View>
                        </View>
                    </View>


                    <View>
                        <View style={{ paddingTop: responsiveWidth(6) }}>
                            <Text style={{ color: "#395E66", fontSize: responsiveFontSize(1.9), fontWeight: "400" }}>Your Message</Text>
                        </View>

                        <View style={{ marginTop: responsiveWidth(3), }}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                placeholder="Report User"
                                placeholderTextColor="#000"
                                numberOfLines={6}
                                multiline={true}
                                value={textinputValue}
                                onChangeText={(value) => setTextInputValue(value)}
                                style={{
                                    backgroundColor: '#F3F3F3',
                                    borderRadius: 20,
                                    color: '#000',
                                    textAlignVertical: 'top',
                                    height: responsiveHeight(22),
                                    width: responsiveWidth(90),
                                    paddingHorizontal: 20,
                                    lineHeight: 40
                                }}
                            />
                        </View>

                    </View>

                    <View style={{ height: responsiveHeight(45), justifyContent: "flex-end", alignItems: "center", }}>
                        <CustomButton isLoading={isLoading} onPress={() => report_StoryUser()} backgroundColor={TextColorGreen} color={"#FFF"} text={"Send Message"} />
                    </View>



                </View>
                <Toast />
            </SafeAreaView>
        </ImageBackground>
    )
};




const styles = StyleSheet.create({
    containeRreport: {
        height: responsiveHeight(100)
    },
    first_container: {
        paddingTop: responsiveWidth(6),
        paddingVertical: moderateVerticalScale(8),
        flexDirection: 'row',
        alignItems: 'center',
        width: responsiveWidth(95),
        marginLeft: "auto"
    },
    categories_text_container: {
        paddingHorizontal: moderateScale(20),
    },
    categories_text: {
        color: '#000000',
        fontSize: responsiveFontSize(2.4),
        fontWeight: '700',
        letterSpacing: 0.36,
        fontFamily: Inter_Regular.Inter_Regular
    },
});

export default Reportuser;
