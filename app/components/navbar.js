"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Navbar() {
  const navRef = useRef(null);
  const linksRef = useRef([]);
  const buttonRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Sticky Navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP Entrance
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
      .fromTo(
        linksRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 },
        "-=0.6"
      )
      .fromTo(
        buttonRef.current,
        { scale: 0 },
        { scale: 1, duration: 0.5 },
        "-=0.6"
      );
  }, []);

  // Smooth scroll to section
  const handleScrollTo = (id) => {
    const section = document.getElementById(id.toLowerCase());
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false); // close menu on mobile
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed w-full z-50 transition-all duration-500 ${
        isSticky
          ? "bg-[#1a1a2e]/90 backdrop-blur-md py-3 shadow-lg"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between relative">
        {/* Logo */}
        <div className="text-2xl font-semibold text-purple-300 tracking-wide cursor-pointer font-poppins text-center">
  HASSNAIN.DEV
  <div className="mt-1 h-[2px] w-10 mx-auto bg-purple-500 rounded-full"></div>
</div>




        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 text-base font-medium text-gray-300">
          {["Home", 'Skills', "Projects", "About", "Contact"].map((item, i) => (
            <li
              key={i}
              ref={(el) => (linksRef.current[i] = el)}
              onClick={() => handleScrollTo(item)}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>

        {/* Hire Me Button */}
        <button
  ref={buttonRef}
  onClick={() => handleScrollTo("contact")}
  className="hidden md:inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-semibold shadow-lg transition-transform duration-300 hover:scale-105"
>
  🚀 Hire Me
</button>


        {/* Mobile Menu Icon */}
        <div
          className="md:hidden text-white text-3xl cursor-pointer z-50"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          ☰
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={`absolute top-full left-0 w-full bg-[#1a1a2e]/90 backdrop-blur-md transition-transform duration-500 md:hidden ${
            mobileOpen ? "translate-y-0" : "-translate-y-[500px]"
          }`}
        >
          <ul className="flex flex-col items-center gap-6 py-8 text-white font-medium">
            {["Home", "Projects", "About", "Contact"].map((item, i) => (
              <li
                key={i}
                onClick={() => handleScrollTo(item)}
                className="hover:text-cyan-400 transition"
              >
                {item}
              </li>
            ))}
            <button
  ref={buttonRef}
  onClick={() => handleScrollTo("contact")}
  className="hidden md:inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-semibold shadow-lg transition-transform duration-300 hover:scale-105"
>
  🚀 Hire Me
</button>

          </ul>
        </div>
      </div>
    </nav>
  );
}
