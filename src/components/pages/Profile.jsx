import React, { useState, useEffect } from 'react'
import { Container } from '../index'
import { useParams } from 'react-router-dom'
import clientService from '../../appwrite/nodeSdk'



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

    <Container>
      <div className='flex flex-row w-full h-screen'>
        <div className='w-1/3 bg-blue-300 border-2'>
          <div className='w-1/3 justify-center mb-4'>
            <img src='' alt={user.name}
              className='border-4 rounded-xl py-5' />

          </div>
          <h1 className='text-lg w-full p-5'  >This is profile of {user.name}</h1>
          {/* <span>{user.$createdAt}</span> */}
          <div className='flex flex-row w-full gap-3 justify-center'>
            <div className='border-2 rounded-sm'>one</div>
            <div className='border-2 rounded-sm'>two</div>
            <div className='border-2 rounded-sm'>three</div>
            <div className='border-2 rounded-sm'>four</div>
          </div>
        </div>
        <div className='w-2/3 bg-white border-3 border-black h-screen overflow-y-scroll scroll-smooth'>
          <div class="p-2 space-y-2">

            <div class="h-40 bg-blue-200 border-4 border-blue-300 rounded-xl">Box 1</div>
            <div class="h-40 bg-blue-200 border-4 border-blue-300 rounded-xl">Box 2</div>
            <div class="h-40 bg-blue-200 border-4 border-blue-300 rounded-xl">Box 3</div>
            <div class="h-40 bg-blue-200 border-4 border-blue-300 rounded-xl">Box 4</div>
            <div class="h-40 bg-blue-200 border-4 border-blue-300 rounded-xl">Box 5</div>
            <div class="h-40 bg-blue-200 border-4 border-blue-300 rounded-xl">Box 6</div>
          </div>
        </div>
      </div>

    </Container>
  )
}

export default Profile