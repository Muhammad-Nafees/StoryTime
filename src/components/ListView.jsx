import React from 'react';
import SvgIcons from './svgIcon/svgIcons';
import {Black02} from '../screens/Styles/Style';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import NavigationsString from '../constants/NavigationsString';

const {width, height} = Dimensions.get('window');

const ListView = ({item, isLastItem}) => {
  const navigation = useNavigation();

  const handleOnPress = () => {
    if (item.stack) {
      navigation.navigate(item.stack, {
        screen: item.routeName,
      });
    } else if (item.routeName) {
      navigation.navigate(item.routeName);
    }
  };

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.svgIcon}>
            <SvgIcons name={item.iconName} width={20} height={20} />
          </View>
          <Text style={styles.txt}>{item.text} </Text>
        </View>
        <View style={styles.svgIcon}>
          <SvgIcons name={'ForwardArrow'} width={18} height={18} />
        </View>
      </View>
      {isLastItem ? (
        <View style={[styles.withLine]}>
          <Text></Text>
        </View>
      ) : (
        <View>
          <Text></Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ListView;

const styles = StyleSheet.create({
  withLine: {
    borderBottomWidth: 1,
    borderBottomColor: Black02,
    width: width - 75,
    marginLeft: responsiveWidth(7),
    marginBottom: responsiveWidth(3),
  },
  svgIcon: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  txt: {
    textAlignVertical: 'center',
    marginLeft: 5,
  },
});
