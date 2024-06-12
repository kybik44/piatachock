import { useEffect } from 'react';
import { useImageContext } from '../context/ImageContext';

const usePreloadImages = (imageUrls: string[]) => {
  const { preloadedImages, preloadImage } = useImageContext();

  useEffect(() => {
    imageUrls.forEach((url) => {
      if (!preloadedImages.has(url)) {
        preloadImage(url);
      }
    });
  }, [imageUrls, preloadedImages, preloadImage]);
};

export default usePreloadImages;
