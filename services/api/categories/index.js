import axios from "axios";
import { Base_Url, category_Random, category_endpoint } from "../.."


export const get_Categories_Sub_Categories = async ({ page, id, page2 }) => {
    let apiUrl;
    if (id) {
        apiUrl = Base_Url + `category?parent=${id}&page=${page2}&limit=${15}`;
    } else {
        apiUrl = `${Base_Url + category_endpoint}?page=${page}&limit=${15}`;
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
