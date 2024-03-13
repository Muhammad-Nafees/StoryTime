import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Img_Paths} from '../../assets/Imagepaths';
import {sendMessage} from '../../../services/api/support';
import ImageCropPicker from 'react-native-image-crop-picker';

const ChatBottom = ({setReload, reload, chatID}) => {
  const {GALLERY_ICON, CAMERA__ICON, MESSAGE_SEND} = Img_Paths;
  const [profileImage, setProfileImage] = React.useState(null);
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [sendDisabled, setSendDisabled] = React.useState(true);

  React.useEffect(() => {
    setSendDisabled(input.trim().length === 0);
  }, [input]);

  const handleGalleryPress = async () => {
    try {
      const image = await ImageCropPicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });
      if (!image.didCancel) {
        setProfileImage({uri: image.path});
        return image.path;
      } else {
        return null;
      }
    } catch (error) {
      console.log('Error selecting image from gallery:', error);
      return null;
    }
  };

  const handleCameraPress = async () => {
    try {
      const image = await ImageCropPicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      });
      if (!image.didCancel) {
        setProfileImage({uri: image.path});
        return image.path;
      } else {
        return null;
      }
    } catch (error) {
      console.log('Error taking picture with camera:', error);
      return null;
    }
  };
  const handleSendMessage = async () => {
    const image = profileImage?.uri && {profileImage: profileImage?.uri};
    const payload = {
      text: input,
      media: image,
      chat: chatID,
    };
    setLoading(true);
    const response = await sendMessage(payload);
    const data = response.data;
    if (response?.statusCode === 200) {
      setReload(!reload);
      setInput('');
      setLoading(false);
      setProfileImage(null);
    }
  };
  return (
    <View k style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={handleGalleryPress}>
          <Image style={{marginHorizontal: 5}} source={GALLERY_ICON} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCameraPress}>
          <Image source={CAMERA__ICON} />
        </TouchableOpacity>
        <TextInput
          placeholder="Send Message"
          placeholderTextColor="#AAAAAA"
          style={styles.inputfield}
          onChangeText={e => setInput(e)}
          value={input}
        />
        {!loading ? (
          <TouchableOpacity
            onPress={sendDisabled ? null : handleSendMessage}
            disabled={sendDisabled}>
            <Image source={MESSAGE_SEND} />
          </TouchableOpacity>
        ) : (
          <View style={styles.loading}>
            <ActivityIndicator size="small" color="#395E66" />
          </View>
        )}
      </View>
    </View>
  );
};

export default ChatBottom;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18.5,
    backgroundColor: '#FFF',
    height: 74,
    justifyContent: 'center',
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputfield: {
    borderWidth: 1,
    borderColor: '#AAAAAA',
    borderRadius: 15,
    width: 255,
    height: 30,
    fontSize: 12,
    lineHeight: 14.52,
    color: '#000',
    paddingHorizontal: 17,
    paddingVertical: 7,
    marginHorizontal: 5,
  },
});
