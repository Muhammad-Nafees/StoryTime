import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {Inter_Regular} from '../../constants/GlobalFonts';

const Typography = props => {
  const {mt, ml, mr, mb, style,size, children,lh,clr,thin,heavy,bold,ff,...rest} = props || {};

  const styleComponent = [
    {
      color: '#000000',
      fontSize: responsiveFontSize(1.9),
      fontWeight: '400',
      lineHeight: 24,
      fontFamily: Inter_Regular.Inter_Regular,

      //   ...(h1 && {fontSize: 22}),
      //   ...(h2 && {fontSize: 20}),
      //   ...(h3 && {fontSize: 18}),
      //   ...(h4 && {fontSize: 16}),
      //   ...(h5 && {fontSize: 14}),
      ...(thin && {fontWeight: '200'}),
      ...(heavy && {fontWeight: '500'}),
      ...(bold && {fontWeight: 'bold'}),
      ...(size && {fontSize: size}),
      ...(lh && {lineHeight: lh}),
      ...(mt && {marginTop: mt}),
      ...(ml && {marginLeft: ml}),
      ...(mr && {marginRight: mr}),
      ...(mb && {marginBottom: mb}),
      ...(clr && {color: clr}),
      ...(ff && {fontFamily: ff})

      //   ...(center && {textAlign: 'center'}),
    },
    style,
  ];

  return (
    <Text style={styleComponent} {...rest}>
      {children}
    </Text>
  );
};

export default Typography;

const styles = StyleSheet.create({});
