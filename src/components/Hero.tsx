"use client";

import { useState, useEffect } from "react";

export default function Hero({ data }: { data?: any }) {
  const badge = data?.badge || "Apparel Design, Branding & Visual Studio";
  const title = data?.title || "Beyond\nVisuals";
  const subtitle = data?.subtitle || "Designing visuals that connect culture, identity, and storytelling.";
  const words = data?.words && data.words.length > 0 ? data.words : ["culture", "identity", "storytelling"];
  const stats = data?.stats || [
    { value: "5+", label: "Years Experience" },
    { value: "400+", label: "Brands Handled" }
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentWord = words[currentWordIndex];
    
    const typingSpeed = 120;
    const deletingSpeed = 70;
    const pauseBeforeDelete = 2000;
    const pauseBeforeType = 400;

    const handleType = () => {
      if (!isDeleting) {
        setDisplayedText(currentWord.slice(0, displayedText.length + 1));
        if (displayedText.length + 1 === currentWord.length) {
          timer = setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
          return;
        }
      } else {
        setDisplayedText(currentWord.slice(0, displayedText.length - 1));
        if (displayedText.length === 1) {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          timer = setTimeout(() => {}, pauseBeforeType);
          return;
        }
      }

      timer = setTimeout(handleType, isDeleting ? deletingSpeed : typingSpeed);
    };

    timer = setTimeout(handleType, displayedText === "" ? pauseBeforeType : 0);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentWordIndex, words]);

  // Dynamically extract the prefix from subtitle based on typewriter words
  const getSubtitlePrefix = () => {
    let index = -1;
    for (const word of words) {
      const idx = subtitle.toLowerCase().indexOf(word.toLowerCase());
      if (idx !== -1 && (index === -1 || idx < index)) {
        index = idx;
      }
    }
    if (index !== -1) {
      return subtitle.slice(0, index);
    }
    return subtitle.endsWith(".") ? subtitle.slice(0, -1) + " " : subtitle + " ";
  };

  return (
    <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[80vh] text-center">
      {/* Decorative top badge */}
      <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-base-300/30 border border-base-100/10 backdrop-blur-sm text-xs md:text-sm font-medium tracking-widest uppercase mb-8 shadow-2xl animate-fade-in-up">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
        {badge}
      </div>

      {/* Main Title */}
      <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black font-syne tracking-tighter uppercase mb-6 leading-[0.9] animate-fade-in-up animation-delay-100 whitespace-pre-line">
        {title}
      </h1>

      {/* Tagline / Subtitle */}
      <p className="text-lg sm:text-xl md:text-2xl text-base-content/70 max-w-2xl mx-auto mb-12 font-light leading-relaxed animate-fade-in-up animation-delay-200">
        {getSubtitlePrefix()}
        <span className="text-white font-semibold border-r-2 border-primary pr-1.5 animate-pulse min-h-[2.5rem]">
          {displayedText || "\u00A0"}
        </span>
      </p>

      {/* Action Button */}
      <div className="mb-12 animate-fade-in-up animation-delay-300">
        <a
          href="#service"
          className="btn bg-primary btn-lg rounded-full px-8 shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-shadow"
        >
          View Service
        </a>
      </div>

      {/* Stats Container (below button, centered) */}
      <div className="flex gap-8 sm:gap-16 text-center justify-center animate-fade-in-up animation-delay-400">
        {stats.map((stat: any, idx: number) => (
          <div key={idx}>
            <div className="text-3xl font-bold font-syne text-white">{stat.value}</div>
            <div className="text-xs uppercase tracking-widest text-base-content/60 mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
