"use server"

import { z } from "zod"
import { v2 as cloudinary } from "cloudinary"
import prisma from "@/lib/db"
import { requireRole } from "./auth-actions"

const hasCloudinary = !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET)

if (hasCloudinary) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })
}

export async function getMedia() {
  await requireRole(["SUPER_ADMIN", "ADMIN", "EDITOR"])
  return prisma.media.findMany({ orderBy: { createdAt: "desc" } })
}

export async function uploadMedia(formData: FormData) {
  await requireRole(["SUPER_ADMIN", "ADMIN", "EDITOR"])

  const file = formData.get("file") as File
  if (!file) throw new Error("No file provided")

  if (!hasCloudinary) {
    throw new Error("Cloudinary not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET to .env.local")
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const base64 = buffer.toString("base64")
  const dataUri = `data:${file.type};base64,${base64}`

  const result = await cloudinary.uploader.upload(dataUri, {
    folder: "nsh-media",
    resource_type: "auto",
  })

  const type =
    result.resource_type === "image" ? "IMAGE" :
    result.resource_type === "video" ? "VIDEO" : "PDF"

  return prisma.media.create({
    data: {
      name: file.name,
      url: result.secure_url,
      type,
      size: result.bytes,
    },
  })
}

export async function deleteMediaFromCloudinary(id: string) {
  await requireRole(["SUPER_ADMIN", "ADMIN"])

  const media = await prisma.media.findUnique({ where: { id } })
  if (!media) throw new Error("Media not found")

  if (hasCloudinary) {
    const publicId = media.url?.split("/").pop()?.split(".")[0]
    if (publicId) {
      await cloudinary.uploader.destroy(`nsh-media/${publicId}`)
    }
  }

  return prisma.media.delete({ where: { id } })
}
