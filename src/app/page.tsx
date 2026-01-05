
import LogoutButton from "@/components/LogoutButton";
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";

export default async function Home() {

  await requireAuth();


  const data  = await caller.getUsers()

  return (
    <div>
    {JSON.stringify(data)}
    <LogoutButton/>
    </div>
  );
}
