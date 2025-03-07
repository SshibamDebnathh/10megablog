import React, {useState,useEffect} from 'react'
import clientService from '../../appwrite/nodeSdk'
import { Link } from 'react-router-dom'



function SearchBar() {
  const [name, setName] = useState('')
  const [result, setResult] = useState([])
  const [loading, setLoading] = useState(false)
 


  

  useEffect(() => {
    if (!name.trim()) {
      setResult([])
      
      return;
    }
    const delayDebounceFn = setTimeout(() => {
      
     
      fetchResult();

  }, 300); 
    
    return () => clearTimeout(delayDebounceFn)
  }, [name])


  const fetchResult = async () => {

    setLoading(true)

    try {
      const data = await clientService.searchUser()
      // const users = data.users.map((user)=>user.name)
      // console.log(users)
      setResult(data.users)
      // console.log(result)

    } catch (error) {
      console.log(error)

    }
    setLoading(false)
  }



  return (
    <div className='relative'>
      <input
        type="text"
        value={name}
        placeholder='Search'
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded w-full"
      />
      {loading && <p className='test-sm text-gray-500'>Loading result...</p>}
      {result.length > 0 && (
        <ul className="absolute bg-white border rounded mt-1 w-full shadow-lg">
          {result.map((user) => (user.name.includes(name)&&<li key={user.$id} className="p-2 hover:bg-gray-100" >
            <Link to={`/profile/${user.$id}`}>{user.name}</Link>
          </li>
          ))}
        </ul>
      )}
      {/* <button onClick={handleSearch}>search</button> */}
    </div>
  )
}

export default SearchBar