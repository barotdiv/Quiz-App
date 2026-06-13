const LETTERS = ["A", "B", "C", "D"];

export default function OptionButton({ index, text, status, confirmed, onClick }) {
    const label = LETTERS[index];

    let cls = "option-btn";
    if (confirmed) cls += " confirmed";
    if (status === "selected") cls += " selected";
    if (status === "correct") cls += " correct";
    if (status === "wrong") cls += " wrong";

    return (
        <button className={cls} onClick={onClick}>
            <span className="option-letter">{label}</span>
            <span className="option-text">{text}</span>
            {status === "correct" && <span className="option-icon">✓</span>}
            {status === "wrong" && <span className="option-icon">✕</span>}
        </button>
    );
}