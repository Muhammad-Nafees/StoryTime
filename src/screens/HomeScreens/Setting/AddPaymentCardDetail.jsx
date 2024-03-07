import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Img_Paths} from '../../../assets/Imagepaths';
import {FourthColor, SecondaryColor} from '../../Styles/Style';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import Typography from '../../../components/Typography';
import PaymentInput from '../../../components/paymentSetting/PaymentInput';
import PaymentButton from '../../../components/paymentSetting/PaymentButton';

const AddPaymentCardDetail = ({navigation}) => {
  const {LEFT_ARROW_IMG, CHECK} = Img_Paths;
  return (
    <BackgroundWrapper contentContainerStyle={{flex: 1}} coverScreen>
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
      <ScrollView>
        <View style={styles.body}>
          <Typography style={styles.cardText}>Card Info</Typography>
          <View style={styles.input_container}>
            <PaymentInput label="Full Name" placeholderText="Type here" />
            <PaymentInput label="Country" placeholderText="Type here" />
            <PaymentInput
              label="Card Number"
              placeholderText="Type here"
              numeric={true}
            />
            <PaymentInput
              label="Expiry Date"
              placeholderText="MM/YY"
              numeric={true}
            />
            <PaymentInput label="CVV" placeholderText="435" numeric={true} />
          </View>
        </View>
      </ScrollView>
      <View style={{marginTop: 70}}>
        <PaymentButton label="Save Card" />
      </View>
    </BackgroundWrapper>
  );
};

export default AddPaymentCardDetail;

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
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.5,
    color: '#395E66',
  },
  input_container: {
    paddingTop: 10.75,
    gap: 15,
  },
});
