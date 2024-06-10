import { FC } from "react";

const VideoPauseIcon: FC<any> = ({ className, ...props }) => (
  <svg
    className={className}
    width="200"
    height="200"
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="100" cy="100" r="99" stroke="white" strokeWidth="2" />
    <rect x="64" y="55" width="24" height="90" fill="white" />
    <rect x="113" y="55" width="24" height="90" fill="white" />
  </svg>
);

export default VideoPauseIcon;
