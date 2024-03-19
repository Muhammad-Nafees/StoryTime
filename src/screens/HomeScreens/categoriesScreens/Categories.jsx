// imports libraries

import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {
  PrimaryColor,
  TextColorGreen,
  pinkColor,
} from '../../Styles/Style';
import {
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from '../../../assets/Imagepaths';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

// imports components
import StoryUsers from '../../../components/categories/StoryUsers';
import BackButton from '../../../components/reusable-components/addplayer/customBackButton/BackButton';
import MainInputField from '../../../components/MainInputField';
import SearchField from '../../../components/SearchField';
import {
  get_Categories_Sub_Categories,
  get_Random,
} from '../../../../services/api/categories';
import { setCategoriesId } from '../../../../store/slices/categoriesSlice/categoriesSlice';
import { addFriends_api } from '../../../../services/api/add-members';
import { addFriends, setFriendId } from '../../../../store/slices/categoriesSlice/categoriesSlice';
import { Inter_Regular, PassionOne_Regular } from '../../../constants/GlobalFonts';
import Typography from '../../../components/Typography';
import LinearGradient from 'react-native-linear-gradient';
import BlurViewGuest from '../../../components/categories/guestCategories/BlurViewGuest';
import ShowAddedPlayers from '../../../components/categories/ShowAddedPlayers';
import CustomLoader from '../../../components/reusable-components/customLoader/CustomLoader';
import GuestNumber from '../../../components/categories/guestCategories/GuestNumber';
import Toast from 'react-native-toast-message';

const Categories = () => {
  //destructures
  const { SPLASH_SCREEN_IMAGE, LUDO_ICON } = Img_Paths;
  //hooks
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { bottom } = useSafeAreaInsets();
  //redux states
  const { user } = useSelector(state => state?.authSlice);
  const USER = user?.data?.user || user?.data;
  //states
  const [isLoading, setIsLoading] = useState(false);
  const [responseCategories, setResponseCategories] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [HasMorePages, setHasMorePages] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isUsernameInputValue, setIsUsernameInputValue] = useState('');
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(''); //for guest search only
  //refs
  const guestNumberRef = useRef(null);
  //consts
  const isUserGuest = useMemo(() => !user, [user]);

  const allowedCategories = ['Animals'];
  const guestNumber = guestNumberRef.current;
  const randomObject = {
    namerandom: 'Random',
    backgroundColor: 'EE5F8A',
    imageludo: LUDO_ICON,
  };

  const DATA = useMemo(() => {
    if (!!searchTerm) {
      const filtered = responseCategories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      return filtered?.length > 0 ? [...filtered, randomObject] : [];
    }
    return responseCategories?.length > 0
      ? [...responseCategories, randomObject]
      : [];
  }, [responseCategories, searchTerm]);

  //Effects
  useEffect(() => {
    fetchCategories(1);
  }, []);

  useFocusEffect(
    useCallback(() => {
      dispatch(setFriendId(USER?._id));
    }, [])
  );

  useEffect(() => {
    if (!guestNumberRef.current) {
      const guestNumber = generateRandomNumber(4);
      guestNumberRef.current = guestNumber;
    }
  }, []);

  //functions
  const fetchCategoriesUntilFound = async searchTerm => {
    let page = 1;
    let found = false;
    let array = [];

    try {
      while (!found) {
        const response = await get_Categories_Sub_Categories({ page });

        if (response.data && response.data.categories) {
          const responseArray = response.data.categories;
          // console.log("responseArray-", responseArray)
          array = [...array, ...responseArray];
          const filteredCategories = responseArray.filter(category =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase()),
          );
          console.log('filter', filteredCategories);

          if (filteredCategories.length > 0) {
            array = array.filter(
              el => !el?.name.toLowerCase().includes(searchTerm.toLowerCase()),
            );
            setResponseCategories([filteredCategories?.[0], ...array]);
            setIsLoading(false);
            found = true;
          } else if (responseArray.length > 0) {
            page++;
          } else {
            break;
          }
        } else {
          // Handle the case where the response structure is unexpected
          console.error('Unexpected API response format:', response);
          break;
        }
      };
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };


  const addFriends_api_handler = async () => {
    try {
      const responseData = await addFriends_api();
      const usernameObj = responseData?.data?.users?.find(
        item => item.username === isUsernameInputValue,
      );
      if (usernameObj) {
        const userid = usernameObj._id;
        const username = usernameObj?.username;
        console.log('username----', username);
        dispatch(addFriends({ username, userid }));
        setIsUsernameInputValue('');
      } else if (isUsernameInputValue?.length == 0) {
        navigation.navigate("AddPlayers");
      } else {
        Toast.show({
          type: 'error',
          text1: 'Friends Not Found',
        });
      }
      return responseData;
    } catch (error) {
      console.log(error, "ERROR FROM FRIENDS CATEGORIES");
    }
  };

  const fetchCategories = async (page = 1) => {
    try {
      setIsLoading(true);
      if (isUserGuest) {
        fetchCategoriesUntilFound('animals');
        return;
      };
      const response = await get_Categories_Sub_Categories({ page: page });
      const valObj = [
        '#56B6A4',
        '#79905C',
        '#C79861',
        '#C453D7',
        '#82BED1',
        '#C07632',
        '#56C488',
        '#D18282',
        '#A4C857',
        '#974444',
        '#8482D1',
        '#C45E89',
      ];
      for (let i = 0; i < response?.data?.categories?.length; i++) {
        const colorIndex = i % valObj.length;
        response.data.categories[i].background = valObj[colorIndex];
      };

      setResponseCategories(prevData => [
        ...prevData,
        ...response?.data?.categories,
      ]);

      setIsLoading(false);
      setHasMorePages(response?.data?.pagination?.hasNextPage);
      setIsRefreshing(false);
      return response;
    } catch (error) {
      console.log(error?.response?.data, "ERROR FROM FETCH_CATEGORIES API");
    }
  };

  const handleRandomClick = async () => {
    try {
      let randomCatName =
        allowedCategories[Math.floor(Math.random() * allowedCategories.length)];
      const filteredCategory = responseCategories.find(category =>
        category.name.includes(randomCatName),
      );
      const response = isUserGuest ? filteredCategory : await get_Random();

      navigation.navigate('SubCategories', {
        id: isUserGuest ? response?.data?._id : response?.data?.data?._id,
        name: isUserGuest ? response?.data?.name : response?.data?.data?.name,
      });

      return response;
    } catch (error) {
      console.log(error?.response?.data, "ERROR FROM RANDOM_API")
    }
  };

  const handleStoryUser = (id, name) => {
    dispatch(setCategoriesId(id));
    navigation.navigate('SubCategories', {
      id: id,
      name: name,
      guestNumber: guestNumber,
    });
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    setResponseCategories([]);
    fetchCategories(1);
    setPage(1);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleLoadMore = async () => {
    if (isLoading) {
      return;
    }
    if (HasMorePages) {
      fetchCategories(page + 1);
      setPage(prevPage => prevPage + 1);
      setIsLoadMore(true);
    } else {
      setIsLoadMore(false);
      setIsLoadMore(false);
    }
  };

  const isCategoryBlurred = category => {
    return category?.name !== 'Animals' && isUserGuest;
  };

  const generateRandomNumber = numDigits => {
    const min = Math.pow(10, numDigits - 1);
    const max = Math.pow(10, numDigits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const keyExtractor = (_, index) => `categories.${index}`;

  const renderItem = ({ item }) => {
    return (
      <View
        key={item?.id}
        style={{
          backgroundColor:
            item?.namerandom == 'Random' ? '#E44173' : TextColorGreen,
          width: responsiveWidth(30),
          borderRadius: 10,
          height: responsiveHeight(18.5),
          alignItems: 'center',
          margin: responsiveWidth(1.2),
          borderWidth: 3,
          borderColor:
            item?.namerandom === 'Random' ? 'rgba(238, 95, 138, 1)' : '#5797A5',
        }}>
        <StoryUsers
          onPress={() => handleStoryUser(item?.id, item?.name)}
          images={item?.image}
          text={item?.name}
          item={item}
          handleRandomClick={handleRandomClick}
          mainbgColor={TextColorGreen}
        />
        {!!isCategoryBlurred(item) && item?.namerandom !== 'Random' && (
          <BlurViewGuest
          />
        )}
      </View>
    );
  };

  const renderListFooterComponent = () => {
    if (isLoading || DATA.length === 0) {
      return <></>
    }
    if (isLoadMore) {
      return (
        <CustomLoader />
      );
    }
  };

  const renderListEmptyComponent = () => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {isRefreshing ? (
          <></>
        ) : isLoading ? (
          <ActivityIndicator size={40} color={PrimaryColor} />
        ) : (
          <Typography ff={PassionOne_Regular.passionOne} size={responsiveFontSize(2.6)} clr={PrimaryColor}>No Data Found!</Typography>
        )}
      </View>
    );
  }

  return (

    <LinearGradient
      colors={["#75BDCD", "#FFB5CB",]}
      start={{ x: 1.5, y: 1 }} end={{ x: 1, y: 0 }} locations={[0, 1,]}
      style={[styles.container, { backgroundColor: pinkColor }]}>
      <ImageBackground style={styles.container} source={SPLASH_SCREEN_IMAGE}>
        <SafeAreaView style={styles.container}>
          <View style={{ flexDirection: 'row', justifyContent: "space-between", marginHorizontal: responsiveWidth(5), marginBottom: moderateVerticalScale(10) }}>
            <View style={styles.first_container}>
              <BackButton onPress={() => navigation.goBack()} />
              <View style={styles.categories_text_container}>
                <Text style={styles.categories_text}>Categories</Text>
              </View>
            </View>

            {isUserGuest && (
              <GuestNumber
                guestNumber={guestNumber}
              />
            )}
          </View>

          {/* MainInputField----- */}

          {user ?
            (<>
              {/* textinputField */}
              <MainInputField
                onPress={addFriends_api_handler}
                inputValue={isUsernameInputValue}
                OnchangeText={setIsUsernameInputValue}
                placeholder="Username" />
              {/* added players */}
              <ShowAddedPlayers />
            </>
            ) : (
              <SearchField
                placeholder="Search"
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            )}
          <FlatList
            data={DATA}
            scrollsToTop
            scrollEnabled
            numColumns={3}
            nestedScrollEnabled
            onRefresh={onRefresh}
            renderItem={renderItem}
            refreshing={isRefreshing}
            keyExtractor={keyExtractor}
            onEndReachedThreshold={0.3}
            onEndReached={handleLoadMore}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: bottom + 30,
              paddingHorizontal: moderateScale(4),
            }}
            ListEmptyComponent={renderListEmptyComponent}
            ListFooterComponent={renderListFooterComponent}
          />
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>

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
    fontWeight: '800',
    letterSpacing: 0.36,
    fontFamily: Inter_Regular.Inter_Regular

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
  text: {
    fontSize: 10,
    color: 'black',
    textAlign: 'center',
    fontFamily: Inter_Regular.Inter_Regular,
  },
});

export default Categories;
