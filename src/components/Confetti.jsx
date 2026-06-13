export default function Confetti() {
    const colors = ["#6366F1", "#F59E0B", "#10B981", "#F43F5E", "#3B82F6", "#A855F7"];

    const pieces = Array.from({ length: 60 }, (_, i) => {
        const size = Math.random() * 10 + 6;
        return {
            key: i,
            style: {
                position: "fixed",
                width: size,
                height: size,
                background: colors[Math.floor(Math.random() * colors.length)],
                borderRadius: Math.random() > 0.5 ? "50%" : "2px",
                left: `${Math.random() * 100}vw`,
                top: `-${size}px`,
                opacity: Math.random() * 0.8 + 0.2,
                animation: `confettiFall ${Math.random() * 2 + 1.5}s ease-in ${Math.random() * 1}s forwards`,
                transform: `rotate(${Math.random() * 360}deg)`,
                zIndex: 1000,
            },
        };
    });

    return (
        <>
            {pieces.map(({ key, style }) => (
                <div key={key} style={style} />
            ))}
        </>
    );
}