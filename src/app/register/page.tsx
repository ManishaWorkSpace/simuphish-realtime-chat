"use client";

import RegisterForm from "@/src/components/auth/registerForm";



export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-300 to-purple-300">
      <RegisterForm />
    </div>
  );
}