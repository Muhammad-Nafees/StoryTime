import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import BackgroundWrapper from '../../../components/reusable-components/BackgroundWrapper';
import { Img_Paths } from '../../../assets/Imagepaths';
import { FourthColor, SecondaryColor } from '../../Styles/Style';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import Typography from '../../../components/reusable-components/Typography';
import EditPaymentCardModal from '../../../components/paymentSetting/EditPaymentCardModal';

const PaymentSetting = ({ navigation }) => {
  const [isVisible, setVisible] = React.useState(false);
  const {
    LEFT_ARROW_IMG,
    VISA,
    EDIT,
    TRASH,
    ADD_CARD,
    ADD_SUCCEFULLY_PAYMENT_CARD,
  } = Img_Paths;
  return (
    <BackgroundWrapper>
      <View style={styles.first_container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.back_button}>
          <Image style={styles.left_arrow} source={LEFT_ARROW_IMG} />
        </TouchableOpacity>
        <View style={styles.categories_text_container}>
          <Text style={styles.categories_text}>Payment Settings</Text>
        </View>
      </View>
      <View style={styles.cardcontainer}>
        <View style={styles.cardwrapper}>
          <View style={styles.leftcard}>
            <Image source={VISA} />
            <View>
              <Typography style={styles.leftcardtext}>
                *** *** *** *** 3456
              </Typography>
              <Typography style={styles.leftcardsubtext}>
                Expires 03/28
              </Typography>
            </View>
          </View>
          <View style={styles.rightcard}>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditAddPaymentCardDetail')}>
              <Image source={EDIT} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVisible(true)}>
              <Image source={TRASH} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.add_cards}>
        <TouchableOpacity
          style={styles.add_cards_wrapper}
          onPress={() => navigation.navigate('AddCard')}>
          <Image source={ADD_CARD} />
          <Typography style={styles.add_cards_wrapper_text}>
            Add Card
          </Typography>
        </TouchableOpacity>
      </View>
      <View style={styles.applepay}>
        <View style={styles.applepaywrapper}>
          <Typography style={styles.add_card_wrapper_text}>
            Apple Pay
          </Typography>
        </View>
      </View>
      {isVisible && (
        <EditPaymentCardModal
          setVisible={setVisible}
          bgImage={ADD_SUCCEFULLY_PAYMENT_CARD}
          isVisible={isVisible}
          modalHeading="Remove Card"
          modalText="Are you sure you want to delete this card?"
          modalButtonText1="No"
          modalButtonText2="Delete"
          onPress={() => {
            setVisible(false);
          }}
        />
      )}
    </BackgroundWrapper>
  );
};

export default PaymentSetting;

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
  cardcontainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  cardwrapper: {
    backgroundColor: '#F3F3F3',
    height: 77.22,
    borderRadius: 5.86,
    paddingHorizontal: 13.64,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftcard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20.46,
  },
  leftcardtext: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 24,
    color: '#000000',
  },
  leftcardsubtext: {
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 14.52,
    color: '#000000',
  },
  rightcard: {
    flexDirection: 'row',
    gap: 14.68,
    alignItems: 'center',
  },
  add_cards: {
    paddingTop: 10.75,
    paddingHorizontal: 16,
  },
  add_cards_wrapper: {
    height: 57.66,
    borderRadius: 5.86,
    borderWidth: 0.98,
    borderColor: '#DEDEDE',
    borderStyle: 'dashed',
    backgroundColor: '#F3F3F3',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13.64,
    gap: 34.31,
  },
  add_cards_wrapper_text: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 24,
    color: '#000000',
  },
  applepay: {
    paddingTop: 10.75,
    paddingHorizontal: 16,
  },
  applepaywrapper: {
    height: 45.93,
    borderRadius: 4.89,
    backgroundColor: '#F3F3F3',
    paddingHorizontal: 13.64,
    justifyContent: 'center',
  },
  add_card_wrapper_text: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 24,
    color: '#AAAAAA',
  },
});
