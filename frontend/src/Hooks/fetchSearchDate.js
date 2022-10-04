import axios from "axios";

export const api = axios.create({
    baseURL: "https://api.littlefish.foundation"
});

export const getActions = async () => {
    const response = await api.get("/action/").catch((err) => {
        console.log("Error: ", err);
    });
    return response.data;
};
