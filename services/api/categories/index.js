import { Base_Url, Subcategory, category_Random, category_endpoint } from "../.."


export const get_Categories_Sub_Categories = async (page = 1, id = null) => {

    let apiUrl;

    if (id !== undefined && id !== null) {
        apiUrl = Base_Url + `category?parent=${id}&page=${page}`;
      } else {
        apiUrl = Base_Url + category_endpoint + `?page=${page}`;
      }

    const responseData = await fetch(apiUrl, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const response = await responseData.json();
    // console.log("res---", response);
    return response;
};

export const get_Random = async (id) => {

    let apiUrl;
    if (id) {
        apiUrl = Base_Url + `category/random?parent=${id}`;
    } else {
        apiUrl = Base_Url + category_Random;
    }

    const responseData = await fetch(apiUrl, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const response = await responseData.json();
    // console.log("res---", response);
    return response;
};
