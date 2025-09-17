"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function QuizPage() {
  const { name } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch(`/api/languaes/chapter/question?chapterId=${id}`)
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, [id]);

  function handleChange(qId, option) {
    setAnswers({ ...answers, [qId]: option });
  }
 
  function handleSubmit(e) {
    e.preventDefault();
    let score = 0;
    const details = [];

    questions.forEach((q) => {
      const correct = q.answer === answers[q.id];
      if (correct) score++;
      details.push({ question: q.question, correct, correctAnswer: q.answer, chosen: answers[q.id] });
    });

    setResult({ score, total: questions.length, details });
  }

  if (!questions.length) return <p className="p-8">Loading...</p>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((q) => (
          <div key={q.id} className="p-4 border rounded-md bg-white">
            <p className="font-bold mb-2">{q.question}</p>
            <div className="space-y-2">
              {q.options.map((opt, i) => (
                <label key={i} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`q-${q.id}`}
                    value={opt}
                    checked={answers[q.id] === opt}
                    onChange={() => handleChange(q.id, opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="w-full py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded"
        >
          Submit Quiz
        </button>
      </form>

      {result && (
        <div className="mt-8 p-4 border rounded-md bg-gray-50">
          <h2 className="font-bold text-lg mb-2">Results</h2>
          <p>Score: {result.score} / {result.total}</p>
          <ul className="mt-4 space-y-2">
            {result.details.map((d, i) => (
              <li key={i} className={d.correct ? "text-green-600" : "text-red-600"}>
                {d.question} → Your Answer: {d.chosen || "None"} | Correct: {d.correctAnswer}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
