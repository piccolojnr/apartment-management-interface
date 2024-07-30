import axios from "axios";
export const baseUrl = "http://198.7.119.145:9080/apt"




export const api = axios.create({
    baseURL: "/v1/api",
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const user = localStorage.getItem("user");
    if (user) {
        const parsedUser = JSON.parse(user);
        config.headers.Authorization = `Bearer ${parsedUser.token}`;
    }
    return config;
});



export const fetcher = async (url: string) => {
    const response = await api.get(url);
    return response.data;
}




