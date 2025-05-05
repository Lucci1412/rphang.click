"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useUserStore } from "@/stores/userStore";

interface LoginProps {
  onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
  email: z.string().min(1, "Vui lòng nhập email").email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

const Login = ({ onOpenChange }: LoginProps) => {
  const { setUser } = useUserStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Submitted values:", values);
    loginMutation.mutate({
      email: values.email,
      password: values.password,
    });
  };
  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: (data) => {
      toast.success("Đăng nhập thành công", {
        position: "top-center",
      });
      if (data?.token) {
        const { user } = data;
        if (user) {
          setUser(user);
        }

        Cookies.set("token", data.token, {
          expires: 7,
          path: "/",
          secure: process.env.NODE_ENV === "production",
        });
      }
      onOpenChange(false);
    },
    onError: (data) => {
      toast.error(data.message || "Đăng nhập thất bại", {
        position: "top-center",
      });
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên đăng nhập</FormLabel>
              <FormControl>
                <Input placeholder="Nhập email" {...field} />
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
                <Input type="password" placeholder="Nhập mật khẩu" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="remember"
              className="rounded border-gray-300"
            />
            <label htmlFor="remember" className="text-sm">
              Ghi nhớ tôi
            </label>
          </div>
          <Button variant="link" className="p-0 h-auto text-sm" type="button">
            Quên mật khẩu?
          </Button>
        </div>
        <Button className="w-full" type="submit">
          Đăng nhập
        </Button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              hoặc tiếp tục với
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          type="button"
          onClick={()=>{
          toast.info("Tính năng đang được phát triển!", {
              position: "top-center",
            })
          }}
        >
          <Image
            src="/images/google-logo.svg"
            width={20}
            height={20}
            alt="google icon"
          />
          Đăng nhập với Google
        </Button>
      </form>
    </Form>
  );
};

export default Login;
