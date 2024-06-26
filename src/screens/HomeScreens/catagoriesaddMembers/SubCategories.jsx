import React, { useCallback, useEffect, useState, useMemo } from 'react';
import {
  Dimensions,
  Image,
  BackHandler,
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
import {
  PrimaryColor,
  SecondaryColor,
  TextColorGreen,
  ThirdColor,
  pinkColor,
} from '../../Styles/Style';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import FrameContent from '../../../components/FrameContent';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from '../../../assets/Imagepaths';
import NavigationsString from '../../../constants/NavigationsString';
import StoryUsers from '../../../components/StoryUsers';
import BackButton from '../../../components/BackButton';
import MainInputField from '../../../components/MainInputField';
import SearchField from '../../../components/SearchField';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, setSubCategoriesId } from '../../../../store/slices/getCategoriesSlice';
import {
  get_Categories_Sub_Categories,
  get_Random,
} from '../../../../services/api/categories';
import { addFriends, randomNames, setStoryUserImage } from '../../../../store/slices/addplayers/addPlayersSlice';
import { addFriends_api } from '../../../../services/api/add-members';
import Toast from 'react-native-toast-message';
import { BlurView } from '@react-native-community/blur';
import SvgIcons from '../../../components/svgIcon/svgIcons';
import { Inter_Regular } from '../../../constants/GlobalFonts';
import { URL } from '../../../constants/Constant'

