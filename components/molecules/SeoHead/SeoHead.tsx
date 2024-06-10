import Head from "next/head";
import { IHeadData } from "/api/wordpressApi";
import { FC } from "react";
interface SeoHeadProps {
  headData: IHeadData | null;
}
const SeoHead: FC<SeoHeadProps> = ({ headData }) => {
  return (
    <Head>
      <title>{headData?.title || "Пятачок"}</title>
      <meta name="description" content={headData?.description || ""} />
      <meta
        name="keywords"
        content="пятачок, лучшие продукты, оптовая торговля, контакты, мясо, колбасы, мясные чипсы, мясной магазин"
      />
      <meta property="og:title" content={headData?.title || "Пятачок"} />
      <meta name="title" content="Мясной магазин 'Пятачок'" />
      <meta
        property="og:description"
        content={
          headData?.description ||
          "Мясной магазин 'Пятачок' предлагает колбасы, шашлыки, мясо и сало оптом и в розницу. Купите свежие мясные продукты онлайн на piatachok.by."
        }
      />
      <meta
        property="og:image"
        content={headData?.photo_1 || "/default-image.jpg"}
      />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={headData?.title || "Пятачок"} />
      <meta
        name="twitter:description"
        content={headData?.description || "Описание"}
      />
      <meta
        name="twitter:image"
        content={headData?.photo_1 || "/default-image.jpg"}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "http://schema.org",
            "@type": "Store",
            name: "Пятачок Мясной Магазин",
            url: "https://piatachok.by",
            logo: "https://admin-piatachok.by/wp-content/uploads/2024/06/Logo-1.png",
            image:
              "https://admin-piatachok.by/wp-content/uploads/2024/06/Logo-1.png",
            description:
              "Магазин 'Пятачок' продает свежие колбасы, шашлыки, мясо и сало. Высокое качество, оптовая и розничная продажа, доставка по Минску.",
            address: {
              "@type": "PostalAddress",
              streetAddress:
                "Брестская область, Барановичский район, Новомышский сельсовет, 69",
              addressLocality: "Барановичи, Минск, Слуцк",
              addressRegion: "Брестская область",
              postalCode: "225331",
              addressCountry: "BY",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+375 (29) 163-80-80",
              contactType: "Customer Service",
            },
            sameAs: ["https://www.instagram.com/meat__pyatachok/"],
          }),
        }}
      />
    </Head>
  );
};

export default SeoHead;
