import axios from "axios";
import { Base_Url, register_endpoint } from "..";

const register_api_instance = axios.create({
    baseURL: Base_Url,
    timeout: 10000,
});

axios.interceptors.request.use(
    async (request) => {
        console.log(request);
        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    async (response) => {
        console.log(response);
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const registerUser = async () => {
    try {
        const response = await register_api_instance.post(register_endpoint,);
        console.log("res--", response)
        return response;
    } catch (err) {
        console.log(err);
    }
};

// export default register_api_instance;
