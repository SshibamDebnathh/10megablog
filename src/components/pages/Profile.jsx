import React from 'react'
import {Container} from '../index'
import { useParams } from 'react-router-dom'



function Profile() {


   const {userid} = useParams() 


  return (
    <div>
        <Container>
            <h1 className='text-green-300 text-lg w-full p-5'  >This is profile of {userid}</h1>
        </Container>
    </div>
  )
}

export default Profile