import axios from "axios";
import { Base_Url, register_endpoint } from "..";


const userService = {
    registerUser: async (credentials) => {
        console.log("res--", credentials)
        try {
            const response = await axios.post(Base_Url + register_endpoint, credentials);
            console.log("res--", response)
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
}

export default userService;
