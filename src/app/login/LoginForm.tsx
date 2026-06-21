"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const success = await login(email, password);
    
    if (success) {
      const userRole = email.includes("agent") ? "agent" : email.includes("admin") ? "admin" : "buyer";
      router.push(userRole === "agent" ? "/agent/dashboard" : "/dashboard");
    } else {
      setError("Invalid email or password");
    }
    setLoading(false);
  };

  const demoAccounts = [
    { email: "john.smith@email.com", role: "Buyer", password: "demo123" },
    { email: "sophie.chen@pacificedge.ca", role: "Agent", password: "demo123" },
    { email: "admin@pacificedge.ca", role: "Admin", password: "demo123" },
  ];

  return (
    <div style={{ background: "#fff", borderRadius: "12px", padding: "40px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#2D4F3C", margin: 0 }}>Pacific Edge</h1>
        </Link>
        <p style={{ color: "#666", marginTop: "8px" }}>Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#333", marginBottom: "8px" }}>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "12px 16px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "15px", outline: "none", boxSizing: "border-box" }}
            placeholder="you@example.com"
          />
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#333", marginBottom: "8px" }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "12px 16px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "15px", outline: "none", boxSizing: "border-box" }}
            placeholder="Enter your password"
          />
        </div>

        {error && (
          <div style={{ background: "#fef2f2", color: "#dc2626", padding: "12px 16px", borderRadius: "8px", fontSize: "14px", marginBottom: "20px" }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%", padding: "14px", background: "#2D4F3C", color: "#fff", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Link href="/forgot-password" style={{ color: "#1E4A5F", fontSize: "14px", textDecoration: "none" }}>
          Forgot your password?
        </Link>
      </div>

      <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid #eee" }}>
        <p style={{ fontSize: "13px", color: "#888", textAlign: "center", marginBottom: "16px" }}>Demo Accounts (click to fill)</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {demoAccounts.map((demo) => (
            <button
              key={demo.email}
              type="button"
              onClick={() => { setEmail(demo.email); setPassword(demo.password); }}
              style={{ padding: "10px 16px", background: "#f8f7f5", border: "1px solid #eee", borderRadius: "6px", cursor: "pointer", textAlign: "left", fontSize: "13px" }}
            >
              <strong>{demo.role}:</strong> {demo.email}
            </button>
          ))}
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <span style={{ color: "#666", fontSize: "14px" }}>Don&apos;t have an account? </span>
        <Link href="/register" style={{ color: "#1E4A5F", fontSize: "14px", fontWeight: 500, textDecoration: "none" }}>
          Create one
        </Link>
      </div>
    </div>
  );
}