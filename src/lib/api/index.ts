import axios from "axios";
export const baseUrl = "http://198.7.119.145:9080/apt"




export const api = axios.create({
    baseURL: baseUrl + "/v1/api",
    headers: {
        'Content-Type': 'application/json',
    },
});



export const fetcher = async (url: string) => {
    const token = localStorage.getItem("token");
    api.defaults.headers['Authorization'] = 'Bearer ' + token;
    const response = await api.get(url);
    return response.data;
}




