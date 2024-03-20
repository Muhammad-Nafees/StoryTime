import { Image, StyleSheet, View } from 'react-native';
import Typography from '../reusable-components/Typography';
import { Img_Paths } from '../../assets/Imagepaths';
import React from 'react';
import { URL } from '../../constants/Constant';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';

const Chat = ({ item }) => {
  const { STORY_ICON } = Img_Paths;
  // console.log("media",URL+item.media[0])
  const timestamp = new Date(item.updatedAt);
  const uri = URL + item.media[0]
  const time = timestamp.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const date = timestamp.toLocaleDateString();
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
            <Typography style={styles.message_text}>{item.text}</Typography>
          </View>
          <View style={{}}>
            <Image
              resizeMode='contain'
              source={{ uri: uri }}
              style={{
                width: 30,
                height: 30,
                borderRadius: 2,
                marginLeft: responsiveScreenWidth(5)
              }}></Image>
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
