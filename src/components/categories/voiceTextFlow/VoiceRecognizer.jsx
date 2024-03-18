import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function VoiceRecongizer({
    micName = 'mic',
    givenSetText,
    callBack
}) {

    const [speaking, setSpeaking] = useState(false);
    const [text, setText] = useState('');

    useEffect(() => {
        function onSpeechStart(e) {
            console.log('onSpeechStart: ', e);
            setSpeaking(true);
        }
        function onSpeechEnd(e) {
            console.log('onSpeechEnd: ', e);
            setSpeaking(false);
        }

        function onSpeechResults(e) {
            console.log('onSpeechResults: ', e);
            setSpeaking(false);
            if (!e.value) return;
            if (givenSetText) {
                _startRecognizing();
                givenSetText(prevDescription => prevDescription + ' ' + e?.value[0]);
                if (callBack) callBack(e?.value[0]);
                return;
            }
            setText(prevDescription => prevDescription + ' ' + e?.value[0]);
        };

        function onSpeechPartialResults(e) {
            console.log('onSpeechPartialResults: ', e);
        }

        function onSpeechError(e) {
            _destroyRecognizer();
            setSpeaking(false);
            console.log('onSpeechError: ', JSON.stringify(e.error));
        }

        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechEnd = onSpeechEnd;
        Voice.onSpeechError = onSpeechError;
        Voice.onSpeechResults = onSpeechResults;
        Voice.onSpeechPartialResults = onSpeechPartialResults;

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    const _startRecognizing = async () => {
        console.log('starting recognition ---------------------');
        setSpeaking(true);
        // setDescription('');
        try {
            await Voice.start('en-US');
        } catch (e) {
            console.error(e);
        }
    };

    const _stopRecognizing = async () => {
        console.log('stopping recognition ---------------------');

        setSpeaking(false);
        try {
            await Voice.stop();
        } catch (e) {
            console.error(e);
        }
    };

    const _destroyRecognizer = async () => {
        try {
            await Voice.destroy();
        } catch (e) {
            console.error(e);
        }
    };


    return (
        <TouchableOpacity
            onPress={!speaking ? _startRecognizing : _stopRecognizing}>
            <Ionicons
                name={micName}
                color={'#818286'}
                size={22}
            />
        </TouchableOpacity>
    );
}
