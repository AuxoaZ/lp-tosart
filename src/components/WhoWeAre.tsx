export default function WhoWeAre({ data }: { data?: any }) {
  const title = data?.title || "Who We Are";
  const paragraphs = data?.paragraphs || [
    "Tosart is a creative studio specializing in apparel design, branding, and visual content production. We help brands transform ideas into visuals that feel distinctive, relevant, and production-ready.",
    "With years of experience working across various industries and creative directions, we focus on creating designs that are not only visually strong, but also aligned with brand identity and audience culture.",
    "From apparel graphics to digital visuals, every project is approached with attention to detail, concept development, and strong visual storytelling."
  ];

  return (
    <section id="who-we-are" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto animate-fade-in-up">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Side: Title & Accent */}
        <div className="relative">
          <h2 className="text-4xl md:text-5xl font-syne font-bold uppercase mb-6 leading-tight whitespace-pre-line">
            {title}
          </h2>
          <div className="w-24 h-1 bg-primary mb-8 rounded-full"></div>
          
          <div className="hidden lg:block absolute -left-12 -bottom-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl z-[-1]"></div>
        </div>

        {/* Right Side: Description */}
        <div className="space-y-6 text-lg text-base-content/80 font-light leading-relaxed">
          {paragraphs.map((p: string, idx: number) => (
            <p key={idx}>
              {p.startsWith("Tosart") ? (
                <>
                  <strong className="text-base-content font-medium">Tosart</strong>
                  {p.slice(6)}
                </>
              ) : p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
