import { TDecodedToken } from "@/types";

export const redirectByRole = (decodedToken: TDecodedToken | null, router: any) => {
    if(!decodedToken) {
        router.push("/login");
        return;
    }

    if(decodedToken.roles.includes("SUPER_ADMIN") || decodedToken.roles.includes("ADMIN")) {
        router.push("/dashboard");
    } else if (decodedToken.roles.includes("USER")) {
        router.push("/user");
    }
}