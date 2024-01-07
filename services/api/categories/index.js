import { Base_Url, Subcategory, category_endpoint } from "../.."


export const get_Categories_Sub_Categories = async (id = "") => {

    let apiUrl = Base_Url + category_endpoint;
    console.log("apiUrl-=-", apiUrl);

    if (id) {
        apiUrl = apiUrl + Subcategory + id;
        // console.log("apiUrlIf-=-", apiUrl)
    } else {
        apiUrl = Base_Url + category_endpoint;
    };

    const responseData = await fetch(apiUrl, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const response = await responseData.json();
    console.log("res---", response);
    return response;

};
