"use client";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      router.push("/dashboard");
    }
  }, [user]);

  return null;
}