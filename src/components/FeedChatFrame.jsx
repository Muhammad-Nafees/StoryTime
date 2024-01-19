import React, { useEffect, useState } from 'react'
import { Image, ImageBackground, StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, TextInput, ActivityIndicator } from 'react-native'
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions'
import { SecondaryColor, TextColorGreen, pinkColor } from '../screens/Styles/Style'
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters'
import { Img_Paths } from '../assets/Imagepaths'
import { useNavigation } from '@react-navigation/native'
import NavigationsString from '../constants/NavigationsString'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { useDispatch, useSelector } from 'react-redux'
import { addComment } from '../../store/slices/storyfeedslices/addCommentSlice'
import { launchImageLibrary } from "react-native-image-picker"
// import { getComments_func } from '../../store/slices/storyfeedslices/getCommentsSlice'
import GetComments from './GetComments'
import { add_comment_api, get_Comment_api } from '../../services/api/storyfeed'

const FeedChatFrame = ({ type, profile_text, backgroundImage, profileImage }) => {

    const SCREENWIDTH = Dimensions.get("window").width;
    const SCREENHEIGHT = Dimensions.get("window").height;
    const navigation = useNavigation();
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [media, setMedia] = useState();
    const [inputText, setInputText] = useState('');
    const { HOME_FRAME, FRANKIN_DRAWEN, SHARE_BTN } = Img_Paths;
    const { FEED_CHAT } = NavigationsString;
    // const getCommentsData = useSelector((state) => state?.getComment?.data?.comments);
    const story = useSelector((state) => state?.likedstoryfeed?.storyId);
    const [isComment, setIsComment] = useState(false);
    const [responseMedia, setResponseMedia] = useState();
    const [userCommentsData, setuserCommentsData] = useState([])
    const { width, height } = Dimensions.get('window');
    const dispatch = useDispatch();
    const storyId = story;
    const text = inputText;

    const optionsvideo = {
        mediaType: 'photo',
        multiple: true,
    };

    const imagePickerHadled = async () => {
        launchImageLibrary(optionsvideo, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.assets && response.assets.length > 0) {
                const file = {
                    uri: response?.assets[0].uri,
                    type: response?.assets[0].type,
                    name: response?.assets[0].fileName
                };
                setMedia(file)
                console.log("file=====", file)
                console.log('Selected image URI: ', response.assets[0].uri);
            }
        });
    };

    const fetchaddDataComments = async () => {
        try {
            const response = await add_comment_api({ story, text, media });
            fetchDatagetComments();
            setResponseMedia(response?.data?.media)
            console.log("addComme==", response.data?.media)
            return response.data;
        } catch (error) {
            console.log("error---", error)
        }
    };

    const fetchDatagetComments = async () => {
        try {
            setIsLoading(true)
            const response = await get_Comment_api(storyId);
            setuserCommentsData(response?.data?.comments);
            setIsLoading(false);
            console.log("addComment=====", response.data);
            setInputText("");
            return response?.data
        } catch (error) {
            console.log("error---", error)
        }
    };

    useEffect(() => {
        fetchDatagetComments();
    }, []);


    return (
        <View style={styles.container}>
            <View style={{ width: responsiveWidth(90), }}>
                <ImageBackground style={styles.img_backgroung_content} resizeMode="center" source={HOME_FRAME}>
                    <View style={styles.bg_content}>
                        {
                            type == "lilibeth" ?
                                <>
                                    <View style={styles.child_bg}>
                                        <View style={styles.second_childbg}>
                                            <View style={styles.third_childbg}>
                                                <Image style={styles.child_bg_img} source={profileImage} />
                                                <Text style={{ color: SecondaryColor, fontSize: responsiveFontSize(1.9) }}>Lilibeth</Text>
                                            </View>
                                            <View style={styles.text_container}>
                                                <Text style={{ fontSize: responsiveWidth(3.7), color: SecondaryColor, lineHeight: 16 }}>
                                                    Suddenly his friend saw him start to move strangely. The shark attacked Wilson so hard his entire body flew out of the water, and multiple eyewitnesses observed the whole situation. His friend and some others grabbed him when the shark attempted to drag him under.
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </>
                                :
                                null
                        }

                        {
                            type == "imp_bg_img" ?
                                <>
                                    <ImageBackground style={{ marginTop: responsiveWidth(3), width: SCREENWIDTH / 1.4, height: SCREENHEIGHT / 3.6, }} resizeMode="cover" borderRadius={18} source={backgroundImage}>
                                        <View style={styles.sophia_container}>
                                            <Image style={styles.child_bg_img} source={profileImage} />
                                            <Text style={{ color: SecondaryColor, fontSize: responsiveFontSize(1.9) }}>Lilibeth</Text>
                                        </View>
                                    </ImageBackground>
                                </>
                                :
                                null
                        }
                    </View>
                </ImageBackground>

                {/* Comments Content */}

                <View style={{ position: 'relative', bottom: responsiveWidth(5), right: moderateScale(6), }}>
                    <View style={{ width: responsiveWidth(92), marginLeft: responsiveWidth(1), backgroundColor: "#E44173", height: responsiveHeight(41), justifyContent: "center", alignItems: "center", }}>

                        <View style={styles.third_container}>
                            <View style={[styles.fourth_container]}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: responsiveWidth(50), }}>
                                    <TouchableOpacity style={styles.first_view}>
                                        <Image style={{ width: responsiveWidth(8), height: responsiveHeight(4), resizeMode: "center" }} source={require("../assets/456-img.png")} />
                                        <Text style={{ fontSize: responsiveFontSize(1.7), color: SecondaryColor, fontWeight: "300" }}>1.5k</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.second_view}>
                                        <Image style={{ width: responsiveWidth(8), height: responsiveHeight(4), resizeMode: "center" }} source={require("../assets/1.5k-img.png")} />
                                        <Text style={{ fontSize: responsiveFontSize(1.7), color: SecondaryColor, fontWeight: "300" }}>456</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate(FEED_CHAT)} style={styles.third_view}>
                                        <Image style={{ width: responsiveWidth(8), height: responsiveHeight(4), resizeMode: "center" }} source={require("../assets/message-icon.png")} />
                                        <Text style={{ fontSize: responsiveFontSize(1.7), color: SecondaryColor, fontWeight: "300" }}>1.1k</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.third_view}>
                                        <Image style={{ width: responsiveWidth(8), height: responsiveHeight(4), resizeMode: "center" }} source={SHARE_BTN} />
                                        <Text style={{ fontSize: responsiveFontSize(1.7), color: SecondaryColor, fontWeight: "300" }}>Share</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ width: responsiveWidth(15), justifyContent: 'flex-end', alignItems: "flex-end" }}>
                                    <TouchableOpacity style={{ width: responsiveWidth(6), }}>
                                        <Menu>
                                            <MenuTrigger>
                                                <Image
                                                    style={{
                                                        width: responsiveWidth(7),
                                                        height: responsiveHeight(3.5),
                                                        resizeMode: 'center',
                                                    }}
                                                    source={require('../assets/three-dots-mod.png')}
                                                />
                                            </MenuTrigger>

                                            <MenuOptions customStyles={{ optionsContainer: { borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, } }}>
                                                <MenuOption style={{ paddingVertical: moderateVerticalScale(12), paddingLeft: responsiveWidth(5) }}>
                                                    <Text style={{ color: "#000", fontWeight: "400", fontSize: responsiveFontSize(1.9) }}>Block</Text>
                                                </MenuOption>
                                                <MenuOption style={{ paddingBottom: 10, paddingLeft: responsiveWidth(5) }}>
                                                    <Text style={{ color: "#000", fontWeight: "400", fontSize: responsiveFontSize(1.9) }}>Report</Text>
                                                </MenuOption>
                                            </MenuOptions>

                                        </Menu>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={{ width: responsiveWidth(89), backgroundColor: "#FFF", height: responsiveHeight(32), }}>
                            <View style={{ paddingTop: responsiveWidth(4), paddingVertical: moderateVerticalScale(8), alignItems: "center", height: responsiveHeight(25.5) }}>
                                <ScrollView nestedScrollEnabled={true}>
                                    {
                                        !isLoading ?
                                            userCommentsData?.map((item, index) => (
                                                console.log("id====", item?.id),
                                                console.log("id2==", item?._id),
                                                <GetComments
                                                    key={index}
                                                    text={item?.text}
                                                    commentsUserid={item?._id}
                                                    commentsUserid2={item?.id}
                                                    firstName={item?.user?.firstName}
                                                    lastName={item?.user?.lastName}
                                                    updatedAt={item?.updatedAt}
                                                    getCommentsstoryId={item?.story}
                                                    isComment={isComment}
                                                    mediacommentPic={responseMedia}
                                                />
                                            ))
                                            :
                                            <View style={{ height: height / 2, alignItems: "center" }}>
                                                <ActivityIndicator size={40} color={'#000'} />
                                            </View>
                                    }
                                </ScrollView>
                            </View>

                            {/* TextInput Content------- */}

                            <View style={{ flexDirection: 'row', justifyContent: "space-evenly", alignItems: "center", }}>
                                <View style={{ backgroundColor: "#FFDCE7", flexDirection: 'row', alignItems: "center", width: responsiveWidth(78), height: responsiveHeight(6) }}>
                                    <TextInput placeholder="Message" value={inputText} onChangeText={(val) => setInputText(val)} placeholderTextColor={"#000"} style={{ width: responsiveWidth(70), paddingLeft: 12, color: "#000", }} />
                                    <TouchableOpacity onPress={imagePickerHadled}>
                                        <Image style={{ width: responsiveWidth(6), height: responsiveHeight(3), resizeMode: "center", }} source={require("../assets/image-icon.png")} />
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity onPress={fetchaddDataComments} style={{ justifyContent: "center", alignItems: "center", }}>
                                    <Image style={{ width: responsiveWidth(7), height: responsiveHeight(3.5), resizeMode: "center" }} source={require("../assets/send-btn.png")} />
                                </TouchableOpacity>
                            </View>


                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
};



const styles = StyleSheet.create({

    container: {
        justifyContent: "center",
        alignItems: "center",
        // paddingVertical: moderateVerticalScale(10),
        flex: 1
    },
    img_backgroung_content: {
        width: responsiveWidth(90),
        height: responsiveHeight(34),
        justifyContent: "center",
        alignItems: "center",
    },
    bg_content: {
        backgroundColor: TextColorGreen,
        justifyContent: "center",
        alignItems: "center",
        width: responsiveWidth(78),
        height: responsiveHeight(29),
        marginLeft: responsiveWidth(1),
        marginTop: responsiveWidth(1)
    },
    child_bg: {
        backgroundColor: pinkColor,
        width: responsiveWidth(70),
        height: responsiveHeight(28),
        marginTop: responsiveWidth(4),
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
        width: responsiveWidth(50),
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
    },



})

export default FeedChatFrame;
