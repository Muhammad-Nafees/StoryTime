import Modal from 'react-native-modal';
import { Img_Paths } from '../../../assets/Imagepaths';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { unBlockUser } from '../../../../services/api/settings';
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import {
  Black02,
  PrimaryColor,
  White
} from '../../../screens/Styles/Style';
import { Inter_Regular, Inter_SemiBold } from '../../../constants/GlobalFonts';

const BlockModal = forwardRef((props, ref) => {
  const { removeUnblockUserFromList } = props
  const [isVisible, setIsVisible] = useState(false);
  const [item, setItem] = useState(null);
  const itemValue = item ? item : null;
  const { DEFAULT_ICON } = Img_Paths;

  const open = item => {
    setIsVisible(true);
    setItem(item);
  };

  const close = () => {
    setIsVisible(false);
  };

  useImperativeHandle(ref, () => {
    return { open };
  });

  const unblockUser = async (item) => {
    try {
      const responseData = await unBlockUser(item._id);
      const blockId = responseData?.data?.blockId;
      removeUnblockUserFromList(blockId);
      close();
    } catch (error) {
      console.log('error ==> ', error?.message);
    }
  }

  return (
    <Modal
      style={{ flex: 1 }}
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropColor='#979797'
      onModalHide={close}
      backdropOpacity={0.98}
      onBackdropPress={close}>
      <View
        style={{
          height: 285,
          width: 290,
          borderRadius: 32,
          backgroundColor: White,
          alignSelf: 'center',
        }}>
        <Image
          style={{
            width: 97,
            height: 97,
            alignSelf: 'center',
            marginVertical: responsiveWidth(4),
          }}
          source={itemValue?.profileImage ? profileImage : DEFAULT_ICON}
          resizeMode={'contain'}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: '400',
            textAlign: 'center',
            lineHeight: 20,
          }}>
          {itemValue?.username}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 15,
            fontWeight: '400',
            padding: responsiveWidth(6),
            marginBottom: responsiveWidth(3),
            color: Black02,
            fontFamily: Inter_Regular.Inter_Regular
          }}>
          Are you sure you want to{' '}
          <Text style={{ color: PrimaryColor, fontWeight: '600' }}>unblock </Text>
          this user?
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            borderTopWidth: 0.6,
            borderColor: PrimaryColor,

          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              borderRightWidth: 0.6,
              borderColor: PrimaryColor,
              height: 48,
              alignItems: 'center',
              paddingTop: responsiveWidth(3),
            }}
            onPress={() => unblockUser(itemValue)}>
            <Text
              style={{
                fontSize: 12,
                color: PrimaryColor,
                textAlign: 'center',
                fontWeight: '600',
                fontFamily: Inter_SemiBold.Inter_SemiBold
              }}>
              {' '}
              Unblock
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, paddingTop: responsiveWidth(3) }} onPress={() => close()}>
            <Text
              style={{
                fontSize: 12,
                textAlign: 'center',
                height: 48,
                fontWeight: '600',
                fontFamily: Inter_SemiBold.Inter_SemiBold,
                color: Black02,
              }}>
              {' '}
              Return
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
});

export default BlockModal;
