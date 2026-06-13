import { QUESTIONS, TIMER_SECONDS } from "../data/questions";

export default function StartScreen({ onStart }) {
    return (
        <div className="card">
            <p className="start-eyebrow">General Knowledge</p>

            <h1 className="start-title">
                How sharp<br />is your <span>mind?</span>
            </h1>

            <p className="start-desc">
                Eight questions across science, history, art, and more.
                Each one timed. No hints. Just you and what you know.
            </p>

            <div className="meta-grid">
                <div className="meta-item">
                    <div className="meta-value">{QUESTIONS.length}</div>
                    <div className="meta-label">Questions</div>
                </div>
                <div className="meta-item">
                    <div className="meta-value">{TIMER_SECONDS}s</div>
                    <div className="meta-label">Per question</div>
                </div>
                <div className="meta-item">
                    <div className="meta-value">6</div>
                    <div className="meta-label">Topics</div>
                </div>
            </div>

            <button className="btn-primary" onClick={onStart}>
                Start Quiz →
            </button>
        </div>
    );
}