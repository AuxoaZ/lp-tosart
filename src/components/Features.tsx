import {
  FiZap,
  FiShield,
  FiLayout,
  FiMoon,
  FiCheckCircle,
  FiBox,
} from "react-icons/fi";

const features = [
  {
    icon: <FiZap className="w-6 h-6 text-primary" />,
    title: "Tailwind CSS v4 CSS-First",
    description:
      "Performa kompilasi super cepat menggunakan engine Tailwind v4 terbaru dengan konfigurasi langsung di globals.css via directive @import.",
  },
  {
    icon: <FiLayout className="w-6 h-6 text-secondary" />,
    title: "Komponen DaisyUI",
    description:
      "Akses puluhan komponen UI siap pakai seperti button, card, modal, navbar, drawer, badge, hingga alert tanpa menulis CSS berlebih.",
  },
  {
    icon: <FiMoon className="w-6 h-6 text-accent" />,
    title: "30+ DaisyUI Themes",
    description:
      "Dukungan tema melimpah (light, dark, synthwave, emerald, cyberpunk, dll.) yang dapat diganti secara dinamis melalui data-theme.",
  },
  {
    icon: <FiBox className="w-6 h-6 text-info" />,
    title: "Ribuan React Icons",
    description:
      "Integrasi seamless dengan package react-icons (Feather Icons, Heroicons, FontAwesome, Material Icons, Simple Icons, dll.).",
  },
  {
    icon: <FiShield className="w-6 h-6 text-success" />,
    title: "TypeScript Full Support",
    description:
      "Type checking penuh untuk Next.js App Router, komponen React, danprops untuk keamanan dan kenyamanan developer.",
  },
  {
    icon: <FiCheckCircle className="w-6 h-6 text-warning" />,
    title: "Struktur Bersih & Modular",
    description:
      "Susunan direktori src/ app, components, lib, dan types yang rapi dan terorganisir untuk kemudahan pengalihan ke skala besar.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-base-200/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-base-content">
            Keunggulan Setup Proyek Ini
          </h2>
          <p className="mt-4 text-base-content/70 text-lg">
            Semua yang Anda butuhkan untuk membangun landing page atau web app Next.js modern ada di sini.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="card bg-base-100 shadow-md border border-base-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="card-body">
                <div className="w-12 h-12 rounded-2xl bg-base-200 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="card-title text-xl font-bold text-base-content">
                  {feature.title}
                </h3>
                <p className="text-base-content/70 text-sm leading-relaxed mt-2">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
