import React ,{useEffect} from 'react';
import BackgroundWrapper from '../../../components/reuseable-components/BackgroundWrapper';
import MessageList from '../../../components/Support/MessageList';
import SupportButton from '../../../components/Support/SupportButton';
import socketServcies from '../../../../services/sockets';
import ScreenHeader from '../../../components/reuseable-components/ScreenHeader';

const Support = ({navigation}) => {

  useEffect(()=>{
    socketServcies.initializeSocket()
  },[])
  
  useEffect(() => {
    socketServcies.on('received_message',(msg)=>{
      console.log('message received in App',msg)
    })
  }, [])

  const handleScreen = () => {
    navigation.navigate('SupportMessage');
  };
  return (
    <BackgroundWrapper disableScrollView coverScreen>
      <ScreenHeader title={'Support'}/>
      <MessageList />
      <SupportButton title={'Send New Message'} onpress={handleScreen} />
    </BackgroundWrapper>
  );
};

export default Support;

