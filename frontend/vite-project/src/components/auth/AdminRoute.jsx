import { Navigate, useLocation } from 'react-router-dom'

export default function AdminRoute({ children }) {
  const location = useLocation()

  const token = localStorage.getItem('token')
  let user = null
  try {
    user = JSON.parse(localStorage.getItem('user') || 'null')
  } catch {
    user = null
  }

  const isAdmin = !!token && user?.role === 'admin'

  if (!isAdmin) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return children
}
