import React, { useState, useEffect } from 'react'
import { Header } from '../components/Header'
import Footer from '../components/Footer'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { FireApp } from '../firebase'
import { useCreatePackageMutation } from '../slices/PackageSlice'
import { useNavigate } from 'react-router-dom'


const Dashboard = () => {
  document.title = 'Dashboard | Cholo Jai'

  const [title, setTitle] = useState("")
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [duration, setDuration] = useState(0)
  const [price, setPrice] = useState(0)
  const [seats, setSeats] = useState(0)
  const [time, setTime] = useState("")
  const [image, setImage] = useState(null)
  const [description, setDescription] = useState("")
  const [featureImage, setFeatureImage] = useState("")
  const storage = getStorage(FireApp);
  const navigate = useNavigate()

  const mydata = {
    "data": {
      "price": price,
      "departure": time,
      "duration": duration,
      "title": title,
      "Seat": seats,
      "content": description,
      "location": to,
      "form": from,
      "feature_image": featureImage
    }
  }
  const [create, { isError, isLoading, isSuccess }] = useCreatePackageMutation()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const mypack = await create(mydata).unwrap()
      isSuccess && navigate(`/pack/${mypack.slug}`)

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
      <div className="bg-white container p-12 mx-auto mt-12">
        <div className='container'>

          <form className='w-[40%] mx-auto' onSubmit={handleSubmit}>
            <h1 className='font-content font-bold text-2xl mb-6'> Create a new Package</h1>
            <input type="text" placeholder="Title" className="input input-bordered w-full block mb-6" onChange={e => setTitle(e.target.value)} />


            <input type="text" placeholder="From" className="input input-bordered w-full block mb-6" onChange={e => setFrom(e.target.value)} />


            <input type="text" placeholder="To" className="input input-bordered w-full block mb-6" onChange={e => setTo(e.target.value)} />


            <input type="number" placeholder="Duration" className="input input-bordered w-full block mb-6" onChange={e => setDuration(e.target.value)} />



            <input type="number" placeholder="Price" className="input input-bordered w-full block mb-6" onChange={e => setPrice(e.target.value)} />



            <input type="number" placeholder="Availble Seats" className="input input-bordered w-full block mb-6" onChange={e => setSeats(e.target.value)} />



            <input type="text" placeholder="Starting Time: ex: 2 June, 2023 " className="input input-bordered w-full block mb-6" onChange={e => setTime(e.target.value)} />

            <input type="file" className="file-input file-input-bordered file-input-md w-full mb-6" onChange={e => setImage(e.target.files[0])} />

            <div className="form-control w-full mb-6">

              <ReactQuill theme='snow' onChange={setDescription} value={description} placeholder='Put Your Desscription' />
            </div>
            <button type='submit' className="btn btn-primary btn-block">
              {isLoading ? <span className="loading loading-spinner loading-md"></span> : 'Create'}
            </button>



          </form>
        </div >

      </div >
      <Footer />

    </>
  )
}

export default Dashboard
