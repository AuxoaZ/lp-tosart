"use client";

import React, { useState, useRef, useEffect } from "react";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string;
}

export default function LazyImage({
  src,
  alt,
  className = "",
  wrapperClassName = "",
  ...props
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, [src]);

  return (
    <div className={`relative w-full overflow-hidden flex items-center justify-center ${wrapperClassName}`}>
      {/* Loading Skeleton */}
      {!loaded && (
        <div className="absolute inset-0 bg-white/5 animate-pulse z-0" />
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`relative z-10 transition-all duration-1000 ease-out ${
          loaded 
            ? "opacity-100 scale-100 blur-0" 
            : "opacity-0 scale-[0.98] blur-md"
        } ${className}`}
        {...props}
      />
    </div>
  );
}
