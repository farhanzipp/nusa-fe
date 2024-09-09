import { TDecodedToken } from "@/types";
import { jwtDecode }  from "jwt-decode";

export const getDecodedToken = (token:string): TDecodedToken | null => {
    if(!token) return null;
    try {
        return jwtDecode(token);
    } catch (error) {
        console.error(error);
        return null;
    }
}
