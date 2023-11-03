import { ENV } from "../constants";
import { authFetch } from "../authFetch";

async function update(formData, userId) {
    try {
        const url = `${ENV.API_URL}/${ENV.END_POINTS.UPDATE}${userId}`;
        console.log("URL: ", url)
        const params = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        }
        const response = await authFetch(url, params);
        if (response.status = 200) throw response;
        return response.json();
    } catch (error) {
        console.log("Error al actualizar el usuario: ", error)
    }
}

export const updateController = {
    update
}