import axios from "axios";
export const baseUrl = "http://198.7.119.145:9080/"



export const API = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

export const fetcher = async (url: string) => {
    const response = await API.get(url);
    return response.data;
}
