import React from 'react'
import service from '../../appwrite/config'
import { useState,useEffect } from 'react'
import {PostCard,Container} from '../index'

function AllPosts() {

const [posts, setPosts] = useState([])

useEffect(()=>{
    service.getPosts([]).then((posts)=>{
        if(posts){
            setPosts(posts.documents)
        }
    })
},[])

  return (
    <div className='w-full py-8'>
        <Container>
        <div className="w-full flex flex-wrap justify-evenly">
                    {posts?.map((post) => (
                        <div key={post.$id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
        </Container>
    </div>
  )
}

export default AllPosts