import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import './index.css';
import App from './App.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Protected from './components/AuthLayout';

// Lazy load all route pages
const Home = lazy(() => import('./components/pages/Home'));
const Login = lazy(() => import('./components/pages/Login'));
const SignUp = lazy(() => import('./components/pages/SignUp'));
const AddPost = lazy(() => import('./components/pages/AddPost'));
const EditPost = lazy(() => import('./components/pages/EditPost'));
const Post = lazy(() => import('./components/pages/Post'));
const AllPosts = lazy(() => import('./components/pages/AllPosts'));
const ForgetPassword = lazy(() => import('./components/pages/ForgetPassword'));
const Profile = lazy(() => import('./components/pages/Profile'));

// Optional: you can make a proper <Loader /> component
const Fallback = <div className="text-center py-10 text-xl">Loading...</div>;

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={Fallback}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: '/login',
        element: (
          <Suspense fallback={Fallback}>
            <Protected authentication={false}>
              <Login />
            </Protected>
          </Suspense>
        ),
      },
      {
        path: '/signup',
        element: (
          <Suspense fallback={Fallback}>
            <Protected authentication={false}>
              <SignUp />
            </Protected>
          </Suspense>
        ),
      },
      {
        path: '/add-post',
        element: (
          <Suspense fallback={Fallback}>
            <Protected authentication>
              <AddPost />
            </Protected>
          </Suspense>
        ),
      },
      {
        path: '/edit-post/:slug',
        element: (
          <Suspense fallback={Fallback}>
            <Protected authentication>
              <EditPost />
            </Protected>
          </Suspense>
        ),
      },
      {
        path: '/post/:slug',
        element: (
          <Suspense fallback={Fallback}>
            <Protected authentication>
              <Post />
            </Protected>
          </Suspense>
        ),
      },
      {
        path: '/all-posts',
        element: (
          <Suspense fallback={Fallback}>
            <Protected authentication>
              <AllPosts />
            </Protected>
          </Suspense>
        ),
      },
      {
        path: '/forget-password',
        element: (
          <Suspense fallback={Fallback}>
            <Protected authentication={false}>
              <ForgetPassword />
            </Protected>
          </Suspense>
        ),
      },
      {
        path: '/profile/:userid',
        element: (
          <Suspense fallback={Fallback}>
            <Protected authentication>
              <Profile />
            </Protected>
          </Suspense>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
