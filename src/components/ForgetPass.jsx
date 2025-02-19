import React from 'react'
import {Input,Button} from './index'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth'
import RecoverPass from './RecoverPass'
 


function ForgetPass() {

    const {register,handleSubmit} = useForm()
   
    const [email, setEmail] = React.useState('')

    const urlParams = new URLSearchParams(window.location.search)      
    const secret = urlParams.get('secret');
    const userId = urlParams.get('userId');

    const forgetPass = async (data)=>{
      const email = await data.email
      setEmail(email)
        if(email){
          
            await authService.recoverPassword(email)
            
            localStorage.setItem('email',email)
            console.log("email sent")
           
        }
    }

  return !userId ? (
    <div>
      
        {!email ? (

        <form onSubmit={handleSubmit(forgetPass)}>
           <Input
           label = "Enter email :"
           type = "email"
           placeholder = 'Enter Email id'
           {...register('email',{
            required:true,
           })}
           />
           <Button type='submit' >send email</Button>
        </form>
        
        )   : <h1 className='w-full text-center text-3xl text-cyan-200 m-5'>Email has been sent successfully</h1>
      }
    </div>  
  ) : <RecoverPass userId={userId} secret={secret}/>
}

export default ForgetPass