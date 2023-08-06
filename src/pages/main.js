import React,{useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import { supabase } from '@/supabase/supabase'
import useProtectedRoute from '@/hooks/useProtectedpage'
function main() {
  const router = useRouter()
  const {email} = useProtectedRoute()

  
   

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
