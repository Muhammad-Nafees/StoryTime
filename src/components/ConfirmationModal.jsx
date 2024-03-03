import Modal from 'react-native-modal';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { delete_user_account } from '../../services/api/auth_mdule/auth';
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  White,
  Black02,
  PrimaryColor,
  TextColorGreen,
} from '../screens/Styles/Style';
import Typography from './Typography';

const ConfirmationModal = forwardRef((props, ref) => {
  const {handleSuccessCallback} = props || {}

  const [isVisible, setIsVisible] = useState(false);
  const [randomWord, setRandomWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [inputError, setInputError] = useState('');

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
    if (text.trim() === '') {
      setInputError('Please type the word');
    } else {
      setInputError('');
    }
  };

  const handleCheckMatch = () => {
    if (userInput.trim().toLowerCase() === randomWord.toLowerCase()) {
      console.log('Congratulations! Matched!');
      DeleteUserAccount();
    } else {
      setInputError('Incorrect word. Please re-enter.');
    }
  };

  const open = () => {
    setIsVisible(true);
  };

  const close = () => {
    setUserInput('');
    setInputError('');
    setIsVisible(false);
  };

  useImperativeHandle(ref, () => {
    return {open};
  });

  const DeleteUserAccount = async()=> {
    try {
      const responseData = await delete_user_account();
      console.log(responseData)
      if(responseData.statusCode === 200){
        handleSuccessCallback();
        close();
      }
    } catch (error) {
      console.log('error ==> ', error?.message);
    }
  };

  return (
    <>
    <Modal
      style={{flex: 1}}
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropColor='#979797'
      onModalHide={close}
      backdropOpacity={0.98}
      onBackdropPress={close}>
      <View
        style={{
          height: inputError?responsiveHeight(35):responsiveHeight(32),
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
            error={inputError}
          />
          {inputError ? (
            <Text style={{ color: 'red', marginBottom:responsiveHeight(1),alignSelf:"flex-start",marginLeft:responsiveWidth(8) }}>{inputError}</Text>
          ) : null}
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
    </Modal>
    </>
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
