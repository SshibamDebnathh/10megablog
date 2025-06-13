import React from 'react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Input, Button, Select, RTE } from "../index"
import service from '../../appwrite/config'

export default function PostForm({ post }) {

  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    }
  })

  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)

  const submit = async (data) => {
    const originalFile = data.image?.[0];
    let file = null;
  
    if (originalFile) {
      const imageCompression = (await import('browser-image-compression')).default;
  
      const compressedImage = await imageCompression(originalFile, {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      });
  
      const webpBlob = await convertToWebP(compressedImage);
  
      const webpFile = new File(
        [webpBlob],
        originalFile.name.replace(/\.[^.]+$/, '.webp'),
        { type: 'image/webp' }
      );
  
      file = await service.uploadFile(webpFile);
    }
  
    if (post) {
      if (file) {
        service.deleteFile(post.featuredImage);
      }
  
      const dbPost = await service.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : post.featuredImage,
      });
  
      if (dbPost) navigate(`/post/${dbPost.$id}`);
    } else {
      if (file) {
        data.featuredImage = file.$id;
      }
  
      const dbPost = await service.createPost({
        ...data,
        userId: userData.$id,
      });
  
      if (dbPost) navigate(`/post/${dbPost.$id}`);
    }
  };
  

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string')
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return '';
  }, [])
  const convertToWebP = (file) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = () => {
        img.src = reader.result;
      };

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error('WebP conversion failed'));
          },
          'image/webp',
          0.8
        );
      };

      reader.readAsDataURL(file);
    });
  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title), { shouldValidate: true })
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue])


  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="w-2/3 px-2" >
        <Input
          label="Title :"
          placeholder="Title"
          className='mb-4'
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className='mb-4'
          readOnly
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue('slug', slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
        />
        <RTE label="Content :" name="content" control={control} defaultValue={getValues('content')} />
      </div>
      <div className='w-1/3 px-2'>
        <Input
          label='Featured Image :'
          type="file"
          className='mb-4'
          accept='image/*'
          {...register('image', { required: !post })}
        />
        {post && (<div className='w-full mb-4'>
          <img
            src={service.getFilePreview(post.featuredImage)}
            className='rounded-lg'
            alt={post.title} />
        </div>)}
      </div>
      <Select
        label="Status :"
        className='mb-4'
        options={["active", "inactive"]}
        {...register('status', { required: true })}
      />
      <Button type='submit' className={post ? "bg-green-500" : undefined}>{post ? "Update" : "Submit"}</Button>
    </form>

  )
}
