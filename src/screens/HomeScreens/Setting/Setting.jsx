import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import TouchableButton from '../../../components/TouchableButton'
import NavigationsString from '../../../constants/NavigationsString';

const Setting = () => {
  const {NOTIFICATION } = NavigationsString;
  const navigation = useNavigation()
  return (
    <View>
     <TouchableButton onPress={()=>navigation.navigate(NOTIFICATION)} text={"Navigate"}/>
    </View>
  )
}

export default Setting