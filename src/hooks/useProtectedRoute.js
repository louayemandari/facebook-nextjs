import { useRouter } from 'next/router'
import { supabase } from '@/supabase/supabase'

const useProtectedRoute = () => {
  const router = useRouter()

  const [email,setEmail] = useState('')

  useEffect(() => {
    const getUser = async () => {
      const user = await supabase.auth.getUser()
      if (!user) {
        router.push('/', { replace: true })
      }
      try {
        setEmail(user.data.user.email)
      } catch (error) {
        router.push('/', { replace: true })
      }
      console.log(user.data.user.email)
    }
    getUser()
  }, [])

  return {
    email,
  }
}

export default useProtectedRoute
