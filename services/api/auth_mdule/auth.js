import { Alert } from "react-native";
import { Base_Url, register_endpoint, reset_email_endpoint, reset_password_endpoint, reset_verify_code } from "../..";



const reset_email = async (email, phone) => {

    try {
        const requestBody = {}
        console.log("requestbdy", requestBody)
        if (email) {
            requestBody.email = email
        }
        if (phone) {
            requestBody.phone = phone
        }
        const response = await fetch(Base_Url + reset_email_endpoint, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
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



export const reset_password = async (newPassword, confirmPassword, forgetuserToken) => {

    try {
        const response = await fetch(Base_Url + reset_password_endpoint, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${forgetuserToken}`
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


export const registerapi = async (firstpageData, secondpageData, values) => {
    const { countryCode, email, fcmToken, firstName, lastName, phoneCode, phoneNo, role, username } = firstpageData;
    const { city, state, zipCode } = secondpageData;
    const { confirmPassword, password } = values;

    try {

        const response = await fetch(Base_Url + register_endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                countryCode, email, fcmToken, firstName, lastName, phoneCode, phoneNo, role, username,
                city, state, zipCode,
                confirmPassword, password
            }),
        });
        const responseData = await response.json();
        return responseData;

    }
    catch (err) {
        console.log("error", err)
    }
}

export default reset_email;
