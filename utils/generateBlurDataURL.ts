import { encode } from 'blurhash';
import axios from 'axios';

async function getImageData(imageUrl: string): Promise<{ width: number; height: number; data: Uint8ClampedArray }> {
  const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  const buffer = Buffer.from(response.data, 'binary');

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = `data:image/jpeg;base64,${buffer.toString('base64')}`;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas context not available'));
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      resolve({ width: img.width, height: img.height, data: imageData.data });
    };
    img.onerror = (err) => reject(err);
  });
}

export async function generateBlurDataURL(imageUrl: string): Promise<string> {
  try {
    const { width, height, data } = await getImageData(imageUrl);
    const blurhash = encode(data, width, height, 4, 4);
    return blurhash;
  } catch (error) {
    console.error('Error generating blur data URL:', error);
    return '';
  }
}
