import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { memo, useMemo } from "react";
import {
  IFaqData,
  IHeadData,
  IReviewData,
  ITermsData,
  TextResponse,
  fetchFaq,
  fetchMainPage,
  fetchReviews,
  fetchWholesalePage,
} from "/api/wordpressApi";
import SeoHead from "/components/molecules/SeoHead/SeoHead";
import { PageTypes } from "/components/organisms/Head/Head";

const ContactForm = dynamic(
  () => import("/components/organisms/ContactForm/ContactForm"),
  { ssr: false }
);
const Faq = dynamic(() => import("/components/organisms/Faq/Faq"), {
  ssr: false,
});
const PageHead = dynamic(() => import("/components/organisms/Head/Head"), {
  ssr: false,
});
const Reviews = dynamic(() => import("/components/organisms/Reviews/Reviews"), {
  ssr: false,
});
const Terms = dynamic(() => import("/components/organisms/Terms/Terms"), {
  ssr: false,
});

interface WholesalePageProps {
  headData: IHeadData | null;
  termsData: ITermsData | null;
  reviews: IReviewData[];
  faqData: IFaqData | null;
  contactData: TextResponse | null;
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const [wholesaleData, mainPageData, faqItemsList, reviewsList] =
      await Promise.all([
        fetchWholesalePage(),
        fetchMainPage(),
        fetchFaq(),
        fetchReviews(),
      ]);

    const headSection = wholesaleData.find((item) => item.slug === "header");
    const termsSection = wholesaleData.find(
      (item) => item.slug === "terms_of_cooperation"
    );
    const faqSection = mainPageData.find((item) => item.slug === "faq") || null;
    const contactSection =
      mainPageData.find((item) => item.slug === "footer") || null;

    const faqItems = faqItemsList.map((item: any) => ({
      question: item.acf.question,
      answer: item.acf.answer,
    }));

    const termsData = termsSection
      ? {
          title: termsSection.name,
          text: termsSection.acf.text,
          photo: termsSection.acf.photo_1,
        }
      : null;

    const headData = headSection
      ? {
          title: headSection.name,
          content: headSection.acf.text,
          photo_1: headSection.acf.photo_1,
          description: headSection.description,
        }
      : null;

    return {
      props: {
        headData,
        termsData,
        reviews: reviewsList,
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
        termsData: null,
        reviews: [],
        faqData: null,
        contactData: null,
      },
    };
  }
};

const WholesalePage = memo(
  ({
    headData,
    termsData,
    reviews,
    faqData,
    contactData,
  }: WholesalePageProps) => {
    const memoizedReviews = useMemo(
      () =>
        reviews.map((review) => ({
          author: review.acf.author,
          feedback: review.acf.feedback,
        })),
      [reviews]
    );
    return (
      <>
        <SeoHead headData={headData} />
        {headData && (
          <PageHead pageType={PageTypes.WHOLESALE} mainHeadData={headData} />
        )}
        {termsData && <Terms termsData={termsData} />}
        <Reviews reviews={memoizedReviews} />
        {faqData && <Faq faqData={faqData} />}
        {contactData && <ContactForm contactData={contactData} />}
      </>
    );
  }
);

WholesalePage.displayName = "WholesalePage";

export default WholesalePage;
