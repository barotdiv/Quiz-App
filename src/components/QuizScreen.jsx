import TimerRing from "./TimerRing";
import OptionButton from "./OptionButton";
import FeedbackBar from "./FeedbackBar";
import { TIMER_SECONDS } from "../data/questions";

export default function QuizScreen({
    question,
    current,
    total,
    timeLeft,
    selected,
    confirmed,
    onSelect,
    onConfirm,
    onNext,
}) {
    const isLast = current + 1 >= total;

    // Derive per-option status
    const getStatus = (i) => {
        if (!confirmed) return i === selected ? "selected" : "default";
        if (i === question.answer) return "correct";
        if (i === selected) return "wrong";
        return "default";
    };

    // Feedback type
    const feedbackStatus =
        selected === null ? "timeout" :
            selected === question.answer ? "correct" : "wrong";

    return (
        <div className="card">
            {/* Header: category + progress + timer */}
            <div className="quiz-header">
                <div className="quiz-meta">
                    <span className="category-tag">{question.category}</span>
                    <div className="progress-row">
                        <div className="progress-track">
                            <div
                                className="progress-fill"
                                style={{ width: `${((current + 1) / total) * 100}%` }}
                            />
                        </div>
                        <span className="progress-label">{current + 1} / {total}</span>
                    </div>
                </div>
                <TimerRing seconds={timeLeft} total={TIMER_SECONDS} />
            </div>

            {/* Question */}
            <p className="question-text">{question.question}</p>

            {/* Options */}
            <div className="options">
                {question.options.map((opt, i) => (
                    <OptionButton
                        key={i}
                        index={i}
                        text={opt}
                        status={getStatus(i)}
                        confirmed={confirmed}
                        onClick={() => onSelect(i)}
                    />
                ))}
            </div>

            {/* Feedback (shown after confirm) */}
            {confirmed && (
                <FeedbackBar
                    status={feedbackStatus}
                    correctAnswer={question.options[question.answer]}
                />
            )}

            {/* Actions */}
            <div className="btn-row">
                {!confirmed ? (
                    <button
                        className="btn-primary"
                        onClick={onConfirm}
                        disabled={selected === null}
                    >
                        Confirm Answer
                    </button>
                ) : (
                    <button className="btn-primary" onClick={onNext}>
                        {isLast ? "See Results →" : "Next Question →"}
                    </button>
                )}
            </div>
        </div>
    );
}