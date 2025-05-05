"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import AvatarUpload from "./avatar-upload";

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Tên người dùng phải có ít nhất 2 ký tự.",
    })
    .max(30, {
      message: "Tên người dùng không được vượt quá 30 ký tự.",
    }),
  email: z
    .string()
    .min(1, { message: "Email không được để trống." })
    .email("Email không hợp lệ."),
  bio: z.string().max(160, {
    message: "Giới thiệu không được vượt quá 160 ký tự.",
  }),
  name: z.string().min(1, { message: "Tên không được để trống." }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfileForm() {
  const [avatar, setAvatar] = useState<string>(
    "/placeholder.svg?height=100&width=100"
  );

  // Giả lập dữ liệu người dùng
  const defaultValues: Partial<ProfileFormValues> = {
    username: "moviefan123",
    email: "user@example.com",
    bio: "Tôi là một người yêu thích phim ảnh, đặc biệt là thể loại khoa học viễn tưởng và hành động.",
    name: "Nguyễn Văn A",
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    toast("Cập nhật thành công", {
      position: "top-center",
    });
    console.log(data);
  }

  return (
    <Tabs defaultValue="general" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
        <TabsTrigger value="general">Thông tin chung</TabsTrigger>
        <TabsTrigger value="preferences">Tùy chọn</TabsTrigger>
      </TabsList>

      <TabsContent value="general" className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <AvatarUpload avatarUrl={avatar} onAvatarChange={setAvatar} />

              <div className="flex-1 space-y-4">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Họ và tên</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nhập họ và tên của bạn"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tên người dùng</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nhập tên người dùng"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Đây là tên hiển thị công khai của bạn.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nhập email của bạn"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Giới thiệu</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Viết một vài điều về bản thân"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Bạn có thể viết @tên để đề cập đến người khác.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end">
                      <Button type="submit">Lưu thay đổi</Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="preferences" className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Tùy chọn xem phim</h3>
                <p className="text-sm text-muted-foreground">
                  Cài đặt tùy chọn xem phim của bạn.
                </p>
              </div>
              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Tự động phát tập tiếp theo</h4>
                    <p className="text-sm text-muted-foreground">
                      Tự động phát tập tiếp theo khi tập hiện tại kết thúc.
                    </p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Chất lượng video HD</h4>
                    <p className="text-sm text-muted-foreground">
                      Luôn phát video ở chất lượng cao nhất khi có thể.
                    </p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Thông báo phim mới</h4>
                    <p className="text-sm text-muted-foreground">
                      Nhận thông báo khi có phim mới từ các thể loại yêu thích.
                    </p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Lưu lịch sử xem</h4>
                    <p className="text-sm text-muted-foreground">
                      Lưu lịch sử xem phim để tiếp tục xem sau.
                    </p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Lưu tùy chọn</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
