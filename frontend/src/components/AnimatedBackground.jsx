import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

const AnimatedBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "#0a0a0a", // CHANGED: Set background to near-black
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          // CHANGED: Vibrant particle colors
          value: ["#8a2be2", "#00ff99", "#4b0082"], 
        },
        links: {
          enable: false, // Links are disabled for this effect
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "out",
          },
          random: true,
          speed: 2,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 30,
        },
        opacity: {
          value: 0.6,
        },
        shape: {
          type: "polygon",
          polygon: {
            sides: 6,
          },
        },
        size: {
          value: { min: 10, max: 40 },
          animation: {
            enable: true,
            speed: 5,
            sync: false,
          },
        },
      },
      detectRetina: true,
      fullScreen: {
        enable: true,
        zIndex: -1,
      },
    }),
    [],
  );

  if (init) {
    return <Particles id="tsparticles" options={options} />;
  }

  return <></>;
};

export default AnimatedBackground;
