import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import Typography from '../Typography';
import {Img_Paths} from '../../assets/Imagepaths';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

const Message = ({item}) => {
  const {MESSAGE_ICON} = Img_Paths;
  return (
    <View style={{marginBottom: 16}}>
      <View style={styles.message_container}>
        <View style={styles.message_wrapper}>
          <View style={styles.message_content}>
            <View style={styles.message_icon}>
              <Image source={MESSAGE_ICON} />
            </View>
            {/* <View style={styles.message_text_container}> */}
              <View style={styles.message_text_container_wrapper}>
                <View style={styles.message_text_date_container}>
                  <Typography style={styles.message_date_text}>
                    {item?.lastMessage?.updatedAt}
                  </Typography>
                  <Typography style={styles.message_pending_text}>
                    {item?.status}
                  </Typography>
                </View>
                <Typography style={styles.message_id_text}>
                  {item?.lastMessage?._id}
                </Typography>
                <Typography style={styles.message}>
                  {item?.lastMessage?.text}
                </Typography>
              </View>
            </View>
          </View>
        {/* </View> */}
      </View>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  message_container: {
    marginHorizontal: responsiveWidth(6),
    minHeight: 114.98,
    flex: 1,
  },
  message_wrapper: {
    backgroundColor: '#F3F3F3',
    borderRadius: 9.74,
    justifyContent: 'center',
    height: '100%',
  },
  message_content: {
    paddingHorizontal: moderateScale(11),
    paddingVertical: moderateVerticalScale(16),
    flexDirection: 'row',
    // alignItems: 'center',
    gap: 11,
    height: '100%',
  },
  message_text_container_wrapper: {
    gap: 5,
  },
  message_text_date_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  },
  message_date_text: {
    fontSize: 10,
    fontWeight: 400,
    lineHeight: 12.1,
    color: '#050505',
  },
  message_pending_text: {
    fontSize: 10,
    fontWeight: 400,
    lineHeight: 12.1,
    color: '#EA4444',
    textTransform: 'capitalize',
  },
  message_id_text: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 14.52,
    color: '#395E66',
  },
  message: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 14.52,
    color: '#050505',
    width: responsiveWidth(52),
  },
});