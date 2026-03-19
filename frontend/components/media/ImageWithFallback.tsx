"use client";

import { useState } from "react";

type ImageWithFallbackProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string;
};

const DEFAULT_FALLBACK =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80";

export function ImageWithFallback({
  alt,
  src,
  fallbackSrc = DEFAULT_FALLBACK,
  onError,
  ...props
}: ImageWithFallbackProps) {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <img
      {...props}
      alt={alt}
      src={imageSrc}
      onError={(event) => {
        setImageSrc(fallbackSrc);
        onError?.(event);
      }}
    />
  );
}
