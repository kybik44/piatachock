import { useEffect, useRef } from "react";
import Link from "next/link";
import React from "react";
import styles from "./Head.module.css";
import { IHeadData } from "/api/wordpressApi";
import Button from "/components/atoms/Button/Button";
import Text from "/components/atoms/Text/Text";
import Breadcrumbs from "/components/molecules/Breadcrumbs/Breadcrumbs";
import useMediaQuery from "/hooks/useMediaQuery";

export enum PageTypes {
  MAIN = "Main",
  CATALOG = "Catalog",
  WHOLESALE = "Wholesale",
  CONTACTS = "Contacts",
  MARKET = "Market",
}

const CatalogPageData = [
  { label: "Оптовая торговля", to: "/wholesale" },
  { label: "Фирменная торговля", to: "/market" },
];

type PageType = (typeof PageTypes)[keyof typeof PageTypes];

interface IHead {
  pageType: PageType;
  categoryName?: string;
  mainHeadData?: IHeadData;
  headRef?: React.RefObject<HTMLDivElement>;
}

const Head: React.FC<IHead> = ({
  pageType = PageTypes.MAIN,
  categoryName,
  mainHeadData,
  headRef,
}) => {
  const isTablet = useMediaQuery("(max-width: 1280px)");
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isMainPage = pageType === PageTypes.MAIN;
  const isCatalogPage = pageType === PageTypes.CATALOG;
  const isWholesalePage = pageType === PageTypes.WHOLESALE;
  const isContactsPage = pageType === PageTypes.CONTACTS;
  const isMarketPage = pageType === PageTypes.MARKET;
  const isNotMainPage = pageType !== PageTypes.MAIN;

  const renderMainPageContent = () => {
    if (mainHeadData?.blocks) {
      return mainHeadData.blocks.map((block, index) => (
        <div key={index} className={styles.contentItem}>
          <Text variant="h3" className={styles.contentItemValue}>
            {block.name}
          </Text>
          <Text variant="subtitle1" className={styles.contentItemLabel}>
            {block.description}
          </Text>
        </div>
      ));
    }
    return null;
  };

  const renderCatalogPageContent = () => {
    return CatalogPageData.map((link, index) => (
      <Link href={link.to} key={index} className={styles.catalogLinkContainer}>
        <Text
          variant="subtitle2"
          fontWeight={700}
          className={styles.catalogLinkText}
        >
          {link.label}
        </Text>
        <Text
          variant="subtitle2"
          fontWeight={700}
          className={styles.catalogLinkArrows}
        >
          {">>"}
        </Text>
      </Link>
    ));
  };

  const renderWholesaleOrMarketPageContent = () => {
    if (mainHeadData?.content) {
      return (
        <Text variant="subtitle2" color="#1b1b1b" className={styles.headText}>
          {mainHeadData.content}
        </Text>
      );
    }
    return null;
  };

  const backgroundImage =
    mainHeadData?.photo_1 || "/path/to/default/background.jpg";

  const catalogTitle = "Каталог";

  return (
    <>
      {!isTablet ? (
        <section
          ref={headRef}
          className={`
            ${styles.head} 
            ${(isCatalogPage || isContactsPage) && styles.catalogHead} 
            ${(isWholesalePage || isMarketPage) && styles.marketHead}
          `}
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div
            className={`${styles.imageOverlay} ${
              isNotMainPage && styles.otherImageOverlay
            }`}
          >
            <div
              className={`${styles.column} ${
                isNotMainPage && styles.catalogColumn
              }`}
            >
              {!isMainPage && <Breadcrumbs categoryName={categoryName} />}
              <Text
                variant={isMainPage ? "h1" : "h2"}
                className={`${styles.title} ${
                  !isMainPage && styles.otherTitle
                }`}
              >
                {isCatalogPage
                  ? categoryName || catalogTitle
                  : categoryName || mainHeadData?.title}
              </Text>
              {!isContactsPage && (
                <div
                  className={`${styles.content} ${
                    isNotMainPage && styles.catalogContent
                  }`}
                >
                  {isMainPage
                    ? renderMainPageContent()
                    : isCatalogPage
                    ? renderCatalogPageContent()
                    : renderWholesaleOrMarketPageContent()}
                </div>
              )}
            </div>
            {isMainPage && (
              <Link href="/catalog" passHref className={styles.catalogButton}>
                <Button label={"Перейти в каталог"} icon />
              </Link>
            )}
          </div>
        </section>
      ) : (
        <>
          <section
            className={`
              ${styles.head} 
              ${(isCatalogPage || isContactsPage) && styles.catalogHead} 
              ${(isWholesalePage || isMarketPage) && styles.marketHead}
            `}
            style={{ backgroundImage: `url(${backgroundImage})` }}
            ref={headRef}
          >
            <div
              className={`${styles.imageOverlay} ${
                isNotMainPage && styles.otherImageOverlay
              }`}
            >
              {!isMainPage && !isMobile && (
                <Breadcrumbs categoryName={categoryName} />
              )}
              <Text variant="h1" className={styles.title}>
                {isCatalogPage
                  ? categoryName || catalogTitle
                  : categoryName || mainHeadData?.title}
              </Text>
              {isMainPage && (
                <Link href="/catalog" passHref className={styles.catalogButton}>
                  <Button label={"Перейти в каталог"} icon onClick={() => {}} />
                </Link>
              )}
            </div>
          </section>
          {!isContactsPage && !isMarketPage && (
            <section
              className={`${styles.content} ${
                isNotMainPage && styles.catalogContent
              }`}
            >
              {isMainPage
                ? renderMainPageContent()
                : isCatalogPage
                ? renderCatalogPageContent()
                : renderWholesaleOrMarketPageContent()}
            </section>
          )}
        </>
      )}
    </>
  );
};

export default Head;
