import { useAuth } from "../../hooks/use-auth";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

export function LogoutButton() {
  const { logoutMutation } = useAuth();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="ml-auto text-[#D2B48C] hover:text-white hover:bg-[#704923]"
      onClick={handleLogout}
      disabled={logoutMutation.isPending}
    >
      {logoutMutation.isPending ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <span className="material-icons">logout</span>
      )}
    </Button>
  );
}
