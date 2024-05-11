import { Navigate, Outlet } from 'react-router-dom'

export function ProtectedRoute() {
  const isAuthenticated = localStorage.getItem('token')
  if (!isAuthenticated) {
    return <Navigate to="/account/signup" />
  }
  return <Outlet />
}
