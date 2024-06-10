import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Breadcrumbs.module.css";
import { TRANSLATIONS } from "/utils/constants";

interface BreadcrumbsProps {
  categoryName?: string;
}

const translatePathname = (pathname: string) => {
  return TRANSLATIONS[pathname] || pathname.replace(/-/g, " ");
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ categoryName }) => {
  const router = useRouter();
  const pathnames = router.pathname.split("/").filter((x) => x);

  return (
    <nav className={styles.breadcrumbs}>
      <Link href="/">{TRANSLATIONS.main || "Главная"}</Link>
      {pathnames.map((value, index) => {
        const isLast = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const translatedValue = translatePathname(value);

        if (isLast && categoryName) {
          return (
            <span key={to}>
              <span className={styles.separator}> &gt; </span>
              <Link href="/catalog">{TRANSLATIONS.catalog || "Каталог"}</Link>
              <span className={styles.separator}> &gt; </span>
              <span className={styles.active}>{categoryName}</span>
            </span>
          );
        }

        return (
          <span key={to}>
            <span className={styles.separator}> &gt; </span>
            {isLast ? (
              <span className={styles.active}>{translatedValue}</span>
            ) : (
              <Link href={to}>{translatedValue}</Link>
            )}
          </span>
        );
      })}
      {!pathnames.length && (
        <span>
          <span className={styles.separator}> &gt; </span>
          <Link href="/catalog">{TRANSLATIONS.catalog || "Каталог"}</Link>
          {categoryName && (
            <>
              <span className={styles.separator}> &gt; </span>
              <span className={styles.active}>{categoryName}</span>
            </>
          )}
        </span>
      )}
    </nav>
  );
};

export default Breadcrumbs;
