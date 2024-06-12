import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

interface ImageContextType {
  loadedImages: Map<string, string>;
  preloadedImages: Set<string>;
  addImage: (url: string) => void;
  preloadImage: (url: string) => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loadedImages, setLoadedImages] = useState<Map<string, string>>(
    new Map()
  );
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(
    new Set()
  );

  const addImage = useCallback((url: string) => {
    setLoadedImages((prev) => {
      if (prev.has(url)) {
        return prev;
      }
      const newMap = new Map(prev);
      newMap.set(url, url);
      return newMap;
    });
  }, []);

  const preloadImage = useCallback((url: string) => {
    setPreloadedImages((prev) => {
      if (prev.has(url)) {
        return prev;
      }
      const img = new Image();
      img.src = url;
      const newSet = new Set(prev);
      newSet.add(url);
      return newSet;
    });
  }, []);

  return (
    <ImageContext.Provider
      value={{ loadedImages, preloadedImages, addImage, preloadImage }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = (): ImageContextType => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImageContext must be used within an ImageProvider");
  }
  return context;
};
