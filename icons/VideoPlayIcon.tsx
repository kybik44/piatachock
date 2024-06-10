import { FC } from "react";

const VideoPlayIcon: FC<any> = ({ className, ...props }) => (
  <svg
    style={{ ...className }}
    width="200"
    height="200"
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="100" cy="100" r="99" stroke="white" strokeWidth="2" />
    <path d="M149 100L74 143.301V56.6987L149 100Z" fill="white" />
  </svg>
);

export default VideoPlayIcon;
