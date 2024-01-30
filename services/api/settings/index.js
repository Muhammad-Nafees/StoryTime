import {
  Base_Url,
  block_list_endpoint,
  unblock_endpoint,
  notifications_endpoint,
  user_profile,
  update_profile
} from '../..';

export const getBlockList = async () => {
  let apiUrl = Base_Url + block_list_endpoint;

  const responseData = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const response = await responseData.json();
  return response;
};

export const unBlockUser = async blockId => {
  let apiUrl = Base_Url + unblock_endpoint;
  console.log(apiUrl);
  const responseData = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `blockId=${blockId}`,
  });

  const response = await responseData.json();
  return response;
};

export const notificationToggle = async (key = null) => {
  let apiUrl = Base_Url + notifications_endpoint;
  console.log(apiUrl);

  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (key !== undefined && key !== null) {
    requestOptions.body = JSON.stringify({
      key: `${key}`,
    });
  }
  const responseData = await fetch(apiUrl, requestOptions);
  const response = await responseData.json();
  return response;
};

export const getUserProfileData = async uid => {
  let apiUrl = Base_Url + user_profile + `?user=${uid}`; //params here

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const responseData = await fetch(apiUrl, requestOptions);
  const response = await responseData.json();
  return response;
};

export const updateUserProfileData = async (payload) => {
  try {
      let apiUrl = Base_Url + update_profile;
      console.log("🚀 ~ updateUserProfileData ~ apiUrl:", apiUrl);
      
      // Convert payload object to FormData
      const formData = new FormData();
      for (const key in payload) {
          if (payload.hasOwnProperty(key)) {
              if (key === 'profileImage') {
                  // Check if profileImage exists in the payload
                  if (payload.profileImage) {
                    const fileName = `profile_${Date.now()}.jpg`; 
                      formData.append('profileImage', {
                          uri: payload.profileImage,
                          type: 'image/jpeg', // Adjust according to the file type
                          name: fileName // Adjust the file name if needed
                      });
                  }
              } else if (key === 'coverImage') {
                // Check if coverImage exists in the payload
                if (payload.coverImage) {
                  const fileName = `cover_${Date.now()}.jpg`; 
                    formData.append('coverImage', {
                        uri: payload.coverImage,
                        type: 'image/jpeg', // Adjust according to the file type
                        name: fileName // Adjust the file name if needed
                    });
                }
            } else {
                  formData.append(key, payload[key]);
              }
          }
      }
      
      console.log("🚀 ~ updateUserProfileData ~ formData:", formData);
      
      const requestOptions = {
          method: 'PUT',
          headers: {
              'Content-Type': 'multipart/form-data',
          },
          body: formData,
      };
      
      const responseData = await fetch(apiUrl, requestOptions);
      const response = await responseData.json();
      return response;
      
  } catch (error) {
      console.log("🚀 ~ updateUserProfileData ~ error:", error);
  }
};

