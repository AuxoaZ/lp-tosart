import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <nav className="navbar bg-base-300/40 backdrop-blur-md rounded-full border border-slate-200/30 shadow-xl max-w-5xl px-6">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-300 rounded-box w-52"
            >
              <li>
                <Link href="#jasa-kami">Jasa Kami</Link>
              </li>
              <li>
                <Link href="#who-we-are">Tentang Kami</Link>
              </li>
              <li>
                <Link href="#proses-kreatif">Proses Kreatif</Link>
              </li>
            </ul>
          </div>
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <Image
                src="/img/tosart-logo.png"
                alt="Tosart Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
            <span className="font-syne font-bold text-lg uppercase tracking-widest hidden sm:block">
              Tosart Studio
            </span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-medium text-sm gap-2">
            <li>
              <Link
                href="#jasa-kami"
                className="hover:text-primary transition-colors rounded-full"
              >
                Jasa Kami
              </Link>
            </li>
            <li>
              <Link
                href="#who-we-are"
                className="hover:text-primary transition-colors rounded-full"
              >
                Tentang Kami
              </Link>
            </li>
            <li>
              <Link
                href="#proses-kreatif"
                className="hover:text-primary transition-colors rounded-full"
              >
                Proses Kreatif
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <a
            href="#contact"
            className="btn btn-outline btn-sm rounded-full text-white hover:bg-white hover:text-black border-white/30"
          >
            Hubungi Kami
          </a>
        </div>
      </nav>
    </div>
  );
}
