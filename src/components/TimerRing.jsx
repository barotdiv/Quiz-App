export default function TimerRing({ seconds, total }) {
    const SIZE = 64;
    const STROKE = 4;
    const r = (SIZE - STROKE) / 2;
    const circ = 2 * Math.PI * r;
    const progress = seconds / total;
    const offset = circ * (1 - progress);

    const color =
        progress > 0.5 ? "#6366F1" :
            progress > 0.25 ? "#F59E0B" : "#F43F5E";

    return (
        <div className="timer-wrap" style={{ width: SIZE, height: SIZE }}>
            <svg
                width={SIZE}
                height={SIZE}
                style={{ transform: "rotate(-90deg)", display: "block" }}
            >
                {/* Track */}
                <circle
                    cx={SIZE / 2} cy={SIZE / 2} r={r}
                    fill="none"
                    stroke="#1E293B"
                    strokeWidth={STROKE}
                />
                {/* Arc */}
                <circle
                    cx={SIZE / 2} cy={SIZE / 2} r={r}
                    fill="none"
                    stroke={color}
                    strokeWidth={STROKE}
                    strokeDasharray={circ}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 0.9s linear, stroke 0.3s" }}
                />
            </svg>

            <span className="timer-label" style={{ color }}>
                {seconds}
            </span>
        </div>
    );
}