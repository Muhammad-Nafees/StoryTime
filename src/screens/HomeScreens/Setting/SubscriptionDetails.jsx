import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import ElementsBgWrapper from '../../../components/ElementsBgWrapper';
import {moderateVerticalScale} from 'react-native-size-matters';
import {Img_Paths} from '../../../assets/Imagepaths';
import {useNavigation} from '@react-navigation/native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Typography from '../../../components/Typography';

const SubscribeBtn = () => {
  return (
    <TouchableOpacity style={styles.sub_btn}>
      <Typography clr={'#FFF'}>Subscribe</Typography>
    </TouchableOpacity>
  );
};

const Bar = ({amount, period, bgColor = '#2F4F56'}) => {
  return (
    <View style={{...styles.bar, backgroundColor: bgColor}}>
      <Typography clr={'#FFF'} style={{}}>
        {amount}
      </Typography>
      <Typography clr={'#FFF'}>/{period}</Typography>
    </View>
  );
};

const SubscriptionDetails = () => {
  const {STORY_TIME_IMG, LEFT_ARROW_IMG} = Img_Paths;
  const {width, height} = Dimensions.get('window');
  const navigation = useNavigation();

  return (
    <ElementsBgWrapper>
      <View style={styles.first_container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.back_button}>
          <Image style={styles.left_arrow} source={LEFT_ARROW_IMG} />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{paddingHorizontal: moderateVerticalScale(25)}}>
        <View style={styles.story_time_container}>
          <Image
            style={[styles.img, {width: width * 0.8, height: height * 0.3}]}
            source={STORY_TIME_IMG}
          />
        </View>
        <Bar amount={'$5.99'} period={'monthly'} />
        <Bar
          amount={'$60.00'}
          period={'annual'}
          bgColor="rgba(204, 204, 204, 0.9)"
        />
        <Typography mt={'5%'} bold size={18}>
          Your Subsciption
        </Typography>
        <Bar amount={'$60.00'} period={'annual'} />
        <SubscribeBtn />
        <View style={{paddingBottom: 100}} />
      </ScrollView>
    </ElementsBgWrapper>
  );
};

export default SubscriptionDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
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
  img: {
    marginVertical: moderateVerticalScale(8),
    resizeMode: 'center',
  },
  story_time_container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar: {
    alignSelf: 'center',
    width: '100%',
    borderWidth: 3,
    borderColor: '#CCCCCC',
    borderRadius: 18,
    paddingLeft: '3.5%',
    paddingVertical: '2%',
    marginTop: '3%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  sub_btn: {
    backgroundColor: '#395E66',
    borderRadius: 10,
    alignSelf: 'center',
    paddingLeft: '3.5%',
    width: '90%',
    paddingVertical: '4%',
    marginTop: '10%',
    alignItems: 'center',
  },
});
