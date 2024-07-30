import { api, api } from ".";


export const addRole = async (data: any) => {
    try {
        const response = await api.post("/user/role", data);
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
};

export const addUser = async (data: any) => {
    try {
        const response = await api.post("/user", data);
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
}

export const addApartment = async (data: any) => {
    try {
        const response = await api.post("", data);
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
};

export const addUtilityType = async (data: any) => {
    try {
        const response = await api.post("/utility/type", data);
        return response.data;
    } catch (error: any) {
        console.log(error);
    }

}


export const addBillSession = async (data: any) => {
    try {
        const response = await api.post("/bill/session", data);
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
};

export const addBill = async (data: any) => {
    try {
        const response = await api.post("/bill", data);
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
};


export const addContactPerson = async (data: any) => {
    try {
        const response = await api.post("/contact/person", data);
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
}

export const addDevice = async (data: any) => {
    try {
        const response = await api.post("/device", data);
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
}


export const addNetwork = async (data: any) => {
    try {
        const response = await api.post("/network", data);
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
}

export const addTariff = async (data: any) => {
    try {
        const response = await api.post("/tariff", data);
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
}