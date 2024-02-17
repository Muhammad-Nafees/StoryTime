import React, { useState } from 'react';
import SvgIcons from './svgIcon/svgIcons';
import { TextInput, View, StyleSheet} from 'react-native';
import { moderateVerticalScale } from 'react-native-size-matters';
import { responsiveWidth } from 'react-native-responsive-dimensions';

const SearchField = ({ placeholder,searchTerm, setSearchTerm }) => {

  const handleSearch = text => {
    setSearchTerm(text);
  };

  return (
    <View style={styles.text_Input_container}>
    <View style={styles.text_input_child}>
    <View style={styles.svgIcon}>
    <SvgIcons name={'Search'} width={20} height={20} />
    </View>
      <TextInput
        placeholder={placeholder}
        onChangeText={handleSearch}
        value={searchTerm}
        placeholderTextColor={"#000"}
        style={styles.input_field}
      />
    </View>
</View>
  );
};

const styles = StyleSheet.create({
    text_Input_container: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: moderateVerticalScale(2),
        marginBottom:moderateVerticalScale(10)

    },
    text_input_child: {
        flexDirection: 'row',
        width: responsiveWidth(90),
        borderRadius: 25,
        backgroundColor: '#FFF',
        paddingHorizontal:responsiveWidth(5)

    },
    input_field: {
        paddingLeft: 10,  
        color: "#000"
    },
    svgIcon:{
        marginBottom:'auto',
        marginTop:'auto'
    }
})

export default SearchField;

