import React, { useEffect } from 'react'
import ImgBG from '../assets/LoginBG.jpeg'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../slices/UserSlice'
import { setUser } from '../slices/AuthSlice'

const Login = () => {
  const schema = yup.object().shape({
    email: yup.string().email().required("Valid email is required"),
    password: yup.string().min(5).required("Password is required"),

  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading, error }] = useLoginMutation()
  const { User } = useSelector((state) => state.auth)

  useEffect(() => {
    document.title = 'Signin | CholoJai.xyz'
    if (User) {
      navigate('/')
    }
  }, [navigate, User])



  console.log(error)
  const onSubmit = async (data) => {
    try {
      const { email, password } = data
      const res = await login({ email, password }).unwrap()
      console.log(res)
      dispatch(setUser(res))


    } catch (err) {
      console.log(err)

    }
  }
  return (
    <>
      <div className='h-screen md:flex bg-mybg'>
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
        <div className='px-0 flex w-full md:w-1/2 h-screen justify-center py-4 items-center bg-white'>
          <form className='bg-white w-[70%] mx-auto md:mx-auto' onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-neutral-900 font-bold text-2xl mb-1">Hello Again!</h1>
            <p class="text-sm font-normal font-sans text-neutral-900 mb-7">Welcome Back</p>
            {error?.data ? <div className="alert alert-error w-full max-w-xs text-sm text-white">
              <span> {error.data.errors.msg} </span>
            </div> : null}
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
              <input type="password" placeholder="Password" className={`input input-bordered ${errors.password ? 'input-error' : 'input-info'} sm:max-w-sm w-full max-w-xs bg-white`} {...register("password")} />
            </div>
            <Link to={'/forget'} className='text-primary font-sans text-sm block mt-2'>Forgot password?</Link>

            <button type='submit' className={`btn btn-block btn-primary mt-8 max-w-xs `}>
              {isLoading ? <span className="loading loading-spinner loading-md"></span> : 'Sign in'}
            </button>
            <p className="text-sm ml-12 md:ml-16 xl:ml-24 font-normal font-sans text-neutral-900 mb-2 mt-2">Don't have an account? </p>

            <Link to={"/signup"} className=' btn btn-secondary btn-block max-w-xs'> Sign up</Link>

            <div className="text-center mt-8">
              <Link to={"/"} className='md:hidden btn btn-link text-center font-sans'> Go Back</Link>

            </div>


          </form>

        </div>
      </div >

    </>
  )
}

export default Login
