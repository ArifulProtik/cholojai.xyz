import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import { Provider } from 'react-redux'
import store from './Store.js'
import PrivateRoute from './pages/PrivateRoute.jsx'
import Profile from './pages/Profile.jsx'
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import WriteBlog from './pages/WriteBlog.jsx'
import SinglePost from './pages/SinglePost.jsx'

TimeAgo.addDefaultLocale(en)

const router = createBrowserRouter(createRoutesFromElements(

  <Route path='/' element={<App />}>
    <Route index={true} element={<Home />} />
    <Route path='/signin' element={<Login />} />
    <Route path='/signup' element={<Signup />} />
    <Route path='/:slug' element={<SinglePost />} />
    <Route path='' element={<PrivateRoute />}>
      <Route path='/profile' element={<Profile />} />
      <Route path='/write' element={<WriteBlog />} />
    </Route>


  </Route >
))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  </Provider>
)
