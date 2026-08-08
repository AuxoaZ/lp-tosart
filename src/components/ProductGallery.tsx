"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

interface ProductGalleryProps {
  title: string;
  images: string[];
  isSubpage?: boolean;
  layout?: "grid" | "masonry";
  cols?: 3 | 4 | 5 | 6;
}

export default function ProductGallery({
  title,
  images,
  isSubpage = true,
  layout = "grid",
  cols = 6,
}: ProductGalleryProps) {
  const gridColsClass = {
    3: "grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5",
    6: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
  }[cols];
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Handle scroll to update active pagination index on mobile
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      if (clientWidth > 0) {
        const index = Math.round(scrollLeft / clientWidth);
        setActiveIndex(index);
      }
    }
  };

  // Scroll to a specific page on mobile
  const scrollToPage = (pageIndex: number) => {
    if (scrollRef.current) {
      const clientWidth = scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({
        left: pageIndex * clientWidth,
        behavior: "smooth",
      });
      setActiveIndex(pageIndex);
    }
  };

  // Modal navigation controls
  const handlePrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveModalIndex((prev) =>
      prev !== null ? (prev === 0 ? images.length - 1 : prev - 1) : null,
    );
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveModalIndex((prev) =>
      prev !== null ? (prev === images.length - 1 ? 0 : prev + 1) : null,
    );
  };

  // Handle modal keyboard controls (Esc, ArrowLeft, ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeModalIndex === null) return;
      if (e.key === "Escape") {
        setActiveModalIndex(null);
      } else if (e.key === "ArrowLeft") {
        handlePrevImage();
      } else if (e.key === "ArrowRight") {
        handleNextImage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalIndex]);

  // Disable body scroll when modal is active
  useEffect(() => {
    if (activeModalIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeModalIndex]);

  // Total pages for mobile (dynamic based on images length, 4 items per page in 2x2 grid)
  const totalPages = Math.ceil(images.length / 4);

  if (isSubpage) {
    return (
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none animate-fade-in-up">
        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-syne font-bold tracking-tight text-white mb-8 pl-1">
          {title}
        </h2>

        {/* Single Unified Container with transparent blur background */}
        <div className="bg-base-300/50 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 sm:p-10 lg:p-12 shadow-2xl">
          {layout === "masonry" ? (
            <div className="columns-2 md:columns-3 gap-6 lg:gap-8">
              {images.map((src, idx) => (
                <div
                  key={idx}
                  className="break-inside-avoid mb-6 flex items-center justify-center"
                >
                  <img
                    src={src}
                    alt={`${title} Item ${idx + 1}`}
                    className="w-full h-auto rounded-[1.25rem] sm:rounded-lg object-contain hover:scale-[1.03] active:scale-98 transition-all duration-300 cursor-pointer shadow-md"
                    onClick={() => setActiveModalIndex(idx)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className={`grid ${gridColsClass} gap-6 sm:gap-8 items-center justify-items-center`}>
              {images.map((src, idx) => (
                <div
                  key={idx}
                  className="relative w-full flex items-center justify-center"
                >
                  <img
                    src={src}
                    alt={`${title} Item ${idx + 1}`}
                    className="w-full h-auto object-contain max-h-[280px] hover:scale-[1.05] active:scale-95 transition-all duration-300 cursor-pointer"
                    onClick={() => setActiveModalIndex(idx)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Fullscreen Lightbox Modal */}
        {activeModalIndex !== null && (
          <div
            onClick={() => setActiveModalIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in"
          >
            {/* Close button */}
            <button
              onClick={() => setActiveModalIndex(null)}
              className="absolute top-6 right-6 z-50 btn btn-circle btn-ghost text-white/70 hover:text-white hover:bg-white/10"
              aria-label="Close modal"
            >
              <FiX className="w-8 h-8" />
            </button>

            {/* Modal Container */}
            <div className="relative flex items-center justify-center w-full max-w-4xl">
              {/* Prev navigation button */}
              <button
                onClick={handlePrevImage}
                className="absolute left-2 sm:left-4 z-45 btn btn-circle bg-black/50 border border-white/10 text-white hover:bg-primary hover:border-primary backdrop-blur-md shadow-lg"
                aria-label="Previous image"
              >
                <FiChevronLeft className="w-6 h-6" />
              </button>

              {/* Image Card Container */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 w-[90vw] max-w-[500px] aspect-square relative flex items-center justify-center shadow-2xl border border-white/20 select-none"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={images[activeModalIndex]}
                    alt={`${title} Detailed View`}
                    fill
                    sizes="(max-width: 768px) 90vw, 500px"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Next navigation button */}
              <button
                onClick={handleNextImage}
                className="absolute right-2 sm:right-4 z-45 btn btn-circle bg-black/50 border border-white/10 text-white hover:bg-primary hover:border-primary backdrop-blur-md shadow-lg"
                aria-label="Next image"
              >
                <FiChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom indicator */}
            <div className="absolute bottom-6 text-white/50 text-sm font-medium tracking-widest">
              {activeModalIndex + 1} / {images.length}
            </div>
          </div>
        )}
      </section>
    );
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none animate-fade-in-up">
      {/* Title */}
      <h2 className="text-3xl md:text-5xl font-syne font-bold tracking-tight text-white mb-8 pl-1">
        {title}
      </h2>

      {/* Mobile View: 2 rows x 2 columns sliding grid */}
      <div className="block md:hidden">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="grid grid-rows-2 grid-flow-col gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-6 px-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {images.map((src, idx) => (
            <div
              key={idx}
              onClick={() => setActiveModalIndex(idx)}
              className="w-[calc((100vw-3rem)/2)] snap-start aspect-square bg-[#f8fafc] border border-white/5 rounded-2xl flex items-center justify-center p-3 relative shadow-md active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <div className="relative w-full h-full">
                <Image
                  src={src}
                  alt={`${title} Item ${idx + 1}`}
                  fill
                  sizes="50vw"
                  className="object-contain p-2"
                  priority={idx < 4}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Pagination Dots */}
        <div className="flex justify-center gap-2.5 mt-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToPage(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? "w-8 bg-primary"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to page ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop View: Fixed 2 rows x 6 columns grid (responsive wraps) */}
      <div className="hidden md:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {images.map((src, idx) => (
          <div
            key={idx}
            onClick={() => setActiveModalIndex(idx)}
            className="aspect-square bg-[#f8fafc] border border-white/5 rounded-2xl flex items-center justify-center p-4 relative shadow-md hover:scale-[1.03] hover:shadow-xl hover:shadow-primary/5 active:scale-98 transition-all duration-300 cursor-pointer group overflow-hidden"
          >
            {/* Interactive hover glow */}
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-300">
              <Image
                src={src}
                alt={`${title} Item ${idx + 1}`}
                fill
                sizes="16vw"
                className="object-contain p-2"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeModalIndex !== null && (
        <div
          onClick={() => setActiveModalIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in"
        >
          {/* Close button */}
          <button
            onClick={() => setActiveModalIndex(null)}
            className="absolute top-6 right-6 z-50 btn btn-circle btn-ghost text-white/70 hover:text-white hover:bg-white/10"
            aria-label="Close modal"
          >
            <FiX className="w-8 h-8" />
          </button>

          {/* Modal Container */}
          <div className="relative flex items-center justify-center w-full max-w-4xl">
            {/* Prev navigation button */}
            <button
              onClick={handlePrevImage}
              className="absolute left-2 sm:left-4 z-45 btn btn-circle bg-black/50 border border-white/10 text-white hover:bg-primary hover:border-primary backdrop-blur-md shadow-lg"
              aria-label="Previous image"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>

            {/* Image Card Container */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 w-[90vw] max-w-[500px] aspect-square relative flex items-center justify-center shadow-2xl border border-white/20 select-none"
            >
              <div className="relative w-full h-full">
                <Image
                  src={images[activeModalIndex]}
                  alt={`${title} Detailed View`}
                  fill
                  sizes="(max-width: 768px) 90vw, 500px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Next navigation button */}
            <button
              onClick={handleNextImage}
              className="absolute right-2 sm:right-4 z-45 btn btn-circle bg-black/50 border border-white/10 text-white hover:bg-primary hover:border-primary backdrop-blur-md shadow-lg"
              aria-label="Next image"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom indicator */}
          <div className="absolute bottom-6 text-white/50 text-sm font-medium tracking-widest">
            {activeModalIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </section>
  );
}
