import { Alert } from 'react-native';

import {
  Base_Url,
  city_andpoint,
  register_endpoint,
  reset_email_endpoint,
  reset_password_endpoint,
  reset_verify_code,
  stateandCity_endpoint,
  username_endpoint,
  logout_endpoint,
  delete_account_endpoint,
  login_andpoint
} from '../..';
import axios from 'axios';


export const login_api = async (values) => {

  try {
    const responseData = await axios.post(Base_Url + login_andpoint, values)
    return responseData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};


const reset_email = async (values) => {
  console.log('values---', values);

  try {

    const response = await fetch(Base_Url + reset_email_endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),

    });

    const responseData = await response.json();
    console.log("responseData-------------- :", responseData)
    return responseData;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const otp_forget = async code => {
  try {
    const response = await fetch(Base_Url + reset_verify_code, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: code }),
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const reset_password = async (newPassword, confirmPassword, forgetuserToken) => {

  const bodyData = {
    newPassword: newPassword,
    confirmPassword: confirmPassword
  }

  const headers = {
    'Content-Type': 'application/json',
    accessToken: forgetuserToken,
  };

  try {
    const responseData = await axios.put(Base_Url + reset_password_endpoint, bodyData, {
      headers: headers
    })
    return responseData.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};


export const refresh_token_api = async (refreshToken) => {

  try {
    const response = await fetch(Base_Url + "auth/refresh-token", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken: refreshToken
      }),
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const registerapi = async (registerData, values) => {

  const formData = {
    email: registerData?.values?.email,
    fcmToken: registerData?.values?.fcmToken,
    firstName: registerData?.values?.firstName,
    lastName: registerData?.values?.lastName,
    phoneNo: registerData?.values?.phoneNo,
    role: registerData?.values?.role,
    username: registerData?.values?.username,
    zipCode: registerData.zipCode,
    city: registerData.city,
    countryCode: registerData.countryCode,
    phoneCode: registerData.phoneCode,
    state: registerData.state,
    password: values.password,
    confirmPassword: values.confirmPassword,
  };
  try {
    const response = await axios.post(Base_Url + register_endpoint, formData);
    return response.data;
  } catch (err) {
    console.log('error', err);
    throw err;
  }
};

export default reset_email;

export const stateandcity_api = async countryCode => {

  try {
    const response = await fetch(
      `${Base_Url}${stateandCity_endpoint}?countryCode=${countryCode}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const responseData = await response.json();
    console.log('resposeData--', responseData);

    return responseData;
  } catch (error) {
    console.log(error);
  }
};

export const userandcity_api = async statesinfo => {
  const { countryCode, isoCode } = statesinfo;
  console.log('insideApi---', countryCode, isoCode);
  try {
    const response = await fetch(
      `${Base_Url}${city_andpoint}?countryCode=${countryCode}&stateCode=${isoCode}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const responseData = await response.json();
    console.log('resposeData--', responseData);
    return responseData;
  } catch (error) {
    console.log(error);
  }
};


export const username_api = async (data) => {
  console.log("=========data", data)
  const requestBody = {};

  const response = await fetch(Base_Url + username_endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();
  console.log('usernameapi---', responseData);
  return responseData;
};



export const logout_user = async () => {
  try {
    let apiUrl = Base_Url + logout_endpoint;

    const responseData = await fetch(apiUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await responseData.json();
    return response

  } catch (error) {
    Alert.alert("ERROR", "something went wrong")
    return error
  }
}

export const delete_user_account = async () => {
  try {
    let apiUrl = Base_Url + delete_account_endpoint;
    console.log(apiUrl)
    const responseData = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await responseData.json();
    return response

  } catch (error) {
    Alert.alert("ERROR", "something went wrong")
    return error
  }
}
