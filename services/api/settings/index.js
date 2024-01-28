import { Base_Url, block_list_endpoint ,unblock_endpoint, notifications_endpoint} from "../.."

export const getBlockList = async () => {

    let apiUrl = Base_Url + block_list_endpoint;

    const responseData = await fetch(apiUrl, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const response = await responseData.json();
    return response;
};

export const unBlockUser = async (blockId) => {
    let apiUrl = Base_Url + unblock_endpoint;
    console.log(apiUrl)
    const responseData = await fetch(apiUrl, {
        method: "PUT",
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
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
    };
    if (key !== undefined && key !== null) {
        requestOptions.body = JSON.stringify({
            "key": `${key}`
        });
    }
    const responseData = await fetch(apiUrl, requestOptions);
    const response = await responseData.json();
    return response;
};

export const getUserProfileData = async () => {
    let apiUrl = Base_Url + notifications_endpoint; //params here
    console.log(apiUrl);
    
}
