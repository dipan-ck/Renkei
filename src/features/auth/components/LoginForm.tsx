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
import { Eye, EyeOff, Github, Chrome } from "lucide-react";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForrmValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<LoginForrmValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginForrmValues) {
    console.log(values);
  }

  const isPending = form.formState.isSubmitting;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-sans tracking-tighter font-semibold">
            Welcome Back
          </CardTitle>
          <CardDescription>Sign in to continue</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Social Auth */}
              <div className="flex flex-col gap-3">
                <Button
                  variant="outline"
                  disabled={isPending}
                  type="button"
                  className="w-full flex items-center gap-2 justify-center"
                >
                  <Github className="h-4 w-4" />
                  Continue with GitHub
                </Button>

                <Button
                  variant="outline"
                  disabled={isPending}
                  type="button"
                  className="w-full flex items-center gap-2 justify-center"
                >
                  <Chrome className="h-4 w-4" />
                  Continue with Google
                </Button>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    or continue with
                  </span>
                </div>
              </div>

{/* Form Fields */}
<div className="space-y-5">
  <FormField
    control={form.control}
    name="email"
    render={({ field }) => (
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          placeholder="m@example.com"
          id="email"
          {...field}
          className={cn(
            form.formState.errors.email && "border-red-600 focus-visible:ring-red-600"
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

  <FormField
    control={form.control}
    name="password"
    render={({ field }) => (
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>

        {/* input + icon wrapper so icon stays aligned */}
        <div className="relative flex items-center">
          <Input
            id="password"
            placeholder="********"
            type={showPassword ? "text" : "password"}
            {...field}
            className={cn(
              form.formState.errors.password && "border-red-600 focus-visible:ring-red-600"
            )}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 cursor-pointer text-muted-foreground"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
</div>


              {/* Submit */}
              <Button disabled={isPending} type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Signup
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
