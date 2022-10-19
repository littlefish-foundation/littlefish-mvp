import axios from "axios";

import { LITTLEFISH_API_URL } from "../config.json";

export const getActions = async () => {
    const response = await axios.get(`${LITTLEFISH_API_URL}/action/`).catch((err) => {
        console.log("Error: ", err);
    });
    return response.data;
};
