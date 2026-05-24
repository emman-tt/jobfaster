export default function JobFasterLogo({
  size = 40,
  variant = "light",
  showWordmark = false,
} = {}) {
  const backgrounds = {
    light: "#FFF7ED",
    dark: "#1a1a1a",
    orange: "#F97316",
  };

  const strokes = {
    light: "#1a1a1a",
    dark: "#ffffff",
    orange: "#ffffff",
  };

  const borders = {
    light: "#F97316",
    dark: "none",
    orange: "none",
  };

  const bg = backgrounds[variant] || backgrounds.light;
  const stroke = strokes[variant] || strokes.light;
  const border = borders[variant] || borders.light;
  const dotFill = variant === "orange" ? "#ffffff" : "#F97316";

  const actualSize = size;

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: actualSize * 0.2,
      }}
    >
      <svg
        width={actualSize}
        height={actualSize}
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0"
          y="0"
          width="10"
          height="10"
          rx="2"
          fill={bg}
          stroke={border !== "none" ? border : undefined}
          strokeWidth={border !== "none" ? 0.5 : 0}
        />

        <g transform="rotate(-4, 5, 5)">
          <path
            d="M2 2.5 L4.6 2.5 M4 2.5 L4 7 Q4 8.8 2.2 8.8 Q0.8 8.6 0.8 7"
            stroke={stroke}
            strokeWidth="0.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        <path
          d="M4.8 2.5 L4.8 8.8 M4.8 2.5 L8.2 2.5 M4.8 5 L7.8 5"
          stroke={stroke}
          strokeWidth="0.75"
          strokeLinecap="round"
        />

        <circle cx="8" cy="2" r="0.9" fill={dotFill} />
      </svg>

      {showWordmark && (
        <span
          style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: actualSize * 0.35,
            fontWeight: 700,
            color: variant === "dark" ? "#ffffff" : "#1a1a1a",
            letterSpacing: -0.2,
          }}
        >
          Job<span style={{ color: "#F97316" }}>Faster</span>
        </span>
      )}
    </div>
  );
}
