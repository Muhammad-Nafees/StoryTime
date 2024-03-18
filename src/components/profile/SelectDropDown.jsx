import React, { useState } from "react";
import { Image } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { TextinputColor } from "../../screens/Styles/Style";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { categorynameUrl, setAddUrlId, subCategorynameUrl } from "../../../store/slices/categoriesSlice/categoriesSlice";
import { useDispatch } from "react-redux";



const CustomSelectDropDown = ({ responseCategories,
    defaultText,
    setChangeColor,
    changeColor,
    secondChangeColor,
    categoriesNames,
    addUrlid,
    subCategoriesNames,
    setResponseCategories,
    setResponseSubCategories,
    HasMorePages,
    setPageSubCategory,
    setIsLoadMore,
    subResponseCategories
}) => {

    const dispatch = useDispatch();


    const handleLoadMore = async () => {

        // if (HasMorePages) {
        //     // setshowTextUser(false);
        //     setPageSubCategory((prevPage) => prevPage + 1);
        //     setIsLoadMore(true);
        //     console.log("hasmore Pages Dropdown", HasMorePages)
        // } else {
        //     setIsLoadMore(false);
        // }

    };




    return (

        <SelectDropdown
            data={categoriesNames || subCategoriesNames}
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
                if (selectedItem) {
                    const categoriesObj = responseCategories?.find((category) => category?.name === selectedItem);
                    const subcategoriesObj = subResponseCategories?.find((category) => category?.name === selectedItem);
                    console.log("subcategoir------- :", subcategoriesObj);
                    if (categoriesObj) {
                        const _id = categoriesObj?._id;
                        setResponseSubCategories([]);
                        dispatch(categorynameUrl(_id));
                        dispatch(setAddUrlId(_id));
                    } else if (subcategoriesObj) {
                        const subcat_id = subcategoriesObj?._id;
                        dispatch(subCategorynameUrl(subcat_id));
                    }
                    setChangeColor("#000")
                }

                console.log('selectitem', selectedItem);
            }}
            onScrollEndReached={() => {
                handleLoadMore()
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
