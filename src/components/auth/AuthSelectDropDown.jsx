import React, { useState } from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { FourthColor, TextinputColor } from "../../screens/Styles/Style";
import { responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions";
import { categorynameUrl, setAddUrlId, subCategorynameUrl } from "../../../store/slices/addplayers/addPlayersSlice";
import { useDispatch } from "react-redux";
import { userinfocity } from "../../../store/slices/authStatesandCity/userinfoCity";



const AuthCustomSelectDropdown = ({
    defaultText,
    setChangeColor,
    changeColor,
    setFieldValue,
    FieldValueType,
    userdata,
    data,
    type,
    label
}) => {

    const dispatch = useDispatch();

    return (
        <>

            <View style={{ paddingVertical: 12, width: responsiveWidth(89), marginLeft: 'auto' }}>
                <Text style={[styles.text, { color: FourthColor }]}>{label}</Text>
            </View>

            <SelectDropdown
                data={data}
                defaultButtonText={defaultText}
                buttonStyle={[
                    {
                        width: responsiveWidth(80),
                        backgroundColor: TextinputColor,
                        borderRadius: 10,
                        justifyContent: 'flex-start',
                        paddingHorizontal: 25,
                    },
                ]}

                renderDropdownIcon={() => (
                    <Image
                        style={{ width: 16, height: 16, resizeMode: 'center' }}
                        source={require('../../assets/bottom-icon.png')}
                    />
                )}

                rowTextStyle={{ textAlign: 'left', fontSize: responsiveFontSize(1.9) }}
                rowStyle={{ paddingHorizontal: 8, }}
                dropdownStyle={{ borderRadius: 10, }}
                buttonTextStyle={{
                    textAlign: 'left',
                    fontSize: responsiveFontSize(1.9),
                    color: changeColor
                }}
                onSelect={(selectedItem, index) => {
                    if (selectedItem) {
                        if (selectedItem) {
                            setChangeColor("#000")
                        }
                        setFieldValue(FieldValueType, selectedItem);
                        const cities = userdata?.data?.find(
                            data => data?.name === selectedItem,
                        );
                        if (cities) {
                            dispatch(
                                userinfocity({
                                    countryCode: cities?.countryCode,
                                    isoCode: cities?.isoCode,
                                }),
                            );
                        }
                    }

                    console.log('selectitem', selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                }}

                rowTextForSelection={(item, index) => {
                    return item;
                }}

            />

        </>
    )
};

export default AuthCustomSelectDropdown;

const styles = StyleSheet.create({
    text: {
        fontSize: responsiveFontSize(1.7),
        fontWeight: '600',
    },
})
