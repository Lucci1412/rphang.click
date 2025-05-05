"use client"

import type React from "react"

import { useState } from "react"
import { Camera, Loader2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AvatarUploadProps {
  avatarUrl: string
  onAvatarChange: (url: string) => void
}

export default function AvatarUpload({ avatarUrl, onAvatarChange }: AvatarUploadProps) {
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Trong thực tế, bạn sẽ tải lên file này lên server
    // Ở đây chúng ta giả lập việc tải lên
    setIsUploading(true)

    // Tạo URL cho file đã chọn để hiển thị preview
    const fileUrl = URL.createObjectURL(file)

    // Giả lập thời gian tải lên
    setTimeout(() => {
      onAvatarChange(fileUrl)
      setIsUploading(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <Avatar className="h-24 w-24">
          <AvatarImage src={avatarUrl || "/placeholder.svg"} alt="Avatar" />
          <AvatarFallback>NA</AvatarFallback>
        </Avatar>

        <label
          htmlFor="avatar-upload"
          className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm"
        >
          {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </label>
      </div>

      <div className="text-center">
        <h3 className="font-medium">Ảnh đại diện</h3>
        <p className="text-xs text-muted-foreground">Nhấn vào biểu tượng camera để thay đổi ảnh đại diện</p>
      </div>
    </div>
  )
}
