
export const baseUrl = "http://192.168.1.86:8080"

export const fetcher = async (url: string) => {
    // console.log(baseUrl + url)
    const response = await fetch(baseUrl + url);
    if (!response.ok) {
        const err = await response.text();
        console.log(err)
        throw new Error(err);
    }
    const result = await response.json();
    console.log(result)
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

export const addBillSession = async (data: any) => {
    try {
        const newData = {
            ...data,
            startDate: new Date(data.startDate).toISOString(),
            endDate: new Date(data.endDate).toISOString(),
        }
        console.log(newData)
        const response = await fetch(`${baseUrl}/apt/bill/session`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newData),
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

export const addBill = async (data: any) => {
    try {
        const response = await fetch(`${baseUrl}/apt/bill`, {
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

export const addDevice = async (data: any) => {
    try {
        const response = await fetch(`${baseUrl}/apt/device`, {
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