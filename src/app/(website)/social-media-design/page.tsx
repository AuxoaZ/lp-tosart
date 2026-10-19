import SocialMediaDesignClient from "./SocialMediaDesignClient";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { getGalleryData } from "@/app/actions/cms";
import { socialMediaDesignMetadata } from "@/app/metadata";

export const metadata = socialMediaDesignMetadata;

export default async function SocialMediaDesignPage() {
  const data = await getGalleryData();
  const socialImages = data.socialImages || [];
  const fashionImages = data.fashionImages || [];
  const fbImages = data.fbImages || [];
  const corporateImages = data.corporateImages || [];
  const ecommerceImages = data.ecommerceImages || [];
  const lifestyleImages = data.lifestyleImages || [];

  return (
    <div className="pt-32 pb-16">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 animate-fade-in-up">
        {/* Breadcrumb / Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-base-content/60 hover:text-primary transition-colors mb-6 font-medium"
        >
          <FiArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Title & Desc */}
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-6xl font-syne font-black uppercase tracking-tight text-white mb-6 leading-none">
            Social Media Design
          </h1>
          <p className="text-lg sm:text-xl text-base-content/70 font-light leading-relaxed">
            We build and manage visual content systems that help brands stay
            consistent, relevant, and engaging across social platforms.
          </p>
        </div>
      </div>

      {/* Gallery with Tab Filter */}
      <SocialMediaDesignClient
        socialImages={socialImages}
        fashionImages={fashionImages}
        fbImages={fbImages}
        corporateImages={corporateImages}
        ecommerceImages={ecommerceImages}
        lifestyleImages={lifestyleImages}
      />
    </div>
  );
}
