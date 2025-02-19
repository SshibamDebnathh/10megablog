import React from 'react'
import { Input, Button } from './index'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import authService from "../appwrite/auth"
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice'

function RecoverPass(details) {

    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
  
    const createPass = async (data) => {
        
        try {
            if (data.password === data.repeatPassword) {
                const loginObj = {
                    email : localStorage.getItem('email'),
                    password : data.password
                }
                await authService.createNewPassword(details.userId,details.secret,data.password)
                const session = await authService.login(loginObj)

            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login({ userData }))
                navigate('/')
                localStorage.removeItem('email')
            }}
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit(createPass)}>
                <div>
                    <Input
                        label='Enter New Password :'
                        placeholder='Password'
                        type='password'
                        {...register('password', {
                            required: true,
                        })}
                    />
                    <Input
                        label='Re-enter Password :'
                        placeholder='Re-enter Password'
                        type='password'
                        {...register('repeatPassword', {
                            required: true,
                        })}
                    />
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}

export default RecoverPass