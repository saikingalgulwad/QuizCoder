"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function QuizPage() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({ score: 0, total: 0 });

  useEffect(() => {
    fetch(`/api/languages/chapter/question?chapterId=${id}`)
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, [id]);

  if (!questions.length) return <p className="p-8 text-center">Loading Quiz...</p>;

  const currentQuestion = questions[currentIndex];

  // Determine performance comment
  const getPerformance = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return "Excellent! 🌟";
    if (percentage >= 70) return "Good Job! 👍";
    if (percentage >= 50) return "Average 😐";
    return "Poor 😢 Try Again!";
  };

  function handleOptionSelect(option) {
    setSelectedOption(option);
    setAnswers({ ...answers, [currentQuestion.id]: option });
  }

  function handleNext() {
    setSelectedOption(null);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      calculateResult();
      setShowResult(true);
    }
  }

  function calculateResult() {
    let score = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.answer) score++;
    });
    setResult({ score, total: questions.length });
  }

  // Calculate progress for progress bar
  const progress = ((currentIndex + 1) / questions.length) * 100;

  if (showResult) {
    const performance = getPerformance(result.score, result.total);
    const percentage = ((result.score / result.total) * 100).toFixed(1);

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4">
        <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md text-center animate-fadeIn">
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">Quiz Completed!</h2>
          <p className="text-lg mb-2">Score: <span className="font-bold">{result.score} / {result.total}</span></p>
          <p className="text-lg mb-4">Percentage: <span className="font-bold">{percentage}%</span></p>
          <p className="text-xl mb-4">{performance}</p>

          <button
            className="mt-4 w-full py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded"
            onClick={() => {
              setCurrentIndex(0);
              setAnswers({});
              setSelectedOption(null);
              setShowResult(false);
            }}
          >
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md transform transition-transform duration-300 animate-fadeIn">
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-gray-500 mb-2">
          Question {currentIndex + 1} of {questions.length}
        </p>
        <h2 className="text-xl font-bold text-gray-800 mb-4">{currentQuestion.question}</h2>

        <div className="flex flex-col gap-3">
          {currentQuestion.options.map((opt, i) => {
            const isSelected = selectedOption === opt;
            const correct = currentQuestion.answer === opt;
            const isAnswered = selectedOption !== null;

            return (
              <button
                key={i}
                onClick={() => handleOptionSelect(opt)}
                disabled={isAnswered}
                className={`text-left py-2 px-4 border rounded-lg transition-colors duration-200
                  ${isSelected && isAnswered ? (correct ? 'bg-green-400 text-black' : 'bg-red-400 text-black') : ''}
                  ${!isAnswered && isSelected ? 'bg-yellow-400 text-black' : ''}
                  hover:!bg-yellow-400 hover:text-black`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        <button
          className="mt-4 w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded disabled:opacity-50"
          onClick={handleNext}
          disabled={selectedOption === null}
        >
          {currentIndex + 1 === questions.length ? "Finish Quiz" : "Next Question"}
        </button>
      </div>
    </div>
  );
}
