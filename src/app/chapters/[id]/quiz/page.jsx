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

  if (!questions.length)
    return <p className="p-8 text-center text-lg">Loading Quiz...</p>;

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
    if (selectedOption === null) return;

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(answers[questions[currentIndex + 1]?.id] || null);
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

  // Progress bar
  const progress = ((currentIndex + 1) / questions.length) * 100;

  if (showResult) {
    const performance = getPerformance(result.score, result.total);
    const percentage = ((result.score / result.total) * 100).toFixed(1);

    return (
      <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-3xl text-center animate-fadeIn">
          <h2 className="text-3xl sm:text-4xl font-bold text-yellow-500 mb-6">
            Quiz Completed!
          </h2>
          <p className="text-xl sm:text-2xl mb-2">
            Score:{" "}
            <span className="font-bold">
              {result.score} / {result.total}
            </span>
          </p>
          <p className="text-xl sm:text-2xl mb-2">
            Percentage: <span className="font-bold">{percentage}%</span>
          </p>
          <p className="text-2xl sm:text-3xl mb-6">{performance}</p>

          {/* Review all questions */}
          <div className="space-y-6 text-left">
            {questions.map((q, index) => {
              const userAnswer = answers[q.id];
              const correctAnswer = q.answer;
              const isCorrect = userAnswer === correctAnswer;

              return (
                <div
                  key={q.id}
                  className="border rounded-xl p-4 sm:p-6 bg-gray-50"
                >
                  <h3 className="text-lg sm:text-xl font-semibold mb-3">
                    {index + 1}. {q.question}
                  </h3>

                  {/* Show only user answer & correct answer */}
                  <div className="space-y-2">
                    {userAnswer && (
                      <p
                        className={`p-2 sm:p-3 rounded-lg border text-base sm:text-lg ${
                          isCorrect
                            ? "bg-green-200 border-green-500"
                            : "bg-red-200 border-red-500"
                        }`}
                      >
                        Your Answer: {userAnswer} {isCorrect ? "✅" : "❌"}
                      </p>
                    )}
                    {!isCorrect && (
                      <p className="p-2 sm:p-3 rounded-lg border text-base sm:text-lg bg-green-200 border-green-500">
                        Correct Answer: {correctAnswer} ✅
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            className="mt-6 w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg text-lg sm:text-xl"
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
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-2xl transform transition-transform duration-300 animate-fadeIn">
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
          <div
            className="bg-yellow-400 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-gray-600 mb-3 text-lg sm:text-xl">
          Question {currentIndex + 1} of {questions.length}
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
          {currentQuestion.question}
        </h2>

        <div className="flex flex-col gap-4">
          {currentQuestion.options.map((opt, i) => {
            const isSelected = selectedOption === opt;

            return (
              <button
                key={i}
                onClick={() => handleOptionSelect(opt)}
                className={`text-left py-3 sm:py-4 px-4 border rounded-xl text-lg sm:text-xl font-medium transition-colors duration-200
                  ${
                    isSelected
                      ? "bg-yellow-400 text-black border-yellow-500"
                      : "bg-white text-gray-800"
                  }
                  hover:bg-yellow-300`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        <button
          className="mt-6 w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg text-lg sm:text-xl disabled:opacity-50"
          onClick={handleNext}
          disabled={selectedOption === null}
        >
          {currentIndex + 1 === questions.length
            ? "Finish Quiz"
            : "Next Question"}
        </button>
      </div>
    </div>
  );
}
