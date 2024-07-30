import { createAvatarUrl } from '@utils/functions';
import { api } from '.';


export const addUser = async (data: any) => {
    try {
        const response = await api.post("/user", data);
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
}
export const login = async (username: string, password: string, remember_me: string) => {
    try {
        const response = await api.post('/login', { username, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            const roles = response.data.roles.map((role: any) => role.name.toLowerCase());
            localStorage.setItem('roles', JSON.stringify(roles));
            api.defaults.headers['Authorization'] = response.data.token;
        }
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message);
    }
};


export const get_user = async () => {
    try {
        const response = await api.get('/user');
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const logout = async () => {
    try {
        localStorage.removeItem('token');
        localStorage.removeItem('roles');
        delete api.defaults.headers['Authorization'];
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const createUser = async ({
    email,
    first_name,
    last_name,
    phone,
    role,
    password,
}: any) => {
    try {
        const response = await api.post('/user/create', {
            email,
            role,
            password,
            profile: { first_name, last_name, phone, avatar: createAvatarUrl() },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const updateUser = async ({
    id,
    email,
    first_name,
    last_name,
    phone,
    role,
    avatar,
}: any) => {
    try {
        const response = await api.put(`/user/${id}`, {
            email,
            role,
            profile: { first_name, last_name, phone, avatar },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const deleteUser = async (id: string | number) => {
    try {
        await api.delete(`/user/${id}`);
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message);
    }
};
