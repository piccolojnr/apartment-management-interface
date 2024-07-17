import axios from "axios";
export const baseUrl = "http://198.7.119.145:9080/apt"



export const api = axios.create({
    baseURL: baseUrl,
    // withCredentials: true, // Send cookies along with requests
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetcher_api = async (url: string) => {
    const response = await api.get(url + "/v1/api");
    return response.data;
}

export const fetcher_bill = async (url: string) => {
    const response = await api.get(url);
    return response.data;
}

