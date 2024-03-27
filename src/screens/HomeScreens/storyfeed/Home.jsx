import React, { useCallback, useEffect, useState } from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { Img_Paths } from '../../../assets/Imagepaths';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { SCREEN_HEIGHT } from '../../../constants/Constant';
import { PrimaryColor, SecondaryColor } from '../../Styles/Style';
import { PassionOne_Regular } from '../../../constants/GlobalFonts';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { fetchallFeedStories } from '../../../../services/api/storyfeed';
import { HomeHeader, UserList, FrameContent } from '../../../components';
import { playerContributorsIds, setFriendId, } from '../../../../store/slices/categoriesSlice/categoriesSlice';

const Home = () => {
  //destructures
  const { SPLASH_SCREEN_IMAGE } = Img_Paths;
  //hooks
  const dispatch = useDispatch();
  //redux states
  const { user } = useSelector(state => state?.authSlice);
  const { playerscontributorsIds } = useSelector((state) => state?.getcategories)

  //states
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMain, setIsLoadingMain] = useState(true);
  const [page, setPage] = useState(1);
  const [HasMorePages, setHasMorePages] = useState();
  const [responseUsers, setResponseUsers] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  //consts
  const USER = user?.data?.user || user?.data;
  const limit = 10;

  //effects
  console.log("PLAYER_CONTRIBUTORS", playerscontributorsIds);


  useEffect(() => {
    const fetchUsers = async () => {
      if (!isRefreshing) {
        try {
          const responseData = await fetchallFeedStories({
            pagination: page,
            limit,
          });
          const data = responseData?.data?.stories;
          console.log('responseData-----------', responseData);
          if (data && data.length > 0) {
            setResponseUsers(prevData => [
              ...prevData,
              ...responseData?.data?.stories,
            ]);
          } else {
            // setCheckDataisOrNot('Follow someone to get Feeds');
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
  }, [page, isRefreshing]);

  useFocusEffect(
    useCallback(() => {
      dispatch(setFriendId(USER?._id));
    }, [USER?._id, dispatch]),
  );

  //functions
  const handleLoadMore = () => {
    console.log('HasMorePages-----', HasMorePages);
    if (HasMorePages) {
      setIsLoading(true);
      setPage(prevPage => prevPage + 1);
    } else {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(playerContributorsIds(USER?._id))
    }, []));

  const onRefresh = () => {
    setIsRefreshing(true);
    setPage(1);
    setResponseUsers([]);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  //render functions
  const keyExtractor = (_, index) => `home.${index}`;

  const renderItem = ({ item, index }) => {
    return <FrameContent key={index} item={item} />;
  };

  const renderListHeaderComponent = () => {
    if (!isLoadingMain) {
      return <UserList />;
    }
  };

  const renderListFooterComponent = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={24} color={PrimaryColor} />
        </View>
      );
    }
    return null;
  };

  const renderListEmptyComponent = () => {
    return (
      <View style={styles.loadingContainer}>
        {isLoadingMain ? (
          <ActivityIndicator size={24} color={PrimaryColor} />
        ) : (
          <Text style={styles.noDataText}>Follow someone to get Feeds</Text>
        )}
      </View>
    );
  };

  return (
    <ImageBackground style={styles.container} source={SPLASH_SCREEN_IMAGE}>
      <HomeHeader />
      <FlatList
        data={responseUsers}
        onRefresh={onRefresh}
        renderItem={renderItem}
        onEndReachedThreshold={2}
        refreshing={isRefreshing}
        keyExtractor={keyExtractor}
        onEndReached={handleLoadMore}
        ListEmptyComponent={renderListEmptyComponent}
        ListFooterComponent={renderListFooterComponent}
        ListHeaderComponent={renderListHeaderComponent}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: SecondaryColor,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: SCREEN_HEIGHT / 1.5,
  },
  noDataText: {
    color: PrimaryColor,
    fontSize: responsiveFontSize(3.5),
    fontFamily: PassionOne_Regular.passionOne,
  },
});

export default Home;
