'use client'
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
      }
      else{
        
const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      setEmail("");
      setPassword("");
      if(data){
        alert(data.message);
        localStorage.setItem("token", data.token);

        router.push("/admin");
        
      }
      
      
      
    }
}
  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center px-4">
      <div className="bg-[#1e1e1e] p-8 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h2>
        <div className="space-y-4">
          <Input
          value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="bg-[#2a2a2a] text-white"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="bg-[#2a2a2a] text-white"
          />
          <Button
          onClick={(e) => handleLogin()}
           className="w-full bg-purple-600 hover:bg-purple-700">Login</Button>
        </div>
      </div>
    </div>
  );
}
