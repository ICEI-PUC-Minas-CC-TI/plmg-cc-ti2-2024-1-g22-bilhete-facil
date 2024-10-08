import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  LoaderFunction,
  RouterProvider,
} from 'react-router-dom'
import { Toaster } from './components/ui/sonner'
import './index.css'
import { AccountRoot } from './routes/account/root'
import { LoginForm } from './routes/account/signin'
import { SignUpForm } from './routes/account/signup'
import { loader as checkoutLoader, CheckoutPage } from './routes/checkout'
import { Home, loader as homeLoader } from './routes/home'
import { Item, loader as itemLoader } from './routes/home/item'
import { ProfilePage } from './routes/home/profile/my'
import {
  loader as myTicketsLoader,
  MyTicketsPage,
} from './routes/home/profile/my-tickets'
import {
  loader as negotiationsLoader,
  NegotioationsPage,
} from './routes/home/profile/negotiations'
import { NewTicketPage } from './routes/home/profile/new-ticket'
import { ProfileRoot } from './routes/home/profile/root'
import { Root } from './routes/home/root'
import { ProtectedRoute } from './routes/protect-route'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Home />,
        loader: homeLoader as unknown as LoaderFunction,
      },
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
                path: 'new-ticket',
                element: <NewTicketPage />,
              },
              {
                path: 'my-tickets',
                element: <MyTicketsPage />,
                loader: myTicketsLoader as unknown as LoaderFunction,
              },
              {
                path: 'negotiations',
                element: <NegotioationsPage />,
                loader: negotiationsLoader as unknown as LoaderFunction,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/checkout/:id',
    element: <ProtectedRoute />,
    children: [
      {
        path: '',
        element: <CheckoutPage />,
        loader: checkoutLoader as unknown as LoaderFunction,
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
