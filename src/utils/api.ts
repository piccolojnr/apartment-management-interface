import { BASE_API_URL } from "../lib/constants";
import { createAvatarUrl } from "./functions";

export const login = async (email: string, password: string, remember_me: string) => {
    const response = await fetch(BASE_API_URL + "/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, remember_me }),
        credentials: "include", // Add this line
    });

    if (!response.ok) {
        let error;
        try {
            error = await response.json();
        } catch (e) {
            error = await response.text();
        }
        throw new Error(error.message || error);
    }

    return await response.json();
};

export const get_user = async () => {
    const response = await fetch(BASE_API_URL + "/user", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // Add this line
    });
    if (!response.ok) {
        let error;
        try {
            error = await response.json();
        } catch (e) {
            error = await response.text();
        }
        throw new Error(error.message || error);
    }
    return await response.json();
};



export const logout = async () => {
    const response = await fetch(BASE_API_URL + "/auth/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // Add this line
    });

    if (!response.ok) {
        let error;
        try {
            error = await response.json();
        } catch (e) {
            error = await response.text();
        }
        throw new Error(error.message || error);
    }
    return await response.json();
}

export const createUser = async ({
    email,
    first_name,
    last_name,
    phone,
    role,
    password,
}: any) => {
    const res = await fetch(BASE_API_URL + "/user/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email,
            role: role,
            password,
            profile: { first_name, last_name, phone, avatar: createAvatarUrl() },
        }),
        credentials: "include",
    });

    if (res.status === 201) {
        return await res.json();
    } else {
        throw new Error(await res.text());
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
    const res = await fetch(BASE_API_URL + `/user/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email,
            role: role,
            profile: { first_name, last_name, phone, avatar },
        }),
        credentials: "include",
    });

    if (res.status === 200) {
        return await res.json();
    } else {
        throw new Error(await res.text());
    }
};


export const deleteUser = async (id: string | number) => {
    const res = await fetch(BASE_API_URL + `/user/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });

    if (res.status === 204) {
        return;
    } else {
        throw new Error(await res.text());
    }
};

export const createDevice = async ({
    name,
    location,
    latitude,
    longitude,
    municipal_assembly,
}: any) => {
    const response = await fetch(BASE_API_URL + "/devices/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            location,
            latitude,
            longitude,
            municipal_assembly,
        }),
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }
};

export const updateDevice = async (
    { name, location, latitude, longitude, municipal_assembly }: any,
    id: string
) => {
    const response = await fetch(BASE_API_URL + `/devices/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            location,
            latitude,
            longitude,
            municipal_assembly,
        }),
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }
};


export const deleteDevice = async (id: string | number) => {
    const response = await fetch(BASE_API_URL + `/devices/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }
};
