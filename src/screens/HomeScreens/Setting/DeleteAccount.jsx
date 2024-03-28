import SuccessModal from '../../../components/reusable-components/modals/SuccessModal';
import React, { useEffect, useRef, useState } from 'react';
import Typography from '../../../components/reusable-components/Typography';
import { useNavigation } from '@react-navigation/native';
import ScreenHeader from '../../../components/reusable-components/ScreenHeader';
import { Black02, TextColorGreen, White } from '../../Styles/Style';
import ConfirmationModal from '../../../components/reusable-components/modals/ConfirmationModal';
import BackgroundWrapper from '../../../components/reusable-components/BackgroundWrapper';
import { View, StyleSheet, TouchableOpacity, Keyboard } from 'react-native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useLogout } from '../../../hooks/useLogout';
import { BlurView } from '@react-native-community/blur';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants/Constant';
import { Inter_Regular, Inter_SemiBold } from '../../../constants/GlobalFonts';


const DeleteAccount = () => {
  const navigation = useNavigation();
  const { handleLogout } = useLogout()
  const ConfirmationModalRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const handleDeleteUser = async () => {
    try {
      setIsLoading(true);
      await handleLogout()
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  const modalOpen = () => {
    if (ConfirmationModalRef.current) {
      ConfirmationModalRef.current.open();
    }
  };
  const isBlurred = () => {
    return !!successModalVisible
  }

  return (
    <BackgroundWrapper disableScrollView coverScreen>
      <ScreenHeader title={'Delete Account'} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: responsiveWidth(6) }}>
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
          onPress={() => navigation.goBack()}>
          <Typography style={[styles.button_txt, { color: TextColorGreen, marginTop: responsiveHeight(0.9) }]}>Cancel</Typography>
        </TouchableOpacity>
      </View>
      {
        isBlurred() &&
        <BlurView style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH, position: 'absolute' }}></BlurView>
      }
      <ConfirmationModal ref={ConfirmationModalRef} handleSuccessCallback={() => setSuccessModalVisible(true)} />
      <SuccessModal text={"Account Deleted"} textButton={'Return'} isVisible={successModalVisible} setVisible={setSuccessModalVisible} iconName={"Success"} onPress={handleDeleteUser} loading={isLoading} />
    </BackgroundWrapper>
  )
}
const styles = StyleSheet.create({
  heading_txt: {
    fontSize: responsiveFontSize(2.5),
    color: Black02,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: responsiveHeight(3),
    fontFamily: Inter_Regular.Inter_Regular
  },
  txt: {
    fontSize: responsiveFontSize(1.8),
    color: Black02,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: responsiveHeight(3),
    fontFamily: Inter_Regular.Inter_Regular
  },
  button_txt: {
    fontSize: responsiveFontSize(1.8),
    color: White,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 'auto',
    marginTop: 'auto',
    letterSpacing: 0.2,
    lineHeight: 16.94,
    fontFamily: Inter_SemiBold.Inter_SemiBold,

  },
  button: {
    width: responsiveWidth(70),
    height: responsiveHeight(6),
    borderRadius: 8,
    backgroundColor: TextColorGreen,
    marginBottom: responsiveHeight(2)
  },
});
export default DeleteAccount
