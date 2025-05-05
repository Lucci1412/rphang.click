"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Register from "./register";
import Login from "./login";

interface AuthProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function Auth({ open, onOpenChange }: AuthProps) {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {activeTab === "login" ? "Login" : "Register"}
          </DialogTitle>
        </DialogHeader>
        <Tabs
          defaultValue="login"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Đăng nhập</TabsTrigger>
            <TabsTrigger value="register">Đăng ký</TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="mt-4 space-y-4">
            <Login onOpenChange={onOpenChange}></Login>
          </TabsContent>
          <TabsContent value="register" className="mt-4 space-y-4">
            <Register onOpenChange={onOpenChange}></Register>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
