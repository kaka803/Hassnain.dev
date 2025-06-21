"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSection() {
  const containerRef = useRef(null);
  const textRef = useRef([]);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Background zoom fade
    tl.fromTo(
      containerRef.current,
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" }
    );

    // Letter-by-letter animation
    textRef.current.forEach((el, index) => {
      tl.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "back.out(1.7)",
        },
        "-=0.3" // overlap animations
      );
    });

    // Subtitle
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1 },
      "-=0.5"
    );
  }, []);

  const heading = "Hassnain".split("");

  return (
    <section
      ref={containerRef}
      className="h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col justify-center items-center text-white px-4"
    >
      <h1 className="text-5xl md:text-7xl font-extrabold flex space-x-1">
        {heading.map((letter, i) => (
          <span
            key={i}
            ref={(el) => (textRef.current[i] = el)}
            className="inline-block"
          >
            {letter}
          </span>
        ))}
      </h1>
      <p
        ref={subtitleRef}
        className="text-lg md:text-2xl mt-4 text-purple-400 font-medium"
      >
        Full Stack Developer | Next.js | MongoDB | Tailwind
      </p>
    </section>
  );
}
