export default function FeedbackBar({ status, correctAnswer }) {
    const messages = {
        correct: "✓ Correct! Well done.",
        wrong: `✕ Not quite. The right answer was "${correctAnswer}".`,
        timeout: "⏱ Time's up! The correct answer is highlighted.",
    };

    return (
        <div className={`feedback-bar ${status}`}>
            {messages[status]}
        </div>
    );
}