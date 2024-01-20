import React, {useRef} from 'react';
import {Img_Paths} from '../../../assets/Imagepaths';
import {moderateScale} from 'react-native-size-matters';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import ScreenHeader from '../../../components/ScreenHeader';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import CustomModal from '../../../components/BlockModal';

const BlockUser = () => {
  const {BLOCK_USER} = Img_Paths;
  const blockModalRef = useRef(null);

  const blocklist = [
    {
      name: 'Lilibeth',
      imageUrl: BLOCK_USER,
    },
    {
      name: 'Lilibeth',
      imageUrl: BLOCK_USER,
    },
  ];
  const modalOpen = item => {
    if (blockModalRef.current) {
      blockModalRef.current.open(item);
    }
  };

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: responsiveWidth(1),
          alignContent: 'center',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={{width: 33, height: 33}}
            source={item.imageUrl}
            resizeMode={'contain'}
          />

          <Text style={styles.txt}>{item.name} </Text>
        </View>
        <TouchableOpacity activeOpacity={0.3} onPress={() => modalOpen(item)}>
          <Text>Unblock</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <BackgroundWrapper
      contentContainerStyle={{
        paddingHorizontal: moderateScale(20),
      }}>
      <ScreenHeader title={'Blocklist'} />

      <FlatList
        data={blocklist}
        renderItem={renderItem}
        keyExtractor={item => item.key}
      />
      <CustomModal ref={blockModalRef} />
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
