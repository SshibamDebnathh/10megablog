import React from 'react'
import { useSelector } from 'react-redux'
import { Container, LogoutBtn, Logo } from "../index"
import { useNavigate, Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Header() {

  const authstatus = useSelector((state) => state.auth.status)
  const [bars, setBars] = React.useState(true)
  const navigate = useNavigate()
  const user = useSelector(state => state.auth.userData)


  

  const navItems = [
    {
      name: "Home",
      slug: '/',
      active: true,
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authstatus
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authstatus
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authstatus
    },
    {
      name: ' Add post',
      slug: '/add-post',
      active: authstatus
    }
  ]
//try to add the fonts again in the nav class and see the lighthuse score

  return (
    <header className='py-3 lg:p-3 md:p-3 shadow bg-slate-300 sticky z-20 rounded-md'>

      <div className='flex items-center'>
        <FontAwesomeIcon icon={faBars} className='absolute lg:hidden md:hidden cursor-pointer right-5' onClick={() => setBars(!bars)} />
        </div>
      <Container className='px-0'>
        <nav
          className={`${bars ? 'hidden' : 'flex flex-col fixed right-10 top-16 p-2'} 
        lg:flex lg:flex-row lg:gap-10 md:flex md:flex-row md:static
        lg:static lg:px-6 lg:py-2 lg:rounded-lg rounded-md
        bg-gray-800 border-white border-2`}
        >
          <div className='flex text-white font-bold p-2 items-center justify-center'>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
            {authstatus &&
              <Link to={`/profile/${user.$id}`}>
                Hello {user.name}
              </Link>
            }
          </div>
          <ul className='flex flex-col lg:flex-row md:flex-row ml-auto'>
            {authstatus && <li>
              <SearchBar />
            </li>}
            {navItems.map((item) => (
              item.active ? <li key={item.name} >
                <button onClick={() => navigate(item.slug)}
                  className='inline-bock px-6 py-2 duration-200 hover:bg-blue-600 rounded-full font-semibold text-lg text-white'
                >{item.name}</button>
              </li> : null
            ))}
            {
              authstatus && <li>
                <LogoutBtn />
              </li>
            }
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header