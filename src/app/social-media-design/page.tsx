import ProductGallery from "@/components/ProductGallery";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

const socialImages = [
  "/img/social/Artboard 1.png",
  "/img/social/Artboard 1(1).png",
  "/img/social/Artboard 2.png",
  "/img/social/Artboard 2 (1).png",
  "/img/social/Artboard 3.png",
  "/img/social/Artboard 3 (1).png",
  "/img/social/Artboard 3(1).png",
  "/img/social/Artboard 4 (1).png",
  "/img/social/Artboard 4 (2).png",
  "/img/social/Artboard 5 (2).png",
  "/img/social/Artboard 6 (1).png",
  "/img/social/Artboard 7.png",
  "/img/social/Artboard 7 (1).png",
  "/img/social/Artboard 9.png",
  "/img/social/Artboard 10.png",
  "/img/social/Artboard11.png",
  "/img/social/Artboard 12.png",
  "/img/social/Artboard12.png",
  "/img/social/Artboard222.png",
  "/img/social/Artboard223.png",
];

export const metadata = {
  title: "Social Media Design | Tosart Studio",
  description: "Elevate your digital presence. We design custom layouts, templates, and engaging visual systems tailored for brand storytelling on social media.",
};

export default function SocialMediaDesignPage() {
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
            Elevate your digital presence. We design custom layouts, templates, and engaging visual systems tailored for brand storytelling on social media.
          </p>
        </div>
      </div>

      {/* Gallery */}
      <ProductGallery title="Featured Graphics" images={socialImages} isSubpage={true} layout="masonry" />
    </div>
  );
}
