import React from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const Footer: React.FC = () => {
  const allSections = [
    { id: "section1", label: "Home", icon: "🏠" },
    { id: "section2", label: "Qisqacha", icon: "📄" },
    { id: "section3", label: "Talim", icon: "🎓" },
    { id: "section4", label: "Qulaylik", icon: "⚡" },
    { id: "section5", label: "Asoschilar", icon: "👥" },
    { id: "section6", label: "Filiallar", icon: "📍" },
    { id: "questions", label: "Savollar", icon: "❓" },
  ];

  const mobileSections = allSections.filter((sec) =>
    ["section1", "section2", "section3", "questions"].includes(sec.id)
  );

  const handleScroll = (id: string) => {
    gsap.to(window, { duration: 1, scrollTo: `#${id}`, ease: "power2.out" });
  };

  return (
    <footer className="fixed bottom-0 w-full z-50 bg-black/90 backdrop-blur-md text-white">
      {/* Desktop footer */}
      <div className="hidden lg:flex container mx-auto justify-between items-center py-3 px-4">
        <div className="text-sm md:text-base font-semibold select-none">
          &copy; 2026 akki
        </div>
        <ul className="flex flex-wrap gap-6">
          {allSections.map((sec) => (
            <li
              key={sec.id}
              className="cursor-pointer hover:text-orange-400 px-2 py-1 rounded-md transition-colors duration-300"
              onClick={() => handleScroll(sec.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleScroll(sec.id);
              }}
              aria-label={`Scroll to ${sec.label}`}
            >
              {sec.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile footer / App-like bottom nav */}
      <div className="flex lg:hidden justify-around items-center py-2">
        {mobileSections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => handleScroll(sec.id)}
            className="flex flex-col items-center justify-center text-sm text-white hover:text-orange-400 transition-colors duration-300"
            aria-label={`Scroll to ${sec.label}`}
          >
            <span className="text-xl">{sec.icon}</span>
            <span className="mt-1">{sec.label}</span>
          </button>
        ))}
      </div>
    </footer>
  );
};

export default Footer;