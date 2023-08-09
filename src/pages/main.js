import React,{useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import { supabase } from '@/supabase/supabase'
import useProtectedRoute from '@/hooks/useProtectedpage'
function main() {
  const router = useRouter()
  const {email} = useProtectedRoute()
//NOTE - i need to add the adding button for the db so when i add to the db
//NOTE - i need the db to have a message saved and the id of the sender who is currently logged
//NOTE - to be submitted along the message to db 
//NOTE - then i want the recieve get req to get 20 messages from that db where the sender and receiver exchanged messages
//NOTE - then we add end to end encryption
  
   

  async function logoutHandle(){
    
    try {
      const { error } = await supabase.auth.signOut()
      if (!error){
        router.push('/')
        console.log('logging out now ...')
      }else{
        console.log(error)
      }
    } catch (err) {
      console.log(err)
      
    }
  }

  
  return (
    <div>
      protected page
      <h1>username is : {null}</h1>
      <button onClick={logoutHandle} className='btn-error mx-1 '>
        logout
      </button>
      <button onClick={()=>console.log(supabase.auth.user)}>show user</button>
      <div>
      <h1>Currently logged in user:</h1>
      <p>{email}</p>

    </div>
    <h1>--------------</h1>
    <div>
    <input type="text" className='input input-bordered ' />
    <button onClick={null} className='btn btn-primary'> submit</button>
    
    </div>


    </div>
  )
}

export default main
