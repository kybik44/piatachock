import React from "react";
import styles from "./Navigation.module.css";
import useMediaQuery from "/hooks/useMediaQuery";
import NavItem from "/components/molecules/NavItem/NavItem";

interface INavigationProps {
  isFooter?: boolean;
  isNavOpen?: boolean;
}
const Navigation: React.FC<INavigationProps> = ({
  isFooter = false,
  isNavOpen = false,
}) => {
  const isTablet = useMediaQuery("(max-width: 991px)");

  const navItems = [
    { label: "Главная", to: "/" },
    { label: "Каталог", to: "/catalog" },
    { label: "Фирменная торговля", to: "/market" },
    { label: "Оптовая торговля", to: "/wholesale" },
    { label: "Контакты", to: "/contacts" },
  ];

  const shouldShowNavigation = !isFooter || (isFooter && !isTablet);

  if (!shouldShowNavigation) return null;

  return (
    <nav
      className={`${styles.navigation} ${isNavOpen && styles.navOpen} ${
        isFooter && styles.footerNavigation
      }`}
    >
      {navItems.map((item, index) => (
        <NavItem
          key={index}
          label={item.label}
          to={item.to}
          isFooter={isFooter && isFooter}
        />
      ))}
    </nav>
  );
};

export default Navigation;
