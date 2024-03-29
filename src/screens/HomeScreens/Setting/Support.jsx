import React from 'react';
import MessageList from '../../../components/Support/MessageList';
import {BackgroundWrapper,ScreenHeader} from '../../../components';
import SupportButton from '../../../components/Support/SupportButton';


const Support = ({ navigation }) => {

  const handleScreen = () => {
    navigation.navigate('SupportMessage');
  };

  return (
    <BackgroundWrapper disableScrollView coverScreen>
      <ScreenHeader title={'Support'} />
      <MessageList />
      <SupportButton title={'Send New Message'} onpress={handleScreen} />
    </BackgroundWrapper>
  );
};

export default Support;