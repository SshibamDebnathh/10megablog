import React from 'react'
import { useSelector } from 'react-redux'
import { Container, LogoutBtn, Logo } from "../index"
import { useNavigate, Link } from 'react-router-dom'
import SearchBar from './SearchBar'

function Header() {

  const authstatus = useSelector((state) => state.auth.status)

  const navigate = useNavigate()

  

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
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {authstatus && <li>
              <SearchBar/>
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