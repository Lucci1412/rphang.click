"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import LoginRegisterDialog from "@/modules/auth/ui/components/auth";
import React, { useState } from "react";
import { toast } from "sonner";

const AuthButton = () => {
  const user = false;
  const [open, setOpen] = useState(false);

  return (
    <>
      {user ? (
        <div className="flex flex-row items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className=" text-sm text-black">Viet Nguyen</span>
        </div>
      ) : (
        <Button
          // onClick={() => setOpen(true)}
          onClick={() => {
            toast.info("Tính năng đang được phát triển! ", {
              position: "top-center",
            });
          }}
          variant="outline"
          className="gap-2 cursor-pointer t hover:border-1-white rounded-full  "
        >
          Đăng nhập
        </Button>
      )}

      <LoginRegisterDialog open={open} onOpenChange={setOpen} />
    </>
  );
};

export default AuthButton;
