import React from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const Footer: React.FC = () => {
  const sections = [
    { id: "section1", label: "Home" },
    { id: "section2", label: "Qisqacha" },
    { id: "section3", label: "Talim" },
    { id: "section4", label: "Qulaylik" },
    { id: "section5", label: "Asoschilar" },
    { id: "section6", label: "Filiallar" },
    { id: "questions", label: "Savollar" },
  ];

  const handleScroll = (id: string) => {
    gsap.to(window, { duration: 1, scrollTo: `#${id}`, ease: "power2.out" });
  };

  return (
    <footer className="fixed bottom-0 w-full z-1000 bg-black/80 backdrop-blur-md text-white py-3 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0">
        {/* Copyright faqat md va undan katta ekranlarda */}
        <div className="hidden md:block text-sm md:text-base font-semibold select-none">
          &copy; 2026 akki
        </div>

        {/* Navigation links */}
        <ul className="flex flex-wrap md:flex-nowrap gap-3 md:gap-6 overflow-x-auto md:overflow-visible scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-gray-800">
          {sections.map((sec) => (
            <li
              key={sec.id}
              className="cursor-pointer hover:text-orange-400 focus:text-orange-400 transition-colors duration-300 px-2 py-1 rounded-md outline-none"
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
    </footer>
  );
};

export default Footer;
