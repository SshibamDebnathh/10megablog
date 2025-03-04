import React, { useState, useEffect } from 'react'
import { Container } from '../index'
import { useParams } from 'react-router-dom'
import clientService from '../../appwrite/nodeSDK'



function Profile() {


  const { userid } = useParams()

  const [user, setUser] = useState({})

  useEffect(() => {
      fetchUser()

  }, [userid])

  // useEffect(() => {
  //   console.log("state updated", user)
  // }, [user])

  async function fetchUser() {
    try {
      const data = await clientService.getProfile(userid)
      setUser(data)
    } catch (error) {
      console.log(error)
    }

  }


  return (
    <div className='flex w-full h-40'>
      
      <Container>
        <div className='w-1/3 bg-blue-400 h-'>
        <h1 className='text-green-300 text-lg w-full p-5'  >This is profile of {user.name}</h1>
        <span>{user.$createdAt}</span>

        </div>
        <div className='w-2/3 bg-white'>

        </div>

      </Container>
    </div>
  )
}

export default Profile