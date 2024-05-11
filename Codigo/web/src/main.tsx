import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  LoaderFunction,
  RouterProvider,
} from 'react-router-dom'
import './index.css'
import { Home } from './routes/home'
import { Root } from './routes/home/root'
import { Item, loader as itemLoader } from './routes/home/item'
import { ProfilePage } from './routes/home/profile/my'
import { ProfileRoot } from './routes/home/profile/root'
import { CartPage } from './routes/home/profile/cart'
import { NewTicketPage } from './routes/home/profile/new-ticket'
import { Toaster } from './components/ui/sonner'
import { CheckoutPage } from './routes/checkout'
import { AccountRoot } from './routes/account/root'
import { SignUpForm } from './routes/account/signup'
import { LoginForm } from './routes/account/signin'
import { ProtectedRoute } from './routes/protect-route'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '', element: <Home /> },
      {
        path: 'item/:id',
        element: <Item />,
        loader: itemLoader as unknown as LoaderFunction,
      },
      {
        path: 'profile',
        element: <ProtectedRoute />,
        children: [
          {
            path: '',
            element: <ProfileRoot />,
            children: [
              {
                path: 'me',
                element: <ProfilePage />,
              },
              {
                path: 'cart',
                element: <CartPage />,
              },
              {
                path: 'new-ticket',
                element: <NewTicketPage />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/checkout',
    element: <ProtectedRoute />,
    children: [
      {
        path: '',
        element: <CheckoutPage />,
      },
    ],
  },
  {
    path: '/account',
    element: <AccountRoot />,
    children: [
      {
        path: 'signup',
        element: <SignUpForm />,
      },
      {
        path: 'login',
        element: <LoginForm />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Toaster />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
