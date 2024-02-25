import React, { useCallback, useEffect, useState } from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet, FlatList, ScrollView, ActivityIndicator } from 'react-native'
import { PrimaryColor, SecondaryColor, TextColorGreen, ThirdColor, pinkColor } from '../Styles/Style';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import FrameContent from '../../components/FrameContent';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from '../../assets/Imagepaths';
import NavigationsString from '../../constants/NavigationsString';
import { FlatListData } from '../../../dummyData/DummyData';
import { PassionOne_Regular } from '../../constants/GlobalFonts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchallFeedStories } from '../../../services/api/storyfeed';
import { addFriends_api } from '../../../services/api/add-members';
import { refresh_token_api } from '../../../services/api/auth_mdule/auth';


const Home = () => {

    const dispatch = useDispatch()
    const { width, height } = Dimensions.get('window');
    const { STORY_TIME_IMG, SPLASH_SCREEN_IMAGE, } = Img_Paths;
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMain, setIsLoadingMain] = useState(true)
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
    const navigation = useNavigation();
    const [checkDataisOrNot, setCheckDataisOrNot] = useState("")
    const REFRESH_TOKEN = responseLogin?.data?.refreshToken;


    useEffect(() => {
        const addFriends_api_handler = async () => {
            try {
                const responseData = await addFriends_api();
                setResponseapi(responseData?.data?.users);
                if (responseData?.statusCode == 401) {
                    const responseToken = await refresh_token_api(REFRESH_TOKEN);
                    console.log("responseTokenfunc-----", responseToken)
                    return responseToken;
                }
                return responseData;
            } catch (error) {
                console.log("err", error)
            }
        };
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
                    // setIsLoadingMain(false);
                    setIsRefreshing(false);
                }
            }
        };
        fetchUsers();
    }, [page, isRefreshing,])

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
        setPage(1);
        setResponseUsers([]);
        setTimeout(() => {
            setIsRefreshing(false);
        }, 1000);
    };



    return (
        <ImageBackground style={styles.container} source={SPLASH_SCREEN_IMAGE}>
            {/* <ScrollView> */}
            <View style={{ justifyContent: "center", alignItems: "center", paddingTop: responsiveWidth(5) }}>
                <View style={{ flexDirection: 'row', width: responsiveWidth(90), justifyContent: "space-between", alignItems: "center" }}>
                    <View>
                        <Image style={[styles.img, { width: width * 0.23, height: height * 0.075, }]} source={STORY_TIME_IMG} />
                    </View>

                    <View style={{ flexDirection: 'row', }}>
                        <TouchableOpacity style={{ paddingHorizontal: moderateVerticalScale(8) }} onPress={() => navigation.navigate(ADD_FRIENDS)}>
                            <Image style={{ width: width * 0.11, height: height * 0.05, }} source={require("../../assets/plus-icon.png")} />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Image style={{ width: width * 0.10, height: height * 0.05, resizeMode: "center" }} source={require("../../assets/avatar.png")} />
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
                        // onRefresh={onRefresh}
                        // refreshing={isRefreshing}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{ justifyContent: "center", alignItems: "center", }}>
                                    <TouchableOpacity style={{ alignItems: "center", paddingVertical: moderateVerticalScale(6), paddingHorizontal: moderateScale(12), }}>
                                        <Image style={{ width: responsiveWidth(15.2), height: responsiveHeight(7.7), resizeMode: "center" }} source={require("../../assets/first-img.png")} />
                                    </TouchableOpacity>
                                    <Text style={{ color: PrimaryColor, fontWeight: "600", fontSize: responsiveFontSize(1.8), textTransform: "capitalize", }}>{item?.firstName}</Text>
                                </View>
                            )
                        }}
                    />
                </View>
            </View>

            {
                console.log(" checkDataisOrNot", checkDataisOrNot)
            }

            {/* !isLoadingMain ? */}

            {
                isLoadingMain ?
                    <View style={{ alignItems: 'center', height: height / 2, }}>
                        <ActivityIndicator size={30} color={'#000'} />
                    </View> :
                    responseUsers?.length !== 0 ?
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
                                    profileImage={require("../../assets/avatar-inn.png")}
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
                                />
                            )}
                            ListFooterComponent={() => {
                                if (isLoading) {
                                    return (
                                        <View style={{ alignItems: 'center', height: height / 3, }}>
                                            <ActivityIndicator size={40} color={'#000'} />
                                        </View>
                                    );
                                }
                                return null;
                            }}
                            onEndReached={handleLoadMore}
                            onEndReachedThreshold={0.3}
                        />
                        :
                        <>
                            {/* <View style={{ alignItems: 'center', height: height / 2, }}>
                            <ActivityIndicator size={40} color={'#000'} />
                        </View> */}
                            <View style={{ alignItems: 'center', justifyContent: "center", height: height / 2 }}>
                                {/* <ActivityIndicator size={30} color={'#000'} /> */}
                                <Text style={{ color: "#000", fontSize: 22 }}>{checkDataisOrNot}</Text>
                            </View>
                        </>
            }

            {/* Frame Content Start----------- */}

            {/* 
            {
                {/* !loading ? */}
            {/* <View style={{ justifyContent: "center", alignItems: "center", height: height / 2 }}>
                        <ActivityIndicator size={40} color={"#000"} />
                    </View>
             */}

            {/* Frame Content Close----------- */}

            {/* </ScrollView> */}
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
