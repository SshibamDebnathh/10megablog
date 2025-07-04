import React from 'react'
import { useState, useEffect } from 'react'
import service from '../../appwrite/config'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Button, Container } from '../index'
import { useSelector } from 'react-redux'
import { lazy, Suspense } from 'react';
import { preloadImage } from '../../utils/preloadImage'


function Post() {

  const [post, setPost] = useState(null)
  const { slug } = useParams()
  const navigate = useNavigate()

  const userData = useSelector((state) => state.auth.userData)

  const isAuthor = post && userData ? post.userId === userData.$id : false

  useEffect(() => {
    let imgUrl;

    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setPost(post);

          imgUrl = service.getFileView(post.featuredImage);
          preloadImage(imgUrl)
        } else {
          navigate('/');
        }
      });
    }

   
  }, []);

  const deletePost = () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.featuredImage)
        navigate('/')
      }
    })
  }


  const HTMLContent = lazy(() => import('../HTMLContent'));

  return post ? (
    <div className='py-8'>
      <Container className='justify-items-center'>
        <div className="w-1/3 h-2/4 flex justify-center items-center mb-4 relative border rounded-xl p-2">
          <img
            src={service.getFileView(post.featuredImage)}
            alt={post.title}
            loading="eager"
            fetchpriority="high"
            decoding="async"
            width="800"
            height="600"
            type="image/webp"
            className="rounded-xl"
          />

        </div>
        {isAuthor && (<div className="absolute right-24">
          <Link to={`/edit-post/${post.$id}`} >
            <Button bgColor='bg-green-500' className='mr-3'>
              Edit
            </Button>
          </Link>
          <Button onClick={deletePost} bgColor='bg-red-500'>
            Delete
          </Button>
        </div>)}
        <div className='w-full mb-6'>
          <div className='font-bold text-2xl'>{post.title}</div>
        </div>
        <Suspense fallback={<div>Loading content…</div>}>
          <HTMLContent content={post.content} />
        </Suspense>
      </Container>
    </div>
  ) : null
}

export default Post