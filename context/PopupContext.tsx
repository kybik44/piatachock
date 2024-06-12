import { useRouter } from "next/router";
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import { ImageProvider } from "./ImageContext";

interface PopupContextProps {
  isOpen: boolean;
  openPopup: (component: ReactNode, isLoader?: boolean) => void;
  closePopup: () => void;
  content: ReactNode | null;
  isLoader: boolean;
}

const PopupContext = createContext<PopupContextProps | undefined>(undefined);

export const PopupProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode | null>(null);
  const [isLoader, setIsLoader] = useState(false);
  const router = useRouter();

  const openPopup = (component: ReactNode, isLoader: boolean = false) => {
    setContent(component);
    setIsLoader(isLoader);
    setIsOpen(true);
  };

  const closePopup = () => {
    setContent(null);
    setIsOpen(false);
    setIsLoader(false);
    const query = { ...router.query };
    delete query.product;
    router.push(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <PopupContext.Provider
      value={{ isOpen, openPopup, closePopup, content, isLoader }}
    >
      {children}
      {isOpen && (
        <ImageProvider> {/* Wrap the content with ImageProvider */}
          <div>{content}</div>
        </ImageProvider>
      )}
    </PopupContext.Provider>
  );
};

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopup must be used within a PopupProvider");
  }
  return context;
};
