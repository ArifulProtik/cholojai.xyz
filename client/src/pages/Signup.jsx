import React, { useEffect } from 'react'
import ImgBG from '../assets/LoginBG.jpeg'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const Signup = () => {
  useEffect(() => {
    document.title = 'Signup | CholoJai.xyz'
  }, [])
  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    username: yup.string().min(5).required("Username is required"),
    email: yup.string().email().required("Valid email is required"),
    password: yup.string().min(8).required("Password is required"),
    role: yup.boolean().required("Role is required")
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  console.log(errors)
  const onSubmit = (data) => {
    console.log(data)
  }
  return (
    <>
      <div className='md:h-screen sm:h-auto md:flex bg-mybg'>

        <div className='relative overflow-hidden md:flex w-1/2 i justify-around items-center hidden'>
          <img className='absolute object-cover w-full h-screen' src={ImgBG} alt="Sign in Image Background" />
          <div className='absolute w-full h-screen bg-neutral-700 opacity-40'></div>
          <div className="absolute left-16 top-64 z-20 font-sans text-neutral-900">

            <Link to={'/'} className='font-bold font-mono text-4xl text-white'>
              Cholojai.xyz
            </Link>
            <p className="text-base text-white mt-2 font-medium drop-shadow-md">
              A place where you can find your next destination...
            </p>
          </div>
        </div>
        <div className='px-0 flex w-full sm:h-auto md:w-1/2 h-screen justify-center py-4 items-center bg-white'>
          <form className='bg-white w-[70%] mx-auto md:mx-auto' onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-neutral-900 font-bold text-2xl mb-1">Hello Welcome!</h1>
            <p className="text-sm font-normal font-sans text-neutral-900 mb-7">Please provide your information</p>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text text-neutral-900 mb-1">Name:</span>
              </label>
              <input type="text" placeholder="Name"
                className={`input input-bordered ${errors.name ? 'input-error' : 'input-info'} sm:max-w-sm w-full max-w-xs bg-white }`}
                {...register("name")}
              />
              {errors.name ? <div className="toast toast-top toast-end">
                <div className="alert alert-error text-white font-medium">
                  <span>{errors.name?.message} !</span>
                </div>
              </div> : null}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text text-neutral-900 mb-1">Username:</span>
              </label>
              <input type="text" placeholder="Username"
                className={`input input-bordered ${errors.username ? 'input-error' : 'input-info'} sm:max-w-sm w-full max-w-xs bg-white`} {...register("username")} />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text text-neutral-900 mb-1">Email:</span>
              </label>
              <input type="text" placeholder="Email" className={`input input-bordered ${errors.email ? 'input-error' : 'input-info'} sm:max-w-sm w-full max-w-xs bg-white`} {...register("email")} />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text text-neutral-900 mb-1 mt-1">Password:</span>
              </label>
              <input type="password" placeholder="Passsword" className={`input input-bordered  ${errors.name ? 'input-error' : 'input-info'} sm:max-w-sm w-full max-w-xs bg-white`} {...register("password")} />
            </div>
            <div className="form-control w-full max-w-xs mt-2">
              <label className="label cursor-pointer">
                <span className="label-text text-neutral-900">Want to Be Tour Organizer? </span>
                <input type="checkbox" className="checkbox checkbox-primary" {...register("role")} />
              </label>
            </div>

            <button type='submit' className='btn btn-block btn-primary mt-8 max-w-xs '>

              Sign up</button>
            <p className="text-sm ml-12 md:ml-16 xl:ml-24  font-normal font-sans text-neutral-900 mb-2 mt-2">Already have an account? </p>

            <Link to={"/signin"} className=' btn btn-secondary btn-block max-w-xs'> Sign in</Link>

            <div className="text-center mt-8">
              <Link to={"/"} className='md:hidden btn btn-link text-center font-sans'> Go Back</Link>

            </div>


          </form>

        </div>
      </div>

    </>

  )
}

export default Signup
