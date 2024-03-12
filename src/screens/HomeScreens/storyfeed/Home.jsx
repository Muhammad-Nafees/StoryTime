import React, { useCallback, useEffect, useState } from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet, FlatList, ScrollView, ActivityIndicator } from 'react-native'
import { PrimaryColor, SecondaryColor, TextColorGreen, ThirdColor, pinkColor } from '../../Styles/Style';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import NetInfo from "@react-native-community/netinfo";
import FrameContent from '../../../components/FrameContent';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from '../../../assets/Imagepaths';
import NavigationsString from '../../../constants/NavigationsString';
import { PassionOne_Regular } from '../../../constants/GlobalFonts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchallFeedStories } from '../../../../services/api/storyfeed';
import { addFriends_api } from '../../../../services/api/add-members';
import { refresh_token_api } from '../../../../services/api/auth_mdule/auth';
import { setEndUserProfile, setFriendId, setRandomForProfileUpdate } from '../../../../store/slices/addplayers/addPlayersSlice';
import InAppBrowser from 'react-native-inappbrowser-reborn';

const Home = () => {

    const { width, height } = Dimensions.get('window');
    const { STORY_TIME_IMG, SPLASH_SCREEN_IMAGE, } = Img_Paths;
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMain, setIsLoadingMain] = useState(true);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [HasMorePages, setHasMorePages] = useState();
    const { ADD_FRIENDS } = NavigationsString;
    const [responseUsers, setResponseUsers] = useState([]);
    const [isData, setIsData] = useState([]);
    const [Responseapi, setResponseapi] = useState([]);
    const [isLoadMore, setIsLoadMore] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const responseLogin = useSelector((state) => state?.authSlice?.user);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [checkDataisOrNot, setCheckDataisOrNot] = useState("")
    const REFRESH_TOKEN = responseLogin?.data?.refreshToken;
    const { user } = useSelector(state => state?.authSlice);
    const USER = user?.data?.user || user?.data;

    console.log("user----", USER?._id);

    const addFriends_api_handler = async () => {
        try {
            const responseData = await addFriends_api();
            setResponseapi(responseData?.data?.users);
            if (responseData?.statusCode == 401) {
                const responseToken = await refresh_token_api(REFRESH_TOKEN);
                console.log("responseTokenfunc-----", responseToken);
                return responseToken;
            }
            return responseData;
        } catch (error) {
            console.log("err", error)
        }
    };

    useEffect(() => {
        addFriends_api_handler();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            if (!isRefreshing) {
                try {
                    const responseData = await fetchallFeedStories({ pagination: page, limit });
                    const data = responseData?.data?.stories;
                    console.log("responseData-----------", responseData);
                    setIsData(data);
                    if (data && data.length > 0) {
                        setResponseUsers(prevData => [...prevData, ...responseData?.data?.stories]);
                    } else {
                        setCheckDataisOrNot("Follow someone to get Feeds")
                    }
                    setIsLoadingMain(false);
                    setHasMorePages(responseData?.data?.pagination?.hasNextPage);
                    return responseData;
                } catch (error) {
                } finally {
                    setIsRefreshing(false);
                }
            }
        };
        fetchUsers();
    }, [page, isRefreshing,]);

    const handleLoadMore = useCallback(() => {
        console.log("HasMorePages-----", HasMorePages);
        if (HasMorePages) {
            setIsLoading(true);
            setPage((prevPage) => prevPage + 1);
        } else {
            setIsLoading(false);
        }
    }, [HasMorePages]);



    const onRefresh = () => {
        setIsRefreshing(true);
        addFriends_api_handler()
        setPage(1);
        setResponseUsers([]);
        setTimeout(() => {
            setIsRefreshing(false);
        }, 1000);
    };

    const handleFriends = (friendId) => {

        const randomNumbers = Math.floor(Math.random() * 100);
        dispatch(setRandomForProfileUpdate(randomNumbers));
        console.log("randomNumbers :", randomNumbers)

        dispatch(setFriendId(friendId));
        navigation.navigate("profileStack", {
            screen: "Profile",
        });
        console.log("friendId---- : ", friendId);
    };

    useFocusEffect(
        useCallback(() => {
            dispatch(setFriendId(USER?._id));
        }, [])
    );

    async function linkTo(item) {
        try {
            const url = item;
            if (await InAppBrowser.isAvailable()) {
                const result = await InAppBrowser.open(url, {
                });
            } else {
                Linking.openURL(url); // If the in-app browser is not available, open the link in the device's default browser
            }
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <ImageBackground style={styles.container} source={SPLASH_SCREEN_IMAGE}>

            <View style={{ justifyContent: "center", alignItems: "center", paddingTop: responsiveWidth(5) }}>
                <View style={{ flexDirection: 'row', width: responsiveWidth(90), justifyContent: "space-between", alignItems: "center" }}>
                    <View>
                        <Image style={[styles.img, { width: width * 0.23, height: height * 0.075, }]} source={STORY_TIME_IMG} />
                    </View>

                    <View style={{ flexDirection: 'row', }}>
                        <TouchableOpacity style={{ paddingHorizontal: moderateVerticalScale(8) }} onPress={() => navigation.navigate(ADD_FRIENDS)}>
                            <Image style={{ width: width * 0.11, height: height * 0.05, }} source={require("../../../assets/plus-icon.png")} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            navigation.navigate("profileStack", {
                                screen: "Profile",
                            });
                            dispatch(setFriendId(USER?._id));
                            setRandomForProfileUpdate
                        }}>
                            <Image style={{ width: width * 0.10, height: height * 0.05, resizeMode: "center" }} source={require("../../../assets/avatar.png")} />
                        </TouchableOpacity>

                    </View>
                </View>
            </View>

            <View style={{ width: responsiveWidth(94), marginLeft: 'auto', marginVertical: responsiveWidth(1.5), marginTop: responsiveWidth(6) }}>
                <Text style={{ color: PrimaryColor, fontSize: responsiveFontSize(3), fontFamily: PassionOne_Regular.passionOne }}>My Friend’s Story Time</Text>
            </View>

            <View style={styles.flatlist_container}>
                <View style={{ width: responsiveWidth(95), marginLeft: "auto" }}>
                    <FlatList
                        data={Responseapi}
                        scrollEnabled={true}
                        horizontal
                        renderItem={({ item, index }) => {
                            console.log("item---- :", item?._id);
                            return (
                                <View style={{ justifyContent: "center", alignItems: "center", }}>
                                    <TouchableOpacity onPress={() => handleFriends(item?._id)} style={{ alignItems: "center", paddingVertical: moderateVerticalScale(6), paddingHorizontal: moderateScale(12), }}>
                                        <Image style={{ width: responsiveWidth(15.2), height: responsiveHeight(7.7), resizeMode: "center" }} source={require("../../../assets/first-img.png")} />
                                    </TouchableOpacity>
                                    <Text style={{ color: PrimaryColor, fontWeight: "600", fontSize: responsiveFontSize(1.8), textTransform: "capitalize", }}>{item?.firstName}</Text>
                                </View>
                            )
                        }}
                    />
                </View>
            </View>

            {
                isLoadingMain ?
                    <View style={{ justifyContent: "center", alignItems: 'center', height: height / 1.5, }}>
                        <ActivityIndicator size={24} color={PrimaryColor} />
                    </View> :
                    <>
                        <FlatList
                            data={responseUsers}
                            onRefresh={onRefresh}
                            refreshing={isRefreshing}
                            scrollEnabled={true}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => (
                                console.log("resposneUSersLengt", responseUsers?.length),
                                <FrameContent
                                    key={index}
                                    type={item?.type}
                                    userId={item?._id}
                                    profileImage={require("../../../assets/avatar-inn.png")}
                                    content={item.content}
                                    likedUserId={item?._id}
                                    commentsCount={item?.commentsCount}
                                    likes={item?.likesCount}
                                    subCategoryname={item?.subCategory?.name}
                                    subCategoryimage={item?.subCategory?.image}
                                    username={item?.creator?.username}
                                    likedByMe={item?.likedByMe}
                                    likesCountuser={item?.likesCount}
                                    likeslength={item?.likes}
                                    dislikeslength={item?.dislikes}
                                    dislikesCount={item?.dislikesCount}
                                    dislikesByMe={item?.dislikesByMe}
                                    linkTo={linkTo}
                                />
                            )}

                            ListFooterComponent={() => {
                                if (isLoading) {
                                    return (
                                        <View style={{ alignItems: 'center', height: height / 3, }}>
                                            <ActivityIndicator size={24} color={PrimaryColor} />
                                        </View>
                                    );
                                }
                                return null;
                            }}
                            onEndReached={handleLoadMore}
                            onEndReachedThreshold={0.3}
                        />

                        {
                            responseUsers?.length === 0 && (
                                <View style={{ position: "absolute", top: 300, left: 45, alignItems: 'center', justifyContent: "center", height: height / 20, }}>
                                    <Text style={{ color: PrimaryColor, fontSize: responsiveFontSize(3.5), fontFamily: PassionOne_Regular.passionOne, }}>{checkDataisOrNot}</Text>
                                </View>
                            )
                        }

                    </>
            }

        </ImageBackground>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: SecondaryColor,
        width: "100%",
        height: "100%",
        flex: 1,
    },
    img: {
        resizeMode: "center"
    },
    flatlist_container: {
        justifyContent: "center",
        alignItems: "center",
    },
    fisrt_row_container: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: responsiveWidth(8)
    },
    pause_img: {
        resizeMode: "center"
    },

});

export default Home;
