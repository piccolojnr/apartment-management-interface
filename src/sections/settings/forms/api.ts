const baseUrl = "http://192.168.1.73:8080"

export const fetcher = async (url: string) => {
    const response = await fetch(baseUrl + url);
    if (!response.ok) {
        const err = await response.text();
        throw new Error(err);
    }
    const result = await response.json();
    return result;
};

export const addApartment = async (data: any) => {
    try {
        const response = await fetch(`${baseUrl}/apt/apt`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...data, floor: parseInt(data.floor) }),
        });
        if (!response.ok) {
            const err = await response.text();
            throw new Error(err);
        }
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
    }
};

export const addBillType = async (data: any) => {
    try {
        const response = await fetch(`${baseUrl}/bill/type`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const err = await response.text();
            throw new Error(err);
        }
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
    }
};


export const addContactPerson = async (data: any) => {
    try {
        const response = await fetch(`${baseUrl}/contact/person`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...data,
                network: { id: parseInt(data.network) },
                apartment: { id: parseInt(data.apartment) },
            }),
        });
        if (!response.ok) {
            const err = await response.text();
            throw new Error(err);
        }
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
    }
}

export const addDeviceType = async (data: any) => {
    try {
        const response = await fetch(`${baseUrl}/apt/device/type`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const err = await response.text();
            throw new Error(err);
        }
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
    }
}

export const addNetwork = async (data: any) => {
    try {
        const response = await fetch(`${baseUrl}/apt/network`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const err = await response.text();
            throw new Error(err);
        }
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
    }
}

export const addTariff = async (data: any) => {
    try {
        const response = await fetch(`${baseUrl}/apt/tariff`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...data,
                amount: parseFloat(data.amount),
                per: parseFloat(data.per),
                billType: { id: parseInt(data.billType) },
            }),
        });
        if (!response.ok) {
            const err = await response.text();
            throw new Error(err);
        }
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
    }
}