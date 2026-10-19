import Image from "next/image";
import Link from "next/link";
import { FiInstagram, FiMail, FiPhone } from "react-icons/fi";

export default function Footer({
  media,
}: {
  media?: { whatsapp: string; instagram: string; email: string };
}) {
  const emailAddress = media?.email || "tosart.std@gmail.com";
  const whatsappNumber = media?.whatsapp || "6285904430581";
  const instagramUsername = "tosart.std";

  const whatsappNumberDisplay = "+62 85904430581";

  return (
    <footer
      id="contact"
      className="bg-black/50 backdrop-blur-xl border-t border-white/10 pt-16 pb-8 px-4 sm:px-6 lg:px-8 mt-20"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <Image
                src="/img/tosart-logo.png"
                alt="Tosart Logo"
                fill
                className="object-contain object-left"
              />
            </div>
            <span className="font-syne font-bold text-lg uppercase tracking-widest text-white">
              Tosart Studio
            </span>
          </Link>
          <p className="text-sm text-base-content/60 max-w-xs">
            A creative studio specializing in apparel design, branding, and
            visual content production.
          </p>
        </div>

        <div>
          <h4 className="font-syne font-bold mb-6">Services</h4>
          <ul className="space-y-3 text-sm text-base-content/70">
            <li>
              <Link
                href="/apparel-design"
                className="hover:text-primary transition-colors"
              >
                Apparel Design
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Custom & Accessories
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Logo & Branding
              </a>
            </li>
            <li>
              <Link
                href="/social-media-design"
                className="hover:text-primary transition-colors"
              >
                Social Media Design
              </Link>
            </li>
            <li>
              <Link
                href="/video-marketing"
                className="hover:text-primary transition-colors"
              >
                Video Marketing
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-syne font-bold mb-6">Contact Us</h4>
          <p className="text-sm text-base-content/70 mb-6">
            Ready to start your visual project? Let&apos;s discuss your ideas
            with us.
          </p>
          <ul className="space-y-3.5 text-sm text-base-content/70">
            <li className="flex items-center gap-3 group">
              <FiMail className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
              <a
                href={`mailto:${emailAddress}`}
                className="hover:text-primary transition-colors"
              >
                {emailAddress}
              </a>
            </li>
            <li className="flex items-center gap-3 group">
              <FiPhone className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                {whatsappNumberDisplay}
              </a>
            </li>
            <li className="flex items-center gap-3 group">
              <FiInstagram className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
              <a
                href={`https://instagram.com/${instagramUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                @{instagramUsername}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 text-center text-xs text-base-content/40 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>
          &copy; {new Date().getFullYear()} Tosart Creative Studio. All rights
          reserved. In collaboration with{" "}
          <a
            href="https://autoneka.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            autoneka.id
          </a>
        </p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
