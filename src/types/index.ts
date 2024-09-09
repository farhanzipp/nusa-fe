import { signInSchema } from "@/lib/signin-schema";
import { z } from "zod";

export type TSignInSchema = z.infer<typeof signInSchema>

export interface TDecodedToken {
    sub: number;
    username: string;
    roles: string[];
    iat: number;
    exp: number;
}