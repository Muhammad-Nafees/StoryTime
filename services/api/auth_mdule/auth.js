import { Alert } from "react-native";
import { Base_Url, reset_email_endpoint, reset_password_endpoint, reset_verify_code } from "../..";



const reset_email = async (email) => {
    try {
        const response = await fetch(Base_Url + reset_email_endpoint, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }),
        });

        const responseData = await response.json();
        return responseData
    } catch (error) {

        console.error('Error:', error);
    }
}



export const otp_forget = async (code) => {

    try {
        const response = await fetch(Base_Url + reset_verify_code, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: code }),
        });

        const responseData = await response.json();
        return responseData
        // console.log("repsonseemail-=-=-", responseData)
    } catch (error) {

        console.error('Error:', error);
    }
}


export const reset_password = async (newPassword, confirmPassword) => {

    try {
        const response = await fetch(Base_Url + reset_password_endpoint, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newPassword: newPassword,
                confirmPassword: confirmPassword
            }),
        });

        const responseData = await response.json();
        return responseData
        // console.log("repsonseemail-=-=-", responseData)
    } catch (error) {

        console.error('Error:', error);
    }
}


export default reset_email;
