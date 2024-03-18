import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Img_Paths } from '../../../assets/Imagepaths';
import { moderateScale } from 'react-native-size-matters';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import BlockModal from '../../../components/modals/BlockModal';
import ScreenHeader from '../../../components/reuseable-components/ScreenHeader';
import { getBlockList } from '../../../../services/api/settings';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import BackgroundWrapper from '../../../components/reuseable-components/BackgroundWrapper';
import Typography from '../../../components/Typography';

const BlockUser = () => {
  const { DEFAULT_ICON } = Img_Paths;
  const blockModalRef = useRef(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [users, setUsers] = useState({
    data: [],
    loading: false,
  });

  const DATA = useMemo(() => users?.data, [users]);
  const LOADING = useMemo(() => users?.loading, [users]);

  useEffect(() => {
    fetchBlockedUsers();
  }, []);

  const fetchBlockedUsers = async () => {
    try {
      setUsers(prevState => ({
        ...(prevState || {}),
        loading: true,
      }));
      const responseData = await getBlockList();
      console.log("responseData==", responseData)
      const data = responseData?.data?.blockUsers || [];
      setUsers({
        loading: false,
        data: data,
      });
    } catch (error) {
      console.log('error ==> ', error?.message);
      setUsers(prevState => ({
        ...(prevState || {}),
        loading: false,
      }));
    } finally {
      setIsRefreshing(false);
    }
  };

  const keyExtractor = (_, index) => `blocked-users.${index}`;

  const modalOpen = item => {
    if (blockModalRef.current) {
      blockModalRef.current.open(item);
    }
  };
  const removeUnblockUserFromList = (blockId) => {
    let blockList = DATA.filter(item => item._id !== blockId)
    setUsers(prevState => ({
      ...(prevState || {}),
      data: blockList,
    }));
    console.log('blocklist', blockList, blockId)
  }
  const renderItem = ({ item }) => {
    console.log("item", item)
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: responsiveWidth(1),
          alignContent: 'center',
        }}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            style={{ width: 33, height: 33 }}
            source={item?.profileImage ? profileImage : DEFAULT_ICON}
            resizeMode={'contain'}
          />

          <Text style={styles.txt}>{item.username} </Text>
        </View>
        <TouchableOpacity activeOpacity={0.3} onPress={() => modalOpen(item)}>
          <Text>Unblock</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderEmpty = () => {
    return LOADING && DATA?.length < 1 && !isRefreshing ? (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} />
      </View>
    ) : DATA?.length < 1 && !LOADING && !isRefreshing ? (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Typography center size={15}>
          Nothing to show
        </Typography>
      </View>
    ) : null;
  };

  return (
    <BackgroundWrapper disableScrollView coverScreen>
      <ScreenHeader title={'Blocklist'} />
      <FlatList
        data={DATA}
        contentContainerStyle={{
          flex: 1,
          paddingHorizontal: moderateScale(20),
        }}
        renderItem={renderItem}
        onEndReachedThreshold={2}
        keyExtractor={keyExtractor}
        removeClippedSubviews={true}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
      />
      <BlockModal ref={blockModalRef} removeUnblockUserFromList={removeUnblockUserFromList} />
    </BackgroundWrapper>
  );
};

export default BlockUser;

const styles = StyleSheet.create({
  txt: {
    textAlignVertical: 'center',
    marginLeft: 5,
    fontWeight: '400',
    lineHeight: 24,
    fontSize: 14,
  },
});
