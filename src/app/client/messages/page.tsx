"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Send,
  Plus,
  Paperclip,
  ChevronLeft,
  MoreVertical,
  MessageSquare,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  from: string
  avatar: string
  color: string
  content: string
  time: string
  unread: boolean
}

interface Conversation {
  id: string
  name: string
  avatar: string
  color: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
  messages: Message[]
}

const conversations: Conversation[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "SJ",
    color: "bg-purple-500",
    lastMessage: "The homepage mockups are ready for your review.",
    time: "2:34 PM",
    unread: 2,
    online: true,
    messages: [
      { id: "m1", from: "Sarah Johnson", avatar: "SJ", color: "bg-purple-500", content: "Hi John! I have finished the homepage mockups for the Website Redesign project.", time: "2:30 PM", unread: false },
      { id: "m2", from: "You", avatar: "JD", color: "bg-blue-500", content: "That is great news! Can you share a preview?", time: "2:31 PM", unread: false },
      { id: "m3", from: "Sarah Johnson", avatar: "SJ", color: "bg-purple-500", content: "The homepage mockups are ready for your review. I have attached them to this message.", time: "2:34 PM", unread: false },
      { id: "m4", from: "Sarah Johnson", avatar: "SJ", color: "bg-purple-500", content: "Please let me know your thoughts on the hero section design.", time: "2:34 PM", unread: true },
      { id: "m5", from: "Sarah Johnson", avatar: "SJ", color: "bg-purple-500", content: "We went with a more minimalist approach as discussed.", time: "2:35 PM", unread: true },
    ],
  },
  {
    id: "2",
    name: "Mike Chen",
    avatar: "MC",
    color: "bg-blue-500",
    lastMessage: "Updated the color palette based on feedback.",
    time: "11:20 AM",
    unread: 0,
    online: true,
    messages: [
      { id: "m6", from: "Mike Chen", avatar: "MC", color: "bg-blue-500", content: "Updated the color palette based on your feedback from last week.", time: "11:20 AM", unread: false },
      { id: "m7", from: "You", avatar: "JD", color: "bg-blue-500", content: "Looks good! The new blue shade works much better.", time: "11:25 AM", unread: false },
    ],
  },
  {
    id: "3",
    name: "Emily Davis",
    avatar: "ED",
    color: "bg-green-500",
    lastMessage: "Development is on track for Friday deadline.",
    time: "Yesterday",
    unread: 1,
    online: false,
    messages: [
      { id: "m8", from: "Emily Davis", avatar: "ED", color: "bg-green-500", content: "Development is on track for Friday deadline.", time: "Yesterday", unread: true },
    ],
  },
  {
    id: "4",
    name: "Alex Rivera",
    avatar: "AR",
    color: "bg-amber-500",
    lastMessage: "Here is the content draft for the about page.",
    time: "Yesterday",
    unread: 0,
    online: false,
    messages: [
      { id: "m9", from: "Alex Rivera", avatar: "AR", color: "bg-amber-500", content: "Here is the content draft for the about page. Let me know if you want any changes.", time: "Yesterday", unread: false },
      { id: "m10", from: "You", avatar: "JD", color: "bg-blue-500", content: "Thanks Alex! I will review it today.", time: "Yesterday", unread: false },
    ],
  },
  {
    id: "5",
    name: "NSH Media Team",
    avatar: "N",
    color: "bg-primary",
    lastMessage: "Reminder: Project status meeting tomorrow at 10 AM.",
    time: "2 days ago",
    unread: 0,
    online: false,
    messages: [
      { id: "m11", from: "NSH Media Team", avatar: "N", color: "bg-primary", content: "Reminder: Project status meeting tomorrow at 10 AM. Please come prepared with updates.", time: "2 days ago", unread: false },
    ],
  },
]

export default function ClientMessages() {
  const [selectedId, setSelectedId] = useState<string>(conversations[0].id)
  const [messageInput, setMessageInput] = useState("")
  const [search, setSearch] = useState("")
  const [showMobileList, setShowMobileList] = useState(true)

  const selected = conversations.find((c) => c.id === selectedId)
  const filtered = conversations.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleSend = () => {
    if (!messageInput.trim()) return
    setMessageInput("")
  }

  const handleSelectConversation = (id: string) => {
    setSelectedId(id)
    setShowMobileList(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-[calc(100vh-8rem)] -m-4 lg:-m-6"
    >
      <Card className="border-border h-full flex overflow-hidden rounded-none lg:rounded-xl">
        <div
          className={cn(
            "w-full lg:w-80 xl:w-96 border-r border-border flex flex-col shrink-0",
            showMobileList ? "flex" : "hidden lg:flex"
          )}
        >
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-foreground">Messages</h2>
              <Button variant="ghost" size="icon">
                <Plus className="h-5 w-5" />
              </Button>
            </div>
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filtered.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => handleSelectConversation(conversation.id)}
                className={cn(
                  "w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-accent transition-colors border-b border-border last:border-0",
                  selectedId === conversation.id && "bg-accent"
                )}
              >
                <div className="relative shrink-0">
                  <div
                    className={cn(
                      "h-10 w-10 rounded-full flex items-center justify-center text-white text-sm font-medium",
                      conversation.color
                    )}
                  >
                    {conversation.avatar}
                  </div>
                  {conversation.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-white" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{conversation.name}</span>
                    <span className="text-xs text-muted-foreground">{conversation.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate mt-0.5">{conversation.lastMessage}</p>
                </div>
                {conversation.unread > 0 && (
                  <div className="h-5 min-w-[20px] rounded-full bg-primary text-primary-foreground text-[10px] font-medium flex items-center justify-center px-1">
                    {conversation.unread}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn(
                "flex-1 flex flex-col",
                !showMobileList ? "flex" : "hidden lg:flex"
              )}
            >
              <div className="p-4 border-b border-border flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  onClick={() => setShowMobileList(true)}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <div
                  className={cn(
                    "h-9 w-9 rounded-full flex items-center justify-center text-white text-sm font-medium",
                    selected.color
                  )}
                >
                  {selected.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{selected.name}</span>
                    {selected.online && (
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {selected.online ? "Online" : "Offline"}
                  </p>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {selected.messages.map((msg) => {
                  const isYou = msg.from === "You"
                  return (
                    <div
                      key={msg.id}
                      className={cn("flex gap-3", isYou && "flex-row-reverse")}
                    >
                      {!isYou && (
                        <div
                          className={cn(
                            "h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-medium shrink-0",
                            msg.color
                          )}
                        >
                          {msg.avatar}
                        </div>
                      )}
                      <div className={cn("max-w-[75%]", isYou && "items-end flex flex-col")}>
                        <div
                          className={cn(
                            "rounded-2xl px-4 py-2.5 text-sm",
                            isYou
                              ? "bg-primary text-primary-foreground rounded-br-md"
                              : "bg-muted text-foreground rounded-bl-md"
                          )}
                        >
                          {msg.content}
                        </div>
                        <span className="text-[10px] text-muted-foreground mt-1 px-1">{msg.time}</span>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="p-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="shrink-0">
                    <Paperclip className="h-5 w-5 text-muted-foreground" />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    className="flex-1"
                  />
                  <Button size="icon" onClick={handleSend} disabled={!messageInput.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="flex-1 hidden lg:flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-40" />
                <p>Select a conversation to start chatting</p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  )
}
