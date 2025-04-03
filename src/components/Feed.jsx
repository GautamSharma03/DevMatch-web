import React from 'react'
import { useSelector } from 'react-redux'
const Feed = () => {
   const user = useSelector((store)=>store.user)
   console.log(user);
   
  return (
    <div>
           <h1>hello</h1>
           
           
    </div>
  )
}

export default Feed