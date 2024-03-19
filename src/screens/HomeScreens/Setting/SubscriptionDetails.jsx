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
import Typography from '../../../components/reuseable-components/Typography';
import BackButton from '../../../components/reuseable-components/BackButton';
import { Inter_SemiBold } from '../../../constants/GlobalFonts';
import { TextColorGreen } from '../../Styles/Style';

const SubscribeBtn = () => {
  return (
    <TouchableOpacity style={[styles.sub_btn,
      {
        backgroundColor:TextColorGreen,
        opacity:0.3 //wii set on condition 
      }]}
      
    disabled={true}// condition not define
    >
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
         <BackButton
        onPress={() => navigation.goBack()}
        leftarrow={LEFT_ARROW_IMG}
      />
      </View>
     
      <ScrollView
        contentContainerStyle={{paddingHorizontal: moderateVerticalScale(25)}}>
        <View style={styles.story_time_container}>
          <Image
          resizeMode='contain'
            style={[styles.img, {width: width * 0.8, height: height * 0.3}]}
            source={STORY_TIME_IMG}
          />
        </View>
        <Bar amount={'$5.99'} period={'monthly'} />
        <Bar
          amount={'$60.00'}
          period={'annual'}
          bgColor="rgb(191, 200, 202)"
        />
        <Typography  mt={responsiveHeight(4)} bold size={18} ff={Inter_SemiBold.Inter_SemiBold}>
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
  first_container: {
    paddingTop: responsiveWidth(6),
    // paddingVertical: moderateVerticalScale(12),
    flexDirection: 'row',
    marginLeft: 'auto',
    width: responsiveWidth(95),
    alignItems: 'center',
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
    borderRadius: 10,
    alignSelf: 'center',
    paddingLeft: '3.5%',
    width: '90%',
    paddingVertical: '4%',
    marginTop: '10%',
    alignItems: 'center',
  },
});
