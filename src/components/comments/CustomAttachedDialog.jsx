import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import Icon from "react-native-vector-icons/Entypo";

const CustomAttachmentDialog = ({
    message,
    showCancel,
    onCancel,
}) => {

    return (
        <View
            style={{ backgroundColor: 'rgba(228, 65, 115, 1)', }}>
            <View style={styles.attachmentDialog}>
                <View>
                    <Text style={{ color: '#fff', marginRight: 20 }}>{message}</Text>
                </View>

                {showCancel && (
                    <TouchableOpacity onPress={onCancel} style={{ marginRight: 0 }}>
                        <Icon
                            size={20}
                            name="cross"
                            color="#FFF"
                        />
                    </TouchableOpacity>
                )}

            </View>
        </View>
    );
};

const styles = {
    attachmentDialog: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginHorizontal: 20,
        width: responsiveWidth(78),
        padding: 4,
    },
};

export default CustomAttachmentDialog;
