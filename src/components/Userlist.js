import React, { useState, useEffect } from 'react';
import Users from './Users';
import { supabase } from '@/supabase/supabase';

function Userlist() {
  const [accounts, setAccounts] = useState([]);

  async function getUsers() {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('email');

      if (data) {
        setAccounts(data);
        console.log(accounts);
      } else {
        console.log(error);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      {accounts.map((item) => (
        <Users key={item.email} name={item.email} />
      ))}
      

    </div>
  );
}

export default Userlist;
