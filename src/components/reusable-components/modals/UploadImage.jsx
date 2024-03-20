import React, { useState } from 'react'
import SvgIcons from '../../svgIcon/svgIcons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  Black02,
  White
} from '../../../screens/Styles/Style';
import ImageCropPicker from 'react-native-image-crop-picker';
import { BlurView } from '@react-native-community/blur';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { Poppins_Regular } from '../../../constants/GlobalFonts';

const UploadImage = ({ uploadImageRef, setImage }) => {

  const openImagePicker = async () => {
    try {
      const options = {
        cropping: true,
        mediaType: 'photo',
        cropperCircleOverlay: true,
        // Add other options as needed
      };

      const response = await ImageCropPicker.openPicker(options);

      if (!response.didCancel) {
        setImage({ uri: response.path });
        return response.path;
      } else {
        return null; // Return null if the user cancels
      }
    } catch (error) {
      console.log('Error in opening image picker:', error);
      return null;
    }
  };

  return (
    <RBSheet
      ref={uploadImageRef}
      closeOnDragDown={true}
      closeOnPressMask={true}
      height={250}
      customStyles={{
        wrapper: {
          backgroundColor: "rgba(64, 64, 64, 0.98)", //above bottom bar
        },
        container: {
          backgroundColor: White,
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          paddingHorizontal: responsiveWidth(5),
          paddingVertical: 15
        },
        draggableIcon: {
          backgroundColor: Black02,
        },
      }}>
      <TouchableOpacity onPress={openImagePicker} style={{ flexDirection: 'row', alignItems: 'center',marginTop:responsiveHeight(2) }}>
        <View style={styles.svgIcon}>
          <SvgIcons name={'UploadImage'} width={responsiveWidth(8)} height={responsiveHeight(5)} />
        </View>
        <Text style={{ color: "#101010", fontWeight: '600', fontSize:responsiveFontSize(2), marginLeft: 10,fontFamily:Poppins_Regular.Poppins_regular }}>Upload picture</Text>
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
  blur_view: {
    width:responsiveWidth(100),
    height:responsiveHeight(100),
    alignContent:'center',
    justifyContent:'center',
    alignSelf:'center',
  },
  blur_content_container: {
    backgroundColor: 'transparent',
 
  },
});
