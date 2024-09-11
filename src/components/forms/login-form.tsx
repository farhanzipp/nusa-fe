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
    <form onSubmit={handleSubmit(onSubmit)}>
        <input
            {...register("email")}
            type="email"
            placeholder="email"
            className='py-2'
        />
        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
        <input
            {...register("password" )}
            type="password"
            placeholder="password"
            className='py-2'
        />
        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
        {errors.root?.serverError && (
          <p className="text-sm text-red-500">{errors.root.serverError.message}</p>
        )}
        <button
            type="submit"
            disabled={isSubmitting}
            className='w-full bg-blue-500 text-white py-2 disabled:bg-gray-500 rounded'
            >
            {isSubmitting ? "Loading..." : "Login"}
        </button>
    </form>
  )
}