const SubCategories = ({ route }) => {
  const { width, height } = Dimensions.get('window');
  const { SPLASH_SCREEN_IMAGE } = Img_Paths;

  const navigation = useNavigation();
  const id = route?.params?.id;
  const name = route?.params?.name;
  const guestNumber = route?.params?.guestNumber
  const { TEACHER_ICON, POLICE_ICON, FAMILY_ICON, LUDO_ICON } = Img_Paths;
  const { PLAYER_SEQUENCE, FIRSTSCREENPLAYFLOW, ADD_PLAYERS } = NavigationsString;
  const addUsersGame = useSelector(state => state.addPlayers.addFriends);
  const [isId, setIsId] = useState('');
  const [responsesubCategories, setResponseSubCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [HasMorePages, setHasMorePages] = useState(false);
  const [isTriggered, setIsTriggered] = useState(false);
  const [isUsernameInputValue, setIsUsernameInputValue] = useState("");
  const [responseRandomsub, setresponseRandomsub] = useState();
  const [isLoadMore, setIsLodeMore] = useState(false)
  const [searchTerm, setSearchTerm] = useState(''); //for guest search only
  const { user } = useSelector(state => state?.authSlice);
  const dispatch = useDispatch();
  // const {  } = NavigationsString;

  const allowedCategories = ['Shark', 'Whale', 'Cow'];
  const DATA = useMemo(() => {
    if (!!searchTerm) {
      const filtered = responsesubCategories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return filtered
    }
    return responsesubCategories
  }, [responsesubCategories, searchTerm])

  const addFriends_api_handler = async () => {
    try {
      const responseData = await addFriends_api();
      const usernameObj = responseData?.data?.users?.find((item) => item.username === isUsernameInputValue);
      console.log("usernameObj=====", usernameObj);
      if (usernameObj) {
        const userid = usernameObj._id;
        const username = usernameObj?.username;
        console.log("username----", username)
        dispatch(addFriends({ username, userid }));
        // Now you have the _id of the matched user, you can use it as needed.
        console.log("Matched User ID:", userid);
        setIsUsernameInputValue("");
      } else if (isUsernameInputValue?.length == 0) {
        navigation.navigate(ADD_PLAYERS)

      }
      else {
        Toast.show({
          type: "error",
          text1: "Friends Not Found"
        })
      }
      return responseData;
    } catch (error) {
      console.log("err", error)
    }
  };

  const fetchSubcategories = async () => {
    setIsLoading(true);
    try {
      const response = await get_Categories_Sub_Categories({ page2: page, id: id });
      setIsLoading(false);
      setHasMorePages(response?.data?.pagination?.hasNextPage)
      setResponseSubCategories((prevValue) => [...prevValue, ...response?.data?.categories]);
      return response;
    } catch (error) {
      console.log('error---', error);
    }
  };

  useEffect(() => {
    fetchSubcategories();
  }, [page]);


  const handleRandomSub_category = async (item) => {

    try {
      let randomSubName = allowedCategories[Math.floor(Math.random() * allowedCategories.length)]

      const filteredSubcategory = responsesubCategories.find(category =>
        category.name.includes(randomSubName)
      );

      const response = user ? await get_Random(id) : filteredSubcategory;
      console.log("response----", response)
      const imageLink = URL + response?.data?.image;
      dispatch(randomNames(user ? response?.data?.name : response?.name));
      user && dispatch(setStoryUserImage(imageLink));
      console.log("storyUserImage0-----", imageLink);
      // console.log(" response?.image-----", response?.image);
      user ? navigation.navigate(PLAYER_SEQUENCE) : navigation.navigate(FIRSTSCREENPLAYFLOW);

      return response;
    } catch (error) {
      console.log('error---', error);
    }
  };

  const handleStoryUser = (id, name, image) => {
    const imageLink = URL + image;
    user ? navigation.navigate(PLAYER_SEQUENCE) : navigation.navigate(FIRSTSCREENPLAYFLOW);
    dispatch(randomNames(name));
    dispatch(setStoryUserImage(imageLink))
    dispatch(setSubCategoriesId(id));
    console.log("subCategiryId", name)
  };

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    setPage(1);
    setResponseSubCategories([])
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, []);

  const handleLoadMore = async () => {
    if (isLoading) {
      return;
    }
    if (HasMorePages) {
      setPage((prevPage) => prevPage + 1);
      setIsLodeMore(true);
    } else {
      setIsLoading(false);
      setIsLodeMore(false);
    }
  };

  const isCategoryBlurred = category => {
    return !allowedCategories.includes(category?.name) && !user;
  };

  const randomObject = {
    namerandom: "Random",
    backgroundColor: "EE5F8A",
    imageludo: LUDO_ICON,
  };


  return (
    <ImageBackground style={styles.container} source={SPLASH_SCREEN_IMAGE}>
      {/* <ScrollView> */}
      {/* Things SubCategory */}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: responsiveWidth(5),
          marginBottom: moderateVerticalScale(10),
        }}>
        <View style={styles.first_container}>
          <BackButton onPress={() => navigation.goBack()} />
          <View style={styles.categories_text_container}>
            <Text style={styles.categories_text}>{name}</Text>
          </View>
        </View>
        {!user ?
          <View style={{ marginTop: moderateVerticalScale(10) }}>
            <View style={{ marginBottom: 'auto', marginTop: 'auto', marginLeft: 5 }}>
              <SvgIcons name={'Guest'} width={36} height={36} />
            </View>
            <Text style={styles.text}>Guest{guestNumber}</Text>
          </View> : <></>}
      </View>

      {/* MainnputField----------*/}

      {user ? (
        <>
          <MainInputField onPress={addFriends_api_handler} inputValue={isUsernameInputValue} OnchangeText={setIsUsernameInputValue} placeholder="Username" />
          <View
            style={{
              paddingVertical: moderateVerticalScale(6),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: responsiveWidth(90),
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}>
              <View style={{ marginHorizontal: moderateScale(10) }}>
                <Text
                  style={{
                    color: '#393939',
                    fontWeight: '500',
                    textAlign: 'center',
                  }}>
                  Players:
                </Text>
              </View>

              {addUsersGame?.map((item, index) => (
                <View key={index}
                  style={{ margin: 4, backgroundColor: '#395E66', paddingHorizontal: moderateScale(14), paddingVertical: moderateVerticalScale(4.5), borderRadius: 40, }}>
                  <Text style={{ color: '#FFF', fontSize: responsiveFontSize(1.9), }}>{`@${item.username}`}</Text>
                </View>
              ))}

            </View>
          </View>
        </>
      ) : (
        <SearchField placeholder="Search" searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      )}


      <View
        style={{
          justifyContent: 'flex-start',
          paddingHorizontal: moderateScale(4),
        }}>
        {DATA.length > 0 ?
          <FlatList
            data={[...DATA, randomObject]}
            // nestedScrollEnabled
            scrollEnabled={true}
            numColumns={3}
            contentContainerStyle={{ paddingBottom: 180 }}
            keyExtractor={(item, index) => index.toString()}
            onRefresh={onRefresh}
            refreshing={isRefreshing}
            renderItem={({ item, index }) => (
              <>
                <View key={item?.id}
                  style={{
                    backgroundColor: item?.namerandom == "Random" ? "#E44173" : TextColorGreen,
                    width: responsiveWidth(30),
                    borderRadius: 10,
                    height: responsiveHeight(18.5),
                    alignItems: 'center',
                    margin: responsiveWidth(1.2),
                    borderWidth: 3,
                    borderColor: item?.namerandom === "Random" ? "rgba(238, 95, 138, 1)" : "#5797A5",
                  }}>
                  <StoryUsers
                    onPress={() => handleStoryUser(item?._id, item?.name, item?.image)}
                    images={item?.image}
                    text={item?.name}
                    item={item}
                    mainbgColor={TextColorGreen}
                    backgroundColor="rgba(86, 182, 164, 1)"
                    handleRandomClick={() => handleRandomSub_category(item)}
                  />
                  {!!isCategoryBlurred(item) &&
                    item?.namerandom !== "Random" &&
                    <View style={styles.blur_wrapper}>
                      <BlurView
                        style={styles.blur_view}
                        blurAmount={10}
                        overlayColor='transparent'
                      >
                        <View style={styles.blur_content_container}>
                          <View style={{ position: 'absolute', left: 0, right: 0, justifyContent: 'center', alignItems: 'center', top: responsiveHeight(5) }}>
                            <SvgIcons name={'Lock'} width={47} height={47} />
                          </View>
                        </View>
                      </BlurView>
                    </View>
                  }

                </View>
              </>
            )}
            ListFooterComponent={() => (
              <>
                {isLoadMore && (
                  <View style={{ alignItems: 'center', height: height / 4 }}>
                    <ActivityIndicator size={40} color={'#000'} />
                  </View>
                )}
              </>
            )}

            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.3}
          // onEndReachedThreshold={0.3}
          /> : <View style={{ alignItems: 'center', height: height / 4 }}>
            <ActivityIndicator size={40} color={'#000'} />
          </View>
        }
      </View>
      <Toast />
      {/* </ScrollView> */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: pinkColor,
    width: '100%',
    height: '100%',
    flex: 1,
  },
  first_container: {
    paddingTop: responsiveWidth(6),
    paddingVertical: moderateVerticalScale(8),
    flexDirection: 'row',
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
    fontWeight: '500',
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
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    width: responsiveWidth(70),
    backgroundColor: '#FFF',
    color: '#000',
  },
  add_button: {
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
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
  blur_view: {
    flex: 1,
  },
  blur_wrapper: {
    position: 'absolute',
    width: responsiveWidth(30),
    height: responsiveHeight(18.5),
    borderRadius: 10,
    overflow: 'hidden',
  },
  blur_content_container: {
    backgroundColor: 'transparent', //this is a hacky solution fo bug in react native blur to wrap childrens in such a view
  },
  text: {
    fontSize: 10,
    color: 'black',
    textAlign: 'center',
    fontFamily: Inter_Regular.Inter_Regular
  },
});

export default SubCategories;
