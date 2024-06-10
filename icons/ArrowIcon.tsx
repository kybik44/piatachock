import { FC } from "react";

const ArrowIcon: FC<any> = ({ ...props }) => (
  <svg
    width="20"
    height="11"
    viewBox="0 0 20 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1.9043 9.62891L10.0503 1.35475L18.1963 9.62891"
      stroke="#F6F6F6"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ArrowIcon;
