import { requireAuth } from "@/lib/auth-utils";


interface PageProps {
   params: Promise<{executionId: string}>
}



async function page({params} : PageProps) {
    await requireAuth();
    const {executionId} = await params;

  return (
    <div>execution page</div>
  )
}

export default page