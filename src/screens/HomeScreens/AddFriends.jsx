import React, { useCallback, useEffect, useState } from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet, FlatList, ScrollView, TextInput, ActivityIndicator } from 'react-native'
import { PrimaryColor, SecondaryColor, TextColorGreen, ThirdColor, pinkColor } from '../Styles/Style';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
import FrameContent from '../../components/FrameContent';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from '../../assets/Imagepaths';
import NavigationsString from '../../constants/NavigationsString';
import StoryUsers from '../../components/StoryUsers';
import AddFriendUsers from '../../components/AddFriendUsers';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../store/slices/storyfeedslices/getAllUsersSlice';
import { getAllUsers_api } from '../../../services/api/storyfeed';
import { boolean } from 'yup';


const AddFiends = () => {
    const { width, height } = Dimensions.get('window');
    const { SPLASH_SCREEN_IMAGE, LEFT_ARROW_IMG, SEARCH_ADD_ICON, FIRST_PROFILE,
        SECOND_PROFILE, THIRD_PROFILE, FOURTH_PROFILE, FIFTH_PROFILE, SIXTH_PROFILE } = Img_Paths;
    const navigation = useNavigation();
    const allusersState = useSelector((state) => state?.getallUsers)
    const isFollowing = useSelector((state) => state?.followandunfollow?.isFollowing)
    const [responseUsers, setResponseUsers] = useState([]);
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadMore, setIsLoadMore] = useState(false);
    const [HasMorePages, setHasMorePages] = useState();
    const [stopLimit, setStopLimit] = useState();
    const [isData, setIsData] = useState([])
    const [limit, setLimit] = useState(40);
    const [filteredData, setFilteredData] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    // console.log("LIMITcheckNum====", limit);
    // console.log("hasMorePages=====", HasMorePages);

    console.log("hasmorepages===", HasMorePages)
    console.log("stoplimit===", stopLimit)
    const handleLoadMore = async () => {
        if (isLoading) {
            return;
        }
        setIsLoading(true);
        setLimit((prevLimit) => {
            const newLimit = prevLimit + 5;
            if (newLimit >= 100) {
                setPage((prevPage) => prevPage + 1);
                return 10; // Reset limit to 10
            }
            return newLimit;
        });
        setIsLoadMore(true);
    };


    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                const responseData = await getAllUsers_api({ pagination: page, limit });
                const data = responseData?.data?.users;
                setIsData(data)
                if (data && data.length > 0) {
                    setResponseUsers(prevData => [...prevData, ...data]);
                    setHasMorePages(responseData?.data?.pagination?.perPage);
                    setStopLimit(responseData?.data?.pagination?.currentPage);
                } else {
                    console.log("No users found");
                    return;
                }

            } catch (error) {
                // console.log("error--===", error);
            } finally {
                setIsLoading(false);
                setIsLoadMore(false);
            }
        };
        fetchUsers();
    }, [limit, page, isLoadMore])

    const filterUserData = useCallback(() => {
        const filteredData = responseUsers?.filter((item) => {
            return item?.username?.toLowerCase()?.includes(searchQuery?.toLowerCase())
        })
        setFilteredData(filteredData)
    }, [searchQuery, responseUsers]);

    useEffect(() => {
        filterUserData();
    }, [filterUserData]);

    const onRefresh = () => {
        setIsRefreshing(true)
        setPage(1)
    }


    return (
        <ImageBackground style={styles.container} source={SPLASH_SCREEN_IMAGE}>
            {/* <ScrollView> */}
            {/* Frame Content Close----------- */}
            <View style={styles.first_container}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back_button}>
                    <Image style={styles.left_arrow} source={LEFT_ARROW_IMG} />
                </TouchableOpacity>
                <View style={styles.categories_text_container}>
                    <Text style={styles.categories_text}>Add Friends</Text>
                </View>
            </View>

            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View style={{ backgroundColor: "#FFF", borderRadius: 50, width: responsiveWidth(90), flexDirection: "row", alignItems: "center" }}>
                    <View style={{ paddingLeft: responsiveWidth(6), paddingHorizontal: moderateVerticalScale(10), paddingVertical: 14, }}>
                        <Image style={{ width: responsiveWidth(6), height: responsiveHeight(3), }} source={SEARCH_ADD_ICON} />
                    </View>
                    <TextInput value={searchQuery} onChangeText={(text) => {
                        setSearchQuery(text);
                        filterUserData();
                    }} placeholder="Search" placeholderTextColor={"#393939"} style={{ color: "#000", width: 240, }} />
                </View>
            </View>

            <View style={{ paddingTop: responsiveWidth(5), justifyContent: "center", alignItems: "center" }}>
                {
                    <FlatList
                        scrollEnabled={true}
                        contentContainerStyle={{ paddingBottom: responsiveWidth(40) }}
                        data={searchQuery ? filteredData : responseUsers}
                        keyExtractor={(item, index) => index.toString()}
                        onRefresh={onRefresh}
                        refreshing={isRefreshing}
                        renderItem={({ item, index }) => (
                            <AddFriendUsers key={index} profileimage={FIRST_PROFILE} username={item?.username} userid={item?._id}
                                userchoice="Follow" isFollowing={item?.isFollowing}
                            />
                        )}

                        ListFooterComponent={() => {
                            if (isLoading) {
                                return (
                                    <View style={{ alignItems: 'center', height: height / 4, }}>
                                        <ActivityIndicator size={40} color={'#000'} />
                                    </View>
                                );
                            }
                            return null;
                        }}
                        onEndReached={() => {
                            if (isData && isData?.length > 0) {
                                handleLoadMore();
                            }
                        }}
                        onEndReachedThreshold={0.3}
                    />
                }
            </View>
            {/* </ScrollView> */}
        </ImageBackground>

    )
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        flex: 1,
    },
    // flatListContainer: {
    //     flex: 1,
    //     // ... aur baki styles
    // },
    first_container: {
        paddingTop: responsiveWidth(6),
        paddingVertical: moderateVerticalScale(12),
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
        fontWeight: "600",
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
        width: responsiveWidth(70),
        backgroundColor: '#FFF',
        color: "#000",
        borderRadius: 50,
    },
    add_button: {
        borderRadius: 50,
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


export default AddFiends;
