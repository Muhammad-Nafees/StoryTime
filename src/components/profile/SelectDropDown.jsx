import React, { useState } from "react";
import { Image } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { TextinputColor } from "../../screens/Styles/Style";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { categorynameUrl, setAddUrlId, subCategorynameUrl } from "../../../store/slices/categoriesSlice/categoriesSlice";
import { useDispatch } from "react-redux";



const CustomSelectDropDown = ({

    responseCategories,
    defaultText,
    setChangeColor,
    changeColor,
    categoriesNames,
    setResponseSubCategories,
    subResponseCategories,
    HasMorePages,
    setIsLoadMore,
    setPage

}) => {

    const dispatch = useDispatch();

    return (

        <SelectDropdown
            data={categoriesNames}
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
                console.log("INDEX------- :", index);
                if (selectedItem) {
                    const categoriesFind = responseCategories?.find((category) => category?.name === selectedItem);
                    const subCategoriesFind = subResponseCategories?.find((category) => category?.name === selectedItem);

                    if (!categoriesFind) {
                        dispatch(setAddUrlId(""));
                        dispatch(categorynameUrl(subCategoriesFind?._id));
                    } else {
                        dispatch(setAddUrlId(categoriesFind?._id));
                        dispatch(subCategorynameUrl(categoriesFind?._id));
                    }
                    setChangeColor("#000")
                }

                console.log('selectitem', selectedItem);
                return selectedItem;
            }}

            onScrollEndReached={() => {
                // handleLoadMore()
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
