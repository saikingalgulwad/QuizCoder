// src/app/chapter/page.jsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ChapterForm() {
  const [title, setTitle] = useState("")
  const [languageId, setLanguageId] = useState("")
  const [message, setMessage] = useState("")
  const [isPending, setIsPending] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!title || !languageId) return setMessage("⚠ Fill all fields")

    setIsPending(true)
    try {
      const res = await fetch("/api/languages/chapter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          languageId: Number(languageId),
        }),
      })

      const data = await res.json()
      if (res.ok) {
        setMessage(`✅ Created Chapter: ${data.title}`)
        setTitle("")
        setLanguageId("")
      } else {
        setMessage(`❌ Error: ${data.error}`)
      }
    } catch {
      setMessage("❌ Failed to connect")
    }
    setIsPending(false)
  }

  return (
    <div className="h-[100vh] flex justify-center items-center">
      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-sm gap-2">
        <Input
          type="text"
          placeholder="Enter chapter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Language ID"
          value={languageId}
          onChange={(e) => setLanguageId(e.target.value)}
        />
        <Button type="submit" variant="outline" disabled={isPending}>
          {isPending ? "Adding..." : "Add"}
        </Button>
      </form>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  )
}
