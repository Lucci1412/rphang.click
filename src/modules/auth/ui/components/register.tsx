import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {} from "@/components/ui/label";
import { insertUserSchema } from "@/db/schema";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Cookies from "js-cookie";
import { useUserStore } from "@/stores/userStore";

interface RegisterProps {
  onOpenChange: (value: boolean) => void;
}

const Register = ({ onOpenChange }: RegisterProps) => {
  const { setUser } = useUserStore();

  const handleRegister = async (data: z.infer<typeof insertUserSchema>) => {
    registerMutation.mutate({
      email: data.email,
      username: data.username,
      password: data.password,
    });
  };
  const registerMutation = trpc.auth.register.useMutation({
    onSuccess: (data) => {
      toast.success("Đăng ký thành công", {
        position: "top-center",
      });
      if (data?.token) {
        const { user } = data;
        if (user) {
          setUser(user);
        }

        Cookies.set("token", data.token, {
          expires: 7,
          path: "/", // cookie có hiệu lực toàn bộ site
          secure: process.env.NODE_ENV === "production", // chỉ set secure nếu production
        });
      }
      onOpenChange(false);
    },
    onError: (data) => {
      toast.error(data.message || "Đăng ký thất bại", {
        position: "top-center",
      });
    },
  });
  const registerFormSchema = insertUserSchema
    .extend({
      confirmPassword: z
        .string()
        .min(6, "Xác nhận mật khẩu phải ít nhất 6 ký tự"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Mật khẩu xác nhận không khớp",
      path: ["confirmPassword"],
    });
  const registerForm = useForm<z.infer<typeof registerFormSchema>>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(registerFormSchema),
  });
  return (
    <div>
      <Form {...registerForm}>
        <form
          onSubmit={registerForm.handleSubmit(handleRegister, (err) =>
            console.log("❌ Form error:", err)
          )}
          className="space-y-4"
        >
          <FormField
            control={registerForm.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name-register">Tên</FormLabel>
                <FormControl>
                  <Input
                    id="name-register"
                    placeholder="Nguyen Van A"
                    {...field}
                    minLength={6}
                    maxLength={50}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email-register">Email</FormLabel>
                <FormControl>
                  <Input
                    id="email-register"
                    type="email"
                    placeholder="nguyenvana@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password-register">Mật khẩu</FormLabel>
                <FormControl>
                  <Input
                    id="password-register"
                    type="password"
                    placeholder="******"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="confirm-password">
                  Xác nhận mật khẩu
                </FormLabel>
                <FormControl>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="******"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Đăng ký
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Register;
