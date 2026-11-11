"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Send, MessageSquare } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { getClientMessages, sendClientMessage } from "@/actions/client-portal"

interface ClientMessage {
  id: string
  sender: string
  content: string
  createdAt: string
}

export default function ClientMessages() {
  const [messages, setMessages] = useState<ClientMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [input, setInput] = useState("")
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getClientMessages()
      .then((data) => setMessages(data as unknown as ClientMessage[]))
      .catch(() => setMessages([]))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const send = async () => {
    if (!input.trim() || sending) return
    setError(null)
    setSending(true)
    try {
      const created = await sendClientMessage(input)
      setMessages([...messages, created])
      setInput("")
    } catch (err) {
      console.error("Failed to send message:", err)
      setError("Failed to send your message. Please try again.")
    } finally {
      setSending(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-foreground">Messages</h1>
        <p className="text-muted-foreground mt-1">Send a message to the NSH Media team and review your history.</p>
      </div>

      <Card className="border-border">
        <CardContent className="p-0 flex flex-col h-[calc(100vh-16rem)] min-h-[400px]">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <MessageSquare className="h-10 w-10 text-muted-foreground/40 mb-3" />
                <p className="text-sm text-muted-foreground">No messages yet. Send your first message below.</p>
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className="flex justify-end">
                  <div className="max-w-[75%]">
                    <div className="rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                      {message.content}
                    </div>
                    <p className="mt-1 text-right text-[11px] text-muted-foreground">
                      {message.sender} · {new Date(message.createdAt).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))
            )}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-border p-4">
            {error && <p className="mb-2 text-sm text-red-400">{error}</p>}
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send() } }}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button onClick={send} disabled={sending || !input.trim()}>
                <Send className={cn("h-4 w-4", sending && "animate-pulse")} />
                <span className="ml-2 hidden sm:inline">{sending ? "Sending..." : "Send"}</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
