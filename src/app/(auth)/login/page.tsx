import LoginForm from '@/components/forms/login-form'
import React from 'react'

export default function LoginPage() {
    
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center'>
        <div className='w-5/6 md:w-[400px]'>
            <LoginForm />
        </div>
    </div>
  )
}
