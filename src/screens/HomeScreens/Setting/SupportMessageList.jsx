import React from 'react';
import {Img_Paths} from '../../../assets/Imagepaths';
import Typography from '../../../components/Typography';
import {FourthColor, SecondaryColor} from '../../Styles/Style';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import MessageListItems from '../../../components/Support/MessageListItems';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ChatBottom from '../../../components/Support/ChatBottom';
import {getMessageWithId} from '../../../../services/api/support';
import {Inter_SemiBold} from '../../../constants/GlobalFonts';
import socketServcies from '../../../../services/sockets';

const SupportMessageList = ({navigation, route}) => {
  const [messageList, setMessageList] = React.useState([]);
  const {chatID, img} = route.params;
  const {LEFT_ARROW_IMG} = Img_Paths;

  React.useEffect(() => {
    const getAllChatsWithId = async () => {
      console.log('first');
      try {
        const response = await getMessageWithId(chatID);
        const data = await response.data;
        console.log('🚀 ~ getAllChatsWithId ~ data:', data.supportMessages);
        setMessageList(data.supportMessages);
      } catch (error) {
        console.log('🚀 ~ getAllChatsWithId ~ error:', error);
      }
    };
    getAllChatsWithId();
  }, []);

  React.useEffect(() => {
    socketServcies.initializeSocket();
  }, []);
  React.useEffect(() => {
    socketServcies.on('received_message', msg => {
      console.log('message received in App', msg);
      setMessageList(prevMessageList => [
        ...prevMessageList,
        {adminMessage: msg},
      ]);
    });
  }, []);

  return (
    <BackgroundWrapper disableScrollView coverScreen>
      <View style={styles.first_container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Setting')}
          style={styles.back_button}>
          <Image style={styles.left_arrow} source={LEFT_ARROW_IMG} />
        </TouchableOpacity>
        <View style={styles.categories_text_container}>
          <Typography style={styles.categories_text}>Support</Typography>
        </View>
      </View>
      <MessageListItems messageList={messageList} chatID={chatID} img={img} />
      <ChatBottom
        setMessageList={setMessageList}
        messageList={messageList}
        chatID={chatID}
      />
    </BackgroundWrapper>
  );
};

export default SupportMessageList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: SecondaryColor,
    flex: 1,
  },
  first_container: {
    paddingTop: responsiveWidth(6),
    paddingVertical: moderateVerticalScale(12),
    flexDirection: 'row',
    marginLeft: 'auto',
    width: responsiveWidth(95),
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
  categories_text: {
    color: FourthColor,
    fontSize: responsiveFontSize(2.4),
    fontWeight: '600',
    letterSpacing: 0.36,
    fontFamily: Inter_SemiBold.Inter_SemiBold,
  },
  categories_text_container: {
    paddingHorizontal: moderateScale(20),
  },
});
