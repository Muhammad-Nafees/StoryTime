import { Base_Url, addFriends_endpoint } from "../.."

export const addFriends_api = async () => {

    try {
        const responseData = await fetch(Base_Url + addFriends_endpoint, {
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
