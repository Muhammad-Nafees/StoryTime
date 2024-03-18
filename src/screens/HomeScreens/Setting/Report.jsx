import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import BackgroundWrapper from '../../../components/reuseable-components/BackgroundWrapper';
import Typography from '../../../components/Typography';
import {Img_Paths} from '../../../assets/Imagepaths';
import SupportButton from '../../../components/Support/SupportButton';
import {FourthColor, SecondaryColor} from '../../Styles/Style';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {ReportUser} from '../../../../services/api/report';

const Report = ({navigation, route}) => {
  const [input, setInput] = React.useState(
    "I hope this message finds you well. I am writing to report a user I encountered while using your app. I believe it's essential to bring this matter to your attention to ensure the continued positive experience of all users.",
  );
  const [loading, setLoading] = React.useState(false);
  const {LEFT_ARROW_IMG, REPORT_ICON} = Img_Paths;
  const {id} = route.params;
  console.log('🚀 ~ Report ~ _id:', id);
  const handleReport = async () => {
    const payload = {
      story: id,
      text: input,
    };
    try {
      setLoading(true);
      const response = await ReportUser(payload);
      const data = await response.data;
      if (response.statusCode === 200) {
        setLoading(false);
      }
    } catch (error) {
      console.log('🚀 ~ handleReport ~ error:', error);
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
          <Typography style={styles.categories_text}>Report User</Typography>
        </View>
      </View>
      <View style={styles.messagesGap}>
        <View style={styles.message_section}>
          <View style={styles.message_wrapper}>
            <View style={styles.message_container}>
              <Image source={REPORT_ICON} />
              <View style={styles.message_text_container}>
                <Typography style={styles.message_date}>
                  02/10/2023 | 6:00 AM
                </Typography>
                <Typography style={styles.message_text}>Lilibeth</Typography>
              </View>
            </View>
          </View>
          <View>
            <Typography style={styles.message_label}>Your Message</Typography>
            <TextInput
              style={styles.input}
              multiline={true}
              placeholder="Type here"
              placeholderTextColor="#AAAAAA"
              onChangeText={e => setInput(e)}
              value={input}
            />
          </View>
        </View>
      </View>
      <SupportButton
        title={'Send New Message'}
        loading={loading}
        onpress={handleReport}
      />
    </BackgroundWrapper>
  );
};
export default Report;

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
  },
  categories_text_container: {
    paddingHorizontal: moderateScale(20),
  },
  messagesGap: {
    // marginBottom: 16,
  },
  message_section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 16,
  },
  message_wrapper: {
    gap: 10.75,
  },
  message_container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  message_text_container: {
    gap: 4,
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
  message_label: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 24,
    color: '#395E66',
  },
  input: {
    backgroundColor: '#F3F3F3',
    minHeight: 152,
    textAlignVertical: 'top',
    padding: 18,
    borderRadius: 19.46,
    fontSize: 14,
    lineHeight: 24,
    color: '#000000',
  },
});
