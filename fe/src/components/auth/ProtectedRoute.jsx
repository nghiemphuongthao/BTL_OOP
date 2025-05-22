import React from "react";
import { useAuth } from "../../hooks/use-auth";
import { Navigate, Outlet } from "react-router-dom";
import { Loader2 } from "lucide-react";

export function ProtectedRoute() {
  const { admin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-[#8B5A2B]" />
      </div>
    );
  }

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}