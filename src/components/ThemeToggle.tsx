"use client";

import { useEffect, useState } from "react";
import { FiSun, FiMoon, FiSliders } from "react-icons/fi";

const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
];

export default function ThemeToggle() {
  const [currentTheme, setCurrentTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const changeTheme = (theme: string) => {
    setCurrentTheme(theme);
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  const toggleLightDark = () => {
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    changeTheme(nextTheme);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Quick Light / Dark toggle button */}
      <button
        onClick={toggleLightDark}
        className="btn btn-ghost btn-circle"
        aria-label="Toggle Theme"
      >
        {currentTheme === "dark" ? (
          <FiSun className="w-5 h-5 text-warning" />
        ) : (
          <FiMoon className="w-5 h-5 text-base-content" />
        )}
      </button>

      {/* Dropdown theme picker */}
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle"
          title="Pilih Tema DaisyUI"
        >
          <FiSliders className="w-5 h-5" />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-200 text-base-content rounded-box z-50 w-52 p-2 shadow-xl max-h-80 overflow-y-auto border border-base-300"
        >
          <li className="menu-title text-xs font-bold uppercase tracking-wider opacity-70">
            Tema DaisyUI
          </li>
          {themes.map((t) => (
            <li key={t}>
              <button
                onClick={() => changeTheme(t)}
                className={`capitalize flex justify-between ${
                  currentTheme === t ? "active font-bold" : ""
                }`}
              >
                {t}
                {currentTheme === t && <span className="badge badge-xs badge-primary">Active</span>}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
