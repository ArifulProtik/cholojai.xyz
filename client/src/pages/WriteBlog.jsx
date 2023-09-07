import React, { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import Footer from '../components/Footer'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.bubble.css'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { FireApp } from '../firebase'
import { usePostBlogMutation } from '../slices/BlogSlice'
import { useNavigate } from 'react-router-dom'
import { async } from '@firebase/util'


const WriteBlog = () => {
  const [value, setValue] = useState("")
  const [image, setImage] = useState(null)
  const [title, setTitle] = useState("")
  const [featureImage, setFeatureImage] = useState("")
  const storage = getStorage(FireApp);
  const navigate = useNavigate()

  const data = {
    title: title,
    content: value,
    feature_image: featureImage
  }

  document.title = 'Write Blog | CholoJai.xyz'
  const [post, { isError, isSuccess, isLoading }] = usePostBlogMutation()

  const HandleClick = async () => {
    try {
      const data2 = await post(data).unwrap()
      navigate(`/${data2.slug}`)

    } catch (err) {
      console.log(err)

    }

  }
  useEffect(() => {
    const upload = () => {
      const name = Date.now() + '-' + image.name
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            setFeatureImage(downloadURL)
          });
        }
      );

    }
    image && upload()

  }, [image])


  return (
    <>
      <div className="bg-white">
        <div className="container">
          <Header />
        </div>
      </div>
      <div className="bg-white h-auto">
        <div className="container mx-auto px-40 py-16">

          <input type="text" placeholder="Title" className="font-content my-text w-full" onChange={e => setTitle(e.target.value)} />
          <input type='file' id='image' style={{ display: 'none' }} onChange={e => setImage(e.target.files[0])} />
          <button className="btn btn-circle mt-6 mb-6">
            <label htmlFor='image'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" /></svg>
            </label>
          </button>
          {image && <img src={URL.createObjectURL(image)} alt="" className='w-full h-96 object-cover mt-4' />}
          <ReactQuill theme='bubble' onChange={setValue} value={value} placeholder='Tell your story' />
          <button className="btn btn-primary" onClick={HandleClick}>

            {isLoading ? <span className="loading loading-spinner loading-md"></span> : 'Publish'}
          </button>
          {isError && <div className="toast toast-top toast-end">
            <div className="alert alert-error">
              <span>Something Went wrong</span>
            </div>
          </div>}

        </div>
      </div>
      <Footer />
    </>
  )

}
export default WriteBlog
