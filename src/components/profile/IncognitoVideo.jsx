import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, FlatList, ActivityIndicator, } from 'react-native'
import React, { useState } from 'react'
import { profile_oliverPierce } from '../../../dummyData/DummyData'
import { PrimaryColor, SecondaryColor, TextColorGreen } from '../../screens/Styles/Style'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { moderateScale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import { base } from '../../../services'
import { PassionOne_Regular } from '../../constants/GlobalFonts'


const IncognitoVideo = ({
    isLoading,
    responseIncognitoVideo,
    hasMorePagesIncognito,
    setincognitoPage,
    isNoDataProfile
}) => {

    const SCREENHEIGHT = Dimensions.get("window").height;
    const SCREENWIDTH = Dimensions.get("window").width;
    const [isLoadMore, setIsLoadMore] = useState(false);

    const handleLoadMore = async () => {

        if (hasMorePagesIncognito) {
            setIsLoadMore(true)
            setincognitoPage((prevPage) => prevPage + 1);
        } else {
            console.log("no more pages video");
            setIsLoadMore(false);
        }
    };


    return (

        <>

            {
                isLoading ?
                    <View style={{ justifyContent: "center", alignItems: "center", height: responsiveHeight(40), }}>
                        <ActivityIndicator size={22} color={PrimaryColor} />
                    </View>
                    :
                    responseIncognitoVideo?.length === 0 ?
                        (
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ color: PrimaryColor, fontSize: responsiveFontSize(3.5), fontFamily: PassionOne_Regular.passionOne, }}>{isNoDataProfile}</Text>
                            </View>
                        ) :
                        <FlatList
                            data={responseIncognitoVideo}
                            renderItem={({ item, index }) => (
                                <View key={index} style={{ backgroundColor: "rgba(57, 57, 57, 1)", flexDirection: "row", justifyContent: "space-evenly", height: responsiveHeight(10), alignItems: "center", marginTop: responsiveWidth(2), }}>
                                    <View style={{ backgroundColor: "#AAA", flexDirection: "row", paddingHorizontal: moderateScale(90), width: responsiveWidth(85), height: responsiveHeight(7), justifyContent: "space-evenly", alignItems: "center", borderRadius: 10 }}>
                                        <Image style={{ width: SCREENWIDTH * 0.1, height: SCREENHEIGHT * 0.1, resizeMode: "center" }} source={{ uri: base + item?.subCategory?.image }} />
                                        <Text style={{ color: "#FFF", fontWeight: "700", fontSize: responsiveFontSize(2) }}>{item?.subCategory?.name}</Text>
                                    </View>
                                </View>
                            )}

                            ListFooterComponent={() => {
                                if (isLoadMore) {
                                    return (
                                        <View style={{ alignItems: 'center', height: SCREENHEIGHT / 4, }}>
                                            <ActivityIndicator size={24} color={PrimaryColor} />
                                        </View>
                                    );
                                }
                                return null;
                            }}

                            onEndReached={() => {
                                handleLoadMore();
                            }}
                            onEndReachedThreshold={0.3}
                        />
            }
        </>

    )
};



const styles = StyleSheet.create({
    fourth_container: {
        flexDirection: "row",
        alignItems: "center",
        width: responsiveWidth(65),
    },

    first_view: {
        justifyContent: "center",
        alignItems: "center"
    },
    second_view: {
        justifyContent: "center",
        alignItems: "center"
    },
    third_view: {
        justifyContent: "center",
        alignItems: "center"
    },
})
export default IncognitoVideo;
