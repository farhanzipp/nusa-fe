"use client"

import { signInSchema } from '@/lib/signin-schema';
import { TSignInSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { getDecodedToken } from '@/util/jwt-decode';
import { redirectByRole } from '@/util/route-by-role';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError
    } = useForm<TSignInSchema>({
        resolver: zodResolver(signInSchema),
    });

    const router = useRouter();
    const onSubmit = async (data: TSignInSchema) => {
        
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                email: data.email,
                password: data.password
            })
            const tokenData = response.data;
            Cookies.set("token", JSON.stringify(tokenData), {expires: 3});

            const decodedToken = getDecodedToken(tokenData.access_token);
            redirectByRole(decodedToken, router);
        } catch (error: any) {
            console.log(error);
            setError("password", { type: "custom", message: error.response.data.message });
        }
    };

  return (
    <Card>
        <CardHeader className='text-center'>
            <CardTitle>Login</CardTitle>
            <CardDescription>Login to your account</CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    {...register("email")}
                    type="email"
                    placeholder="email"
                />
                {errors.email && <p className='text-xs text-red-500'>{errors.email.message}</p>}
                <Input
                    {...register("password" )}
                    type="password"
                    placeholder="password"
                    className='mt-4'
                />
                {errors.password && <p className='text-xs text-red-500'>{errors.password.message}</p>}
                {errors.root?.serverError && (
                <p className="text-xs text-red-500">{errors.root.serverError.message}</p>
                )}
                <Button
                    type="submit"
                    disabled={isSubmitting} 
                    className="w-full mt-7"
                    >
                    {isSubmitting ? (
                       <Loader2 className='mr-2 h-4 w-4 animate-spin' /> 
                    ) : "Login"}
                </Button>
            </form>
    </CardContent>
    </Card>
  )
}
