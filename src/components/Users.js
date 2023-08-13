import React from 'react'
import { extractUsernameFromEmail } from '@/functions/extractUsernameFromEmail'
function Users({name}) {
  return (
    <div className='hover:bg-slate-200 rounded-md mx-auto my-1 cursor-pointer'>
        {extractUsernameFromEmail(name)}</div>
  )
}

export default Users