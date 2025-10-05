"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      if (data.role === "admin") router.push("/admin");
      else router.push("/partner");
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      <button
        onClick={handleLogin}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition cursor-pointer"
      >
        Login
      </button>

      <div className="mt-6 bg-gray-100 p-4 rounded">
        <h2 className="font-semibold mb-2">Test Credentials:</h2>
        <ul className="text-sm space-y-1">
          <li>
            <strong>Admin:</strong> admin@example.com / Password123
          </li>
          <li>
            <strong>Partner 1:</strong> partner1@example.com / Password123
          </li>
        </ul>
      </div>
    </div>
  );
}
