import './App.css'
import conf from './conf/conf'
import { useEffect,useState } from 'react'
import {Header,Footer} from "./components/index"
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import {login,logout} from './store/authSlice'
import { Outlet } from 'react-router-dom'


function App() {
const [loading, setLoading] = useState(true)
const dispatch = useDispatch()


useEffect(() => {
  authService.getCurrentUser()
  .then((userData) => {
    if (userData) {
      dispatch(login({userData}))
    } else {
      dispatch(logout())
    }
  })
  .finally(() => setLoading(false))
}, [])

//  console.log(conf.appwriteUrl)
  return !loading ? (
    <>
    <Header/>
    <main>
    <Outlet/>
    </main>
    <Footer/>
    </>
  ) : null
}

export default App
