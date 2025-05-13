import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Redirect } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(1, "Tên đăng nhập là bắt buộc"),
  password: z.string().min(1, "Mật khẩu là bắt buộc"),
});

export default function AuthPage() {
  const { admin, loginMutation } = useAuth();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values) => {
    loginMutation.mutate(values);
  };

  // Redirect to home if already logged in
  if (admin) {
    return <Redirect to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5EAD8]">
      <div className="container max-w-[1200px] grid gap-6 lg:grid-cols-2">
        <div className="hidden lg:flex justify-center p-6">
          <div className="space-y-6">
            <h1 className="text-4xl font-nunito font-bold text-[#3D2815]">LMAI</h1>
            <h2 className="text-2xl font-semibold text-[#704923]">Hệ thống Quản lý và Tích hợp Giấy phép</h2>
            <p className="text-[#8B5A2B] max-w-md">
              Hệ thống quản lý giấy phép tập trung giúp bạn quản lý và xác thực giấy phép cho ứng dụng một cách hiệu quả. Bảo vệ phần mềm của bạn và kiểm soát truy cập bằng hệ thống quản lý giấy phép toàn diện.
            </p>
            <div className="bg-[#D2B48C]/20 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-[#8B5A2B] mb-2">Tính năng chính</h3>
              <ul className="space-y-2 text-[#8B5A2B]">
                <li className="flex items-center">
                  <span className="material-icons mr-2 text-[#8B5A2B]">check_circle</span>
                  Quản lý ứng dụng và gói giấy phép
                </li>
                <li className="flex items-center">
                  <span className="material-icons mr-2 text-[#8B5A2B]">check_circle</span>
                  Theo dõi và quản lý khách hàng
                </li>
                <li className="flex items-center">
                  <span className="material-icons mr-2 text-[#8B5A2B]">check_circle</span>
                  Xác thực và cấp giấy phép tự động
                </li>
                <li className="flex items-center">
                  <span className="material-icons mr-2 text-[#8B5A2B]">check_circle</span>
                  Quản lý hóa đơn và thanh toán
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-6">
          <Card className="w-full max-w-md border-[#8B5A2B]/20 shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center text-[#3D2815]">Đăng nhập vào LMAI</CardTitle>
              <CardDescription className="text-center">
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
                            disabled={loginMutation.isLoading}
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
                            disabled={loginMutation.isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-[#8B5A2B] hover:bg-[#704923]"
                    disabled={loginMutation.isLoading}
                  >
                    {loginMutation.isLoading ? (
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
            <CardFooter className="flex flex-col space-y-2">
              <div className="text-sm text-center text-muted-foreground">
                <p>Chưa có tài khoản? Liên hệ quản trị viên để được cấp quyền.</p>
                <p className="mt-1 text-xs">Hệ thống này chỉ dành cho quản trị viên được ủy quyền.</p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
