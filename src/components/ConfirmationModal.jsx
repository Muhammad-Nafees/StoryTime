import Modal from 'react-native-modal';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {delete_user_account} from '../../services/api/auth_mdule/auth';
import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import {
  Black02,
  PrimaryColor,
  TextColorGreen,
  White,
} from '../screens/Styles/Style';
import Typography from './Typography';
// import StoryTimeSaved from './playFlow/StoryTimeSaved';

const ConfirmationModal = forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [randomWord, setRandomWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    generateRandomWord();
  }, []); 

  const generateRandomWord = () => {
    const wordsList = ['STORYTIME'];
    const randomIndex = Math.floor(Math.random() * wordsList.length);
    const newRandomWord = wordsList[randomIndex];
    console.log(newRandomWord);
    setRandomWord(newRandomWord);
  };

  const handleInputChange = (text) => {
    setUserInput(text);
  };

  const handleCheckMatch = () => {
    if (userInput.toLowerCase() === randomWord.toLowerCase()) {
      console.log('Congratulations! Matched!');
      close()
      setUserInput('');
      // setIsSuccess(true)
    } else {
      console.log('Try again. Not matched.');
    }
  };

  const open = () => {
    setIsVisible(true);
  };

  const close = () => {
    setIsVisible(false);
  };

  useImperativeHandle(ref, () => {
    return {open};
  });

  const DeleteUserAccount = async()=> {
    try {
      const responseData = await delete_user_account();
      if(responseData.status === '200'){
        close();
        setUserInput('');
        // setIsSuccess(true)
      } 
    } catch (error) {
      console.log('error ==> ', error?.message);
    }
  };

  return (
    <Modal
      style={{flex: 1}}
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onModalHide={close}
      backdropOpacity={0.7}
      onBackdropPress={close}>
      <View
        style={{
          height: responsiveHeight(32),
          width: responsiveWidth(85),
          borderRadius: 32,
          backgroundColor: White,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Typography
          style={{
            fontSize: responsiveFontSize(2.5),
            fontWeight: '600',
            textAlign: 'center',
            lineHeight: 20,
            marginTop: responsiveHeight(4),
          }}>
          Confirmation
        </Typography>
        <Typography
          style={{
            textAlign: 'center',
            fontSize: 15,
            fontWeight: '400',
            padding: responsiveWidth(6),
          }}>
          Please enter the word "
          <Text style={{color: Black02}}>{randomWord}" </Text>
          to continue deleting your account.
        </Typography>
        <TextInput
          style={styles.input}
          placeholder="Type the word"
          onChangeText={handleInputChange}
          value={userInput}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            borderTopWidth: 0.6,
            borderColor: PrimaryColor,
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              borderRightWidth: 0.6,
              borderColor: PrimaryColor,
              height: responsiveHeight(7),
              alignItems: 'center',
              paddingTop: responsiveWidth(4),
            }}
            onPress={() => close()}>
            <Text
              style={{
                fontSize: 12,
                lineHeight: 16,
                color: PrimaryColor,
                textAlign: 'center',
              }}>
              {' '}
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 1, paddingTop: responsiveWidth(4)}}
            onPress={() => handleCheckMatch()}>
            <Text
              style={{
                fontSize: 12,
                lineHeight: 16,
                textAlign: 'center',
                height: responsiveHeight(7),
                color: TextColorGreen,
              }}>
              {' '}
              Ok
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <StoryTimeSaved text={"Account Deleted"} textButton={'Return'} isVisible={isSuccess} setVisible={setIsSuccess}/> */}
    </Modal>
  );
});
const styles = StyleSheet.create({
  input: {
    height: responsiveWidth(12),
    borderColor: PrimaryColor,
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 10,
    width: responsiveWidth(70),
    marginBottom: responsiveWidth(3),
  },
});
export default ConfirmationModal;
