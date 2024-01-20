import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import BackButton from '../../../components/BackButton';
import {Img_Paths} from '../../../assets/Imagepaths';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  FourthColor,
  SecondaryColor,
} from '../../Styles/Style';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import BackgroundWrapper from '../../../components/BackgroundWrapper';

const TermsAndConditions = () => {
  const navigation = useNavigation();
  const { LEFT_ARROW_IMG} = Img_Paths;

  return (
    <BackgroundWrapper>
      <View style={styles.first_container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.back_button}>
          <Image style={styles.left_arrow} source={LEFT_ARROW_IMG} />
        </TouchableOpacity>
        <View style={styles.categories_text_container}>
          <Text style={styles.categories_text}>Terms & Conditionss</Text>
        </View>
      </View>
      <View style={styles.container}>
      <Text style={styles.heading}>Welcome to Story Time!</Text>

      <Text style={styles.subHeading}>
        These terms and conditions outline the rules and regulations for the use of Story Time Website, located at Story Time.
      </Text>

      <Text>
        By accessing this website we assume you accept these terms and conditions. Do not continue to use if you do not agree to take all of the terms and conditions stated on this page.
      </Text>

      <Text style={styles.subHeading}>The following terminology applies:</Text>

      <Text>
        {"\n"}
        <Text style={styles.bold}>Client, You, Your:</Text> refers to you, the person who logs on this website and complies with the Company’s terms and conditions.
        {"\n\n"}
        <Text style={styles.bold}>The Company, Ourselves, We, Our, Us:</Text> refers to our Company.
        {"\n\n"}
        <Text style={styles.bold}>Party, Parties, Us:</Text> refers to both the Client and ourselves. All terms refer to the offer, acceptance, and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of Netherlands.
        {"\n\n"}
        Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to the same.
      </Text>

      <Text style={styles.subHeading}>Cookies</Text>
    </View>


    </BackgroundWrapper>
  );
};

export default TermsAndConditions;

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
  container: {
    padding: 16,
  },
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
});
