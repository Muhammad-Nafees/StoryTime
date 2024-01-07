import { Base_Url, category_endpoint } from "../.."



export const get_Categories_Sub_Categories = async () => {

    const responseData = await fetch(Base_Url + category_endpoint, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const response = await responseData.json()
    console.log("res---", response)
    return response;
}
