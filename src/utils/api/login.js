import { ENV } from "../constants";

async function login(email, password) {
    try {
        const url = `${ENV.API_URL}/${ENV.END_POINTS.LOGIN}`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                identifier: email, 
                password,
            }),
        };
        const response = await fetch(url, params);

        if (response.status !== 200) {
            throw new Error("Inicio de sesión fallido");
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

export const authApi2 = {
    login, 
};