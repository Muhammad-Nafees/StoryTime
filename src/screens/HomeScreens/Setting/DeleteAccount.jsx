import React, {useEffect, useRef,useState} from 'react';
import Typography from '../../../components/Typography';
import { useNavigation } from '@react-navigation/native';
import ScreenHeader from '../../../components/ScreenHeader';
import { Black02, TextColorGreen, White} from '../../Styles/Style';
import ConfirmationModal from '../../../components/ConfirmationModal';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import { View, StyleSheet,TouchableOpacity, Keyboard } from 'react-native'
import {responsiveFontSize, responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';


const DeleteAccount = () => {
    const navigation = useNavigation();
    const ConfirmationModalRef = useRef(null);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    const modalOpen = () => {
        if (ConfirmationModalRef.current) {
            ConfirmationModalRef.current.open();
        }
     };
    
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
              setKeyboardVisible(true); // or some other action
            },
          );
          const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
              setKeyboardVisible(false); // or some other action
            },
          );   
       return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
       }
     }, [])
     

  return (
    <BackgroundWrapper disableScrollView coverScreen>
    <ScreenHeader title={'Delete Account'} />
  
    <View style={{flex:1, justifyContent:'center',alignItems:'center',paddingHorizontal:responsiveWidth(6),display:isKeyboardVisible ? 'none' : 'flex',}}>
    <Typography style={styles.heading_txt}>Delete your account?</Typography>
    <Typography style={styles.txt}>Delete your account will remove all of your account's data, contacts and other information. Are you sure you want to proceed?</Typography>
    <TouchableOpacity 
    activeOpacity={0.8}
    onPress={modalOpen}
    style={styles.button}>
        <Typography style={styles.button_txt}>Delete</Typography>
    </TouchableOpacity>
    <TouchableOpacity 
    activeOpacity={0.9}
    onPress={()=>navigation.goBack()}>
    <Typography style={styles.txt}>Cancel</Typography>
    </TouchableOpacity>
    </View>
    <ConfirmationModal ref={ConfirmationModalRef}/>
    </BackgroundWrapper>
  )
}
const styles = StyleSheet.create({
    heading_txt: {    
      fontSize: responsiveFontSize(2.5) ,
      color:Black02,
      fontWeight:'900',
      textAlign:'center',
      marginBottom:responsiveHeight(3)
    },
    txt:{
      fontSize: responsiveFontSize(2),
      color:Black02,
      fontWeight:'400',
      textAlign:'center' ,
      marginBottom:responsiveHeight(3),

    },
    button_txt:{
        fontSize: responsiveFontSize(2),
        color:White,
        fontWeight:'400',
        textAlign:'center',
        marginBottom:'auto',
        marginTop:'auto'
      },
    button:{
        width:responsiveWidth(70),
        height:responsiveHeight(6),
        borderRadius:8,
        backgroundColor:TextColorGreen,
        marginBottom:responsiveHeight(2)
      },
  });
export default DeleteAccount