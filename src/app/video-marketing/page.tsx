import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export const metadata = {
  title: "Video Marketing | Tosart Studio",
  description: "Dynamic video marketing assets. Watch our featured showcase displaying creative visual editing, motion graphics, and engaging brand promotions.",
};

export default function VideoMarketingPage() {
  return (
    <div className="pt-32 pb-24">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
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
            Video Marketing
          </h1>
          <p className="text-lg sm:text-xl text-base-content/70 font-light leading-relaxed">
            Dynamic video marketing assets. Watch our featured showcase displaying creative visual editing, motion graphics, and engaging brand promotions.
          </p>
        </div>
      </div>

      {/* Video Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl mx-auto aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-base-300/40 backdrop-blur-md relative">
          <iframe
            src="https://www.youtube.com/embed/g2zP3ajD6o4?autoplay=0"
            title="Video Marketing Showcase"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
}
