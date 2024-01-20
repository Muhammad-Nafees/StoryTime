import React from 'react';
import {
  StyleSheet,
  Text,
  View,
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

const PrivacyPolicy = () => {
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
          <Text style={styles.categories_text}>Privacy Policy</Text>
        </View>
      </View>
      <View style={styles.container}>
      <Text style={styles.heading}>Terms and Conditions</Text>

      <Text style={styles.subHeading}>Please read Privacy Policy</Text>

      <Text>
        <Text style={styles.bold}>Reservation of Rights</Text>
        {'\n\n'}
        We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amend these terms and conditions and its linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.
      </Text>

      <Text>
        {'\n\n'}
        <Text style={styles.bold}>Removal of links from our website</Text>
        {'\n\n'}
        If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to do so or to respond to you directly.
      </Text>

      <Text>
        {'\n\n'}
        We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.
      </Text>

      <Text>
        {'\n\n'}
        <Text style={styles.bold}>Disclaimer</Text>
        {'\n\n'}
        To the maximum extent permitted by applicable law, we exclude all representations, warranties, and conditions relating to our website and the use of this website. Nothing in this disclaimer will:
      </Text>
    </View>

    </BackgroundWrapper>
  );
};

export default PrivacyPolicy;

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
