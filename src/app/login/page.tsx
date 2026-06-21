import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Login | Pacific Edge Realty",
  description: "Sign in to your Pacific Edge account",
};

export default function LoginPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f7f5", padding: "40px 20px" }}>
      <div style={{ width: "100%", maxWidth: "440px" }}>
        <LoginForm />
      </div>
    </div>
  );
}