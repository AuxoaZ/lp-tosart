import ApparelDesignClient from "./ApparelDesignClient";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

const apparelImages = [
  "/img/apparel/509.png",
  "/img/apparel/509-1.png",
  "/img/apparel/510.png",
  "/img/apparel/510-1.png",
  "/img/apparel/511.png",
  "/img/apparel/511-1.png",
  "/img/apparel/520.png",
  "/img/apparel/520-1.png",
  "/img/apparel/539.png",
  "/img/apparel/539-1.png",
  "/img/apparel/JERSEY.png",
  "/img/apparel/JERSEY-1.png",
];

const accessoriesImages = [
  "/img/accessories/CAP.png",
  "/img/accessories/CAP-1.png",
  "/img/accessories/CAP-3.png",
  "/img/accessories/469.png",
  "/img/accessories/484.png",
  "/img/accessories/486.png",
  "/img/accessories/497.png",
  "/img/accessories/506.png",
  "/img/accessories/507.png",
  "/img/accessories/511.png",
  "/img/accessories/512.png",
  "/img/accessories/Artboard.png",
];

const logoBrandImges = [
  "/img/logo-brand/logo-brand-8.png",
  "/img/logo-brand/logo-brand-1.png",
  "/img/logo-brand/logo-brand-2.png",
  "/img/logo-brand/logo-brand-10.png",
  "/img/logo-brand/logo-brand-3.png",
  "/img/logo-brand/logo-brand-4.png",
  "/img/logo-brand/logo-brand-5.png",
  "/img/logo-brand/logo-brand-9.png",
  "/img/logo-brand/logo-brand-6.png",
  "/img/logo-brand/logo-brand-7.png",
  "/img/logo-brand/logo-brand-11.png",
];

export const metadata = {
  title: "Apparel Design | Tosart Studio",
  description:
    "Our signature apparel design services. From custom hoodies and jerseys to varsity jackets, we create high-impact graphics and production-ready apparel concepts.",
};

export default function ApparelDesignPage() {
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
        logoBrandImages={logoBrandImges}
      />
    </div>
  );
}
