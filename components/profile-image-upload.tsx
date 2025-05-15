"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Camera, X, Check, Loader2 } from "lucide-react"

interface ProfileImageUploadProps {
  currentImage: string
  onImageChange: (image: string) => void
}

export default function ProfileImageUpload({ currentImage, onImageChange }: ProfileImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file")
      return
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB")
      return
    }

    // Create a preview
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        setPreviewImage(event.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const cancelUpload = () => {
    setPreviewImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const confirmUpload = () => {
    if (!previewImage) return

    setIsUploading(true)

    // Simulate upload delay
    setTimeout(() => {
      onImageChange(previewImage)
      setPreviewImage(null)
      setIsUploading(false)
    }, 1500)
  }

  return (
    <div className="relative">
      {/* Current profile image */}
      <div className="relative w-24 h-24 rounded-full overflow-hidden bg-[var(--card-darker)]">
        <Image src={previewImage || currentImage} alt="Profile" fill className="object-cover" />

        {/* Upload overlay button */}
        {!previewImage && (
          <button
            onClick={triggerFileInput}
            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
            aria-label="Change profile picture"
          >
            <Camera className="w-6 h-6 text-white" />
          </button>
        )}
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
        aria-label="Upload profile picture"
      />

      {/* Preview actions */}
      {previewImage && (
        <div className="absolute -bottom-2 -right-2 flex gap-1">
          {isUploading ? (
            <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center">
              <Loader2 className="w-4 h-4 text-[var(--background)] animate-spin" />
            </div>
          ) : (
            <>
              <button
                onClick={confirmUpload}
                className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center"
                aria-label="Confirm new profile picture"
              >
                <Check className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={cancelUpload}
                className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center"
                aria-label="Cancel upload"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </>
          )}
        </div>
      )}

      {/* تغییر عکس button */}
      {!previewImage && (
        <button onClick={triggerFileInput} className="mt-2 text-sm text-[var(--accent)] hover:underline">
          تغییر عکس
        </button>
      )}
    </div>
  )
}
