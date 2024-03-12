import {Base_Url, report} from '../..';

export const ReportUser = async payload => {
  console.log('🚀 ~ ReportUser ~ payload:', payload);
  let apiUrl = Base_Url + report;
  const {story, text} = payload;
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({story, text}),
    });

    const responseData = await response.json();
    console.log('🚀 ~ ReportUser ~ responseData:', responseData);
    return responseData;
  } catch (error) {
    console.error('Error:', error);
  }
};
