import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWhatsApp({ media }: { media?: { whatsapp: string; instagram: string; email: string; } }) {
  const whatsappNumber = media?.whatsapp || "6285904430581"; // Dynamic from CMS or fallback
  const message = "Hello Tosart Studio! I'm interested in your services.";
  const encodedMessage = encodeURIComponent(message);
  const waUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group select-none">
      {/* Premium Glassmorphic Tooltip */}
      <span className="mr-3 translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap bg-white text-black font-bold text-xs py-2 px-4 rounded-xl shadow-xl border border-white/20 pointer-events-none">
        Chat with us!
      </span>

      {/* Button with premium shadow and bounce hover */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-[0_8px_30px_rgb(37,211,102,0.4)] hover:shadow-[0_8px_30px_rgb(37,211,102,0.6)] transition-all duration-300 hover:scale-110 active:scale-95 group/btn"
        aria-label="Chat on WhatsApp"
      >
        {/* Idle Pulsing Ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping opacity-75" />

        <FaWhatsapp className="w-8 h-8" />
      </a>
    </div>
  );
}
