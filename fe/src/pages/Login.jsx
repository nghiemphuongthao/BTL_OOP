import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Redirect } from "wouter";
import { useAuth } from "../hooks/use-auth";
import { Loader2 } from "lucide-react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { setItem } from "../config/storage";
import { queryClient } from "../lib/queryClient";
import { toast } from "../hooks/use-toast";
import axios from "axios";
import axiosInstance from "../config/axiosInstance";

// Define the login validation schema using Zod
const loginSchema = z.object({
  username: z.string().min(1, "Tên đăng nhập là bắt buộc"),
  password: z.string().min(1, "Mật khẩu là bắt buộc"),
});


export default function Login() {
  const { admin } = useAuth();

  // Initialize the form with react-hook-form and zod
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: async (data) => {
      const response = await login(data.username, data.password);
      return response.data;
    },
    onSuccess: async (admin) => {
      queryClient.setQueryData(["/api/user"], admin);
      toast({
        title: "Đăng nhập thành công",
        description: `Chào mừng trở lại, ${admin?.name || "admin"}`,
      });
      setItem("token", admin?.token);
      const response = await axiosInstance.get("/api/admin/profile");
      setItem("adminId", response.data);
      queryClient.setQueryData(["/api/admin/profile"], response.data);
      navigate("/");
    },
    onError: (error) => {
      // handle error (show message, etc.)
      console.error(error);
    }
  });

  const onSubmit = (values) => {
    loginMutation.mutate({
      username: values.username,
      password: values.password,
    });
  }

  // Redirect to home if the user is already logged in
  if (admin) {
    return <Redirect to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5EAD8]">
      <div className="container max-w-[1200px] grid gap-6 lg:grid-cols-2">
        <div className="hidden lg:flex justify-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-nunito font-bold text-[#3D2815]">
              LMAI
            </h1>
            <h2 className="text-2xl font-semibold text-[#704923]">
              Hệ thống Quản lý và Tích hợp Giấy phép
            </h2>
            <p className="text-[#8B5A2B]">
              Đăng nhập vào hệ thống để quản lý và theo dõi giấy phép, khách hàng, và hóa đơn của bạn.
            </p>
          </div>
        </div>

        <Card className="w-full max-w-md mx-auto border-[#8B5A2B]/20">
          <CardHeader>
            <CardTitle className="text-2xl text-[#3D2815]">Đăng nhập</CardTitle>
            <CardDescription>
              Nhập thông tin đăng nhập của bạn để tiếp tục
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên đăng nhập</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nhập tên đăng nhập"
                          {...field}
                          disabled={loginMutation.isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mật khẩu</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Nhập mật khẩu"
                          {...field}
                          disabled={loginMutation.isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-[#8B5A2B] hover-[#704923]"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Đang đăng nhập...
                    </>
                  ) : (
                    "Đăng nhập"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-sm text-muted-foreground">
              Chưa có tài khoản? Liên hệ quản trị viên để được cấp quyền
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}