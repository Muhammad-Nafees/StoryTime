// import { ImageZoom } from '@thaihuynhquang/react-native-image-zoom-next';
// import { s3bucketReference } from '../../api';
import React from 'react';
import { ImageViewer } from "react-native-image-zoom-viewer"
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { responsiveHeight } from 'react-native-responsive-dimensions';


const CommentImagePreview = ({
    isImageFullscreen,
    setImageFullscreen,
    media,
    width,
    handleImageClose,
}) => {
    return (
        <Modal
            onBackButtonPress={() => setImageFullscreen(false)}
            isVisible={isImageFullscreen}
            backdropOpacity={1}
            onBackdropPress={() => setImageFullscreen(false)}
            style={[styles.fullscreenContainer, { width: width }]}>
            <TouchableOpacity activeOpacity={0.7}
                onPress={handleImageClose}
                style={[styles.fullscreenContainer, { width: width }]}>
                {/* <ImageViewer
                    uri={"http://storytime.yameenyousuf.com/" + media}
                    minScale={1}
                    maxScale={10}
                    style={[styles.imageZoom, { width: width }]}

                /> */}
                <Image
                    style={[styles.imageZoom, { width: width }]}
                    source={{ uri: "http://storytime.yameenyousuf.com/" + media }}
                />
            </TouchableOpacity>
        </Modal>
    );
};

export default CommentImagePreview;

const styles = StyleSheet.create({
    fullscreenContainer: {
        justifyContent: 'center',
        height: 400,
        alignItems: 'center',
        backgroundColor: '#000',
        margin: 0,
        padding: 0,
    },
    imageZoom: {
        height: responsiveHeight(60),
        resizeMode: "center"
    },
});
