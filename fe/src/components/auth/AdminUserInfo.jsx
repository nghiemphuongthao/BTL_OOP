import { useAuth } from "../../hooks/use-auth";
import { Loader2 } from "lucide-react";

export function AdminUserInfo() {
  const { admin, isLoading } = useAuth();
  
  if (isLoading) {
    return <Loader2 className="h-4 w-4 animate-spin text-[#D2B48C]" />;
  }
  
  return (
    <>
      <p className="text-sm font-medium">{admin?.name || "Admin User"}</p>
      <p className="text-xs text-[#D2B48C]">
        {admin?.role || "System Administrator"}
      </p>
    </>
  );
}