import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { toast } from "react-toastify"

export const PrivateRoutes = ({ children }) => {
    const { token } = useSelector((data) => data.auth)
    if (!token) {
        toast.error("You are not login. Please login first.")
        return <Navigate to={'/sign-in'} />
    }
    return children
}