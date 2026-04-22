export default function CrownIcon({ width = 24, height = 24, color = "#D4AF37" }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 13l4-8 2 5 2-6 2 6 2-5 4 8M3 13v5a2 2 0 002 2h14a2 2 0 002-2v-5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={color}
        opacity="0.9"
      />
      <circle cx="6" cy="8" r="1.5" fill={color} />
      <circle cx="12" cy="4" r="1.5" fill={color} />
      <circle cx="18" cy="8" r="1.5" fill={color} />
    </svg>
  );
}
