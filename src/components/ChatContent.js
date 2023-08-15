import React, { useContext, useState, useEffect, useRef } from 'react';
import { supabase } from '../supabase/supabase';
import { MyContext } from '../context/Mycontext';
import useProtectedRoute from '../hooks/useProtectedRoute';

function ChatContent() {
  const { friend, setFriend, messages, setMessages } = useContext(MyContext);
  const [text, setText] = useState('');
  const { email } = useProtectedRoute();
  const containerRef = useRef(null);

  const sendNewMessage = async () => {
    if (!text) return;

    const { data, error } = await supabase
      .from('messages')
      .insert([{ text, sent_from_user_email: email }])
      .select();

    if (error) {
      console.error(error);
    } else {
      setMessages([...messages, ...data]);
      setText('');
    }
  };

  async function fetchMessages() {
    const { data, error } = await supabase
  .from('messages')
  .select('text, sent_from_user_email')
  .filter('(sent_from_user_email = @email OR sent_to_user_email = @email)', {
    email: email,
  });
    if (error) {
      console.error(error);
    } else {
      setMessages(data);
    }
  }
  useEffect(() => {
    fetchMessages();
  }, [email]);

  useEffect(() => {
    if (containerRef.current) {
      // Scroll to the bottom of the container when messages change
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className='bg-blue-300 h-[350px] overflow-hidden overflow-y-scroll scrollbar-none' ref={containerRef}>
      {messages.reverse().map((item, index) => (
        <div key={index} className='bg-red-400 mt-1'>
          {item.text}
        </div>
      ))}
    </div>
  );
}

export default ChatContent;
