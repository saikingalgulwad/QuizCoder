"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function QuestionForm() {
  const [form, setForm] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
    chapterId: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const optionsArray = [
      form.option1,
      form.option2,
      form.option3,
      form.option4,
    ].filter(Boolean); // remove empty options

    await fetch("/api/languages/chapter/question", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: form.question,
        options: optionsArray,
        answer: form.answer,
        chapterId: Number(form.chapterId),
      }),
    });

    // reset form
    setForm({
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: "",
      chapterId: "",
    });
  }

  return (
    <div className="h-[100vh] flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-full max-w-sm"
      >
        <Input
          name="question"
          placeholder="Enter question"
          value={form.question}
          onChange={handleChange}
        />
        <Input
          name="option1"
          placeholder="Option 1"
          value={form.option1}
          onChange={handleChange}
        />
        <Input
          name="option2"
          placeholder="Option 2"
          value={form.option2}
          onChange={handleChange}
        />
        <Input
          name="option3"
          placeholder="Option 3"
          value={form.option3}
          onChange={handleChange}
        />
        <Input
          name="option4"
          placeholder="Option 4"
          value={form.option4}
          onChange={handleChange}
        />
        <Input
          name="answer"
          placeholder="Correct answer"
          value={form.answer}
          onChange={handleChange}
        />
        <Input
          name="chapterId"
          type="number"
          placeholder="Chapter ID"
          value={form.chapterId}
          onChange={handleChange}
        />
        <Button type="submit" variant="outline">
          Add Question
        </Button>
      </form>
    </div>
  );
}
