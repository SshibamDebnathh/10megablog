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
            <div className='flex flex-wrap'>
                {posts?.map((post)=> (<div key={post.$id} className='w-1/4 py-2 px-2'>
                    <PostCard {...post}/>
                </div>))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts