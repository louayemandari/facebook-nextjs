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
      } 
      if(!error){
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
    <div className='bg-slate-50 flex flex-col justify-center text-center my-10 border-spacing-1 rounded-md border-solid shadow-md'>
      <Toaster/>
      <Facebook className='text-blue-500 mx-auto' fontSize='large'/>
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Type your email"
        className="input input-bordered mx-auto input-primary w-full max-w-xs"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Type your password"
        className="input input-bordered input-primary my-3 mx-auto w-full max-w-xs"
      />

      <button onClick={handleLogin} className="btn-primary mx-[100px] my-3 rounded-md">
        Log In
      </button>
    
      


      </div>
      
  );
}
