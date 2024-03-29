import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
} from 'react-native';
import React from 'react';
import { Img_Paths } from '../../assets/Imagepaths';
import { sendMessage } from '../../../services/api/support';
import ImageCropPicker from 'react-native-image-crop-picker';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { Typography } from '../index';
const ChatBottom = ({ setMessageList, messageList, chatID }) => {
  const { GALLERY_ICON, CAMERA__ICON, MESSAGE_SEND } = Img_Paths;
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

  const handleCameraPress = async () => {
    try {
      const image = await ImageCropPicker.openCamera({
        width: 300,
        height: 400,
      });
      if (!image.didCancel) {
        setProfileImage({ uri: image.path });
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
    try {
      const image = profileImage?.uri && { profileImage: profileImage?.uri };
      const payload = {
        text: input,
        media: image,
        chat: chatID,
      };
      setLoading(true);
      const response = await sendMessage(payload);
      const data = response.data;
      if (response?.statusCode === 200) {
        setMessageList([...messageList, data]);
        setInput('');
        setLoading(false);
        setProfileImage(null);
      }
    } catch (error) {
      console.log('🚀 ~ handleSendMessage ~ error:', error);
    }
  };
  return (
    <View
      style={[
        styles.container,
        { height: profileImage ? responsiveHeight(12) : responsiveHeight(8) },
      ]}>
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={handleGalleryPress}>
          <Image style={{ marginHorizontal: 5 }} source={GALLERY_ICON} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCameraPress}>
          <Image source={CAMERA__ICON} />
        </TouchableOpacity>
        <View
          style={{
            height: profileImage ? responsiveHeight(9) : responsiveHeight(4.5),
            borderColor: '#AAAAAA',
            borderWidth: 1,
            borderRadius: 15,
            marginHorizontal: 5,
            paddingHorizontal: 10,
            width: responsiveWidth(70),
          }}>
          <TextInput
            placeholder="Send Message"
            placeholderTextColor="#AAAAAA"
            style={[styles.inputfield, profileImage && { paddingLeft: 0 }]}
            onChangeText={e => setInput(e)}
            value={input}
            multiline={true}
          />
          <View>
            {profileImage && (
              <>
                <View style={{ width: 100 }}>
                  <ImageBackground
                    resizeMode="contain"
                    source={{ uri: profileImage.uri }}
                    style={styles.selectedImage}></ImageBackground>
                  <TouchableOpacity
                    style={styles.crossButton}
                    onPress={() => setProfileImage(null)}>
                    <Typography style={styles.cross}>{'×'}</Typography>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
        {!loading ? (
          <TouchableOpacity
            style={{ opacity: sendDisabled ? 0.3 : 1 }}
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
    justifyContent: 'center',
    paddingBottom: responsiveHeight(1.5),
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputfield: {
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 15,
    width: '100%',
    height: responsiveHeight(4.5),
    fontSize: responsiveFontSize(1.5),
    lineHeight: 14.52,
    color: '#000',
    textAlignVertical: 'center',
  },
  selectedImage: {
    width: 30,
    height: 30,
    borderRadius: 2,
    position: 'absolute',
    left: 15,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  crossButton: {
    alignSelf: 'center',
    bottom: 15,
    marginLeft: 5,
  },
  cross: {
    color: '#AAAAAA',
    fontSize: 15,
  },
});
