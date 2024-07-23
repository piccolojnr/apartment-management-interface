import { api1 } from ".";


export const addRole = async (data: any) => {
    try {
        const response = await api1.post("/user/role", data);
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
};

export const addUser = async (data: any) => {
    try {
        const response = await api1.post("/user", data);
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
}

export const addApartment = async (data: any) => {
    try {
        const response = await api1.post("", data);
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
};

export const addUtilityType = async (data: any) => {
    try {
        const response = await api1.post("/utility/type", data);
        return response.data;
    } catch (error: any) {
        console.log(error);
    }

}


export const addBillSession = async (data: any) => {
    try {
        const response = await api1.post("/bill/session", data);
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
};

export const addBill = async (data: any) => {
    try {
        const response = await api1.post("/bill", data);
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
};


export const addContactPerson = async (data: any) => {
    try {
        const response = await api1.post("/contact/person", data);
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
}

export const addDevice = async (data: any) => {
    try {
        const response = await api1.post("/device", data);
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
}


export const addNetwork = async (data: any) => {
    try {
        const response = await api1.post("/network", data);
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
}

export const addTariff = async (data: any) => {
    try {
        const response = await api1.post("/tariff", data);
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
}