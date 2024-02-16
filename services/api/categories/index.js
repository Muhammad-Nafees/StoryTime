import { Base_Url, Subcategory, category_Random, category_endpoint } from "../.."


export const get_Categories_Sub_Categories = async ({ page, id, page2 }) => {
    // console.log("page-", page, id,)
    console.log("page subcategory====", page2,)
    console.log("page====", page,)
    let apiUrl;

    if (id) {
        apiUrl = Base_Url + `category?parent=${id}&page=${page2}&limit=${15}`;
    } else {
        apiUrl = `${Base_Url + category_endpoint}?page=${page}&limit=${10}`;
    };

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
