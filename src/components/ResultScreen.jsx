export default function ResultScreen({ score, total, answers, questions, onRestart }) {
    const pct = Math.round((score / total) * 100);

    const grade = pct >= 80 ? "Brilliant" : pct >= 60 ? "Solid" : pct >= 40 ? "Keep going" : "Try again";
    const gradeColor = pct >= 80 ? "#10B981" : pct >= 60 ? "#6366F1" : pct >= 40 ? "#F59E0B" : "#F43F5E";

    const SIZE = 140;
    const STROKE = 8;
    const r = (SIZE - STROKE) / 2;
    const circ = 2 * Math.PI * r;
    const offset = circ * (1 - pct / 100);

    return (
        <div className="card">
            {/* Score ring */}
            <div className="score-ring-wrap">
                <div className="score-ring">
                    <svg width={SIZE} height={SIZE} style={{ transform: "rotate(-90deg)", display: "block" }}>
                        <circle cx={SIZE / 2} cy={SIZE / 2} r={r} fill="none" stroke="#1E293B" strokeWidth={STROKE} />
                        <circle
                            cx={SIZE / 2} cy={SIZE / 2} r={r}
                            fill="none"
                            stroke={gradeColor}
                            strokeWidth={STROKE}
                            strokeDasharray={circ}
                            strokeDashoffset={offset}
                            strokeLinecap="round"
                            style={{ transition: "stroke-dashoffset 1s ease 0.3s" }}
                        />
                    </svg>
                    <div className="score-ring-num">
                        <span className="score-num" style={{ color: gradeColor }}>{score}</span>
                        <span className="score-denom">out of {total}</span>
                    </div>
                </div>
            </div>

            <p className="grade" style={{ color: gradeColor }}>{grade}.</p>
            <p className="grade-sub">
                You got {pct}% — {score} correct answer{score !== 1 ? "s" : ""}
            </p>

            {/* Per-question review */}
            <div className="answer-review">
                {questions.map((q, i) => {
                    const correct = answers[i]?.correct;
                    return (
                        <div className="review-item" key={i}>
                            <div
                                className="review-dot"
                                style={{ background: correct ? "#10B981" : "#F43F5E" }}
                            />
                            <span className="review-q">{q.question}</span>
                            <span
                                className="review-badge"
                                style={{
                                    background: correct ? "rgba(16,185,129,0.12)" : "rgba(244,63,94,0.10)",
                                    color: correct ? "#10B981" : "#F43F5E",
                                }}
                            >
                                {correct ? "✓" : "✕"}
                            </span>
                        </div>
                    );
                })}
            </div>

            <div className="btn-row">
                <button className="btn-secondary" onClick={onRestart}>Restart</button>
                <button className="btn-primary" onClick={onRestart}>Play Again →</button>
            </div>
        </div>
    );
}