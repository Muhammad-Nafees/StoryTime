import React from 'react'
import SvgIcons from './svgIcon/svgIcons';
import { View, Text, StyleSheet } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet';
import {
    Black02,
    White
  } from '../screens/Styles/Style';
import { TouchableOpacity } from 'react-native-gesture-handler';

const UploadImage = ({uploadImageRef}) => {
  return (
    <RBSheet
    ref={uploadImageRef}
    closeOnDragDown={true}
    closeOnPressMask={true}
    height={267}
    customStyles={{
      wrapper: {
        backgroundColor: "rgba(0,0,0,0.5)", //above bottom bar
      },
      container: {
        backgroundColor: White,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingHorizontal:10,
        paddingVertical:15
      },
      draggableIcon: {
        backgroundColor: Black02,
      },
    }}>
  
     <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}> 
        <View style={styles.svgIcon}>
            <SvgIcons name={'UploadImage'} width={24} height={24} />
          </View>
            <Text style={{color:"#101010",  fontWeight: '500',fontSize:14,marginLeft:10 }}>Upload picture</Text>
    </TouchableOpacity>
  </RBSheet>
  )
}

export default UploadImage

const styles = StyleSheet.create({
    svgIcon: {
      marginTop: 'auto',
      marginBottom: 'auto',
    },
  });
  