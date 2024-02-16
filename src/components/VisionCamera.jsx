import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { Camera, useCameraDevices } from 'react-native-vision-camera'

const VisionCamera = ({ showCamera, setShowCamera }) => {
    const [imageSource, setImageSource] = useState(null)
    const camera = useRef(null)
    const devices = useCameraDevices()
    const device = devices.back;

    useEffect(() => {
        checkpermission()
    }, [])


    const checkpermission = async () => {
        const newCameraPermisssion = await Camera.requestCameraPermission()
        const newMicrophonePermission = await Camera.requestMicrophonePermission()
        console.log(newCameraPermisssion)
    }

    const takePicture = async () => {
        const photo = await camera.current.takePhoto()
        console.log(photo)
    }

    if (device === null) {
        return <Text>Camera not available</Text>
    }

    return (
        <View style={{ flex: 1, height: 400, width: 400 }}>
            {showCamera && (
                <Camera
                    ref={camera}
                    style={StyleSheet.absoluteFill}
                    device={device}
                    // isActive={showCamera}
                    // photo={true}
                    isActive={true}
                />
            )}

            {/* <Button title="Show Camera" onPress={() => setShowCamera(true)} />
            <Button title="Take Photo" onPress={handleTakePhoto} />
             */}
            {/* 
            {imageSource && (
                <View>
                    <Text>Photo captured:</Text>
                    <Text>{imageSource}</Text>
                </View>
            )} */}

        </View>
    )
}

export default VisionCamera;
