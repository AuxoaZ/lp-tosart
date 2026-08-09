"use client";

import { useState } from "react";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight, FiArrowRight } from "react-icons/fi";

const staticServicesData = [
  {
    title: "Apparel Design",
    description:
      "T-shirt, hoodie, jersey, and custom apparel design with strong visual direction and production-ready output.",
    image: "/img/apparel-service.png",
    color: "from-blue-600 to-indigo-900",
    path: "/apparel-design?tab=apparel",
  },
  {
    title: "Social Media Design",
    description:
      "Creative content and visual systems tailored for digital branding and audience engagement.",
    image: "/img/social/feed-5.png",
    color: "from-blue-600 to-indigo-900",
    path: "/social-media-design",
  },
  {
    title: "Video Marketing",
    description:
      "Visual editing, motion graphics, and video production to tell your brand story dynamically.",
    image: "/img/service-5.png",
    color: "from-blue-600 to-indigo-900",
    path: "/video-marketing",
  },
  {
    title: "Custom & Accessories",
    description:
      "Creative support for hats, bags, patches, tags, zipper pulls, packaging, and other supporting merchandise.",
    image: "/img/service-accessories.png",
    color: "from-blue-600 to-indigo-900",
    path: "/apparel-design?tab=accessories",
  },
  {
    title: "Logo & Branding",
    description:
      "Brand identity design that builds a recognizable and consistent visual presence.",
    image: "/img/service-3.png",
    color: "from-blue-600 to-indigo-900",
    path: "/apparel-design?tab=logo-brand",
  },
];

export default function ServicesSlider({ data }: { data?: any }) {
  const sectionTitle = data?.title || "Our Services";
  const sectionSubtitle = data?.subtitle || "Comprehensive creative solutions to elevate your brand and apparel line";

  const mergedServices = staticServicesData.map((service, idx) => {
    const dbItem = data?.items?.[idx];
    return {
      ...service,
      title: dbItem?.title || service.title,
      description: dbItem?.description || service.description,
    };
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % mergedServices.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? mergedServices.length - 1 : prev - 1));
  };

  const currentService = mergedServices[currentIndex];

  return (
    <section
      id="service"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in-up"
    >
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-syne font-bold uppercase tracking-wide mb-4">
          {sectionTitle}
        </h2>
        <p className="text-base-content/70">
          {sectionSubtitle}
        </p>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {mergedServices.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "w-8 bg-primary"
                  : "w-2 bg-base-content/20"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Interactive Slider Container */}
      <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0 mt-12">
        {/* Navigation Buttons (Absolute on desktop, relative on mobile) */}
        <div className="hidden lg:flex absolute inset-y-0 -left-4 -right-4 justify-between items-center z-20 pointer-events-none">
          <button
            onClick={prevSlide}
            className="btn btn-circle btn-sm bg-base-100/50 border-white/10 text-white hover:bg-primary pointer-events-auto backdrop-blur-md"
          >
            <FiChevronLeft className="w-7 h-7" />
          </button>
          <button
            onClick={nextSlide}
            className="btn btn-circle btn-sm bg-base-100/50 border-white/10 text-white hover:bg-primary pointer-events-auto backdrop-blur-md"
          >
            <FiChevronRight className="w-7 h-7" />
          </button>
        </div>

        {/* Left Side: Visual Card */}
        <div className="w-full lg:w-1/2 aspect-4/5 max-w-125 relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 z-10">
          <img
            src={currentService.image}
            alt={currentService.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
            loading="lazy"
          />
          {/* Overlay Text on Image */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent z-20 flex flex-col justify-end p-8">
            <h3 className="text-2xl md:text-3xl font-syne font-black text-white italic uppercase leading-none">
              {currentService.title.split(" ")[0]} <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-white/50">
                {currentService.title.split(" ").slice(1).join(" ")}
              </span>
            </h3>
          </div>

          {/* Mobile Navigation Buttons (Overlaying image in the center, transparent) */}
          <div className="absolute inset-y-0 left-3 right-3 flex justify-between items-center z-30 lg:hidden pointer-events-none">
            <button
              onClick={prevSlide}
              className="btn btn-circle btn-sm bg-black/40 border border-white/10 text-white hover:bg-primary pointer-events-auto backdrop-blur-xs"
              aria-label="Previous Slide"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="btn btn-circle btn-sm bg-black/40 border border-white/10 text-white hover:bg-primary pointer-events-auto backdrop-blur-xs"
              aria-label="Next Slide"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Side: Detail Card (Overlapping on Desktop) */}
        <div className="w-full lg:w-2/5 lg:-ml-16 z-20">
          <div className="bg-base-300/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
            <h4 className="text-xl md:text-2xl font-syne font-bold mb-4">
              {currentService.title}
            </h4>
            <p className="text-base-content/80 mb-8 leading-relaxed">
              {currentService.description}
            </p>
            <Link
              href={currentService.path}
              className="btn bg-primary rounded-full w-full sm:w-auto gap-2 text-white"
            >
              View Service Details <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>

      {/* Indicator */}
      <div className="text-center mt-8 lg:mt-12 text-sm tracking-widest text-base-content/50">
        {currentIndex + 1} / {mergedServices.length}
      </div>
    </section>
  );
}
