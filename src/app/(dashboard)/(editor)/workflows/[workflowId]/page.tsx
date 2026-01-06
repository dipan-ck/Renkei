import { requireAuth } from "@/lib/auth-utils";


interface PageProps {
   params: Promise<{workflowId: string}>
}



async function page({params} : PageProps) {
   await requireAuth();
    const {workflowId} = await params;

  return (
    <div>workflowId: {workflowId}</div>
  )
}

export default page