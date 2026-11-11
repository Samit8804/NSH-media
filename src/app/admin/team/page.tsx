"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Edit3, Trash2, Linkedin, Twitter, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Image from "next/image"
import MediaPicker from "@/components/admin/MediaPicker"
import {
  getTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "@/actions/team"

interface TeamMember {
  id: string
  name: string
  position: string
  bio: string
  imageUrl: string
  linkedin: string
  twitter: string
}

const emptyForm: TeamMember = {
  id: "",
  name: "",
  position: "",
  bio: "",
  imageUrl: "",
  linkedin: "",
  twitter: "",
}

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [form, setForm] = useState<TeamMember>(emptyForm)
  const [editing, setEditing] = useState(false)
  const [showPicker, setShowPicker] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getTeamMembers()
      .then((data) => {
        const list = (data as unknown as Array<Record<string, unknown>>) || []
        setTeam(
          list.map((m) => ({
            id: m.id as string,
            name: (m.name as string) ?? "",
            position: (m.position as string) ?? "",
            bio: (m.bio as string) ?? "",
            imageUrl: (m.image as string) ?? "",
            linkedin: (m.linkedin as string) ?? "",
            twitter: (m.twitter as string) ?? "",
          }))
        )
      })
      .catch(() => setTeam([]))
  }, [])

  const openEdit = (m: TeamMember) => {
    setForm(m)
    setEditing(true)
    setError(null)
    setDialogOpen(true)
  }

  const openNew = () => {
    setForm({ ...emptyForm })
    setEditing(false)
    setError(null)
    setDialogOpen(true)
  }

  const save = async () => {
    if (!form.name.trim() || !form.position.trim()) {
      setError("Name and position are required.")
      return
    }
    setError(null)
    const payload = {
      name: form.name.trim(),
      position: form.position.trim(),
      bio: form.bio.trim() || undefined,
      image: form.imageUrl.trim() || undefined,
      linkedin: form.linkedin.trim() || undefined,
      twitter: form.twitter.trim() || undefined,
    }
    try {
      if (editing) {
        await updateTeamMember(form.id, payload)
        setTeam(team.map((m) => (m.id === form.id ? form : m)))
      } else {
        const created = await createTeamMember(payload)
        setTeam([{ ...form, id: created.id }, ...team])
      }
      setDialogOpen(false)
    } catch (err) {
      console.error("Failed to save team member:", err)
      setError("Failed to save the team member. Please try again.")
    }
  }

  const handleDelete = async () => {
    if (deleteId !== null) {
      try {
        await deleteTeamMember(deleteId)
        setTeam(team.filter((m) => m.id !== deleteId))
      } catch (err) {
        console.error("Failed to delete team member:", err)
      }
      setDeleteId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Team Management</h2>
        <Button onClick={openNew}><Plus className="h-4 w-4 mr-2" />Add Member</Button>
      </div>

      <div className="glass-dashboard overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10">
          <h3 className="text-base font-semibold text-white">Team Members</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-silver text-xs uppercase tracking-wider">
                <th className="px-6 pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Position</th>
                <th className="pb-3 font-medium">LinkedIn</th>
                <th className="pb-3 font-medium">Twitter</th>
                <th className="pb-3 pr-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {team.map((m, i) => (
                <motion.tr key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="border-b border-white/10 last:border-0 hover:bg-white/[0.04]">
                  <td className="px-6 py-3 font-medium text-white">{m.name}</td>
                  <td className="py-3 text-silver">{m.position}</td>
                  <td className="py-3">
                    {m.linkedin ? (
                      <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                        <Linkedin className="h-3.5 w-3.5" /> Profile
                      </a>
                    ) : (
                      <span className="text-white/40">-</span>
                    )}
                  </td>
                  <td className="py-3">
                    {m.twitter ? (
                      <a href={m.twitter} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                        <Twitter className="h-3.5 w-3.5" /> Profile
                      </a>
                    ) : (
                      <span className="text-white/40">-</span>
                    )}
                  </td>
                  <td className="py-3 pr-6 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(m)} className="p-2 text-silver hover:text-primary hover:bg-white/[0.04] rounded-lg"><Edit3 className="h-4 w-4" /></button>
                      <button onClick={() => setDeleteId(m.id)} className="p-2 text-silver hover:text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {team.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-silver/40">No team members yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg glass-dashboard border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">{editing ? "Edit Team Member" : "New Team Member"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-silver">Name</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label className="text-silver">Position</Label>
                <Input value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-silver">Bio</Label>
              <Textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3} />
            </div>
            <div className="space-y-2">
              <Label className="text-silver">Image URL</Label>
              {form.imageUrl && (
                <div className="relative inline-block w-20 h-20">
                  <Image src={form.imageUrl} alt="Preview" fill className="object-cover rounded-xl" />
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, imageUrl: "" })}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  >
                    X
                  </button>
                </div>
              )}
              <div className="flex gap-2">
                <Input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className="flex-1" />
                <Button type="button" variant="outline" size="icon" onClick={() => setShowPicker(true)}>
                  <ImageIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-silver">LinkedIn URL</Label>
                <Input value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label className="text-silver">Twitter URL</Label>
                <Input value={form.twitter} onChange={(e) => setForm({ ...form, twitter: e.target.value })} />
              </div>
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={save}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <MediaPicker open={showPicker} onClose={() => setShowPicker(false)} onSelect={(url) => setForm({ ...form, imageUrl: url })} />

      <Dialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="glass-dashboard border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Delete Team Member</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-silver">Are you sure? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
