import { ENV } from "../constants";
import { authFetch } from "../authFetch";

const getMe = async () => {
    try {
        const url = `${ENV.API_URL}/${ENV.END_POINTS.USERS_ME}`;
        const response = await authFetch(url);

        return await response.json();
    } catch (error) {
        console.log(error);
        return null
    }
}
export const userController = {
    getMe
}