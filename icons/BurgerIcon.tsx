import { FC } from "react";

const BurgerIcon: FC<any> = ({ className, ...props }) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect
      x="0.5"
      y="0.5"
      width="47"
      height="47"
      rx="23.5"
      stroke="#F6F6F6"
      {...props}
    />
    <path d="M12 14.5H32" stroke="#1B1B1B" strokeLinecap="round" />
    <path d="M19 24.5H39" stroke="#1B1B1B" strokeLinecap="round" />
    <path d="M17 35.5H37" stroke="#1B1B1B" strokeLinecap="round" />
  </svg>
);

export default BurgerIcon;
