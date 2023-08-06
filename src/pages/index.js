import { Facebook } from '@mui/icons-material'; // Check the correct icon import
import { useState } from 'react';
import { supabase } from '@/supabase/supabase';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function handleLogin() {
    try {
      if(!email || !password ){
        toast.error('email or password are missing')
      }
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });



      if (error) {
        console.log(error);
      } else if (data) {
        toast.success('Successfully logged in!!')
       
const { error } = await supabase
  .from('users')
  .insert({ email: email })
      if(!error)
        console.log('user has been signed to users table')
        router.push('/main');
      }
    } catch (e) {
      toast.error('could not login')
      console.log(e);
      console.log('');
    }
  }

  return (
    <div>
      <Toaster/>
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Type your email"
        className="input input-bordered input-accent w-full max-w-xs"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Type your password"
        className="input input-bordered input-secondary w-full max-w-xs"
      />

      <button onClick={handleLogin} className="btn-success">
        Log In
      </button>
    </div>
  );
}
