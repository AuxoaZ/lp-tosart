import Image from "next/image";

export default function SelectedWorks() {
  return (
    <section
      id="selected-works"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Single Card Container */}
      <div className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-base-300/40 backdrop-blur-2xl border border-white/10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
        {/* Left Side: Text Content */}
        <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 flex flex-col justify-center z-10 space-y-6">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-syne font-bold tracking-tight text-white leading-[1.05]">
            SELECTED <br /> WORKS
          </h2>

          <div className="space-y-4 text-base-content/80 text-base sm:text-lg font-light leading-relaxed max-w-lg">
            <p>
              A curated selection of projects showcasing Tosart’s approach to
              apparel, branding, and visual storytelling.
            </p>
            <p>
              Each project reflects a balance between creativity, functionality,
              and strong visual identity.
            </p>
          </div>
        </div>

        {/* Right Side: Integrated Image */}
        <div className="lg:col-span-6 relative min-h-[350px] lg:min-h-full w-full">
          <Image
            src="/img/selected-work.png"
            alt="Selected Works Showcase"
            fill
            className="object-contain object-center"
            priority
          />
        </div>
      </div>
    </section>
  );
}
