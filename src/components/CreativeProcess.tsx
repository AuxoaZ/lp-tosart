export default function CreativeProcess() {
  const processes = [
    {
      num: "01",
      title: "Research & Direction",
      desc: "Understanding the brand, audience, and creative goals to establish a strong visual foundation."
    },
    {
      num: "02",
      title: "Concept Development",
      desc: "Exploring ideas, references, and visual directions that align with the brand identity."
    },
    {
      num: "03",
      title: "Design Execution",
      desc: "Transforming concepts into refined visuals with attention to composition, detail, and production value."
    },
    {
      num: "04",
      title: "Refinement & Delivery",
      desc: "Final adjustments, revisions, and preparation of organized deliverables ready for use or production."
    }
  ];

  return (
    <section id="proses-kreatif" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in-up">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-syne font-bold uppercase mb-4">Our Creative Process</h2>
        <p className="text-base-content/70 max-w-2xl mx-auto">
          Our systematic approach to transforming ideas into impactful and production-ready visuals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {processes.map((proc, idx) => (
          <div key={idx} className="card bg-base-300/30 border border-white/5 hover:border-primary/50 transition-colors duration-300 backdrop-blur-sm">
            <div className="card-body">
              <div className="text-5xl font-syne font-black text-white/10 mb-4">{proc.num}</div>
              <h3 className="card-title font-syne text-xl mb-2">{proc.title}</h3>
              <p className="text-sm text-base-content/70">{proc.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
