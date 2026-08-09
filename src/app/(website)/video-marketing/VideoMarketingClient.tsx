"use client";

import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface VideoItem {
  id: string;
  title: string;
  embedUrl: string;
  category: string;
}

type TabType = "ai-marketing" | "video-motion" | "video-editing";

interface VideoMarketingClientProps {
  initialVideos: VideoItem[];
}

export default function VideoMarketingClient({ initialVideos }: VideoMarketingClientProps) {
  const [activeTab, setActiveTab] = useState<TabType>("ai-marketing");
  const [currentIndex, setCurrentIndex] = useState(0);

  const tabs: { id: TabType; label: string }[] = [
    // { id: "all", label: "All Works" },
    { id: "ai-marketing", label: "AI Marketing" },
    { id: "video-motion", label: "Video Motion" },
    { id: "video-editing", label: "Video Editing" },
  ];

  const filteredVideos = initialVideos.filter(
    (video) => video.category === activeTab
  );

  const handleTabChange = (tabId: TabType) => {
    setActiveTab(tabId);
    setCurrentIndex(0);
  };

  const nextSlide = () => {
    if (filteredVideos.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % filteredVideos.length);
  };

  const prevSlide = () => {
    if (filteredVideos.length <= 1) return;
    setCurrentIndex((prev) =>
      prev === 0 ? filteredVideos.length - 1 : prev - 1,
    );
  };

  const safeIndex = currentIndex >= filteredVideos.length ? 0 : currentIndex;
  const currentVideo = filteredVideos[safeIndex];

  return (
    <div>
      {/* Tab Filter buttons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex justify-center animate-fade-in-up animation-delay-100">
        <div className="flex bg-white/5 backdrop-blur-md p-1.5 rounded-[1.25rem] border border-white/10 shadow-xl gap-1 max-w-full overflow-x-auto scrollbar-none select-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
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

      {/* Video Content Container with Slider Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up animation-delay-200">
        <div className="w-full max-w-4xl mx-auto relative group">
          {/* Main Video Frame wrapper with glassmorphism glow */}
          <div className="aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-base-300/40 backdrop-blur-md relative z-10 transition-transform duration-500">
            {currentVideo ? (
              <iframe
                key={currentVideo.id}
                src={currentVideo.embedUrl}
                title={currentVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-white/50">
                No videos available in this category.
              </div>
            )}
          </div>

          {/* Navigation Arrows (Visible on hover/desktop and always visible on mobile/focus) */}
          {filteredVideos.length > 1 && (
            <>
              {/* Left Arrow */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 btn btn-circle bg-black/60 hover:bg-primary border border-white/10 text-white shadow-xl opacity-80 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-label="Previous video"
              >
                <FiChevronLeft className="w-6 h-6" />
              </button>

              {/* Right Arrow */}
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 btn btn-circle bg-black/60 hover:bg-primary border border-white/10 text-white shadow-xl opacity-80 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-label="Next video"
              >
                <FiChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Video Slider Info Indicators */}
        {filteredVideos.length > 0 && (
          <div className="max-w-4xl mx-auto flex justify-between items-center mt-6 px-4 z-10">
            <span className="text-sm font-semibold tracking-wide text-white/80 animate-fade-in truncate max-w-[70%]">
              {currentVideo?.title}
            </span>
            {filteredVideos.length > 1 && (
              <div className="flex items-center gap-4">
                {/* Dots indicator */}
                <div className="hidden sm:flex gap-1.5">
                  {filteredVideos.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === safeIndex
                          ? "w-6 bg-primary"
                          : "w-1.5 bg-white/20 hover:bg-white/40"
                      }`}
                      aria-label={`Go to video ${idx + 1}`}
                    />
                  ))}
                </div>
                {/* Text index indicator */}
                <span className="text-xs font-bold tracking-widest text-white/40 bg-white/5 border border-white/5 rounded-full px-3 py-1 whitespace-nowrap">
                  {safeIndex + 1} / {filteredVideos.length}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
