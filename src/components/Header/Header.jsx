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


  return (
    <header className='py-3 shadow bg-gray-400 sticky'>

      <FontAwesomeIcon icon={faBars} className='absolute lg:hidden md:hidden cursor-pointer right-5' onClick={() => setBars(!bars)} />
      <Container>
        <nav
          // className={bars ? 'hidden lg:flex lg:space-x-6 lg:text-base lg:border-2 lg:border-white lg:px-6 lg:py-2 lg:rounded-lg lg:gap-10 font-sans bg-gray-400 relative' : 'flex flex-col border-2 lg:flex-row lg:text-base lg:border-0 lg:font-sans rounded-lg  border-black fixed right-5 top-20 p-2 lg:static lg:gap-5 lg:border-white lg:p-2 lg:rounded-lg bg-gray-400 text-sm mb-12'}
          className={`${bars ? 'hidden' : 'flex flex-col fixed right-10 top-16 p-2'} 
        lg:flex lg:flex-row lg:gap-10 md:flex md:flex-row md:static
        lg:static lg:px-6 lg:py-2 lg:rounded-lg rounded-md lg:text-base
        font-sans bg-gray-400 border-white border-2 text-xs`}
        >
          <div className='mr-4'>
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
                  className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
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