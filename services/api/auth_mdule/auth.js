import { Alert } from 'react-native';
import {
  Base_Url,
  city_andpoint,
  register_endpoint,
  reset_email_endpoint,
  reset_password_endpoint,
  reset_verify_code,
  stateandCity_endpoint,
  username_endpoint
} from '../..';

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

export const reset_password = async (
  newPassword,
  confirmPassword,
  forgetuserToken,
) => {
  try {
    const response = await fetch(Base_Url + reset_password_endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        accessToken: forgetuserToken,
      },
      body: JSON.stringify({
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      }),
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const registerapi = async (firstpageData, secondpageData, values) => {
  const countryCode = firstpageData?.countryCode;
  const phonecodee = firstpageData?.phoneCode;
  console.log("inside----------pa", countryCode, phonecodee)
  console.log(countryCode, phonecodee)
  const { email, fcmToken, firstName, lastName, phoneNo, role, username } =
    firstpageData?.values;
  const phoneCode = `+${phonecodee}`;
  const { city, state, zipCode } = secondpageData;
  const { confirmPassword, password } = values;

  try {
    const response = await fetch(Base_Url + register_endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        countryCode,
        email,
        fcmToken,
        firstName,
        lastName,
        phoneCode,
        phoneNo,
        role,
        username,
        city,
        state,
        zipCode,
        confirmPassword,
        password,
      }),
    });

    const responseData = await response.json();
    return responseData;
  } catch (err) {
    console.log('error', err);
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

export const username_api = async (username, email, completePhone) => {
  const requestBody = {};

  if (username !== '') {
    requestBody.username = username;
  }

  if (email !== '') {
    requestBody.email = email;
  }

  if (completePhone !== '') {
    requestBody.completePhone = completePhone;
  }



  const response = await fetch(Base_Url + username_endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  const responseData = await response.json();
  console.log('usernameapi---', responseData);
  return responseData;
};
