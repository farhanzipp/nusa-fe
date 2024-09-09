import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getDecodedToken } from "@/util/jwt-decode";
import { TDecodedToken } from "@/types";

export const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState<TDecodedToken | null>(null);

    useEffect(() => {
        const tokenData = Cookies.get("token");
        if (tokenData) {
            const { access_token } = JSON.parse(tokenData);
            const currUser = getDecodedToken(access_token);
            setCurrentUser(currUser);
        } else {
            setCurrentUser(null);
        }
    }, []);

    return currentUser;
}