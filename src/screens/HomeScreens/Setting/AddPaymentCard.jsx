import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Img_Paths} from '../../../assets/Imagepaths';
import {FourthColor, SecondaryColor} from '../../Styles/Style';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import Typography from '../../../components/Typography';

const AddPaymentCard = ({navigation}) => {
  const {LEFT_ARROW_IMG, CHECK} = Img_Paths;
  return (
    <BackgroundWrapper disableScrollView coverScreen>
      <View style={styles.first_container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.back_button}>
          <Image style={styles.left_arrow} source={LEFT_ARROW_IMG} />
        </TouchableOpacity>
        <View style={styles.categories_text_container}>
          <Text style={styles.categories_text}>Add Card</Text>
        </View>
      </View>
      <View style={styles.body}>
        <Typography style={styles.cardText}>Card Info</Typography>
        <View style={styles.applepay}>
          <View style={styles.add_cards_wrapper}>
            <View style={styles.add_cards_wrapper_container}>
              <Typography style={styles.add_cards_wrapper_text}>
                Credit/Debit Card
              </Typography>
              <Typography style={styles.add_card_wrapper_text1}>
                Visa, MasterCard, American Express
              </Typography>
            </View>
            <Image source={CHECK} />
          </View>
          <View style={styles.applepaywrapper}>
            <Typography style={styles.add_card_wrapper_text}>PayPal</Typography>
          </View>
          <View style={styles.applepaywrapper}>
            <Typography style={styles.add_card_wrapper_text}>
              Apple Pay
            </Typography>
          </View>
        </View>
      </View>
      <View style={styles.btncontainer}>
        <TouchableOpacity style={styles.btn}>
          <Typography style={styles.btnText}>Next</Typography>
        </TouchableOpacity>
      </View>
    </BackgroundWrapper>
  );
};

export default AddPaymentCard;

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
  body: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  cardText: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.5,
    color: '#395E66',
  },
  add_cards: {
    paddingTop: 10.75,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    // paddingHorizontal: 16,
  },
  add_cards_wrapper: {
    height: 65.47,
    borderRadius: 4.89,
    backgroundColor: '#F3F3F3',
    paddingHorizontal: 13.64,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  add_cards_wrapper_text: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 24,
    color: '#000000',
  },
  applepay: {
    paddingTop: 10.75,
    gap: 4.89,
    // paddingHorizontal: 16,
  },
  applepaywrapper: {
    height: 45.93,
    borderRadius: 4.89,
    backgroundColor: '#F3F3F3',
    paddingHorizontal: 12.63,
    justifyContent: 'center',
  },
  add_card_wrapper_text: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 24,
    color: '#AAAAAA',
  },
  add_card_wrapper_text1: {
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 24,
    color: '#AAAAAA',
  },
  btncontainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10,
    flex: 1,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 293,
    height: 46,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#395E66',
    backgroundColor: '#395E66',
  },
  btnText: {
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0.02,
    color: '#FFF',
    fontWeight: 600,
  },
});
