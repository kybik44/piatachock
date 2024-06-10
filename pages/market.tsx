import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { memo, useCallback, useRef, useState } from "react";
import {
  IHeadData,
  IShopsItem,
  TextResponse,
  fetchMainPage,
  fetchMarketPage,
  fetchShops,
} from "/api/wordpressApi";
import SeoHead from "/components/molecules/SeoHead/SeoHead";
import ContactForm from "/components/organisms/ContactForm/ContactForm";
import PageHead, { PageTypes } from "/components/organisms/Head/Head";

const MapY = dynamic(() => import("/components/organisms/Map/Map"), {
  ssr: false,
});
const Shops = dynamic(() => import("/components/organisms/Shops/Shops"), {
  ssr: false,
});

interface MarketPageProps {
  headData: IHeadData;
  shopsData: IShopsItem[];
  contactData: TextResponse | null;
  cityCoordinates: Record<string, [number, number]>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const [mainPageData, shopsItemsList, headSection] = await Promise.all([
      fetchMainPage(),
      fetchShops(),
      fetchMarketPage(),
    ]);

    const contactSection =
      mainPageData.find((item) => item.slug === "footer") || null;

    const headData =
      headSection.length > 0
        ? {
            title: headSection[0]?.name,
            content: headSection[0]?.acf.text,
            photo_1: headSection[0]?.acf.photo_1,
            description: headSection[0]?.description,
          }
        : null;

    const cityCoordinates = shopsItemsList.reduce(
      (acc: Record<string, [number, number]>, shop) => {
        if (!acc[shop.acf.city]) {
          const [lat, lon] = shop.acf.coordinates.split(",").map(Number);
          acc[shop.acf.city] = [lat, lon];
        }
        return acc;
      },
      {}
    );

    return {
      props: {
        headData,
        shopsData: shopsItemsList,
        contactData: contactSection,
        cityCoordinates,
      },
    };
  } catch (error) {
    return {
      props: {
        headData: null,
        shopsData: [],
        contactData: null,
        cityCoordinates: {},
      },
    };
  }
};

const MarketPage = memo(
  ({ headData, shopsData, contactData, cityCoordinates }: MarketPageProps) => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const [selectedShopCoordinates, setSelectedShopCoordinates] = useState<
      [number, number] | undefined
    >(undefined);
    const [selectedCity, setSelectedCity] = useState<string>("Минск");

    const handleShopSelect = useCallback(
      (coordinates: [number, number], city: string) => {
        setSelectedShopCoordinates(coordinates);
        setSelectedCity(city);
        mapRef.current?.scrollIntoView({ behavior: "smooth" });
      },
      []
    );

    const handleCityChange = useCallback((city: string) => {
      setSelectedCity(city);
      setSelectedShopCoordinates(undefined);
    }, []);

    return (
      <>
        <SeoHead headData={headData} />
        <PageHead pageType={PageTypes.MARKET} mainHeadData={headData} />
        <Shops shopsData={shopsData} onShopSelect={handleShopSelect} />
        <div ref={mapRef}>
          <MapY
            mapData={shopsData}
            selectedShopCoordinates={selectedShopCoordinates}
            onCityChange={handleCityChange}
            selectedCity={selectedCity}
            cityCoordinates={cityCoordinates}
          />
        </div>
        <ContactForm contactData={contactData} />
      </>
    );
  }
);

MarketPage.displayName = "MarketPage";

export default MarketPage;
