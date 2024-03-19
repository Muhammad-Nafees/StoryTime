import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React, { useDebugValue } from 'react'
import { pinkColor } from '../screens/Styles/Style';
import { moderateVerticalScale } from 'react-native-size-matters';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import { addFriends_api } from '../../services/api/add-members';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { addFriends } from '../../store/slices/categoriesSlice/categoriesSlice';
import { useDispatch } from 'react-redux';



const MainInputField = ({ placeholder, OnchangeText, inputValue, setUsernameInput }) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const addFriends_api_handler = async () => {

        try {
            const responseData = await addFriends_api();
            console.log("RESPONSE FROM CATEGORY & SUBCATEGORY")
            const usernameObj = responseData?.data?.users?.find(
                item => item.username === inputValue,
            );

            if (usernameObj) {
                const userid = usernameObj._id;
                const username = usernameObj?.username;
                dispatch(addFriends({ username, userid }));
                setUsernameInput('');
            } else if (inputValue?.length == 0) {
                navigation.navigate("AddPlayers");
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Friends Not Found',
                });
            };

            return responseData;
        } catch (error) {
            console.log(error, "ERROR FROM FRIENDS CATEGORIES");
        }
    };


    return (
        <View style={styles.text_Input_container}>
            <View style={styles.text_input_child}>
                <TextInput onChangeText={(value) => OnchangeText(value)} value={inputValue} placeholder={placeholder} placeholderTextColor={"#000"} style={styles.input_field} />
                <TouchableOpacity onPress={() => addFriends_api_handler()} style={styles.add_button}>
                    <Text style={styles.add_text}>Add</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};



const styles = StyleSheet.create({
    container: {
        backgroundColor: pinkColor,
        flex: 1,
    },
    text_Input_container: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: moderateVerticalScale(2)
    },
    text_input_child: {
        flexDirection: 'row',
        width: responsiveWidth(90),
    },
    input_field: {
        paddingLeft: 30,
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        width: responsiveWidth(70),
        backgroundColor: '#FFF',
        color: "#000"
    },
    add_button: {
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
        width: responsiveWidth(21.5),
        height: responsiveHeight(7),
        backgroundColor: '#395E66',
        justifyContent: "center",
        alignItems: "center"
    },
    add_text: {
        fontSize: responsiveFontSize(1.9),
        color: "#FFF",
        fontWeight: "500",
        textAlign: "center",
        letterSpacing: -0.2
    }
})


export default MainInputField;
