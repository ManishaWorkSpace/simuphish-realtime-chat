"use client";

import LoginForm from "@/src/components/auth/LoginForm";



export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-100 to-purple-300">
      <LoginForm />
    </div>
  );
}