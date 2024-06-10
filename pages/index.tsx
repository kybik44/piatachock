import { GetServerSideProps } from "next";
import Head from "next/head";
import { memo, useMemo } from "react";
import dynamic from "next/dynamic";
import {
  IAboutData,
  IBestSellersData,
  IFaqData,
  IHaveData,
  IHeadData,
  IManagersData,
  IMobileAppData,
  IWholesaleData,
  TextResponse,
  fetchFaq,
  fetchMainPage,
  fetchProductsByIdCategory,
} from "/api/wordpressApi";
import { PageTypes } from "/components/organisms/Head/Head";
import SeoHead from "/components/molecules/SeoHead/SeoHead";

const About = dynamic(() => import("/components/organisms/About/About"), {
  ssr: false,
});
const BestSellers = dynamic(
  () => import("/components/organisms/Bestsellers/Bestsellers"),
  { ssr: false }
);
const ContactForm = dynamic(
  () => import("/components/organisms/ContactForm/ContactForm"),
  { ssr: false }
);
const Faq = dynamic(() => import("/components/organisms/Faq/Faq"), {
  ssr: false,
});
const Have = dynamic(() => import("/components/organisms/Have/Have"), {
  ssr: false,
});
const PageHead = dynamic(() => import("/components/organisms/Head/Head"), {
  ssr: false,
});
const Managers = dynamic(
  () => import("/components/organisms/Managers/Managers"),
  { ssr: false }
);
const MobileApp = dynamic(
  () => import("/components/organisms/MobileApp/MobileApp"),
  { ssr: false }
);
const VideoPlayer = dynamic(
  () => import("/components/organisms/VideoPlayer/VideoPlayer"),
  { ssr: false }
);
const Wholesale = dynamic(
  () => import("/components/organisms/Wholesale/Wholesale"),
  { ssr: false }
);

interface MainPageProps {
  headData: IHeadData | null;
  aboutData: IAboutData | null;
  haveData: IHaveData | null;
  managersData: IManagersData | null;
  bestSellersData: IBestSellersData | null;
  wholesaleData: IWholesaleData | null;
  mobileAppData: IMobileAppData | null;
  faqData: IFaqData | null;
  contactData: TextResponse | null;
}

const extractSectionData = (section: any, defaultImage: string = "") => ({
  title: section?.name || "",
  text: section?.acf?.text || "",
  photo1: section?.acf?.photo_1 || defaultImage,
  photo2: section?.acf?.photo_2 || defaultImage,
  items: section?.acf?.blocks
    ? Object.values(section.acf.blocks).map((block: any) => ({
        title: block.name,
        text: block.description,
      }))
    : [],
  managers: section?.acf?.managers
    ? Object.values(section.acf.managers).map((manager: any) => ({
        position: manager.title,
        name: manager.name,
        image: manager.photo,
      }))
    : [],
});

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const [mainPageData, faqItemsList, bestSellersItems] = await Promise.all([
      fetchMainPage(),
      fetchFaq(),
      fetchProductsByIdCategory(29, 1),
    ]);

    const aboutSection = mainPageData.find((item) => item.slug === "we");
    const haveSection = mainPageData.find((item) => item.slug === "about_us");
    const managersSection = mainPageData.find(
      (item) => item.slug === "managment"
    );
    const wholesaleSection = mainPageData.find((item) => item.slug === "opt");
    const mobileAppSection = mainPageData.find(
      (item) => item.slug === "mobile_app"
    );
    const contactSection =
      mainPageData.find((item) => item.slug === "footer") || null;
    const bestSellersSection =
      mainPageData.find((item) => item.slug === "bestsellers") || null;
    const faqSection = mainPageData.find((item) => item.slug === "faq") || null;
    const headSection = mainPageData.find((item) => item.slug === "header");

    const headData = headSection
      ? {
          title: headSection?.acf.text,
          photo_1: headSection?.acf.photo_1,
          blocks: headSection?.acf.blocks
            ? Object.values(headSection.acf.blocks).map((block: any) => ({
                name: block.name,
                description: block.description,
              }))
            : [],
          description: headSection?.acf?.description || "",
        }
      : null;

    const faqItems = faqItemsList.map((item: any) => ({
      question: item.acf.question,
      answer: item.acf.answer,
    }));

    return {
      props: {
        headData,
        aboutData: extractSectionData(aboutSection),
        haveData: extractSectionData(haveSection),
        managersData: extractSectionData(managersSection),
        bestSellersData: {
          title: bestSellersSection?.name || "",
          items: bestSellersItems.products,
        },
        wholesaleData: extractSectionData(wholesaleSection),
        mobileAppData: extractSectionData(mobileAppSection),
        faqData: faqSection
          ? {
              title: faqSection.name,
              items: faqItems,
            }
          : null,
        contactData: contactSection,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        headData: null,
        aboutData: null,
        haveData: null,
        managersData: null,
        bestSellersData: null,
        wholesaleData: null,
        mobileAppData: null,
        faqData: null,
        contactData: null,
      },
    };
  }
};

const MainPage = memo(
  ({
    headData,
    aboutData,
    haveData,
    managersData,
    bestSellersData,
    wholesaleData,
    mobileAppData,
    faqData,
    contactData,
  }: MainPageProps) => {
    const memoizedFaqData = useMemo(() => faqData, [faqData]);
    const memoizedBestSellersData = useMemo(
      () => bestSellersData,
      [bestSellersData]
    );

    return (
      <>
        <SeoHead headData={headData} />
        {headData && (
          <PageHead pageType={PageTypes.MAIN} mainHeadData={headData} />
        )}
        {aboutData && <About aboutData={aboutData} />}
        {haveData && <Have haveData={haveData} />}
        <VideoPlayer />
        {managersData && <Managers managersData={managersData} />}
        {memoizedBestSellersData && (
          <BestSellers bestSellersData={memoizedBestSellersData} />
        )}
        {wholesaleData && <Wholesale wholesaleData={wholesaleData} />}
        {mobileAppData && <MobileApp mobileAppData={mobileAppData} />}
        {memoizedFaqData && <Faq faqData={memoizedFaqData} />}
        {contactData && <ContactForm contactData={contactData} />}
      </>
    );
  }
);

MainPage.displayName = "MainPage";

export default MainPage;
