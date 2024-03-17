import React from 'react'
import { ImageBackground, View, StyleSheet, } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from "../../../assets/Imagepaths/index";
import BackButton from '../../../components/reusable-components/addplayer/customBackButton/BackButton';
import VoiceToText from '../../../components/categories/VoiceToText';
import { useDispatch, useSelector } from 'react-redux';
import { isCheckValue, isExtendStoryCheck, nextRandomNum, nextRandomNumExtend } from '../../../../store/slices/addplayers/addPlayersSlice';


const GoNextPlayer = () => {

    const { BG_PLAYFLOW, NEXT_PLAYER_IMAGE, CONTINUE_IMAGE, EXTEND_STORYTIME_IMAGE, } = Img_Paths;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { isExtendStory, } = useSelector(state => state?.addPlayers);

    const extendStoryHandler = () => {
        const randomvalue = Math.floor(Math.random() * 100);
        dispatch(isCheckValue(false));
        dispatch(nextRandomNumExtend(randomvalue));
        dispatch(isExtendStoryCheck(true));
        navigation.navigate("StartRecordingVoice");
    };

    const nextUserHandler = () => {
        const randomvalue = Math.floor(Math.random() * 100);
        dispatch(isCheckValue(true));
        dispatch(isExtendStoryCheck(false));
        dispatch(nextRandomNum(randomvalue))
        navigation.navigate("StartRecordingVoice");
    };

    return (
        <ImageBackground style={styles.container} source={BG_PLAYFLOW}>
            <View>
                {/* Back Button */}
                <BackButton onPress={() => navigation.goBack()} />
                <View style={styles.container}>
                    <View style={{ width: responsiveWidth(90), }}>
                        <VoiceToText
                            onPress={extendStoryHandler}
                            BackgroundImage={!isExtendStory ? EXTEND_STORYTIME_IMAGE : CONTINUE_IMAGE}
                        />

                        <VoiceToText text="Next Player"
                            onPress={nextUserHandler}
                            BackgroundImage={NEXT_PLAYER_IMAGE}
                        />
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
};



const styles = StyleSheet.create({

    img: {
        resizeMode: "center"
    },
    container: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: moderateVerticalScale(10),
        flex: 1
    },

});

export default GoNextPlayer;
