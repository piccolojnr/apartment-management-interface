import { API } from ".";



export const addApartment = async (data: any) => {
    try {
        const response = await API.post("/apt", data);
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
};

export const addUtilityType = async (data: any) => {
    try {
        const response = await API.post("/apt/utility/type", data);
        return response.data;
    } catch (error: any) {
        console.log(error);
    }

}


export const addBillSession = async (data: any) => {
    try {
        const response = await API.post("/apt/bill/session", data);
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
};

export const addBill = async (data: any) => {
    try {
        const response = await API.post("/apt/bill", data);
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
};


export const addContactPerson = async (data: any) => {
    try {
        const response = await API.post("/apt/contact/person", data);
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
}

export const addDevice = async (data: any) => {
    try {
        const response = await API.post("/apt/device", data);
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
}


export const addNetwork = async (data: any) => {
    try {
        const response = await API.post("/apt/network", data);
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
}

export const addTariff = async (data: any) => {
    try {
        const response = await API.post("/apt/tariff", data);
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
}