import React, { useState, useEffect,useContext } from 'react';
import Users from './Users';
import { supabase } from '@/supabase/supabase';
import { MyContext } from '@/context/Mycontext';
function Userlist() {
  const [accounts, setAccounts] = useState([]);
  const {firend,setFriend} = useContext(MyContext)
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
        <Users key={item.email} name={item.email} 
        onClick={()=>{
          setFriend(item.email)
          console.log(`the user ${item.email} has been choosen`)
        }} />
      ))}
      

    </div>
  );
}

export default Userlist;
