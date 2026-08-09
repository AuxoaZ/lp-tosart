"use client";

import { useState, useEffect } from "react";
import ProductGallery from "@/components/ProductGallery";
import LazyImage from "@/components/LazyImage";

interface ApparelDesignClientProps {
  apparelImages: string[];
  accessoriesImages: string[];
  logoBrandImages: string[];
  visualImages: string[];
}

type TabType = "all" | "apparel" | "accessories" | "logo-brand";

export default function ApparelDesignClient({
  apparelImages,
  accessoriesImages,
  logoBrandImages,
  visualImages,
}: ApparelDesignClientProps) {
  const [activeTab, setActiveTab] = useState<TabType>("apparel");
  const [visibleCount, setVisibleCount] = useState(2);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get("tab");
    if (
      tabParam &&
      ["all", "apparel", "accessories", "logo-brand"].includes(tabParam)
    ) {
      setActiveTab(tabParam as TabType);
    }
  }, []);

  const tabs: { id: TabType; label: string }[] = [
    // { id: "all", label: "All Works" },
    { id: "apparel", label: "Apparel" },
    { id: "accessories", label: "Accessories" },
    { id: "logo-brand", label: "Logo & Brand" },
  ];

  return (
    <div>
      {/* Tab Filter buttons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex justify-center animate-fade-in-up animation-delay-100">
        <div className="flex bg-white/5 backdrop-blur-md p-1.5 rounded-[1.25rem] border border-white/10 shadow-xl gap-1 max-w-full overflow-x-auto scrollbar-none select-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.03]"
                    : "text-white/60 hover:text-white hover:bg-white/5 active:scale-97"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filtered Galleries */}
      <div className="space-y-4">
        {(activeTab === "all" || activeTab === "apparel") && (
          <div className="animate-fade-in duration-500">
            <ProductGallery
              title={
                activeTab === "all" ? "Apparel Designs" : "Featured Apparel"
              }
              images={apparelImages}
              isSubpage={true}
              cols={4}
            />
          </div>
        )}
        {(activeTab === "all" || activeTab === "accessories") && (
          <div className="animate-fade-in duration-500">
            <ProductGallery
              title={
                activeTab === "all"
                  ? "Custom & Accessories"
                  : "Featured Accessories"
              }
              images={accessoriesImages}
              isSubpage={true}
              cols={4}
            />
          </div>
        )}
        {(activeTab === "all" || activeTab === "logo-brand") && (
          <div className="animate-fade-in duration-500">
            <ProductGallery
              title={
                activeTab === "all"
                  ? "Logo & Brand Identity"
                  : "Featured Logos & Branding"
              }
              images={logoBrandImages}
              isSubpage={true}
              layout="masonry"
            />
          </div>
        )}
      </div>

      {/* Visual Designs Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col mt-12 md:mt-20">
        <div className="mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-5xl font-syne font-black uppercase tracking-tight text-white mb-4 leading-none">
            Visual Designs
          </h2>
          <p className="text-lg text-base-content/70 font-light max-w-3xl leading-relaxed">
            Explore our visual branding assets, illustration styleframes, and creative concepts designed to elevate brand narratives.
          </p>
        </div>

        <div className="flex flex-col">
          {visualImages.slice(0, visibleCount).map((src, index) => (
            <LazyImage
              key={index}
              src={src}
              alt={`Visual Design ${index + 1}`}
              className="w-full h-auto block"
              loading="lazy"
            />
          ))}
        </div>

        {visibleCount < visualImages.length && (
          <div className="flex justify-center mt-12 mb-16">
            <button
              onClick={() => setVisibleCount((prev) => prev + 2)}
              className="px-10 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white font-medium text-sm transition-all duration-300 active:scale-95 shadow-lg shadow-black/20 cursor-pointer"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
