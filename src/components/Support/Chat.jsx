import React from 'react';
import { useSelector } from 'react-redux';
import { URL } from '../../constants/Constant';
import { Img_Paths } from '../../assets/Imagepaths';
import { Image, StyleSheet, View } from 'react-native';
import Typography from '../reusable-components/Typography';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';

const Chat = ({ item }) => {
  const { STORY_ICON } = Img_Paths;
  // console.log("media",URL+item.media[0])
  const { user } = useSelector(state => state?.authSlice);
  const USER = user?.data?.user || user?.data;
  const IS_ADMIN_MSG = USER?._id !== item?.user?._id
  console.log("🚀 ~ Chat ~ item:", item, USER?._id)
  const timestamp = new Date(item.updatedAt);
  const uri = item.media && item.media.length > 0 ? URL + item.media[0] : '';

  const time = item?.updatedAt
    ? timestamp.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
    : new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  const date = item?.updatedAt
    ? new Date(item.updatedAt).toLocaleDateString()
    : new Date().toLocaleDateString();
  return (
    <View style={styles.messagesGap}>
      <View style={styles.message_section}>
        <View style={styles.message_wrapper}>
          <View style={styles.message_container}>
            <Image source={STORY_ICON} />
            <View>
              <Typography style={styles.message_date}>
                {date} | {time}
              </Typography>
              <Typography style={styles.message_id}>{item.id}</Typography>
            </View>
          </View>
          <View style={{}}>
            <Typography
              style={[
                styles.message_text,
                IS_ADMIN_MSG && { color: 'red' },
              ]}>
              {item?.text}
            </Typography>
          </View>
          <View style={{}}>
            {uri !== '' ? (
              <Image
                resizeMode="contain"
                source={{ uri: uri }}
                style={
                  uri && {
                    width: 30,
                    height: 30,
                    borderRadius: 2,
                    marginLeft: responsiveScreenWidth(5),
                  }
                }
              />
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  messagesGap: {
    // marginBottom: 16,
  },
  message_section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  message_wrapper: {
    gap: 10.75,
  },
  message_container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  message_date: {
    color: '#000000',
    fontWeight: 400,
    fontSize: 10,
    lineHeight: 14.52,
  },
  message_id: {
    color: '#000000',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 14.52,
  },
  message_text: {
    color: '#000000',
    // width: 343,
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 14.52,
  },
});
