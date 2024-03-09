import React, { useCallback, useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from '../../../assets/Imagepaths';
import AddFriendUsers from '../../../components/AddFriendUsers';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers_api } from '../../../../services/api/storyfeed';
import { PrimaryColor, pinkColor } from '../../Styles/Style';
import { PassionOne_Regular } from '../../../constants/GlobalFonts';

const AddFiends = () => {
  const { width, height } = Dimensions.get('window');
  const {
    SPLASH_SCREEN_IMAGE,
    LEFT_ARROW_IMG,
    SEARCH_ADD_ICON,
    FIRST_PROFILE,
    SECOND_PROFILE,
    THIRD_PROFILE,
    FOURTH_PROFILE,
    FIFTH_PROFILE,
    SIXTH_PROFILE,
  } = Img_Paths;
  const navigation = useNavigation();
  const allusersState = useSelector(state => state?.getallUsers);
  const isFollowing = useSelector(
    state => state?.followandunfollow?.isFollowing,
  );
  const [responseUsers, setResponseUsers] = useState([]);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [HasMorePages, setHasMorePages] = useState();
  const [stopLimit, setStopLimit] = useState();
  const [isData, setIsData] = useState([]);
  const [limit, setLimit] = useState(20);
  const [filteredData, setFilteredData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showTextUser, setshowTextUser] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [handleLoadMoreFriends, setHandleLoadMoreFriends] = useState(false);

  const handleLoadMore = async () => {
    if (isLoading) {
      return;
    }
    if (HasMorePages) {
      setshowTextUser(false);
      setPage(prevPage => prevPage + 1);
      setHandleLoadMoreFriends(true);
    } else {
      setHandleLoadMoreFriends(false);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      // setshowTextUser(false);
      try {
        const responseData = await getAllUsers_api({ pagination: page, limit });
        const data = responseData?.data?.users;
        setIsData(data);
        if (data && data.length > 0) {
          console.log('Users');
          setResponseUsers(prevData => [...prevData, ...data]);
          setHasMorePages(responseData?.data?.pagination?.hasNextPage);
          setStopLimit(responseData?.data?.pagination?.currentPage);
          // setshowTextUser(false);
        } else {
          // setshowTextUser(true);
          return;
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
        setIsLoadMore(false);
      }
    };
    fetchUsers();
  }, [page, isRefreshing]);

  const filterUserData = useCallback(() => {
    const filteredData = responseUsers?.filter(item => {
      return item?.username
        ?.toLowerCase()
        ?.includes(searchQuery?.toLowerCase());
    });

    console.log('filterlength--------- :', filteredData?.length);
    if (filteredData?.length === 0) {
      setshowTextUser(true);
    } else {
      setshowTextUser(false);
    }
    if (filteredData?.length > 0) {
      setFilteredData(filteredData);
      setHandleLoadMoreFriends(false);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setHandleLoadMoreFriends(false);
      setFilteredData([]);
      console.log('USers not found');
    }
  }, [searchQuery, responseUsers]);

  useEffect(() => {
    filterUserData();
  }, [filterUserData]);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    setPage(1);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, []);

  return (
    <View style={{ height: responsiveHeight(100) }}>
      <ImageBackground
        style={{ height: responsiveHeight(100) }}
        source={SPLASH_SCREEN_IMAGE}>
        {/* Frame Content Close----------- */}
        <View style={styles.first_container}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.back_button}>
            <Image style={styles.left_arrow} source={LEFT_ARROW_IMG} />
          </TouchableOpacity>
          <View style={styles.categories_text_container}>
            <Text style={styles.categories_text}>Add Friends</Text>
          </View>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View
            style={{
              backgroundColor: '#FFF',
              borderRadius: 50,
              width: responsiveWidth(90),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                paddingLeft: responsiveWidth(6),
                paddingHorizontal: moderateVerticalScale(10),
                paddingVertical: 14,
              }}>
              <Image
                style={{ width: responsiveWidth(6), height: responsiveHeight(3) }}
                source={SEARCH_ADD_ICON}
              />
            </View>
            <TextInput
              value={searchQuery}
              onChangeText={text => {
                setSearchQuery(text);
                filterUserData();
              }}
              placeholder="Search"
              placeholderTextColor={'#393939'}
              style={{ color: '#000', width: 240 }}
            />
          </View>
        </View>

        <View
          style={{
            paddingTop: responsiveWidth(5),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {showTextUser ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: height / 2,
              }}>
              <Text
                style={{
                  color: PrimaryColor,
                  fontSize: responsiveFontSize(3.5),
                  fontFamily: PassionOne_Regular.passionOne,
                }}>
                No Data Found
              </Text>
            </View>
          ) : null}

          {
            <FlatList
              scrollEnabled={true}
              contentContainerStyle={{ paddingBottom: 140 }}
              data={searchQuery ? filteredData : responseUsers}
              keyExtractor={(item, index) => index.toString()}
              onRefresh={onRefresh}
              refreshing={isRefreshing}
              renderItem={({ item, index }) => (
                <AddFriendUsers
                  key={index}
                  profileimage={FIRST_PROFILE}
                  username={item?.username}
                  userid={item?._id}
                  userchoice="Follow"
                  isFollowing={item?.isFollowing}
                />
              )}
              //   ListFooterComponent={() => {
              //     if (handleLoadMoreFriends) {
              //       return (
              //         <View
              //           style={{
              //             justifyContent: 'center',
              //             alignItems: 'center',
              //             height: height / 8,
              //           }}>
              //           <ActivityIndicator size={24} color={PrimaryColor} />
              //         </View>
              //       );
              //     }
              //     return null;
              //   }}
              onEndReached={() => {
                handleLoadMore();
              }}
              onEndReachedThreshold={0.3}
            />
          }
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  first_container: {
    paddingTop: responsiveWidth(6),
    paddingVertical: moderateVerticalScale(12),
    flexDirection: 'row',
    marginLeft: 'auto',
    width: responsiveWidth(95),
    alignItems: 'center',
  },
  back_button: {
    borderRadius: 10,
    width: responsiveWidth(12.9),
    height: responsiveHeight(6.3),
    backgroundColor: '#395E66',
    justifyContent: 'center',
    alignItems: 'center',
  },
  left_arrow: {
    width: responsiveWidth(5),
    height: responsiveHeight(2.5),
    resizeMode: 'center',
  },
  categories_text_container: {
    paddingHorizontal: moderateScale(20),
  },
  categories_text: {
    color: '#E44173',
    fontSize: responsiveFontSize(2.4),
    fontWeight: '600',
    letterSpacing: 0.36,
  },
  text_Input_container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: moderateVerticalScale(2),
  },
  text_input_child: {
    flexDirection: 'row',
    width: responsiveWidth(90),
  },
  input_field: {
    paddingLeft: 30,
    width: responsiveWidth(70),
    backgroundColor: '#FFF',
    color: '#000',
    borderRadius: 50,
  },
  add_button: {
    borderRadius: 50,
    width: responsiveWidth(21.5),
    height: responsiveHeight(7),
    backgroundColor: '#395E66',
    justifyContent: 'center',
    alignItems: 'center',
  },
  add_text: {
    fontSize: responsiveFontSize(1.9),
    color: '#FFF',
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: -0.2,
  },
});

export default AddFiends;
