"use client"

import { useLogin } from '@/hooks/auth/useLogin';
import { signInSchema } from '@/lib/signin-schema';
import { TSignInSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<TSignInSchema>({
        resolver: zodResolver(signInSchema),
    });

    const { login } = useLogin();
    const router = useRouter();

    const [serverError, setServerError] = useState<string | null>(null);

    const onSubmit = async (data: TSignInSchema) => {
        //TODO: handle login
        console.log('hello')
        setServerError(null);

        try {
            const user = await login(data.email, data.password);
            router.push("/dashboard");
        } catch (error) {
            setServerError("Invalid email or password");
        }
    }

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
        {serverError && <p className='text-red-500'>{serverError}</p>}
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
