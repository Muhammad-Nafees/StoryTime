import { Base_Url, addFriends_endpoint } from "../.."

export const addFriends_api = async (value) => {

    // console.log("search=====", search)  
    let url = `${Base_Url}user/friends`;

    if (value?.search?.length > 0) {
        url = `${Base_Url}user/friends/?search=${value?.search}`
    } else {
        url = `${Base_Url}user/friends`
    };

    try {
        const responseData = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const response = await responseData.json();
        console.log("resAddmembers", response);
        return response;
    } catch (error) {

    }
};
