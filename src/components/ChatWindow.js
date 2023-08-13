import React from 'react'
import InputBox from './InputBox'
import { Chat } from '@mui/icons-material'
import ChatContent from './ChatContent'

function ChatWindow() {
  return (
    <div className='w-8/12 '>

         Chat

         <ChatContent/>

         {/*comment  */}
         <InputBox/>
    
    
    </div>
  )
}

export default ChatWindow