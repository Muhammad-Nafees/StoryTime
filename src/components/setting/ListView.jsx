import React from 'react';
import SvgIcons from '../svgIcon/svgIcons';
import {Black02} from '../../screens/Styles/Style';
import {responsiveFontSize, responsiveWidth} from 'react-native-responsive-dimensions';
import {View, StyleSheet, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import NavigationsString from '../../constants/NavigationsString';
import Typography from '../reuseable-components/Typography';
import {SPACING} from '../../constants/Constant';
import { Inter_Regular } from '../../constants/GlobalFonts';

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
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.svgIcon}>
            <SvgIcons name={item.iconName} width={24} height={24} />
          </View>
          <Typography style={styles.txt}>{item.text} </Typography>
        </View>
        <View style={styles.svgIcon}>
          <SvgIcons name={'ForwardArrow'} width={24} height={24} />
        </View>
      </View>
      {isLastItem ? <View style={[styles.withLine]} /> : <View />}
    </TouchableOpacity>
  );
};

export default ListView;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingVertical:SPACING
  },
  withLine: {
    borderBottomWidth: 1,
    borderBottomColor: Black02,
    width: width - 75,
    marginLeft: responsiveWidth(7),
    marginVertical: responsiveWidth(0.5),
  },
  svgIcon: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  txt: {
    textAlignVertical: 'center',
    marginLeft: SPACING,
    fontFamily:Inter_Regular.Inter_Regular,
    fontWeight:'400',
    fontSize:12
  },
});
