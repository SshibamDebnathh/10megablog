import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login as authLogin } from '../store/authSlice'
import { useForm } from 'react-hook-form'
import { Button, Logo, Input } from './index'

function Login() {

    const [error, setError] = useState('')
    
    const [showPassword, setShowPassword] = useState(true)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const { register, handleSubmit } = useForm()

    const login = async (data) => {

        setError('')
        try {
            const session = await authService.login(data)

            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin({ userData }))
                
                if (userData) dispatch(authLogin({userData}))
                navigate('/')

            }
        } catch (error) {
            setError(error.message)
        }
    }
    const passShow =()=>{

        setShowPassword(!showPassword)
        let passIcon = document.getElementById('icon')
                            if(showPassword===false){
                                passIcon.classList.remove("fa-eye");
                                passIcon.classList.add("fa-eye-slash");
                            }
                            else{
                                passIcon.classList.remove("fa-eye-slash")
                                passIcon.classList.add("fa-eye")
                            }
                        
    }
    return (
        <div
            className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border mt-1 border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5 text-left'>
                        <Input
                            label='Email: '
                            type='email'
                            placeholder='Enter your email'
                            {...register('email', {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                },

                            })}
                        />
                        <div className='flex flex-row items-center gap-1'>
                        <Input
    
                            label="Password: "
                            type={showPassword? "password":"text"}
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <button type='button' className='px-2 mt-7 h-9 bg-gray-400 text-white rounded-lg hover:bg-gray-600 transition' onClick = {()=>
                        passShow() }><i id="icon" className="fas fa-eye-slash"></i></button>
                        </div>
                        <Button
                            type='submit'
                            className='w-full'
                        >
                            Login
                        </Button>

                    </div>
                </form>
                <Link
                    type='submit'
                    className='w-full'
                    to={'/forget-password'}
                >
                    Forget password
                </Link>
            </div>
        </div>
    )
}

export default Login