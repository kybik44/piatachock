import { FC } from "react";

const CloseIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="0.5" y="0.5" width="47" height="47" rx="23.5" stroke="#F6F6F6" />
    <path d="M16 18L31.9879 30.0161" stroke="#1B1B1B" stroke-linecap="round" />
    <path
      d="M31.9883 18L16.0004 30.0161"
      stroke="#1B1B1B"
      stroke-linecap="round"
    />
  </svg>
);

export default CloseIcon;
