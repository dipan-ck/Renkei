import LoginForm from "@/features/auth/components/LoginForm"
import { requireUnAuth } from "@/lib/auth-utils"


export default async function page() {

  await requireUnAuth()
  return (
    <div className="w-screen h-screen">
        <LoginForm/>
    </div>
  )
}

