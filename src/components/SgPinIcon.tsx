interface SgPinIconProps {
  className?: string;
}

export default function SgPinIcon({ className }: SgPinIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/*
        Compound path: evenodd creates a transparent hole so the icon
        adapts to any background colour without hardcoding fill values.
        Outer shape = clean geometric pin/teardrop
        Inner shape = circular hole at the pin head centre
      */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 2C7.24 2 5 4.24 5 7c0 4.5 5 11 5 11s5-6.5 5-11c0-2.76-2.24-5-5-5z
           M10 4.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
      />
    </svg>
  );
}
