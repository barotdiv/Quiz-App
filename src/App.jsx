import { useState, useEffect, useCallback } from 'react'
import StartScreen from "./components/StartScreen";
import QuizScreen from "./components/QuizScreen";
import ResultScreeen from "./components/ResultScreen";
import Confetti from "./components/Confetti";

import { QUESTIONS, TIMER_SECONDS } from "./data/questions";
import "./styles/base.css";
import "./styles/components.css";
import "./styles/screens.css";

export default function App() {
  const [screen, setScreen] = useState("start");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [answers, setAnswers] = useState([]);
  const [animKey, setAnimKey] = useState(0);

  const handleTimeout = useCallback(() => {
    if (!confirmed) {
      setConfirmed(true);
      setAnswers((prev) => [...prev, { selected: null, correct: false }]);
    }
  }, [confirmed]);
  useEffect(() => {
    if (screen !== "quiz" || confirmed) return;
    if (timeLeft <= 0) { handleTimeout(); return; }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [screen, timeLeft, confirmed, handleTimeout]);

  const handleStart = () => setScreen("quiz");
  const handleSelect = (idx) => {
    if (!confirmed) setSelected(idx);
  };
  const handleConfirm = () => {
    if (selected === null || confirmed) return;
    setConfirmed(true);
    const correct = selected === QUESTIONS[current].answer;
    if (correct) setScore((s) => s + 1);
    setAnswers((prev) => [...prev, { selected, correct }]);
  };
  const handleNext = () => {
    const next = current + 1;
    if (next >= QUESTIONS.length) {
      setScreen("result");
    } else {
      setCurrent(next);
      setSelected(null);
      setConfirmed(false);
      setTimeLeft(TIMER_SECONDS);
      setAnimKey((k) => k + 1);
    }
  };
  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setConfirmed(false);
    setScore(0);
    setTimeLeft(TIMER_SECONDS);
    setAnswers([]);
    setAnimKey((k) => k + 1);
    setScreen("start");
  };
  return (
    <div className='shell'>
      {screen === "result" && <Confetti />}
      {screen === "start" && (<StartScreen onStart={handleStart} />)}
      {screen === "quiz" && (
        <QuizScreen
          key={animKey}
          question={QUESTIONS[current]}
          current={current}
          total={QUESTIONS.length}
          timeLeft={timeLeft}
          selected={selected}
          confirmed={confirmed}
          onSelect={handleSelect}
          onConfirm={handleConfirm}
          onNext={handleNext}
        />
      )}
      {screen === "result" && (
        <ResultScreeen
          score={score}
          total={QUESTIONS.length}
          answers={answers}
          questions={QUESTIONS}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}



