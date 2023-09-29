import React from 'react'
import UsersList from '../components/UsersList'

const Users = () => {

    const USERS = [
        {
        id: 'u1',
        image: 'https://rb.gy/83k3w',
        name: 'John Doe',
        places: 3
    },
    
]
  return (
    <div>
     <UsersList items={USERS}/>
    </div>
  )
}

export default Users
