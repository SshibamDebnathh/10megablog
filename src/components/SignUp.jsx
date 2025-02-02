import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { login } from '../store/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Logo, Input } from './index'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

function SignUp() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(true)

  const create = async (data) => {
    console.log(data)
    setError('')
    try {
      const userData = await authService.createAccount(data)
      if (userData) {
        const userData = await authService.getCurrentUser()
        if (userData) dispatch(login(userData));
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


    <div className="flex items-center justify-center">
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border mt-1 border-black/10`}>
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
          <div className='space-y-5 text-left'>
            <Input
              label='Fullname:'
              placeholder='Full Name'
              {...register('name', {
                required: true,
              })}
            />
            <Input
              label='Email:'
              type='Email'
              placeholder='Enter Your Email'
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
              label='Password:'
              type={showPassword?'password':'text'}
              placeholder='Enter Your Password'
              {...register('password',{
                required: true,
              })}
            />
             <button type='button' className='px-2 mt-7 h-10 bg-gray-400 text-white rounded-lg hover:bg-gray-600 transition' onClick = {()=> passShow() }><i id="icon" className="fas fa-eye-slash"></i></button>
                        
           </div>
            <Button
              type='submit'
              className='w-full'
            >Create Account
            </Button>
          </div>

        </form>
      </div>
    </div>

  )
}

export default SignUp