import { Navigate, Outlet } from 'react-router-dom'

export function ProtectedRoute() {
  const user = localStorage.getItem('user')
  if (!user) {
    return <Navigate to="/account/signup" />
  }
  return <Outlet />
}
