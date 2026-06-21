"use client";

import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import type { UserRole } from "@/data/crm";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
  fallbackPath?: string;
}

export default function ProtectedRoute({ children, allowedRoles, fallbackPath = "/login" }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ 
            width: "40px", 
            height: "40px", 
            border: "3px solid #e5e5e5", 
            borderTopColor: "#2D4F3C", 
            borderRadius: "50%", 
            animation: "spin 1s linear infinite",
            margin: "0 auto 16px"
          }} />
          <style jsx>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  if (!user) {
    redirect(fallbackPath);
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    redirect("/");
  }

  return <>{children}</>;
}