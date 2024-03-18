import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import Typography from '../Typography';
import {Img_Paths} from '../../assets/Imagepaths';
import UploadImage from '../UploadImage';

const MessageBox = ({profileImage, setProfileImage, input, setInput}) => {
  const uploadProfileImageRef = React.useRef(null);

  const {CAMERA_ICON} = Img_Paths;
  const modalOpen = ref => {
    if (ref.current) {
      ref.current.open();
    }
  };
  return (
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
        onPress={() => modalOpen(uploadProfileImageRef)}>
        <Image
          style={profileImage && styles.image}
          source={profileImage ? {uri: profileImage.uri} : CAMERA_ICON}
          height={50}
          width={50}
        />
        <Typography style={styles.camera_text}>
          {profileImage ? 'Change Image' : 'Attach Image or Proof'}
        </Typography>
      </TouchableOpacity>
      <UploadImage
        uploadImageRef={uploadProfileImageRef}
        setImage={setProfileImage}
      />
    </View>
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
