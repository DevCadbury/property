import type { Metadata } from "next";
import ForgotPasswordForm from "./ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password | Pacific Edge Realty",
  description: "Reset your Pacific Edge account password",
};

export default function ForgotPasswordPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f7f5", padding: "40px 20px" }}>
      <div style={{ width: "100%", maxWidth: "440px" }}>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}