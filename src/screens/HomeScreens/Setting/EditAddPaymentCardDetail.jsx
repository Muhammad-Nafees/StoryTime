import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import BackgroundWrapper from '../../../components/reusable-components/BackgroundWrapper';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Img_Paths } from '../../../assets/Imagepaths';
import { FourthColor, SecondaryColor } from '../../Styles/Style';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import Typography from '../../../components/reusable-components/Typography';
import PaymentInput from '../../../components/paymentSetting/PaymentInput';
import PaymentButton from '../../../components/paymentSetting/PaymentButton';
import AddPaymentCardModal from '../../../components/paymentSetting/AddPaymentCardModal';
import EditPaymentCardModal from '../../../components/paymentSetting/EditPaymentCardModal';

const EditAddPaymentCardDetail = ({ navigation }) => {
  const [isVisible, setVisible] = React.useState(false);
  const [paymentCardModal, setPaymentCardModal] = React.useState(false);
  const [inputValue, setInputValue] = React.useState();
  const { LEFT_ARROW_IMG, ADD_SUCCEFULLY_PAYMENT_CARD } = Img_Paths;

  const handleInput = (e, key) => {
    setInputValue({ ...inputValue, [key]: e });
  };

  return (
    <BackgroundWrapper contentContainerStyle={{ flex: 1 }} coverScreen>
      <View style={styles.first_container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.back_button}>
          <Image style={styles.left_arrow} source={LEFT_ARROW_IMG} />
        </TouchableOpacity>
        <View style={styles.categories_text_container}>
          <Text style={styles.categories_text}>Edit Card</Text>
        </View>
      </View>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.body}>
          <Typography style={styles.cardText}>Card Info</Typography>
          <View style={styles.input_container}>
            <PaymentInput
              label="Full Name"
              placeholderText="Type here"
              onchange={handleInput}
              keyValue="fullName"
            />
            <PaymentInput
              label="Country"
              placeholderText="Type here"
              onchange={handleInput}
              keyValue="country"
            />
            <PaymentInput
              label="Card Number"
              placeholderText="Type here"
              onchange={handleInput}
              keyValue="cardNumber"
              numeric={true}
            />
            <PaymentInput
              label="Expiry Date"
              placeholderText="MM/YY"
              onchange={handleInput}
              keyValue="expiryDate"
              numeric={true}
            />
            <PaymentInput
              label="CVV"
              placeholderText="435"
              onchange={handleInput}
              keyValue="cvv"
              numeric={true}
            />
          </View>
        </View>
      </ScrollView>
      <View style={{ marginTop: 70 }}>
        <PaymentButton label="Save Card" onpress={() => setVisible(true)} />
      </View>
      {isVisible && (
        <EditPaymentCardModal
          setVisible={setVisible}
          bgImage={ADD_SUCCEFULLY_PAYMENT_CARD}
          isVisible={isVisible}
          modalHeading="Save Edits"
          modalText="Are you sure you want to discard your edits?"
          modalButtonText1="No"
          modalButtonText2="Yes"
          onPress={() => {
            setVisible(false);
            setPaymentCardModal(true);
          }}
        />
      )}
      {paymentCardModal && (
        <AddPaymentCardModal
          setVisible={setPaymentCardModal}
          text1={'Successfully Added!'}
          bgImage={ADD_SUCCEFULLY_PAYMENT_CARD}
          isVisible={paymentCardModal}
          text="Back"
          onPress={() => {
            navigation.navigate('PayementSetting');
          }}
        />
      )}
    </BackgroundWrapper>
  );
};

export default EditAddPaymentCardDetail;

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
