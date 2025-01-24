import React, { useState, useEffect } from 'react'
import { PostForm, Container } from '../index'
import { useNavigate, useParams } from 'react-router-dom'
import service from '../../appwrite/config'



function EditPost() {
  const [post, setPost] = useState(null)
  const navigate = useNavigate()
  const { slug } = useParams()

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) { setPost(post) }
      })
    } else {
      navigate('/')
    }

  }, [slug, navigate])

  return post ? (
    <div className='py-8'>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null
}

export default EditPost