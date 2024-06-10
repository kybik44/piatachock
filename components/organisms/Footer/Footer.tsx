import Link from "next/link";
import React from "react";
import styles from "./Footer.module.css";
import Logo from "/components/atoms/Logo/Logo";
import Text from "/components/atoms/Text/Text";
import CallBlock from "/components/molecules/CallBlock/CallBlock";
import Navigation from "/components/molecules/Navigation/Navigation";
import { useGlobalData } from "/context/GlobalContext";

const Footer: React.FC = () => {
  const globalData = useGlobalData();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Logo className={styles.logo} logoUrl={globalData.logoUrl} />
        <Navigation isFooter />
        <CallBlock
          isFooter
          phoneNumber={globalData.firstPhone || ""}
          phoneClassName={styles.phone}
        />
      </div>
      <div className={styles.divider} />
      <div className={styles.bottomContainer}>
        <Text variant="body2" className={styles.companyInfo} multiline>
          {globalData.requisites || ""}
        </Text>
        <div className={styles.links}>
          {globalData.links?.map((link, index) => (
            <Link key={index} href={link.href} className={styles.link}>
              <Text variant="body2">{link.text}</Text>
            </Link>
          ))}
        </div>
        <Text variant="body2" className={styles.copyRight}>
          2024
        </Text>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
