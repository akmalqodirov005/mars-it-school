import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Header from "./Header";
import Footer from "./Footer";
import IcePlanetSection from "./IcyPlanet";
import LastSection from "./LastSection";
import Scene from "./Mars";
import Questions from "./Questions";
import Section1 from "./Section1";
import Section3 from "./Section3";
import Section4 from "./Section4";
import Section5 from "./Section5";
import Section6 from "./Section6";
import SpaceBackground from "./SpaceBackground";

interface MainProps {
  onMusic: boolean;
}

const MainPage: React.FC<MainProps> = ({ onMusic }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // GSAP scroll animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sections = gsap.utils.toArray<HTMLElement>(".section");

    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Detect mobile
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-x-hidden pb-40"
    >
      {/* BACKGROUND */}
      <SpaceBackground />

      {/* HEADER */}
      <div className="relative z-1000">
        <Header onMusic={onMusic} />
      </div>

      {/* MARS SCENE */}
      {!isMobile && (
        <section
          id="mars"
          className="relative z-100 -top-110 w-full mt-20 section"
        >
          <Scene />
        </section>
      )}

      {/* SECTION 1 */}
      <section
        id="section1"
        className="container relative z-200 pt-30 mx-auto px-4 section"
      >
        <Section1 />
      </section>

      {/* ICE PLANET */}
      <section
        id="section2"
        className="relative w-full px-4 section"
      >
        <IcePlanetSection />
      </section>

      {/* SECTION 3 */}
      <section
        id="section3"
        className="container mx-auto mt-32 px-4 section"
      >
        <Section3 />
      </section>

      {/* SECTION 4 */}
      <section
        id="section4"
        className="container mx-auto mt-32 px-4 section"
      >
        <Section4 />
      </section>

      {/* SECTION 5 */}
      <section
        id="section5"
        className="container mx-auto mt-32 px-4 section"
      >
        <Section5 />
      </section>

      {/* SECTION 6 */}
      <section
        id="section6"
        className="container mx-auto mt-32 px-4 section"
      >
        <Section6 />
      </section>

      {/* QUESTIONS */}
      <section
        id="questions"
        className="container mx-auto mt-32 px-4 section"
      >
        <Questions />
      </section>

      {/* LAST CTA */}
      <LastSection />

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default MainPage;