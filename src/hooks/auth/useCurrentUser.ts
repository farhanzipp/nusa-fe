import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getDecodedToken } from "@/util/jwt-decode";
import { TDecodedToken } from "@/types";
import { atom, useAtom } from "jotai";

export const currentUserAtom = atom<TDecodedToken | null>(null);
export const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
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