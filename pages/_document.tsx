import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ru">
        <Head>
          {/* Подключение шрифтов и иконок */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/assets/images/logo.ico" />
          <meta name="title" content="Мясной магазин 'Пятачок'" />
          <meta
            name="description"
            content="Мясной магазин 'Пятачок' предлагает колбасы, шашлыки, мясо и сало оптом и в розницу. Свежие мясные продукты онлайн на piatachok.by."
          />
          <meta
            name="keywords"
            content="мясной магазин, купить мясо, свежая говядина, свежая свинина, колбасы оптом, колбасы в розницу, шашлыки, сало, фермерское мясо, копченое мясо, мясные деликатесы, мясные продукты, мясо на заказ, мясо высокого качества, мясо с фермы, мясо с доставкой, оптовая продажа мяса, мясные изделия, домашняя колбаса, колбасные изделия, свежие колбасы, мясные полуфабрикаты, натуральное мясо, магазин колбас, мясные полуфабрикаты, мясной ассортимент, мясные закуски, говядина оптом, свинина оптом, сало оптом, купить шашлыки, шашлыки с доставкой, мясо онлайн, купить мясо онлайн, мясной магазин в Минске, мясо высокого качества, мясо оптом с доставкой, мясные продукты Минск, мясной деликатес, свежие шашлыки, мясные продукты с фермы, лучшие колбасы, свежие мясные изделия, купить мясо с доставкой, заказать мясо оптом, мясные продукты оптом, натуральные колбасы, мясные рулеты, свежие сосиски, мясо на гриле, лучшие колбасы оптом, фермерская говядина, фермерская свинина, мясные блюда, натуральное сало, мясные товары, натуральные мясные продукты, лучшие мясные изделия, копченые колбасы, копченые деликатесы"
          />
          <meta
            property="og:title"
            content="Пятачок | Мясной магазин: колбасы, шашлыки, мясо, сало"
          />
          <meta
            property="og:description"
            content="Магазин 'Пятачок' продает свежие колбасы, шашлыки, мясо и сало. Высокое качество, оптовая и розничная продажа, доставка по Минску."
          />
          <meta
            property="og:image"
            content="https://admin-piatachok.by/wp-content/uploads/2024/06/Logo-1.png"
          />
          <meta property="og:url" content="https://piatachok.by" />
          <meta property="og:type" content="website" />

          {/* Twitter Cards */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Пятачок | Мясной магазин: колбасы, шашлыки, мясо, сало"
          />
          <meta
            name="twitter:description"
            content="Магазин 'Пятачок' продает свежие колбасы, шашлыки, мясо и сало. Высокое качество, оптовая и розничная продажа, доставка по Минску."
          />
          <meta
            name="twitter:image"
            content="https://admin-piatachok.by/wp-content/uploads/2024/06/Logo-1.png"
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
        <body>
          <div className="container">
            <Main />
            <NextScript />
          </div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
