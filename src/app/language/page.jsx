// src/app/language/page.jsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LanguageForm() {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [isPending, setIsPending] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name) return setMessage("⚠ Please enter a language name")

    setIsPending(true)
    try {
      const res = await fetch("/api/languages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      })

      const data = await res.json()
      if (res.ok) {
        setMessage(`✅ Created Language: ${data.name}`)
        setName("")
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
      <form onSubmit={handleSubmit} className="flex w-full max-w-sm gap-2">
        <Input
          type="text"
          placeholder="Enter language name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button type="submit" variant="outline" disabled={isPending}>
          {isPending ? "Adding..." : "Add"}
        </Button>
      </form>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  )
}
