import axios from "axios";

export const api = axios.create({
    baseURL: "https://api.littlefish.foundation"
});

export const getActions = async () => {
    const response = await api.get("/action/");
    return response.data;
};