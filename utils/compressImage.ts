import imageCompression from 'browser-image-compression';

type Options = {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  useWebWorker?: boolean;
};

export async function compressImage(file: File, customOptions: Options = {}) {
  const options: Options = {
    maxSizeMB: 5,
    maxWidthOrHeight: 1200,
    useWebWorker: true,
    ...customOptions,
  };
  const compressedFile = await imageCompression(file, options);
  return new File([compressedFile], file.name, { type: file.type });
}
