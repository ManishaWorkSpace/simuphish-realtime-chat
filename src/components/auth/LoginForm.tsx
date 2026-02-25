"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/src/store/slices/userSlice";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [username, setUsername] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (!users.length) {
      alert("No registered users found. Please register first.");
      router.push("/register");
      return;
    }

    const matchedUser = users.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (u: any) => u.username === username,
    );

    if (!matchedUser) {
      alert("Username not found.");
      return;
    }

    sessionStorage.setItem("user", JSON.stringify(matchedUser));

    dispatch(setUser(matchedUser));
    router.push("/dashboard");
  };

  return (
    <div className="flex items-center justify-center px-4">
      <div className="relative w-96 p-10 rounded-3xl backdrop-blur-xl bg-white/90 shadow-2xl transition-all duration-500 hover:scale-[1.02]">
        {/* Glow Effect */}
       <div className="absolute -inset-1 bg-white rounded-3xl blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent mb-8">
            Welcome Back ✨
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Input Field */}
            <div className="relative">
              <input
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-4 rounded-xl bg-white/70 shadow-md outline-none focus:shadow-indigo-300/40 focus:scale-[1.02] transition-all duration-300"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full p-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 cursor-pointer"
            >
              Login
            </button>

            {/* Register Link */}
            <p
              className="text-sm text-center text-indigo-600 hover:text-purple-600 transition cursor-pointer"
              onClick={() => router.push("/register")}
            >
              Don’t have an account? Register
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
