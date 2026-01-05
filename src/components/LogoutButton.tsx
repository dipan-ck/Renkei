"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

function LogoutButton() {
  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut({}, {
      onSuccess() {
        router.push("/login");
      },
    });
  }

  return (
    <Button onClick={handleSignOut}>
      Logout
    </Button>
  );
}

export default LogoutButton;
