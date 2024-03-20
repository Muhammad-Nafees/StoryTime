import { View, Text } from 'react-native'
import React from 'react'
import { View, Dimensions } from 'react-native'
import BackButton from '../reusable-components/addplayer/customBackButton/BackButton';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import { Img_Paths } from '../../assets/Imagepaths';
const SelectNextPlayerContent = () => {
    const navigation = useNavigation();

    return (
        <View
            style={{
                height: SCREEN_HEIGHT / 1,
            }}>
            <View style={{ paddingTop: responsiveWidth(10) }}>
                <BackButton onPress={() => navigation.goBack()} />
            </View>
            {/* Back Button */}
            <View style={{ paddingTop: responsiveWidth(15) }}>
                <VoiceToText
                    onPress={() => navigation.navigate("StartGame")}
                    text="Voice to Text"
                    BackgroundImage={FIRST_VOICE_TO_TEXT_IMAGE}
                />
                <VoiceToText
                    onPress={() => navigation.navigate("VideoFirstStartScreen`")}
                    text="Video"
                    BackgroundImage={VIDEO_IMAGE}
                />
            </View>
        </View>
    )
}

export default SelectNextPlayerContent
