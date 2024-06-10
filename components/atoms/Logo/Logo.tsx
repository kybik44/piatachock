import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./Logo.module.css";

import LogoImage from "public/assets/images/logo.png";

interface LogoProps {
  className: string;
  logoUrl: string;
}

const Logo: React.FC<LogoProps> = ({ className, logoUrl }) => {
  return (
    <Link href="/" passHref className={`${styles.logo} ${className}`}>
      <Image
        src={logoUrl || LogoImage}
        alt="Logo"
        width={100}
        height={100}
        layout="responsive"
        objectFit="contain"
      />
    </Link>
  );
};

export default Logo;
