import {
  Base_Url,
  support_chat_list,
  support_send_message,
  support_send_message_with_id,
} from '../..';

export const getChats = async () => {
  let apiUrl = Base_Url + support_chat_list;

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

export const sendMessage = async payload => {
  let apiUrl = Base_Url + support_send_message;
  const formData = new FormData();
  for (const key in payload) {
    if (payload.hasOwnProperty(key)) {
      if (key === 'media') {
        if (payload.media) {
          const fileName = `profile_${Date.now()}.jpg`;
          formData.append('media', {
            uri: payload.media.profileImage,
            type: 'image/jpeg',
            name: fileName,
          });
        }
      } else if (key === 'chat') {
        formData.append(key, payload[key]);
      } else {
        formData.append(key, payload[key]);
      }
    }
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error:', error);
  }
  console.log('🚀 ~ sendMessage ~ formData:', formData);
};

export const getMessageWithId = async id => {
  let apiUrl = Base_Url + support_send_message_with_id + id;
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
