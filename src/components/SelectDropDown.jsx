import React, { useState } from "react";
import { Image } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { TextinputColor } from "../screens/Styles/Style";
import { responsiveFontSize } from "react-native-responsive-dimensions";



const CustomSelectDropDown = ({ arrayurl, defaultText, setChangeColor, changeColor, secondChangeColor, setSecondChangeColor }) => {




    return (

        <SelectDropdown

            data={arrayurl}
            defaultButtonText={defaultText}
            buttonStyle={[
                {
                    width: '90%',
                    backgroundColor: TextinputColor,
                    borderRadius: 10,
                    justifyContent: 'flex-start',
                    paddingHorizontal: 25,
                },
            ]}

            renderDropdownIcon={() => (
                <Image
                    style={{ width: 16, height: 16, resizeMode: 'center' }}
                    source={require('../assets/bottom-icon.png')}
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
                    setChangeColor("#000")
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

    )
};

export default CustomSelectDropDown;



// data={namesCities}
// defaultButtonText="Select here"
// // plac
// // searchPlaceHolderColor={"red"}
// renderDropdownIcon={() => (
//   <Image
//     style={{ width: 16, height: 16, resizeMode: 'center' }}
//     source={require('../../assets/bottom-icon.png')}
//   />
// )}
// buttonStyle={[
//   {
//     width: '80%',
//     backgroundColor: TextinputColor,
//     borderRadius: 10,
//     justifyContent: 'flex-start',
//     paddingHorizontal: 25,
//   },

//   errors.state && { borderColor: 'red', borderWidth: 2 },
// ]}
// rowTextStyle={{
//   textAlign: 'left',
//   fontSize: responsiveFontSize(1.9),
// }}
// rowStyle={{ paddingHorizontal: 8 }}
// dropdownStyle={{ borderRadius: 10, }}
// buttonTextStyle={{
//   textAlign: 'left',
//   fontSize: responsiveFontSize(1.9),
//   color: secondChangeColor
// }}
// onSelect={(selectedItem, index) => {
//   if (selectedItem) {
//     setSecondChangeColor("#000")
//   }
//   setFieldValue('city', selectedItem);
//   console.log('selectitem', selectedItem);
// }}
// buttonTextAfterSelection={(selectedItem, index) => {
//   return selectedItem;
// }}
// rowTextForSelection={(item, index) => {
//   return item;
// }}
