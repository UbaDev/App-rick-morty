import { ENV } from "../constants";

async function register(email, username, password) {
    try {
        const url = `${ENV.API_URL}/${ENV.END_POINTS.REGISTER}`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                email,
                password,
            })
        };
        const response = await fetch(url, params);

        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`Error en la solicitud: ${response.status}. Detalles: ${await response.text()}`);

        }
    } catch (error) {
        throw error;
    }
}


export const authApi = {
    register,
}