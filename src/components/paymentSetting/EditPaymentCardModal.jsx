import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  Modal,
  TouchableOpacityBase,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  PrimaryColor,
  SecondaryColor,
  TextColorGreen,
  ThirdColor,
  pinkColor,
} from '../../screens/Styles/Style';
import {useNavigation, useNavigationBuilder} from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
// import BackButton from '../components/BackButton';
// import TouchableButton from './TouchableButton';
import {Img_Paths} from '../../assets/Imagepaths';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/Constant';
import {Inter_Medium, Inter_Regular} from '../../constants/GlobalFonts';

const EditPaymentCardModal = ({
  isVisible,
  setVisible,
  onPress,
  bgImage,
  modalHeading,
  modalText,
  modalButtonText1,
  modalButtonText2,
}) => {
  const {BGIMAGE_ACCOUNT_CREATED} = Img_Paths;

  return (
    <Modal onRequestClose={() => setVisible(false)} visible={isVisible}>
      <ImageBackground style={styles.container} source={bgImage}>
        <View style={styles.wrapper}>
          <View style={styles.wrapperCOntainer}>
            <Text style={[styles.headerText, {fontWeight: 500}]}>
              {modalHeading}
            </Text>
            <Text style={[styles.bodyText, {fontSize: 14}]}>{modalText}</Text>
            <View style={{width: '100%'}}>
              <View style={styles.border} />
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setVisible(false)}>
                  <Text style={[styles.buttonTextNo, {fontWeight: 600}]}>
                    {modalButtonText1}
                  </Text>
                </TouchableOpacity>
                <View style={styles.border} />
                <TouchableOpacity style={styles.button} onPress={onPress}>
                  <Text style={[styles.buttonTextYes, {fontWeight: 600}]}>
                    {modalButtonText2}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    width: responsiveWidth(80),
    height: responsiveHeight(25),
    backgroundColor: '#FFF',
    borderRadius: 32.23,
  },
  wrapperCOntainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  headerText: {
    fontSize: 18,
    color: '#395E66',
    paddingTop: 15.77,
  },
  bodyText: {
    width: 200,
    textAlign: 'center',
    color: '#393939',
    lineHeight: 24,
  },
  border: {
    borderWidth: 1,
    borderColor: '#E44173',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: 45,
    width: '100%',
  },
  button: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  buttonTextNo: {
    fontSize: 12,
    lineHeight: 16,
    color: '#B72D2D',
  },
  buttonTextYes: {
    fontSize: 12,
    lineHeight: 16,
    color: '#395E66',
  },
});

export default EditPaymentCardModal;
