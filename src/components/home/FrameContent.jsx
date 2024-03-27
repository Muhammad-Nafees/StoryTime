import Frame from './Frame';
import React, { useState, memo } from 'react';
import { View, StyleSheet } from 'react-native';
import FrameActionBar from './FrameActionBar';
import BlockUserStory from '../blockuser/BlockUserModal';
import { moderateVerticalScale } from 'react-native-size-matters';
import { responsiveWidth } from 'react-native-responsive-dimensions';

const FrameContent = ({ item }) => {
  //states
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={{ width: responsiveWidth(90) }}>
        <Frame item={item} />
        <FrameActionBar item={item} setIsVisible={setIsVisible} />
      </View>
      {isVisible && (
        <BlockUserStory setIsVisible={setIsVisible} isVisible={isVisible} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateVerticalScale(10),
  },
});

export default memo(FrameContent);
