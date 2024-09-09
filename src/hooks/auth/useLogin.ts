import { authService } from "@/services"
import Cookies from "js-cookie"

export const useLogin = () => {
    const login = async (username: string, password: string) => {
        const user = await authService.login(username, password);
        if (user) {
            Cookies.set("token", JSON.stringify(user));
            return user;
        }
    };

    return { login };
}