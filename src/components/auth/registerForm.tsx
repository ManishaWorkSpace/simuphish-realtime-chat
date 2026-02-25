"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/src/store/slices/userSlice";
import { getSocket } from "@/src/services/socket";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const socket = getSocket();
  const dispatch = useDispatch();
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    fullName: "",
    email: "",
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle register
  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (!form.username || !form.fullName || !form.email) {
    alert("Please fill all fields");
    return;
  }

  // 🔹 Get existing users from localStorage
  const existingUsers = JSON.parse(
    localStorage.getItem("users") || "[]"
  );

  // 🔹 Check if username already exists
  const userExists = existingUsers.find(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (u: any) => u.username === form.username
  );

  if (userExists) {
    alert("Username already exists");
    return;
  }

  // 🔹 Add new user
  const updatedUsers = [...existingUsers, form];

  localStorage.setItem("users", JSON.stringify(updatedUsers));

  // 🔹 Save current session user (per tab)
  sessionStorage.setItem("user", JSON.stringify(form));

  // Keep your existing logic
  dispatch(setUser(form));
  socket.emit("register", form);

  router.push("/dashboard");
};

  return (
   <div className="flex items-center justify-center px-4">

  <div className="relative w-96 p-10 rounded-3xl bg-white/90 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:scale-[1.02]">

    {/* Subtle White Glow */}
    <div className="absolute -inset-1 bg-white rounded-3xl blur-3xl opacity-30"></div>

    <div className="relative z-10">
      <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent mb-8">
        Create Account ✨
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-white shadow-md outline-none focus:shadow-indigo-200 focus:scale-[1.02] transition-all duration-300"
        />

        <input
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-white shadow-md outline-none focus:shadow-indigo-200 focus:scale-[1.02] transition-all duration-300"
        />

        <input
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-white shadow-md outline-none focus:shadow-indigo-200 focus:scale-[1.02] transition-all duration-300"
        />

        <button
          type="submit"
          className="w-full p-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 cursor-pointer"
        >
          Register
        </button>

      </form>

      <p
        className="mt-6 text-sm text-center text-indigo-600 hover:text-purple-600 transition cursor-pointer"
        onClick={() => router.push("/login")}
      >
        Already have an account? Login
      </p>
    </div>
  </div>
</div>
  );
}
