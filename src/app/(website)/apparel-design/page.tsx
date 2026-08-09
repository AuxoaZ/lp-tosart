import ApparelDesignClient from "./ApparelDesignClient";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { getGalleryData } from "@/app/actions/cms";

export const metadata = {
  title: "Apparel Design | Tosart Studio",
  description:
    "Our signature apparel design services. From custom hoodies and jerseys to varsity jackets, we create high-impact graphics and production-ready apparel concepts.",
};

export default async function ApparelDesignPage() {
  const data = await getGalleryData();
  
  const apparelImages = data.apparelImages || [];
  const accessoriesImages = data.accessoriesImages || [];
  const logoBrandImages = data.logoBrandImages || [];
  const visualImages = data.visualImages || [];

  return (
    <div className="pt-32 pb-0">
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
            Apparel Design
          </h1>
          <p className="text-lg sm:text-xl text-base-content/70 font-light leading-relaxed">
            Our signature apparel design services. From custom hoodies and
            jerseys to varsity jackets, we create high-impact graphics and
            production-ready apparel concepts.
          </p>
        </div>
      </div>

      {/* Gallery with Tab Filter */}
      <ApparelDesignClient
        apparelImages={apparelImages}
        accessoriesImages={accessoriesImages}
        logoBrandImages={logoBrandImages}
        visualImages={visualImages}
      />
    </div>
  );
}
