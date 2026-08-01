import Image from "next/image";
import Link from "next/link";
import { FiInstagram, FiTwitter, FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-black/50 backdrop-blur-xl border-t border-white/10 pt-16 pb-8 px-4 sm:px-6 lg:px-8 mt-20"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <div className="space-y-6">
          <Link href="/" className="inline-block relative w-32 h-10">
            <Image
              src="/img/tosart-logo.png"
              alt="Tosart Logo"
              fill
              className="object-contain object-left"
            />
          </Link>
          <p className="text-sm text-base-content/60 max-w-xs">
            A creative studio specializing in apparel design, branding, and
            visual content production.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="btn btn-circle btn-sm bg-base-300 border-none hover:bg-primary text-white"
            >
              <FiInstagram />
            </a>
            <a
              href="#"
              className="btn btn-circle btn-sm bg-base-300 border-none hover:bg-primary text-white"
            >
              <FiTwitter />
            </a>
            <a
              href="#"
              className="btn btn-circle btn-sm bg-base-300 border-none hover:bg-primary text-white"
            >
              <FiMail />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-syne font-bold mb-6">Layanan</h4>
          <ul className="space-y-3 text-sm text-base-content/70">
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Apparel Design
              </a>
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
              <a href="#" className="hover:text-primary transition-colors">
                Social Media Design
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Video Editing
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-syne font-bold mb-6">Hubungi Kami</h4>
          <p className="text-sm text-base-content/70 mb-4">
            Siap untuk memulai projek visual Anda? Mari diskusikan ide Anda
            bersama kami.
          </p>
          <a
            href="mailto:hello@tosart.studio"
            className="btn bg-primary rounded-full w-full sm:w-auto"
          >
            Mulai Diskusi
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 text-center text-xs text-base-content/40 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>
          &copy; {new Date().getFullYear()} Tosart Creative Studio. All rights
          reserved.
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
