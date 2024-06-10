import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import BurgerButton from "/components/atoms/BurgerButton/BurgerButton";
import Logo from "/components/atoms/Logo/Logo";
import CallBlock from "/components/molecules/CallBlock/CallBlock";
import Navigation from "/components/molecules/Navigation/Navigation";
import { useGlobalData } from "/context/GlobalContext";
import useMediaQuery from "/hooks/useMediaQuery";
import { usePopup } from "/context/PopupContext";
import ContactPopup from "/components/molecules/ContactPopup/ContactPopup";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const globalData = useGlobalData();
  const { openPopup } = usePopup();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const isTablet = useMediaQuery("(max-width: 991px)");
  const router = useRouter();
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleRequestClick = () => {
    setIsNavOpen(false);
    openPopup(<ContactPopup />);
  };

  useEffect(() => {
    if (!isTablet) {
      setIsNavOpen(false);
    }
  }, [isTablet]);

  useEffect(() => {
    setIsNavOpen(false);
  }, [router]);

  const phoneNumber = globalData.firstPhone || "+375 (29) 643-15-97";

  return (
    <header className={styles.header}>
      <Logo className={styles.logo} logoUrl={globalData.logoUrl || ""} />
      <div className={`${styles.mobMenu} ${isNavOpen ? styles.open : ""}`}>
        {isTablet && (
          <div className={styles.burgerHeader}>
            <Logo className={styles.logo} logoUrl={globalData.logoUrl || ""} />
            <BurgerButton onClick={toggleNav} isOpen={isNavOpen} />
          </div>
        )}
        <Navigation isNavOpen={isNavOpen} />
        {isTablet && (
          <CallBlock
            phoneNumber={phoneNumber}
            phoneClassName={styles.phone}
            onRequestClick={handleRequestClick}
          />
        )}
      </div>
      {!isNavOpen && <BurgerButton onClick={toggleNav} isOpen={isNavOpen} />}
      {!isTablet && <CallBlock phoneNumber={phoneNumber} />}
    </header>
  );
};

export default Header;
