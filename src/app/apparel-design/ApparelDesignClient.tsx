"use client";

import { useState, useEffect } from "react";
import ProductGallery from "@/components/ProductGallery";

interface ApparelDesignClientProps {
  apparelImages: string[];
  accessoriesImages: string[];
  logoBrandImages: string[];
}

type TabType = "all" | "apparel" | "accessories" | "logo-brand";

export default function ApparelDesignClient({
  apparelImages,
  accessoriesImages,
  logoBrandImages,
}: ApparelDesignClientProps) {
  const [activeTab, setActiveTab] = useState<TabType>("all");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get("tab");
    if (tabParam && ["all", "apparel", "accessories", "logo-brand"].includes(tabParam)) {
      setActiveTab(tabParam as TabType);
    }
  }, []);

  const tabs: { id: TabType; label: string }[] = [
    { id: "all", label: "All Works" },
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
              title={activeTab === "all" ? "Apparel Designs" : "Featured Apparel"}
              images={apparelImages}
              isSubpage={true}
              cols={4}
            />
          </div>
        )}
        {(activeTab === "all" || activeTab === "accessories") && (
          <div className="animate-fade-in duration-500">
            <ProductGallery
              title={activeTab === "all" ? "Custom & Accessories" : "Featured Accessories"}
              images={accessoriesImages}
              isSubpage={true}
              cols={4}
            />
          </div>
        )}
        {(activeTab === "all" || activeTab === "logo-brand") && (
          <div className="animate-fade-in duration-500">
            <ProductGallery
              title={activeTab === "all" ? "Logo & Brand Identity" : "Featured Logos & Branding"}
              images={logoBrandImages}
              isSubpage={true}
              layout="masonry"
            />
          </div>
        )}
      </div>
    </div>
  );
}
