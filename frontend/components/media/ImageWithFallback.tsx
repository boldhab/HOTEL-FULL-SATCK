"use client";

import type { ComponentProps } from "react";
import { useState, useEffect } from "react";

type ImageWithFallbackProps = ComponentProps<"img"> & {
  fallbackSrc?: string;
  priority?: boolean;
};

const DEFAULT_FALLBACK =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80";

export function ImageWithFallback({
  alt,
  src,
  fallbackSrc = DEFAULT_FALLBACK,
  onError,
  priority = false,
  loading,
  ...props
}: ImageWithFallbackProps) {
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  return (
    <img
      {...props}
      alt={alt}
      src={imageSrc}
      loading={priority ? "eager" : loading}
      fetchPriority={priority ? "high" : props.fetchPriority}
      onError={(event) => {
        if (imageSrc !== fallbackSrc) {
          setImageSrc(fallbackSrc);
        }
        onError?.(event);
      }}
    />
  );
}
