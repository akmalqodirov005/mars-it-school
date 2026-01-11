import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const SpaceBackground = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setReady(true);
    });
  }, []);

  if (!ready) return null;

  return (
    <Particles
      id="space"
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        background: { color: "#000000" },
        fpsLimit: 60,
        particles: {
          number: {
            value: 250,
            density: {
              enable: true,
              width: 1920,
              height: 1080,
            },
          },
          color: { value: "#ffffff" },
          opacity: { value: 0.8 },
          size: { value: { min: 0.5, max: 2 } },
          move: {
            enable: true,
            speed: 0.2,
            direction: "bottom",
          },
        },
        
        detectRetina: true,
      }}
    />
  );
};

export default SpaceBackground;