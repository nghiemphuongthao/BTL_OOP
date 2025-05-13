import { createContext, useContext, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { apiRequest, queryClient } from "../lib/queryClient";
import { login } from "../services/auth";
import { setItem } from "../config/storage";
import axiosInstance from "../config/axiosInstance";

// Create the context
const AuthContext = createContext(null);


export function AuthProvider({ children }) {
  const { toast } = useToast();

  const {
    data: admin,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["/api/user"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/user");
      return response.data;
    },
  });

  const loginMutation = useMutation(
    {
      mutationFn: async (credentials) => {
        const res = await login(credentials.username, credentials.password);
        return res.data;
      },
      onSuccess: (admin) => {
        console.log(admin);
        queryClient.setQueryData(["/api/user"], admin);
        toast({
          title: "Đăng nhập thành công",
          description: `Chào mừng trở lại, ${admin?.name || "admin"}`,
        });
        setItem("token", admin?.token);
      },
      onError: (error) => {
        console.error("Login error:", error);
        toast({
          title: "Đăng nhập thất bại",
          description: error.message || "Có lỗi xảy ra khi đăng nhập",
          variant: "destructive",
        });
      },
    }
  );


  const logoutMutation = useMutation(
    {
      mutationFn: async () => {
        await apiRequest("POST", "/api/auth/logout");
      },
      onSuccess: () => {
        queryClient.setQueryData(["/api/user"], null);
        toast({
          title: "Đăng xuất thành công",
        });
      },
      onError: (error) => {
        toast({
          title: "Đăng xuất thất bại",
          description: error.message,
          variant: "destructive",
        });
      },
    }
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <AuthContext.Provider
      value={{
        admin,
        isLoading,
        error,
        loginMutation,
        logoutMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access authentication context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
