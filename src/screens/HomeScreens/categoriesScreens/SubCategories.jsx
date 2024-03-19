// imports libraries
import React, { useEffect, useState, useMemo } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useDispatch, useSelector } from 'react-redux';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// imports components
import { Img_Paths } from '../../../assets/Imagepaths';
import StoryUsers from '../../../components/categories/StoryUsers';
import BackButton from '../../../components/reusable-components/addplayer/customBackButton/BackButton';
import MainInputField from '../../../components/MainInputField';
import SearchField from '../../../components/SearchField';
import {
  setSubCategoriesId,
} from '../../../../store/slices/categoriesSlice/categoriesSlice';
import {
  get_Categories_Sub_Categories,
  get_Random,
} from '../../../../services/api/categories';
import {
  randomNames,
  setStoryUserImage,
} from '../../../../store/slices/categoriesSlice/categoriesSlice';
import Toast from 'react-native-toast-message';
import { Inter_Regular, PassionOne_Regular } from '../../../constants/GlobalFonts';
import { URL } from '../../../constants/Constant';
import Typography from '../../../components/Typography';
import LinearGradient from 'react-native-linear-gradient';
import BlurViewGuest from '../../../components/categories/guestCategories/BlurViewGuest';
import CustomLoader from '../../../components/reusable-components/customLoader/CustomLoader';
import GuestNumber from '../../../components/categories/guestCategories/GuestNumber';
import ShowAddedPlayers from '../../../components/categories/ShowAddedPlayers';

const SubCategories = ({ route }) => {
  //destructures
  const { id, name, guestNumber } = route?.params || {};
  const { SPLASH_SCREEN_IMAGE } = Img_Paths;
  const { LUDO_ICON } = Img_Paths;

  //hooks
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { bottom } = useSafeAreaInsets();

  //redux states
  const { user } = useSelector(state => state?.authSlice);

  //states
  const [responsesubCategories, setResponseSubCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [HasMorePages, setHasMorePages] = useState(false);
  const [isUsernameInputValue, setIsUsernameInputValue] = useState('');
  const [isLoadMore, setIsLodeMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); //for guest search only

  //consts
  const isUserGuest = useMemo(() => !user, [user]);
  const allowedCategories = ['Shark', 'Whale', 'Cow'];
  const randomObject = {
    namerandom: 'Random',
    backgroundColor: 'EE5F8A',
    imageludo: LUDO_ICON,
  };

  const DATA = useMemo(() => {
    if (!!searchTerm) {
      const filtered = responsesubCategories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      return filtered;
    }
    return responsesubCategories?.length > 0
      ? [...responsesubCategories, randomObject]
      : [];
  }, [responsesubCategories, searchTerm]);

  //Effects
  useEffect(() => {
    fetchSubcategories(1);
  }, []);

  //functions

  const fetchSubcategories = async (page = 1) => {
    try {
      setIsLoading(true);
      const response = await get_Categories_Sub_Categories({
        page2: page,
        id: id,
      });
      setHasMorePages(response?.data?.pagination?.hasNextPage);
      setResponseSubCategories(prevValue => [
        ...prevValue,
        ...response?.data?.categories,
      ]);
      setIsLoading(false);
      return response;
    } catch (error) {
      console.log(error?.response?.data, "ERROR FROM CATEGORIES");
    }
  };

  const handleRandomSub_category = async () => {
    try {
      let randomSubName = allowedCategories[Math.floor(Math.random() * allowedCategories.length)];

      const filteredSubcategory = responsesubCategories.find(category =>
        category.name.includes(randomSubName),
      );
      const response = user ? await get_Random(id) : filteredSubcategory;
      console.log(response?.data, "RESOPNSE FROM SUBCATEGORY RANDOM")
      const imageLink = user
        ? URL + response?.data?.data?.image
        : URL + response?.data?.image;

      dispatch(randomNames(user ? response?.data?.data?.name : response?.data?.name));
      dispatch(setStoryUserImage(imageLink));
      console.log("responseName RANDOM", response?.data?.data?.name);
      console.log("responseIMAGE RANDOAM IMAGE", response?.data?.data?.image);
      user
        ? navigation.navigate("Sequence")
        : navigation.navigate("SelectGamePoint");
      return response;
    } catch (error) {
      console.log(error?.response?.data, "ERROR FROM SUB-RANDOM");
    }
  };

  const handleStoryUser = (id, name, image) => {
    const imageLink = URL + image;
    user
      ? navigation.navigate("Sequence")
      : navigation.navigate("FirstScreenPlayFlow");
    dispatch(randomNames(name));
    dispatch(setStoryUserImage(imageLink));
    dispatch(setSubCategoriesId(id));
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    setResponseSubCategories([]);
    fetchSubcategories(1);
    setPage(1);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }

  const handleLoadMore = async () => {
    if (isLoading) {
      return;
    }
    if (HasMorePages) {
      fetchSubcategories(page + 1);
      setPage(prevPage => prevPage + 1);
      setIsLodeMore(true);
    } else {
      setIsLoading(false);
      setIsLodeMore(false);
    }
  };

  const isCategoryBlurred = category => {
    return !allowedCategories.includes(category?.name) && isUserGuest;
  };

  const keyExtractor = (_, index) => `sub_categories.${index}`;

  //render functions

  const renderItem = ({ item }) => {
    return (
      <>
        <StoryUsers
          onPress={() => handleStoryUser(item?._id, item?.name, item?.image)}
          images={item?.image}
          text={item?.name}
          item={item}
          mainbgColor={TextColorGreen}
          backgroundColor={isUserGuest ? "#497780" : name !== "Animals" ? "#497780" : "#56B6A4"}
          handleRandomClick={() => handleRandomSub_category(item)}
        />
        {!!isCategoryBlurred(item) && item?.namerandom !== 'Random' && (
          <BlurViewGuest />
        )}
      </>
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
  };


  return (
    <LinearGradient
      colors={["#75BDCD", "#FFB5CB",]}
      start={{ x: 1.5, y: 1 }} end={{ x: 1, y: 0 }} locations={[0, 1,]}
      style={[styles.container, { backgroundColor: pinkColor }]}>
      <ImageBackground style={styles.container} source={SPLASH_SCREEN_IMAGE}>
        <SafeAreaView style={styles.container}>

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
            {isUserGuest && (
              <GuestNumber
                guestNumber={guestNumber}
              />
            )}
          </View>

          {/* MainnputField----------*/}

          {user ? (
            <>
              <MainInputField
                inputValue={isUsernameInputValue}
                OnchangeText={setIsUsernameInputValue}
                setUsernameInput={setIsUsernameInputValue}
                placeholder="Username"
              />
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
          <Toast />
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

export default SubCategories;
