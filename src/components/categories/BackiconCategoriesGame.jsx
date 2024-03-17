import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { TouchableOpacity, Image } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';

const BackiconCategoriesGame = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ paddingTop: responsiveWidth(12) }}
        >
            <Image
                style={{
                    width: 25,
                    height: 25,
                    resizeMode: 'center',
                }}
                source={require('../../assets/back-playflowicon.png')}
            />
        </TouchableOpacity>
    )
}

export default BackiconCategoriesGame;
