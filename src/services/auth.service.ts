import axios, { AxiosInstance } from "axios";

export class AuthService {
    protected readonly instance: AxiosInstance;
    public constructor(url: string) {
        this.instance = axios.create({
            baseURL: url,
            timeout:3000,
            timeoutErrorMessage: "Request Timeout",
        });
    }

    login = async (email: string, password: string) => {   
        return this.instance.post("auth/signin", {
            email,
            password
        })
        .then((res) => {
            return res.data;
        })
    }
}