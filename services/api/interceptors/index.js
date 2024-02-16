import axios from "axios"
import { Base_Url } from "../.."





const api = axios.create({
    baseURL: Base_Url
})


api.interceptors.request.use((request) => {
    try {
        return request;
    } catch (error) {
        return Promise.reject(error);
    }
});



api.interceptors.response.use((response) => {

    return response;
}, (error) => {
    // Agar koi error aata hai to use reject karein
    return Promise.reject(error);
});
