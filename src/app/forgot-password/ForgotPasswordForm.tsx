"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div style={{ background: "#fff", borderRadius: "12px", padding: "40px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", textAlign: "center" }}>
        <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "#ecfdf5", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#1f2937", marginBottom: "12px" }}>Check your email</h2>
        <p style={{ color: "#6b7280", marginBottom: "24px" }}>We&apos;ve sent password reset instructions to<br /><strong>{email}</strong></p>
        <Link href="/login" style={{ color: "#1E4A5F", fontSize: "14px", fontWeight: 500, textDecoration: "none" }}>
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div style={{ background: "#fff", borderRadius: "12px", padding: "40px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#2D4F3C", margin: 0 }}>Pacific Edge</h1>
        </Link>
        <p style={{ color: "#666", marginTop: "8px" }}>Reset your password</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "24px" }}>
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

        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%", padding: "14px", background: "#2D4F3C", color: "#fff", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <Link href="/login" style={{ color: "#1E4A5F", fontSize: "14px", textDecoration: "none" }}>
          Back to sign in
        </Link>
      </div>
    </div>
  );
}