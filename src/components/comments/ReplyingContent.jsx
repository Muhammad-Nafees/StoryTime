import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import { moderateScale, moderateVerticalScale, } from 'react-native-size-matters';
import { Img_Paths } from '../../assets/Imagepaths';


const ReplyingContent = ({ replies, lastName, firstName }) => {

    const { HOME_FRAME, FRANKIN_DRAWEN, SHARE_BTN } = Img_Paths;

    return (
        <>
            <View style={{ paddingVertical: moderateVerticalScale(10) }}>
                <View style={{ flexDirection: "row", width: responsiveWidth(65), alignItems: "center", justifyContent: "space-between", }}>

                    <View>
                        <Image style={{ width: responsiveWidth(9), height: responsiveHeight(4.5), resizeMode: "center", borderRadius: 50 }} source={FRANKIN_DRAWEN} />
                    </View>

                    <View style={{ backgroundColor: "#FFDCE7", borderRadius: 6, width: responsiveWidth(52), paddingVertical: moderateVerticalScale(4), paddingHorizontal: moderateScale(10) }}>
                        <Text style={{ color: "#000", fontWeight: "500", fontSize: responsiveFontSize(1.8), paddingVertical: moderateVerticalScale(4) }}>{`${firstName} ${lastName}`}</Text>
                        {
                            replies && replies?.length > 0 && (
                                replies?.map((item, index) => (
                                    <>
                                        <Text style={{ color: "#000", fontWeight: "400", fontSize: responsiveFontSize(1.6) }}>{item?.text}</Text>
                                    </>
                                ))
                            )
                        }
                    </View>
                </View>


                <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
                    <View style={{ flexDirection: "row", paddingTop: moderateScale(4), width: responsiveWidth(67), }}>
                        <Text style={{ color: "grey", fontSize: responsiveFontSize(1.5), paddingHorizontal: moderateScale(12) }}>1m ago</Text>
                        <TouchableOpacity >
                            <Text style={{ color: "grey", fontWeight: "500", fontSize: responsiveFontSize(1.7) }}>Reply</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </>
    )
}

export default ReplyingContent;
