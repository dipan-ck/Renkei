import { requireAuth } from "@/lib/auth-utils";


interface PageProps {
   params: Promise<{credentialId: string}>
}



async function page({params} : PageProps) {
     await requireAuth()
    const {credentialId} = await params;

  return (
    <div>page</div>
  )
}

export default page