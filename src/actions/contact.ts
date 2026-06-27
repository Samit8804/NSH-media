"use server"

import { z } from "zod"
import prisma from "@/lib/db"

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  service: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(1),
})

export async function submitContact(data: z.infer<typeof contactSchema>) {
  try {
    const validated = contactSchema.parse(data)
    await prisma.lead.create({
      data: {
        name: validated.name,
        email: validated.email,
        phone: validated.phone,
        service: validated.service,
        budget: validated.budget,
        message: validated.message,
        status: "NEW",
      },
    })
    return { success: true as const }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false as const, error: error.message }
    }
    return { success: false as const, error: "Failed to submit contact" }
  }
}
