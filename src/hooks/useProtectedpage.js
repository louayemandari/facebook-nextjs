import { useRouter } from 'next/router';
import { supabase } from '@/supabase/supabase';
import { useState, useEffect } from 'react';

const useProtectedRoute = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');

    useEffect(() => {
        const getUser = async () => {
            const user = await supabase.auth.getUser();
            if (!user) {
                router.push('/');
                return;
            }
            try {
                const { data: { session } } = await supabase.auth.getSession();
                 setEmail(user.data.user.email);
            } catch (error) {
                router.push('/');
            }
        };
        getUser();
    }, []);

    return {
        email,
    };
};

export default useProtectedRoute;