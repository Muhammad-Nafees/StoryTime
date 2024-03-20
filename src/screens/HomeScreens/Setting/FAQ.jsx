import React from 'react';
import {
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Img_Paths } from '../../../assets/Imagepaths';
import {
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { moderateScale } from 'react-native-size-matters';
import BackgroundWrapper from '../../../components/reusable-components/BackgroundWrapper';
import ScreenHeader from '../../../components/reusable-components/ScreenHeader';
import { Inter_Regular } from '../../../constants/GlobalFonts';


const Section = ({ txt }) => {
  return (
    <Text
      style={{
        color: '#000',
        fontSize: responsiveFontSize(1.9),
        fontWeight: '400',
        lineHeight: 24,
        marginTop: moderateScale(10),
        marginBottom: moderateScale(10),
        fontFamily: Inter_Regular.Inter_Regular
      }}>
      {txt}
    </Text>
  );
};

const FAQ = () => {

  return (
    <BackgroundWrapper
      contentContainerStyle={{
        paddingHorizontal: moderateScale(20),
      }}>
      <ScreenHeader title={'FAQ'} />

      <Section txt={'How do I reset my password?'} />
      <Section
        txt={
          'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim.'
        }
      />

      <Section txt={'How can I use Story Time?'} />
      <Section
        txt={
          'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim.'
        }
      />

      <Section txt={'How can I find a good story?'} />
      <Section
        txt={
          'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim.'
        }
      />
    </BackgroundWrapper>
  );
};

export default FAQ;
