import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../slices/UserSlice'
import { logout } from '../slices/AuthSlice'

export const Header = () => {
  const { User } = useSelector((state) => state.auth)
  console.log(User?.profile_photo)

  const avatar = User?.profile_photo != null ? User?.profile_photo : `https://i.pravatar.cc/300`
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [LogoutApi] = useLogoutMutation()
  const handleLogout = async () => {
    try {
      await LogoutApi().unwrap()
      dispatch(logout())
      navigate("/")

    } catch (err) {
      console.log(err)

    }
  }
  useEffect(() => {

  }, [User])
  return (
    <div className="navbar bg-white ">

      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex="0" class="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex="0" className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to={'/blog'} className='font-bold'>Blog</Link></li>
            <li><Link to={'/tours'} className='font-bold'>Tour Packages</Link></li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">CholoJai.xyz</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to={'/blog'} className='font-bold'>Blog</Link></li>
          <li><Link to={'/tours'} className='font-bol'>Tour Packages</Link></li>
        </ul>
      </div>
      <div className="navbar-end">
        {/* <Link to={"/signup"} className='btn btn-secondary text-white'>Get Started</Link> */}
        {User?.role === 'ORG' && <Link to={"/dashboard"} className='btn btn-ghost text-neutral-900'>Dashboard</Link>}
        {User && <Link to={"/write"} className="btn btn-ghost text-neutral-900">Write </Link>}
        {User ? <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={avatar} />
            </div>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <Link to={"/profile"} className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li><a>Settings</a></li>
            <li><a onClick={handleLogout}>Logout</a></li>
          </ul>
        </div> : <Link to={"/signin"} className='btn btn-secondary text-white'>Sign In</Link>}
      </div>
    </div>
  )
}
