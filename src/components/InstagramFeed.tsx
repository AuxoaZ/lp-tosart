"use client";

import Script from "next/script";
import { FiInstagram } from "react-icons/fi";

export default function InstagramFeed({ media }: { media?: { whatsapp: string; instagram: string; email: string; } }) {
  const instagramHandle = media?.instagram || "tosart.std";

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in-up">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-syne font-bold uppercase tracking-wide mb-4">
          Find Us On Instagram
        </h2>
        <a
          href={`https://instagram.com/${instagramHandle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-focus transition-colors font-medium text-lg"
        >
          <FiInstagram className="w-5 h-5" />
          @{instagramHandle}
        </a>
      </div>

      {/* Behold Widget Container */}
      <div className="w-full rounded-3xl overflow-hidden border border-white/10 bg-base-300/30 p-2 sm:p-6 backdrop-blur-sm">
        <div
          dangerouslySetInnerHTML={{
            __html: '<behold-widget feed-id="nvNtKZGECvTafiEtQJ5C"></behold-widget>',
          }}
        />
      </div>

      <Script id="behold-widget-loader" strategy="afterInteractive">
        {`
          (() => {
            if(window._bhldScript)return;window._bhldScript=true;
            const d=document,s=d.createElement("script");s.type="module";
            s.src="https://w.behold.so/widget.js";setTimeout(()=>{d.head.append(s);},0);
          })();
        `}
      </Script>
    </section>
  );
}
