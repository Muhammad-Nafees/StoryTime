import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Typography from '../reusable-components/Typography';
import { Img_Paths } from '../../assets/Imagepaths';
import ImageCropPicker from 'react-native-image-crop-picker';
import { responsiveHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';

const MessageBox = ({ profileImage, setProfileImage, input, setInput }) => {
  const { CAMERA_ICON } = Img_Paths;

  const handleGalleryPress = async () => {
    try {
      const image = await ImageCropPicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });
      if (!image.didCancel) {
        setProfileImage({ uri: image.path });
        return image.path;
      } else {
        return null;
      }
    } catch (error) {
      console.log('Error selecting image from gallery:', error);
      return null;
    }
  };
  return (
    <ScrollView contentContainerStyle={{
      paddingBottom: responsiveHeight(20)
    }
    }>
      <View style={styles.container}>
        <Typography style={styles.label}>Your Message</Typography>
        <TextInput
          style={styles.input}
          multiline={true}
          placeholder="Type here"
          placeholderTextColor="#AAAAAA"
          onChangeText={e => setInput(e)}
          value={input}
        />
        <TouchableOpacity
          style={styles.camera_container}
          onPress={handleGalleryPress}>
          <Image
            resizeMode='contain'
            style={profileImage && styles.image}
            source={profileImage ? { uri: profileImage.uri } : CAMERA_ICON}
            height={50}
            width={50}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.camera_container}
          onPress={() => profileImage ? setProfileImage(null) : handleGalleryPress()}>
          <Typography style={styles.camera_text}>
            {profileImage ? 'Cancel Image' : 'Attach Image or Proof'}
          </Typography>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
};

export default MessageBox;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 15,
  },
  label: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 24,
    color: '#395E66',
  },
  input: {
    backgroundColor: '#F3F3F3',
    minHeight: 275.41,
    textAlignVertical: 'top',
    padding: 18,
    borderRadius: 19.46,
    fontSize: 14,
    lineHeight: 24,
    color: 'black',
  },
  camera_container: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  camera_text: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 24,
    color: '#AAAAAA',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
});
