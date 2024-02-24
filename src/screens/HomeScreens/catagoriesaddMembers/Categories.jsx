import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
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
import {
  PrimaryColor,
  SecondaryColor,
  TextColorGreen,
  ThirdColor,
  pinkColor,
} from '../../Styles/Style';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from '../../../assets/Imagepaths';
import NavigationsString from '../../../constants/NavigationsString';
import StoryUsers from '../../../components/StoryUsers';
import BackButton from '../../../components/BackButton';
import MainInputField from '../../../components/MainInputField';
import SearchField from '../../../components/SearchField';
import { useDispatch, useSelector } from 'react-redux';
import {
  get_Categories_Sub_Categories,
  get_Random,
} from '../../../../services/api/categories';
import RandomCategories from '../../../components/customCategories/RandomCategories';
import { get_random } from '../../../../store/slices/randomCategorySlice';
import { setCategoriesId } from '../../../../store/slices/getCategoriesSlice';
import { addFriends_api } from '../../../../services/api/add-members';
import { addFriends } from '../../../../store/slices/addplayers/addPlayersSlice';
import Toast from 'react-native-toast-message';
import { Inter_Regular } from '../../../constants/GlobalFonts';
import { BlurView } from '@react-native-community/blur';
import SvgIcons from '../../../components/svgIcon/svgIcons';

