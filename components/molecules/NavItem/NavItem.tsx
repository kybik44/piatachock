import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./NavItem.module.css";
import Text from "/components/atoms/Text/Text";

interface NavItemProps {
  label: string;
  to: string;
  isFooter: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ label, to, isFooter }) => {
  const router = useRouter();
  const isActive = router.pathname === to;

  return (
    <Link href={to} className={styles.navItem} passHref>
      <Text
        variant={isFooter ? "subtitle2" : "headerNav"}
        className={`${styles.navItemText} ${isActive ? styles.active : ""}`}
      >
        {label}
      </Text>
    </Link>
  );
};

export default NavItem;
