// @ts-nocheck
import { View } from 'react-native'
import React from 'react'
import ProfileIcon from "../../assets/svgIcons/profile.svg"


const SvgIcons = (name, height, width,backgroundColor='transparent') => {
switch (name) {
    case 'ProfileIcon': return( <ProfileIcon width={width} height={height} style={{backgroundColor:backgroundColor}}/>);

    default:
      return (
        <View style={{backgroundColor:backgroundColor}}>
        {/* <MaterialIcons
        name ={'image'}
        color= {color}
        size={((Number(height)+ Number(width))/2)}
        /> */}
        <Text>image</Text>
        </View>
      );
    }
};

export default SvgIcons