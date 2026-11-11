"use server"

import { getServerSession } from "next-auth"
import prisma from "@/lib/db"
import { authOptions } from "@/lib/auth"

async function getSessionUser() {
  const session = await getServerSession(authOptions)
  if (!session?.user) return null
  const id = (session.user as { id?: string }).id
  if (!id) return null
  return prisma.user.findUnique({ where: { id } })
}

async function getClientForUser() {
  const user = await getSessionUser()
  if (!user) return { user: null, client: null }
  const client = await prisma.client.findUnique({ where: { userId: user.id } })
  return { user, client }
}

const STATUS_LABELS: Record<string, string> = {
  DISCOVERY: "Discovery",
  DESIGN: "Design",
  DEVELOPMENT: "Development",
  TESTING: "Testing",
  REVIEW: "Review",
  COMPLETED: "Completed",
}

function projectStatus(status: string) {
  return STATUS_LABELS[status] ?? status
}

export async function getClientAccount() {
  const { user, client } = await getClientForUser()
  return {
    user: user ? { id: user.id, name: user.name, email: user.email, image: user.image } : null,
    client: client ? { id: client.id, name: client.name, company: client.company } : null,
  }
}

export async function getClientDashboard() {
  const { user, client } = await getClientForUser()
  if (!user) return null

  if (!client) {
    return {
      user: { name: user.name, email: user.email },
      client: null,
      activeProjects: 0,
      completedProjects: 0,
      pendingInvoices: 0,
      unreadMessages: 0,
      projects: [],
      invoices: [],
      documents: [],
      messages: [],
    }
  }

  const [projects, invoices, documents, messages] = await Promise.all([
    prisma.clientProject.findMany({
      where: { clientId: client.id },
      orderBy: { createdAt: "desc" },
    }),
    prisma.invoice.findMany({
      where: { clientId: client.id },
      orderBy: { createdAt: "desc" },
    }),
    prisma.document.findMany({
      where: { clientProject: { is: { clientId: client.id } } },
      include: { clientProject: { select: { title: true } } },
      orderBy: { uploadedAt: "desc" },
    }),
    prisma.message.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ])

  return {
    user: { name: user.name, email: user.email },
    client: { id: client.id, name: client.name, company: client.company },
    activeProjects: projects.filter((p) => p.status !== "COMPLETED").length,
    completedProjects: projects.filter((p) => p.status === "COMPLETED").length,
    pendingInvoices: invoices.filter((i) => i.status !== "PAID").length,
    unreadMessages: 0,
    projects: projects.map((p) => ({
      id: p.id,
      title: p.title,
      status: projectStatus(p.status),
      progress: p.progress,
    })),
    invoices: invoices.map((i) => ({
      id: i.id,
      amount: i.amount,
      status: i.status,
      dueDate: i.dueDate.toISOString(),
    })),
    documents: documents.map((d) => ({
      id: d.id,
      name: d.name,
      url: d.url,
      type: d.type,
      project: d.clientProject?.title ?? "",
      uploadedAt: d.uploadedAt.toISOString(),
    })),
    messages: messages.map((m) => ({
      id: m.id,
      sender: m.sender,
      content: m.content,
      createdAt: m.createdAt.toISOString(),
    })),
  }
}

export async function getClientProjects() {
  const { client } = await getClientForUser()
  if (!client) return []

  const projects = await prisma.clientProject.findMany({
    where: { clientId: client.id },
    orderBy: { createdAt: "desc" },
  })

  return projects.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description ?? "",
    status: projectStatus(p.status),
    progress: p.progress,
    startDate: p.startDate.toISOString(),
    deadline: p.deadline ? p.deadline.toISOString() : null,
  }))
}

export async function getClientProject(id: string) {
  const { client } = await getClientForUser()
  if (!client) return null

  const project = await prisma.clientProject.findFirst({
    where: { id, clientId: client.id },
    include: {
      documents: { orderBy: { uploadedAt: "desc" } },
    },
  })
  if (!project) return null

  return {
    id: project.id,
    title: project.title,
    description: project.description ?? "",
    status: projectStatus(project.status),
    progress: project.progress,
    startDate: project.startDate.toISOString(),
    deadline: project.deadline ? project.deadline.toISOString() : null,
    documents: project.documents.map((d) => ({
      id: d.id,
      name: d.name,
      url: d.url,
      type: d.type,
      uploadedAt: d.uploadedAt.toISOString(),
    })),
  }
}

export async function getClientDocuments() {
  const { client } = await getClientForUser()
  if (!client) return []

  const documents = await prisma.document.findMany({
    where: { clientProject: { is: { clientId: client.id } } },
    include: { clientProject: { select: { title: true } } },
    orderBy: { uploadedAt: "desc" },
  })

  return documents.map((d) => ({
    id: d.id,
    name: d.name,
    url: d.url,
    type: d.type,
    project: d.clientProject?.title ?? "",
    uploadedAt: d.uploadedAt.toISOString(),
  }))
}

export async function getClientInvoices() {
  const { client } = await getClientForUser()
  if (!client) return []

  const invoices = await prisma.invoice.findMany({
    where: { clientId: client.id },
    orderBy: { createdAt: "desc" },
  })

  return invoices.map((i) => ({
    id: i.id,
    amount: i.amount,
    status: i.status,
    dueDate: i.dueDate.toISOString(),
    createdAt: i.createdAt.toISOString(),
  }))
}

export async function getClientMessages() {
  const { user } = await getClientForUser()
  if (!user) return []

  const messages = await prisma.message.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
  })

  return messages.map((m) => ({
    id: m.id,
    sender: m.sender,
    content: m.content,
    createdAt: m.createdAt.toISOString(),
  }))
}

export async function sendClientMessage(content: string) {
  const user = await getSessionUser()
  if (!user) throw new Error("Unauthorized")
  const trimmed = content.trim()
  if (!trimmed) throw new Error("Message cannot be empty")

  const message = await prisma.message.create({
    data: {
      sender: user.name || user.email || "Client",
      content: trimmed,
      userId: user.id,
    },
  })

  return {
    id: message.id,
    sender: message.sender,
    content: message.content,
    createdAt: message.createdAt.toISOString(),
  }
}
