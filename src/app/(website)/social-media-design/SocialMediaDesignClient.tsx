"use client";

import { useState, useEffect } from "react";
import ProductGallery from "@/components/ProductGallery";

interface SocialMediaDesignClientProps {
  socialImages: string[];
  fashionImages: string[];
  fbImages: string[];
  corporateImages: string[];
  ecommerceImages: string[];
  lifestyleImages: string[];
}

type TabType = "all" | "fashion" | "fb" | "corporate" | "ecommerce" | "lifestyle";

export default function SocialMediaDesignClient({
  socialImages,
  fashionImages,
  fbImages,
  corporateImages,
  ecommerceImages,
  lifestyleImages,
}: SocialMediaDesignClientProps) {
  const [activeTab, setActiveTab] = useState<TabType>("all");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get("tab");
    if (
      tabParam &&
      ["all", "fashion", "fb", "corporate", "ecommerce", "lifestyle"].includes(tabParam)
    ) {
      setActiveTab(tabParam as TabType);
    }
  }, []);

  const tabs: { id: TabType; label: string }[] = [
    { id: "all", label: "All" },
    { id: "fashion", label: "Fashion" },
    { id: "fb", label: "F&B" },
    { id: "corporate", label: "Corporate" },
    { id: "ecommerce", label: "E-Commerce" },
    { id: "lifestyle", label: "Lifestyle" },
  ];

  const getActiveImages = () => {
    switch (activeTab) {
      case "all":
        return socialImages;
      case "fashion":
        return fashionImages;
      case "fb":
        return fbImages;
      case "corporate":
        return corporateImages;
      case "ecommerce":
        return ecommerceImages;
      case "lifestyle":
        return lifestyleImages;
      default:
        return [];
    }
  };

  const getActiveTitle = () => {
    switch (activeTab) {
      case "all":
        return "All Graphics";
      case "fashion":
        return "Fashion Graphics";
      case "fb":
        return "F&B Graphics";
      case "corporate":
        return "Corporate Graphics";
      case "ecommerce":
        return "E-Commerce Graphics";
      case "lifestyle":
        return "Lifestyle Graphics";
      default:
        return "Featured Graphics";
    }
  };

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
        <div key={activeTab} className="animate-fade-in duration-500">
          <ProductGallery
            title={getActiveTitle()}
            images={getActiveImages()}
            isSubpage={true}
            layout="masonry"
          />
        </div>
      </div>
    </div>
  );
}
