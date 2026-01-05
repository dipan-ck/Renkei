"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Github } from "lucide-react";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import Logo from "@/components/Logo";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // ✅ SEPARATE LOADING STATES
  const [emailLoading, setEmailLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ✅ EMAIL LOGIN
  async function onSubmit(values: LoginFormValues) {
    setEmailLoading(true);

    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: () => {
          toast.success("Logged in successfully");
          router.push("/");
        },
        onError: (error) => {
          toast.error(error.error.message || "Something went wrong");
          setEmailLoading(false);
        },
      }
    );
  }

  // ✅ GITHUB LOGIN
  async function GitHubLogin() {
    setGithubLoading(true);
    await authClient.signIn.social({ provider: "github" });
  }

  // ✅ GOOGLE LOGIN
  async function GoogleLogin() {
    setGoogleLoading(true);
    await authClient.signIn.social({ provider: "google" });
  }

  // Disable all buttons while ANY auth is running
  const disableAll = emailLoading || githubLoading || googleLoading;

  return (
    <div className="flex min-h-screen flex-col gap-6 items-center justify-center p-6">
            <Logo/>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 flex flex-col items-center">

          <CardTitle className="text-2xl  font-semibold tracking-tight">
            Welcome Back
          </CardTitle>
          <CardDescription>Login to continue</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              {/* SOCIAL AUTH */}
              <div className="flex flex-col gap-3">
                <Button
                  variant="outline"
                  type="button"
                  disabled={disableAll}
                  onClick={GitHubLogin}
                  className="w-full flex items-center shadow-none gap-2 justify-center"
                >
                  {githubLoading ? (
                    <Spinner className="h-4 w-4" />
                  ) : (
                    <Github className="h-4 w-4" />
                  )}
                  Continue with GitHub
                </Button>

                <Button
                  variant="outline"
                  type="button"
                  disabled={disableAll}
                  onClick={GoogleLogin}
                  className="w-full flex items-center gap-2 shadow-none justify-center"
                >
                  {googleLoading ? (
                    <Spinner className="h-4 w-4" />
                  ) : (
                    <Image
                      src="/google.svg"
                      alt="Google"
                      width={16}
                      height={16}
                    />
                  )}
                  Continue with Google
                </Button>
              </div>

              {/* DIVIDER */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    or continue with
                  </span>
                </div>
              </div>

              {/* EMAIL */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      {...field}
                      placeholder="m@example.com"
                      className={cn(
                        form.formState.errors.email &&
                          "border-red-600 focus-visible:ring-red-600"
                      )}
                    />
                    {form.formState.errors.email && (
                      <p className="text-sm text-red-600">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                )}
              />

              {/* PASSWORD */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <div className="space-y-2">
                    <Label>Password</Label>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        className={cn(
                          form.formState.errors.password &&
                            "border-red-600 focus-visible:ring-red-600"
                        )}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {form.formState.errors.password && (
                      <p className="text-sm text-red-600">
                        {form.formState.errors.password.message}
                      </p>
                    )}
                  </div>
                )}
              />

              {/* SUBMIT */}
              <Button
                type="submit"
                disabled={disableAll}
                className="w-full flex items-center gap-2 justify-center"
              >
                {emailLoading && <Spinner className="h-4 w-4" />}
                Login
              </Button>
            </form>
          </Form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Signup
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