const Categories = () => {
  const { width, height } = Dimensions.get('window');
  const { SPLASH_SCREEN_IMAGE, LOCATION_ICON, LUDO_ICON } = Img_Paths;
  const randomRes = useSelector(state => state?.randomCategory?.data);
  const loadingrandom = useSelector(state => state?.randomCategory?.loading);
  const [isRandom, setIsRandom] = useState(false);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [responseCategories, setResponseCategories] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [HasMorePages, setHasMorePages] = useState(false);
  const [responseRandom, setResponseRandom] = useState('');
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [randomName, setRandomName] = useState('');
  const [randomId, setRandomId] = useState('');
  const [ResponseapiCategories, setResponseapiCategories] = useState([]);
  const [isTriggered, setIsTriggered] = useState(false);
  const [isUsernameInputValue, setIsUsernameInputValue] = useState("");
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(''); //for guest search only
  const addUsersGame = useSelector(state => state.addPlayers.addFriends);
  const { user } = useSelector(state => state?.authSlice);

  const dispatch = useDispatch();
  const { ADD_PLAYERS } = NavigationsString;

  // console.log("responseLogin===", )
  const DATA = useMemo(() => {
    if (!!searchTerm) {
      const filtered = responseCategories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return filtered
    }
    return responseCategories
  }, [responseCategories, searchTerm])


  const fetchCategoriesUntilFound = async searchTerm => {
    let page = 1;
    let found = false;
    let array = [];

    try {
      while (!found) {
        const response = await get_Categories_Sub_Categories({ page });

        if (response.data && response.data.categories) {
          const responseArray = response.data.categories;
          array = [...array, ...responseArray]

          const filteredCategories = responseArray.filter(category =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase()),
          );
          console.log('filter', filteredCategories);

          if (filteredCategories.length > 0) {
            array = array.filter(el => !el?.name.toLowerCase().includes(searchTerm.toLowerCase()))
            setResponseCategories([filteredCategories?.[0], ...array]);
            setIsLoading(false);
            found = true;
          } else if (responseArray.length > 0) {
            page++;
          } else {
            // No more data available
            break;
          }
        } else {
          // Handle the case where the response structure is unexpected
          console.error('Unexpected API response format:', response);
          break;
        }
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }

    return array;
  };


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

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
        if (!user) {
          console.log("load",isLoading)
          fetchCategoriesUntilFound('animals');
          return;
        }    
     const response = await get_Categories_Sub_Categories({ page: page });
      // const categoriesData = response?.data?.categories
      setIsLoading(false);
      setHasMorePages(response?.data?.pagination?.hasNextPage)
      setResponseCategories(prevData => [...prevData, ...response?.data?.categories]);
      setIsRefreshing(false);
      return response;
    } catch (error) {
      console.log('error---', error);
    }
    finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchUsers();
  }, [page])

  const handleRandomClick = async () => {
    try {
      const response = await get_Random();
      console.log('res', response.data);
      navigation.navigate('SubCategories', {
        id: response?.data?._id,
        name: response?.data?.name,
      });
      console.log("response_id", response?.data?._id)
      console.log("Random Clicked Category")
      setRandomId(response?.data?._id);
      setRandomName(response?.data?.name);
      return response;
    } catch (error) { }
  };

  const handleStoryUser = (id, name) => {
    console.log("id----", id);
    dispatch(setCategoriesId(id))
    navigation.navigate('SubCategories', { id: id, name: name, guestNumber: guestNumber });
  };

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    setPage(1);
    setResponseCategories([]) //BUGGY LINE //COMMENTED OUT
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, []);



  const handleLoadMore = async () => {
    // console.log("HasMorePages=====", HasMorePages)
    if (isLoading) {
      return;
    }
    if (HasMorePages) {
      setPage((prevPage) => prevPage + 1);
      setIsLoadMore(true);
    } else {
      setIsLoadMore(false);
      setIsLoadMore(false);
    }
  };

  console.log("USERNAME--TEXT===", isUsernameInputValue)
  console.log("pages-------------------", page)

  const isCategoryBlurred = (category) => {
    return category?.name !== 'Animals' && !user
  };

  const generateRandomNumber = useMemo(() => {
    return (numDigits) => {
      const min = Math.pow(10, numDigits - 1);
      const max = Math.pow(10, numDigits) - 1;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
  }, []);

  const guestNumberRef = useRef(null);

  useEffect(() => {
    if (!guestNumberRef.current) {
      const guestNumber = generateRandomNumber(4);
      guestNumberRef.current = guestNumber;
    }
  }, [generateRandomNumber]);
  const guestNumber = guestNumberRef.current;

  const randomObject = {
    namerandom: "Random",
    backgroundColor: "EE5F8A",
    imageludo: LUDO_ICON,
  }

  return (
    <ImageBackground style={styles.container} source={SPLASH_SCREEN_IMAGE}>
      {/* <ScrollView> */}
      {/* Frame Content Close----------- */}

      <View style={{ flexDirection: 'row', justifyContent: "space-between", marginHorizontal: responsiveWidth(5), marginBottom: moderateVerticalScale(10) }}>
        <View style={styles.first_container}>

          <BackButton onPress={() => navigation.goBack()} />
          <View style={styles.categories_text_container}>
            <Text style={styles.categories_text}>Categories</Text>
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

      {/* IMainnputField-----*/}
      {/* MainInputField----- */}

      {user ?
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
              <View>
                <Text
                  style={{
                    color: '#393939',
                    fontWeight: '600',
                    textAlign: 'center',
                    fontSize: responsiveHeight(1.9),
                    fontFamily: Inter_Regular.Inter_Regular
                  }}>
                  Players:
                </Text>
              </View>

              {addUsersGame?.map((item, index) => (
                <View
                  style={{
                    margin: 4,
                    backgroundColor: '#395E66',
                    paddingHorizontal: moderateScale(14),
                    paddingVertical: moderateVerticalScale(4.5),
                    borderRadius: 40,
                  }}>
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: responsiveFontSize(1.9),
                      fontFamily: Inter_Regular.Inter_Regular
                    }}>{`@${item.username}`}</Text>
                </View>
              ))}
            </View>
          </View></> :
        <SearchField placeholder="Search" searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      }
      <View
        style={{
          // flexDirection: 'row',
          // flexWrap: 'wrap',
          justifyContent: 'flex-start',
          // alignItems: 'flex-start', 
          paddingHorizontal: moderateScale(4),
          // backgroundColor: "orange",
        }}
      >
      {DATA.length > 0 ?
        <FlatList
          data={[...DATA, randomObject]}
          scrollEnabled={true}
          numColumns={3}
          nestedScrollEnabled
          scrollsToTop
          contentContainerStyle={{ paddingBottom: 200 }}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          renderItem={({ item, index }) => (
            <View
              key={item?.id}
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
                onPress={() => handleStoryUser(item?.id, item?.name)}
                images={item?.image}
                text={item?.name}
                item={item}
                handleRandomClick={handleRandomClick}
                mainbgColor={TextColorGreen}
                backgroundColor="rgba(199, 152, 97, 1)"
              />

              {!!isCategoryBlurred(item) && item?.namerandom !== "Random" &&
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
          onEndReached={() => handleLoadMore()}
          onEndReachedThreshold={0.3}
        />: 
        <View style={{ alignItems: 'center', height: height / 4 }}>
        <ActivityIndicator size={40} color={'#000'} />
        </View>
      }   
      </View>
      <Toast />
      {/* <RandomCategories
                    responseRandom={responseRandom}
                /> */}
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

export default Categories;

// {!isLoading && (
//   <View style={{
//     //  backgroundColor: "red",
//     alignItems: 'center',
//     paddingBottom: moderateVerticalScale(10)
//   }}>
//     <TouchableOpacity
//       onPress={() => handleRandomClick()}
//       style={{
//         backgroundColor: '#E44173',
//         width: responsiveWidth(29),
//         borderRadius: 10,
//         height: responsiveHeight(18.5),
//         alignItems: 'center',
//       }}>
//       <View
//         style={{
//           marginVertical: moderateVerticalScale(10),
//           borderRadius: 10,
//           width: responsiveWidth(25),
//           height: responsiveHeight(11),
//           backgroundColor: '#EE5F8A',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}>
//         <Image
//           style={{
//             width: responsiveWidth(16),
//             height: responsiveHeight(8),
//             resizeMode: 'center',
//           }}
//           source={LUDO_ICON}
//         />
//       </View>
//       <Text
//         style={{
//           color: '#FFF',
//           fontWeight: '700',
//           fontSize: responsiveFontSize(1.9),
//         }}>
//         Random
//       </Text>
//     </TouchableOpacity>
//   </View>
// )}


