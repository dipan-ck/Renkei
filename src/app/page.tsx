"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { data } = authClient.useSession();

  return (
    <div>
      <h1>
        {data?.user ? `Logged in as ${data.user.email}` : "Not logged in"}
      </h1>
      {data && (<Button onClick={()=> authClient.signOut()}>Logout</Button>)}
    </div>
  );
}
