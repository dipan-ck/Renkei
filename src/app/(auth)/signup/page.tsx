import RegisterForm from '@/features/auth/components/SignupForm'
import { requireUnAuth } from '@/lib/auth-utils'


async function page() {

  await requireUnAuth()

  return (
    <div className="w-screen h-screen">
      <RegisterForm/>
    </div>
  )
}

export default page