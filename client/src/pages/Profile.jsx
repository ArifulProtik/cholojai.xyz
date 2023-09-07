import React, { useEffect } from 'react'
import { Header } from '../components/Header'
import { useSelector } from 'react-redux'
import Footer from '../components/Footer'

const Profile = () => {
  const { User } = useSelector((state) => state.auth)

  useEffect(() => {
    document.title = `${User.name} | CholoJai.xyz`
  })
  return (
    <>
      <div className="bg-white">
        <div className="container">
          <Header />
        </div>
      </div>
      <Footer />

    </>
  )
}

export default Profile
