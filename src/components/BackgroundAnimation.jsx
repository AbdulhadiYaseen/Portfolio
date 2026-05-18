import React, { useCallback } from 'react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const BackgroundAnimation = () => {
  const particlesInit = useCallback(async engine => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 0.8,
                color: "#00f0ff"
              },
            },
          },
        },
        particles: {
          color: {
            value: ["#38bdf8", "#2563eb", "#ffffff"],
          },
          links: {
            color: "#2563eb",
            distance: 150,
            enable: true,
            opacity: 0.2,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 40,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "char",
            options: {
              char: [
                {
                  value: "A",
                  font: "Outfit",
                  weight: "800",
                },
                {
                  value: "H",
                  font: "Outfit",
                  weight: "800",
                },
                {
                  value: "Y",
                  font: "Outfit",
                  weight: "800",
                }
              ]
            }
          },
          size: {
            value: { min: 14, max: 22 },
          },
        },
        detectRetina: true,
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    />
  );
};

export default BackgroundAnimation;
