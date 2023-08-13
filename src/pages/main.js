import React, { useState, useEffect,useContext } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/supabase/supabase';
import useProtectedRoute from '@/hooks/useProtectedRoute';
import Sidenav from '@/components/Sidenav';
import CenterSection from '@/components/CenterSection';
import ChatWindow from '@/components/ChatWindow';

function main() {
  const router = useRouter();
  const [text, setText] = useState('');
  const { email } = useProtectedRoute();

  async function logoutHandle() {
    try {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        router.push('/');
        console.log('logging out now ...');
      } else {
        console.log(error);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function sendingHandle() {
    const { data, error } = await supabase
      .from('messages')
      .insert([
        { text: text, sent_from_user_email: email },
      ])
      .select();

    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
  }

  return (
    <div>
      protected page
      <h1>username is : {null}</h1>
      <button onClick={logoutHandle} className='btn-error mx-1'>
        logout
      </button>
      <button onClick={() => console.log(supabase.auth.user)}>show user</button>
      <div>
        <h1>Currently logged in user:</h1>
        <p>{email}</p>
      </div>
      <h1>--------------</h1>
      <div>
        <input
          onChange={(e) => setText(e.target.value)}
          type="text"
          className='input input-bordered'
        />
        <button onClick={sendingHandle} className='btn btn-primary'>
          submit
        </button>
      </div>
      <div className='flex flex-row h-screen '>
        
        <Sidenav/>
        <CenterSection/>
        <ChatWindow/>

      </div>
    </div>
  );
}

export default main;
