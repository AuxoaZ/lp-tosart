export default function Hero() {
  return (
    <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[80vh] text-center">
      {/* Decorative top badge */}
      <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-base-300/30 border border-base-100/10 backdrop-blur-sm text-xs md:text-sm font-medium tracking-widest uppercase mb-8 shadow-2xl animate-fade-in-up">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
        Apparel Design, Branding & Visual Studio
      </div>

      {/* Main Title */}
      <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black font-syne tracking-tighter uppercase mb-6 leading-[0.9] animate-fade-in-up animation-delay-100">
        Beyond <br className="hidden sm:block" /> Visuals
      </h1>

      {/* Tagline / Subtitle */}
      <p className="text-lg sm:text-xl md:text-2xl text-base-content/70 max-w-2xl mx-auto mb-12 font-light leading-relaxed animate-fade-in-up animation-delay-200">
        Designing visuals that connect{" "}
        <span className="text-base-content font-medium">culture</span>,{" "}
        <span className="text-base-content font-medium">identity</span>, and{" "}
        <span className="text-base-content font-medium">storytelling</span>.
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
        <div>
          <div className="text-3xl font-bold font-syne text-white">5+</div>
          <div className="text-xs uppercase tracking-widest text-base-content/60 mt-1">
            Years Experience
          </div>
        </div>
        <div>
          <div className="text-3xl font-bold font-syne text-white">400+</div>
          <div className="text-xs uppercase tracking-widest text-base-content/60 mt-1">
            Brands Handled
          </div>
        </div>
      </div>
    </section>
  );
}
