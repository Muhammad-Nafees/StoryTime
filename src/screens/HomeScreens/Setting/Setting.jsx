import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import TouchableButton from '../../../components/TouchableButton'
import NavigationsString from '../../../constants/NavigationsString';

const Setting = () => {
  const {NOTIFICATION, SUBSCRIPTION_DETAILS } = NavigationsString;
  const navigation = useNavigation()
  return (
    <View>
     <TouchableButton onPress={()=>navigation.navigate(SUBSCRIPTION_DETAILS)} text={"Navigate"}/>
    </View>
  )
}

export default Setting