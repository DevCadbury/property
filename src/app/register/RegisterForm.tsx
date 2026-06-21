"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterForm() {
  const { register } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "buyer" as "buyer" | "renter" | "seller",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    const success = await register({
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      role: formData.role,
    });

    if (success) {
      router.push("/dashboard");
    } else {
      setError("Registration failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{ background: "#fff", borderRadius: "12px", padding: "40px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#2D4F3C", margin: 0 }}>Pacific Edge</h1>
        </Link>
        <p style={{ color: "#666", marginTop: "8px" }}>Create your account</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#333", marginBottom: "8px" }}>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "12px 16px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "15px", outline: "none", boxSizing: "border-box" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#333", marginBottom: "8px" }}>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "12px 16px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "15px", outline: "none", boxSizing: "border-box" }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#333", marginBottom: "8px" }}>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "12px 16px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "15px", outline: "none", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#333", marginBottom: "8px" }}>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={{ width: "100%", padding: "12px 16px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "15px", outline: "none", boxSizing: "border-box" }}
            placeholder="+1 (555) 000-0000"
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#333", marginBottom: "8px" }}>Account Type</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{ width: "100%", padding: "12px 16px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "15px", outline: "none", boxSizing: "border-box", background: "#fff" }}
          >
            <option value="buyer">Buyer</option>
            <option value="renter">Renter</option>
            <option value="seller">Seller</option>
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#333", marginBottom: "8px" }}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "12px 16px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "15px", outline: "none", boxSizing: "border-box" }}
            placeholder="At least 6 characters"
          />
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#333", marginBottom: "8px" }}>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "12px 16px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "15px", outline: "none", boxSizing: "border-box" }}
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
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <span style={{ color: "#666", fontSize: "14px" }}>Already have an account? </span>
        <Link href="/login" style={{ color: "#1E4A5F", fontSize: "14px", fontWeight: 500, textDecoration: "none" }}>
          Sign in
        </Link>
      </div>
    </div>
  );
}