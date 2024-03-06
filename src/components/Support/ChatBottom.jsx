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
import UploadImage from '../UploadImage';

const ChatBottom = ({setReload, reload, chatID}) => {
  const {GALLERY_ICON, CAMERA__ICON, MESSAGE_SEND} = Img_Paths;
  const [profileImage, setProfileImage] = React.useState(null);
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const uploadProfileImageRef = React.useRef(null);

  const modalOpen = ref => {
    if (ref.current) {
      ref.current.open();
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
    console.log('🚀 andar ka data', data);
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
        <TouchableOpacity onPress={() => modalOpen(uploadProfileImageRef)}>
          <Image source={GALLERY_ICON} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => modalOpen(uploadProfileImageRef)}>
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
          <TouchableOpacity onPress={handleSendMessage}>
            <Image source={MESSAGE_SEND} />
          </TouchableOpacity>
        ) : (
          <View style={styles.loading}>
            <ActivityIndicator color="#395E66" />
          </View>
        )}
      </View>
      <UploadImage
        uploadImageRef={uploadProfileImageRef}
        setImage={setProfileImage}
      />
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
    color: '#AAAAAA',
    paddingHorizontal: 17,
    paddingVertical: 7,
  },
});
