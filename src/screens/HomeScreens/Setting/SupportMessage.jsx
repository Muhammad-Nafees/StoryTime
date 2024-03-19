import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import BackgroundWrapper from '../../../components/reusable-components/BackgroundWrapper';
import { Img_Paths } from '../../../assets/Imagepaths';
import Typography from '../../../components/reusable-components/Typography';
import { FourthColor, SecondaryColor } from '../../Styles/Style';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import SupportButton from '../../../components/Support/SupportButton';
import MessageBox from '../../../components/Support/MessageBox';
import { sendMessage } from '../../../../services/api/support';
import { Inter_SemiBold } from '../../../constants/GlobalFonts';

const SupportMessage = ({ navigation }) => {
  const [profileImage, setProfileImage] = React.useState(null);
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const { LEFT_ARROW_IMG } = Img_Paths;

  const handleSendMessage = async () => {
    const image = profileImage?.uri && { profileImage: profileImage?.uri };
    const payload = {
      text: input,
      media: image,
    };
    setLoading(true);
    const response = await sendMessage(payload);
    const data = response.data;
    if (response?.statusCode === 200) {
      navigation.navigate('SupportMessageList', {
        chatID: data.chat,
        img: data.media
      });
      setInput('');
      setLoading(false);
    }
  };
  return (
    <BackgroundWrapper disableScrollView coverScreen>
      <View style={styles.first_container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.back_button}>
          <Image style={styles.left_arrow} source={LEFT_ARROW_IMG} />
        </TouchableOpacity>
        <View style={styles.categories_text_container}>
          <Typography style={styles.categories_text}>Support</Typography>
        </View>
      </View>
      <MessageBox
        profileImage={profileImage}
        setProfileImage={setProfileImage}
        input={input}
        setInput={setInput}
      />
      <SupportButton
        input={input}
        loading={loading}
        title={'Send Message'}
        onpress={handleSendMessage}
      />
    </BackgroundWrapper>
  );
};

export default SupportMessage;

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
    fontFamily: Inter_SemiBold.Inter_SemiBold
  },
  categories_text_container: {
    paddingHorizontal: moderateScale(20),
  },
});
