import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store/store'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Protected from './components/AuthLayout'
import {AddPost,Login,SignUp,AllPosts,Post,EditPost,Home,ForgetPassword,Profile} from './components/pages/pageIndex'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />

      },
      {
        path: '/login',
        element: <Protected authentication={false}>
          <Login />
        </Protected>

      },
      {
        path: '/signup',
        element: <Protected authentication={false}>
          <SignUp />
        </Protected>

      },
      {
        path: '/add-post',
        element: <Protected authentication>
          <AddPost />
        </Protected>

      },
      {
        path: '/edit-post/:slug',
        element: <Protected authentication>
          <EditPost />
        </Protected>

      },
      {
        path: '/post/:slug',
        element: <Protected authentication>
          <Post />
        </Protected>

      },
      {
        path: '/all-posts',
        element: <Protected authentication>
          <AllPosts/>
        </Protected>

      },
     
      {
        path: '/forget-password',
        element: <Protected authentication={false}>
          <ForgetPassword/>
        </Protected>

      },
      {
        path: '/profile/:userid',
        element: <Protected authentication={true}>
          <Profile/>
        </Protected>

      },
    ],

  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
