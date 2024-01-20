import Modal from 'react-native-modal';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {
  PrimaryColor,
  White
} from '../screens/Styles/Style';

const BlockModal = forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [item, setItem] = useState(null);
  const itemValue = item ? item : null;
  
  const open = item => {
    setIsVisible(true);
    setItem(item);
  };

  const close = () => {
    setIsVisible(false);
  };

  useImperativeHandle(ref, () => {
    return {open};
  });

  return (
    <Modal
      style={{flex: 1}}
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onModalHide={close}
      backdropOpacity={0.7}
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
          source={itemValue?.imageUrl}
          resizeMode={'contain'}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: '400',
            textAlign: 'center',
            lineHeight: 20,
          }}>
          {itemValue?.name}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 15,
            fontWeight: '400',
            padding: responsiveWidth(6),
            marginBottom: responsiveWidth(3),
          }}>
          Are you sure you want to{' '}
          <Text style={{color: PrimaryColor}}>unblock </Text>
          this user?
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            borderTopWidth: 0.6,
            borderColor:PrimaryColor,
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              borderRightWidth: 0.6,
              borderColor:PrimaryColor,
              height: 48,
              alignItems: 'center',
              paddingTop: responsiveWidth(3),
            }}>
            <Text
              style={{
                fontSize: 12,
                lineHeight: 16,
                color:PrimaryColor,
                textAlign: 'center',
              }}>
              {' '}
              Unblock
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1, paddingTop: responsiveWidth(3)}}>
            <Text
              style={{
                fontSize: 12,
                lineHeight: 16,
                textAlign: 'center',
                height: 48,
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
