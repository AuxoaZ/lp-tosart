export default function Hero() {
  return (
    <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[80vh] text-center">
      {/* Decorative top badge */}
      <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-base-300/30 border border-base-100/10 backdrop-blur-sm text-xs md:text-sm font-medium tracking-widest uppercase mb-8 shadow-2xl">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
        Apparel Design, Branding & Visual Studio
      </div>

      {/* Main Title */}
      <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black font-syne tracking-tighter uppercase mb-6 leading-[0.9]">
        Beyond <br className="hidden sm:block" /> Visuals
      </h1>

      {/* Tagline / Subtitle */}
      <p className="text-lg sm:text-xl md:text-2xl text-base-content/70 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
        Designing visuals that connect{" "}
        <span className="text-base-content font-medium">culture</span>,{" "}
        <span className="text-base-content font-medium">identity</span>, and{" "}
        <span className="text-base-content font-medium">storytelling</span>.
      </p>

      {/* Action & Stats Container */}
      <div className="flex flex-col sm:flex-row items-center gap-8 mb-12">
        <a
          href="#contact"
          className="btn bg-primary btn-lg rounded-full px-8 shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-shadow"
        >
          Mulai Projek
        </a>

        <div className="h-10 w-px bg-base-content/20 hidden sm:block"></div>

        <div className="flex gap-6 text-left">
          <div>
            <div className="text-2xl font-bold font-syne">5+</div>
            <div className="text-xs uppercase tracking-widest text-base-content/60">
              Years Experience
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold font-syne">400+</div>
            <div className="text-xs uppercase tracking-widest text-base-content/60">
              Brands Handled
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
