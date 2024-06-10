import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  FC,
} from "react";
import { useRouter } from "next/router";

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
      {isOpen && <div>{content}</div>}
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
