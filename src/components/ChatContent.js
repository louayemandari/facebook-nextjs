import React, { useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase/supabase'; // Update the path accordingly
import { MyContext } from '../context/Mycontext'; // Update the path accordingly
import useProtectedRoute from '../hooks/useProtectedRoute'; // Update the path accordingly

function ChatContent() {
  const { messages, setMessages } = useContext(MyContext);
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

  useEffect(() => {
    async function fetchMessages() {
      const { data, error } = await supabase
        .from("messages")
        .select("text, sent_from_user_email")
        .eq("sent_from_user_email", email);

      if (error) {
        console.error(error);
      } else {
        setMessages(data);
      }
    }
    fetchMessages();
  }, [email]);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className='bg-blue-300 h-[350px] overflow-hidden overflow-y-scroll scrollbar-none'>
      {messages.map((item, index) => (
        <div key={index} className='bg-red-400 mt-1'>
          {item.text}
        </div>
      ))}
  
    </div>
  );
}

export default ChatContent;
