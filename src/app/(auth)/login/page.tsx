import LoginForm from '@/components/forms/login-form'
import React from 'react'

export default function LoginPage() {
    
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center'>
        <h1>Login Page</h1>
        <div className='w-1/4'>
            <LoginForm />
        </div>
    </div>
  )
}
