import { Base_Url, Subcategory, category_Random, block_list_endpoint } from "../.."

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

