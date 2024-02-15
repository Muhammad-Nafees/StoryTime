import React, {useCallback, useEffect, useMemo, useState,useRef} from 'react';
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
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import FrameContent from '../../../components/FrameContent';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {Img_Paths} from '../../../assets/Imagepaths';
import NavigationsString from '../../../constants/NavigationsString';
import StoryUsers from '../../../components/StoryUsers';
import BackButton from '../../../components/BackButton';
import MainInputField from '../../../components/MainInputField';
import SearchField from '../../../components/SearchField';

import {CategoriesData} from '../../../../dummyData/DummyData';
import {useDispatch, useSelector} from 'react-redux';
import {
  get_Categories_Sub_Categories,
  get_Random,
} from '../../../../services/api/categories';
import RandomCategories from '../../../components/customCategories/RandomCategories';
import {get_random} from '../../../../store/slices/randomCategorySlice';
import {BlurView} from '@react-native-community/blur';
import SvgIcons from '../../../components/svgIcon/svgIcons';

const Categories = () => {
  const {width, height} = Dimensions.get('window');
  const {SPLASH_SCREEN_IMAGE, LOCATION_ICON, LUDO_ICON} = Img_Paths;
  // const { data, loading } = useSelector((state) => state.getcategories);
  const randomRes = useSelector(state => state?.randomCategory?.data);
  const loadingrandom = useSelector(state => state?.randomCategory?.loading);
  const [isRandom, setIsRandom] = useState(false);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [responseCategories, setResponseCategories] = useState();
  const [responseRandom, setResponseRandom] = useState('');
  const [randomName, setRandomName] = useState('');
  const [randomId, setRandomId] = useState('');
  const [isTriggered, setIsTriggered] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const addUsersGame = useSelector(state => state.addPlayers.addFriends);
  const {user} = useSelector(state => state?.authSlice);
  console.log("🚀 ~ Categories ~ user:", user)

  // Get Categories Api ----------
  // const route = useRoute();
  // const {params} = route;
  // const flow = params?.flow;
  // console.log(flow);

  const fetchCategoriesUntilFound = async searchTerm => {
    let page = 1;
    let found = false;
    let array = []

    try {
      while (!found) {
        const response = await get_Categories_Sub_Categories(page);

        if (response.data && response.data.categories) {
          const responseArray = response.data.categories;
          array= [...array,...responseArray]

          const filteredCategories = responseArray.filter(category =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase()),
          );
          console.log('filter', filteredCategories);
          if (filteredCategories.length > 0) {
            array = array.filter(el=> !el?.name.toLowerCase().includes(searchTerm.toLowerCase()))
            setResponseCategories([filteredCategories?.[0],...array]);
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

  const fetchUsers = async (page = 1) => {
    setIsLoading(true);
    try {
      if (!user) {
        fetchCategoriesUntilFound('animals');
        return;
      }
      const response = await get_Categories_Sub_Categories(page);
      setResponseCategories(response.data?.categories);
      setIsLoading(false);
    } catch (error) {
      console.log('error---', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUsers();
    }, []),
  );

  const handleRandomClick = async () => {
    try {
      const response = await get_Random();
      console.log('res', response.data);
      navigation.navigate('SubCategories', {
        id: response?.data?._id,
        name: response?.data?.name,
      });
      setRandomId(response?.data?._id);
      setRandomName(response?.data?.name);
      return response;
    } catch (error) {}
  };

  const handleStoryUser = (id, name) => {
    console.log("🚀 ~ handleStoryUser ~ id, name:", id, name)
    navigation.navigate('SubCategories', {id: id, name: name});
  };

  // useFocusEffect(
  //     useCallback(() => {
  //         setIsTriggered(false)
  //     }, [])
  // );

  const isCategoryBlurred = (category) => {
    return category?.name !== 'Animals' && !user
  };

  const handleSearch = searchTerm => {
    if(!!searchTerm){
      const filtered = responseCategories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResponseCategories(filtered);
      return
    }
    fetchUsers();
  };

  const generateRandomNumber = (numDigits) => {
    const min = Math.pow(10, numDigits - 1); // Minimum value with specified number of digits
    const max = Math.pow(10, numDigits) - 1; // Maximum value with specified number of digits
    return Math.floor(Math.random() * (max - min + 1)) + min; // Generate random number within range
  };
  
  return (
    <ImageBackground style={styles.container} source={SPLASH_SCREEN_IMAGE}>
      <ScrollView>
        {/* Frame Content Close----------- */}
      <View style={{flexDirection:'row',justifyContent:"space-between",marginHorizontal:responsiveWidth(5),marginBottom:moderateVerticalScale(10)}}>
        <View style={styles.first_container}>
       
          <BackButton onPress={() => navigation.goBack()} />
          <View style={styles.categories_text_container}>
            <Text style={styles.categories_text}>Categories</Text>
          </View>   
        </View>

      {!user?
          <View style={{marginTop:moderateVerticalScale(10)}}>
        <View style={{marginBottom:'auto',marginTop:'auto',marginLeft:5}}>
          <SvgIcons name={'Guest'} width={36} height={36} />
        </View>
          <Text style={styles.text}>Guest{generateRandomNumber(4)}</Text>
        </View>:<></>}
    </View>
   
        {/* IMainnputField-----*/}
       { user?
       <>
        <MainInputField placeholder="Username" />        
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
            <View style={{marginHorizontal: moderateScale(10)}}>
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
        </View></>:
        <SearchField placeholder="Search" onSearch={handleSearch} />
        }

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingHorizontal: moderateScale(4),
          }}>
          {!isLoading ? (
            responseCategories?.map((category, index) => (
              <View
                key={category?.id}
                style={{
                  backgroundColor: TextColorGreen,
                  width: responsiveWidth(30),
                  borderRadius: 10,
                  height: responsiveHeight(18.5),
                  alignItems: 'center',
                  margin: responsiveWidth(1.2),
                  borderWidth: !!isCategoryBlurred(category) ? 0 : 3,
                  borderColor: '#5797A5',
                }}>
                <StoryUsers
                  onPress={() => handleStoryUser(category?.id, category?.name)}
                  images={category?.image}
                  text={category?.name}
                  mainbgColor={TextColorGreen}
                  backgroundColor="rgba(199, 152, 97, 1)"
                  disabled={!!isCategoryBlurred(category)}
                />
          
            {!!isCategoryBlurred(category) && <View style={styles.blur_wrapper}>
                <BlurView
                  style={styles.blur_view}
                  blurAmount={10}
                  overlayColor='transparent'
                  >
                    <View style={styles.blur_content_container}>
                    <View style={{ position: 'absolute', left: 0, right: 0, justifyContent: 'center', alignItems: 'center',top:responsiveHeight(5)}}>
                    <SvgIcons name={'Lock'} width={47} height={47} />
                    </View>
                    </View>
                  </BlurView>
                </View>}
              </View>
            ))
          ) : (
            <View style={{flex: 1}}>
              <ActivityIndicator size={40} color={'#000'} />
            </View>
          )}

          {!isLoading && (
            <View
              style={{
                paddingLeft: moderateScale(5),
                paddingVertical: moderateVerticalScale(10),
              }}>
              <View
                style={{
                  backgroundColor: '#E44173',
                  width: responsiveWidth(29),
                  borderRadius: 10,
                  height: responsiveHeight(18.5),
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => handleRandomClick()}
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
                </TouchableOpacity>
                <Text
                  style={{
                    color: '#FFF',
                    fontWeight: '700',
                    fontSize: responsiveFontSize(1.9),
                  }}>
                  Random
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* <RandomCategories
                    responseRandom={responseRandom}
                /> */}
      </ScrollView>
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
    textAlign:'center'
  },
});

export default Categories;
