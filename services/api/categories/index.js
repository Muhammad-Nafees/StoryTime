import axios from "axios";
import { Base_Url, categoryFetchall, category_Random, } from "../.."


export const get_Categories_Sub_Categories = async ({ id, }) => {
    let apiUrl;
    if (id) {
        apiUrl = `${Base_Url}${categoryFetchall}?parent=${id}`;
    } else {
        apiUrl = `${Base_Url}${categoryFetchall}`;
    };
    console.log("apiUrl---- :", apiUrl); // Move the console.log here
    try {
        const responseData = await axios.get(apiUrl);
        return responseData.data;
    } catch (error) {
        throw error;
    }
};



export const get_Random = async (id) => {

    let apiUrl;
    if (id) {
        apiUrl = Base_Url + `category/random?parent=${id}`;
    } else {
        apiUrl = Base_Url + category_Random;
    }
    try {
        const responseData = axios.get(apiUrl)
        return responseData;
    } catch (error) {
        throw error;
    }
};
