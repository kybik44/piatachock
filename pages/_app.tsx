import React from "react";
import { AppProps } from "next/app";
import { GlobalProvider } from "/context/GlobalContext";
import { PopupProvider } from "/context/PopupContext";
import { ThemeProvider } from "/context/ThemeContext";
import "/styles/global.css";
import dynamic from "next/dynamic";
import ScrollToTop from "/components/atoms/ScrollToTop/ScrollToTop";
import { ImageProvider } from "../context/ImageContext";

const Header = dynamic(() => import("/components/organisms/Header/Header"), {
  ssr: false,
});
const Footer = dynamic(() => import("/components/organisms/Footer/Footer"), {
  ssr: false,
});
const Popup = dynamic(() => import("/components/molecules/Popup/Popup"), {
  ssr: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <PopupProvider>
        <GlobalProvider>
          <ImageProvider>
            <Header />
            <Component {...pageProps} />
            <Footer />
            <Popup />
            <ScrollToTop />
          </ImageProvider>
        </GlobalProvider>
      </PopupProvider>
    </ThemeProvider>
  );
}

export default MyApp;
