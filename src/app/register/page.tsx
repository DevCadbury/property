import type { Metadata } from "next";
import RegisterForm from "./RegisterForm";

export const metadata: Metadata = {
  title: "Register | Pacific Edge Realty",
  description: "Create your Pacific Edge account",
};

export default function RegisterPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f7f5", padding: "40px 20px" }}>
      <div style={{ width: "100%", maxWidth: "480px" }}>
        <RegisterForm />
      </div>
    </div>
  );
}