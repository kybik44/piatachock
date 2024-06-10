import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { fetchMainPage } from "/api/wordpressApi";
import Loading from "/components/atoms/Loading/Loading";

interface GlobalData {
  requisites: string;
  links: { href: string; text: string }[];
  firstPhone: string;
  secondPhone: string;
  logoUrl: string;
}

const GlobalContext = createContext<GlobalData | null>(null);
export const useGlobalData = () => {
  const context = useContext(GlobalContext);
  if (context === null) {
    throw new Error("useGlobalData must be used within a GlobalProvider");
  }
  return context;
};

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [globalData, setGlobalData] = useState<GlobalData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const mainPageData = await fetchMainPage();
      const data = mainPageData.find(
        (item: any) => item.slug === "footer"
      )?.acf;

      const globalData = data
        ? {
            requisites: data.requisites,
            links: [
              { href: "#", text: "договор публичной оферты" },
              { href: "#", text: "политика конфиденциальности" },
            ],
            firstPhone: data.phone_1 || "",
            secondPhone: data.phone_2 || "",
            logoUrl: data.photo_1,
          }
        : {
            requisites: "",
            links: [],
            firstPhone: "",
            secondPhone: "",
            logoUrl: "",
          };

      setGlobalData(globalData);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loader">
        <Loading />
      </div>
    );
  }

  return (
    <GlobalContext.Provider value={globalData}>
      {children}
    </GlobalContext.Provider>
  );
};
