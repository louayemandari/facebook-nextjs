import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import useProtectedRoute from '@/hooks/useProtectedRoute';
import { supabase } from '@/supabase/supabase';
import { MyContext } from '@/context/Mycontext';

function InputBox() {
  const { messages, setMessages } = useContext(MyContext);
  const { switching, setSwitching,casheBox,setCasheBox } = useContext(MyContext); // Corrected context destructuring
  const router = useRouter();
  const [text, setText] = useState('');
  const { email } = useProtectedRoute();

  const sendNewMessage = async () => {
    if (!text) return;

    const { data, error } = await supabase
      .from('messages')
      .insert([{ text: text, sent_from_user_email: email }])
      .select();

    if (error) {
      console.error(error);
    } else {
      setMessages([...messages, ...data]); // Append the new message to existing messages
      setText('');
    }
  };

  return (
    <div className='absolute h-[50px] mt-[25px]'>
      <input
        type="text"
        className='input input-primary'
        value={text} // Bind input value to state
        onChange={(e) => setText(e.target.value)} // Handle input changes
      />
      <button className='btn btn-primary'  onClick={sendNewMessage}>
        submit
      </button>
    </div>
  );
}

export default InputBox;
