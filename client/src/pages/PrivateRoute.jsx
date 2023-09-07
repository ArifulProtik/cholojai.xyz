import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute = () => {
  const { User } = useSelector((state) => state.auth)
  return User ? <Outlet /> : <Navigate to={'/signin'} replace />
}

export default PrivateRoute
