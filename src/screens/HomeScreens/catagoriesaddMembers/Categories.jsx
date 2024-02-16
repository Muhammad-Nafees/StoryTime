import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import {
  get_Categories_Sub_Categories,
  get_Random,
} from '../../../../services/api/categories';
import RandomCategories from '../../../components/customCategories/RandomCategories';
import { get_random } from '../../../../store/slices/randomCategorySlice';
import { setCategoriesId } from '../../../../store/slices/getCategoriesSlice';

const Categories = () => {
  const { width, height } = Dimensions.get('window');
  const { SPLASH_SCREEN_IMAGE, LOCATION_ICON, LUDO_ICON } = Img_Paths;
  const randomRes = useSelector(state => state?.randomCategory?.data);
  const loadingrandom = useSelector(state => state?.randomCategory?.loading);
  const [isRandom, setIsRandom] = useState(false);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [responseCategories, setResponseCategories] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [HasMorePages, setHasMorePages] = useState(false);
  const [responseRandom, setResponseRandom] = useState('');
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [randomName, setRandomName] = useState('');
  const [randomId, setRandomId] = useState('');
  const [isTriggered, setIsTriggered] = useState(false);
  const [page, setPage] = useState(1);
  const addUsersGame = useSelector(state => state.addPlayers.addFriends);
  const isFocused = useIsFocused()
  // Get Categories Api ----------

  useEffect(() => {

    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await get_Categories_Sub_Categories({ page: page });
        // const categoriesData = response?.data?.categories
        setIsLoading(false);
        setHasMorePages(response?.data?.pagination?.hasNextPage)
        setResponseCategories(prevData => [...prevData, ...response?.data?.categories]);

        // if (categoriesData) {
        // }

        setIsRefreshing(false);
        return response;
      } catch (error) {
        console.log('error---', error);
      }
      finally {
        setIsLoading(false);
      }
    }
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
      setRandomId(response?.data?._id);
      setRandomName(response?.data?.name);
      return response;
    } catch (error) { }
  };



  const handleStoryUser = (id, name) => {
    console.log("id----", id);
    dispatch(setCategoriesId(id))
    navigation.navigate('SubCategories', { id: id, name: name });
  };

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    setPage(1);
    setResponseCategories([])
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, []);


  const handleLoadMore = async () => {
    console.log("HasMorePages=====", HasMorePages)
    if (isLoading) {
      return;
    }
    if (HasMorePages) {
      setPage((prevPage) => prevPage + 1);
      setIsLoadMore(true);
    } else {
      setIsLoadMore(false);
    }
  };



  // useFocusEffect(
  //   useCallback(() => {
  //     setPage(1)
  //   }, [])
  // )


  console.log("pages-------------------", page)

  return (
    <ImageBackground style={styles.container} source={SPLASH_SCREEN_IMAGE}>
      {/* <ScrollView> */}
      {/* Frame Content Close----------- */}

      <View style={styles.first_container}>
        <BackButton onPress={() => navigation.goBack()} />
        <View style={styles.categories_text_container}>
          <Text style={styles.categories_text}>Categories</Text>
        </View>
      </View>

      {/* IMainnputField-----*/}
      <MainInputField placeholder="Username" />
      {/* MainInputField----- */}

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
                }}>{`@${item.username}`}</Text>
            </View>
          ))}
        </View>
      </View>

      <View
        style={{
          // flexDirection: 'row',
          // flexWrap: 'wrap',
          justifyContent: 'flex-start',
          // alignItems: 'flex-start',
          paddingHorizontal: moderateScale(4),
          backgroundColor: "orange"
        }}>
        {
          !isLoading ?
            <FlatList
              data={responseCategories}
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
                    backgroundColor: TextColorGreen,
                    width: responsiveWidth(30),
                    borderRadius: 10,
                    height: responsiveHeight(18.5),
                    alignItems: 'center',
                    margin: responsiveWidth(1.2),
                    borderWidth: 3,
                    borderColor: "#5797A5",
                  }}>
                  <StoryUsers
                    onPress={() => handleStoryUser(item?.id, item?.name)}
                    images={item?.image}
                    text={item?.name}
                    mainbgColor={TextColorGreen}
                    backgroundColor="rgba(199, 152, 97, 1)"
                  />
                </View>
              )}
              ListFooterComponent={() => (
                <View style={{ alignItems: 'center', paddingBottom: moderateVerticalScale(10) }}>
                  <TouchableOpacity
                    onPress={() => handleRandomClick()}
                    style={{
                      backgroundColor: '#E44173',
                      width: responsiveWidth(29),
                      borderRadius: 10,
                      height: responsiveHeight(18.5),
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        marginVertical: moderateVerticalScale(10),
                        borderRadius: 10,
                        width: responsiveWidth(25),
                        height: responsiveHeight(11),
                        backgroundColor: '#EE5F8A',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{
                          width: responsiveWidth(16),
                          height: responsiveHeight(8),
                          resizeMode: 'center',
                        }}
                        source={LUDO_ICON}
                      />
                    </View>
                    <Text
                      style={{
                        color: '#FFF',
                        fontWeight: '700',
                        fontSize: responsiveFontSize(1.9),
                      }}>
                      Random
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              onEndReached={() => handleLoadMore()}
              onEndReachedThreshold={0.3}
            />
            :
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size={40} color={'#000'} />
            </View>
        }

      </View>

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
});

export default Categories;
