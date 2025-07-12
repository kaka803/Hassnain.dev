"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Lenis from 'lenis'
import Contact from "./components/contact";
import Navbar from "./components/navbar";
import { FaEnvelope } from "react-icons/fa";
gsap.registerPlugin(ScrollTrigger);


const skillCategories = {
  Frontend: [
    { name: "HTML", percent: 95 },
    { name: "CSS / Tailwind", percent: 90 },
    { name: "JavaScript", percent: 85 },
    { name: "React.js", percent: 85 },
    { name: "Next.js", percent: 80 },
  ],
  Backend: [
    { name: "Node.js", percent: 80 },
    { name: "Express.js", percent: 75 },
    { name: "MongoDB", percent: 80 },
    { name: "API Integration", percent: 85 },
  ],
  Designing: [
    { name: "Figma", percent: 75 },
    { name: "Photoshop", percent: 70 },
    { name: "UI/UX Principles", percent: 80 },
  ],
  Tools: [
    { name: "Git & GitHub", percent: 90 },
    { name: "VS Code", percent: 95 },
    { name: "Postman", percent: 85 },
    { name: "Vercel / Netlify", percent: 80 },
  ],
};



export default function HeroSection() {
  const headingRef = useRef(null);
  const highlightRef = useRef(null);
  const subtitleCharsRef = useRef([]);
const subtitleContainerRef = useRef(null);
  const buttonsRef = useRef(null);
  const statsRef = useRef([]);
  const glowRef = useRef(null);
  const barsRef = useRef([]);
  const cardsRef = useRef([]);
  const contentRefs = useRef([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const autoplayPlugin = useRef(
    Autoplay({ delay: 3500, stopOnInteraction: false })
  );
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [loading, setloading] = useState(true);
  const [activeTab, setActiveTab] = useState("Frontend");
  const skillsTitleRef = useRef(null);
const skillsTitleSpansRef = useRef([]);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setMousePos({ x: clientX, y: clientY });

    if (glowRef.current) {
      glowRef.current.style.left = `${clientX - 150}px`;
      glowRef.current.style.top = `${clientY - 150}px`;
    }
  };
  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.1, // scroll smoothness
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
  const tl = gsap.timeline();

  // Heading animation
  tl.fromTo(
    headingRef.current,
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 1, ease: "power4.out" }
  );

  // Subtitle animation (letter by letter with ScrollTrigger)
  gsap.fromTo(
    subtitleCharsRef.current,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.02,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: subtitleContainerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );

  // Buttons animation
  tl.fromTo(
    buttonsRef.current,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 1 },
    "-=0.7"
  );

  // Stats animation
  tl.fromTo(
    statsRef.current,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
    },
    "-=0.9"
  );

  // Highlight looping animation
  gsap.to(highlightRef.current, {
    scale: 1.1,
    opacity: 1,
    duration: 1.2,
    yoyo: true,
    repeat: -1,
    ease: "power1.inOut",
  });
}, []);


  useLayoutEffect(() => {
  if (!barsRef.current.length) return;

  barsRef.current.forEach((bar) => {
    if (bar) {
      gsap.fromTo(
        bar,
        { width: "0%" },
        {
          width: `${bar.dataset.percent}%`,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bar,
            start: "top 90%",
            once: true,
          },
        }
      );
    }
  });

  // Cleanup (optional, but safe)
  return () => {
    barsRef.current.forEach((bar) => {
      if (bar) ScrollTrigger.killTweensOf(bar);
    });
  };
}, [activeTab]);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Animate entire card first
      timeline.fromTo(
        card,
        { opacity: 0, y: 60, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
      );

      // Animate inner content elements (title, desc, badges, link)
      timeline.fromTo(
        contentRefs.current[i],
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
        },
        "-=0.5" // overlap with card animation
      );
    });
  }, [projects]);

  useEffect(() => {
  if (!skillsTitleSpansRef.current.length) return;

  gsap.fromTo(
    skillsTitleSpansRef.current,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.04,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: skillsTitleRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );
}, []);

useEffect(() => {
  skillsTitleSpansRef.current = [];
}, []);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      imageRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "power3.out" }
    )
      .fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        descRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      );

      const letters = descRef.current.querySelectorAll("span");

gsap.fromTo(
  letters,
  { y: 20, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    stagger: 0.025,
    duration: 0.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: descRef.current,
      start: "top 85%",
      toggleActions: "play none none none",
    },
  }
);
  }, []);

  // 3D Tilt Effect
const handle3DTilt = (e) => {
  const card = document.getElementById("tiltImage");
  const rect = card.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = ((y - centerY) / centerY) * -10;
  const rotateY = ((x - centerX) / centerX) * 10;

  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
};

const resetTilt = () => {
  const card = document.getElementById("tiltImage");
  card.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
};


useEffect(() => {
  setloading(true);
  const fetchProjects = async () => {
    
      const res = await fetch("/api/getprojects");
      const data = await res.json();
      if(data){
        console.log(data);
        setProjects(data);
        setloading(false);
      }
  };

  fetchProjects();
}, [])


const handleScrollTo = (id) => {
    const section = document.getElementById(id.toLowerCase());
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false); // close menu on mobile
    }
  };


  return (
    
    <>
    <Navbar />
      <div
        onMouseMove={handleMouseMove}
      >

        <section
        id="home"
          className="relative isolate overflow-hidden min-h-[calc(100vh-80px)] pt-32 bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex flex-col justify-center items-center px-6 pb-20"
        >
          {/* Cursor Glow Effect */}
          <div
            ref={glowRef}
            className="pointer-events-none absolute z-0 h-[300px] w-[300px] rounded-full bg-purple-500 opacity-20 blur-3xl transition-all duration-200 ease-out"
            style={{ transform: "translate(-50%, -50%)" }}
          />

          {/* Main Content */}
          <div className="max-w-3xl text-center space-y-6 z-10">
            <h1
              ref={headingRef}
              className="text-4xl md:text-6xl font-bold leading-tight"
            >
              I&#39;m Hassnain — I build{" "}
              <span
                ref={highlightRef}
                className="inline-block text-purple-400"
              >
                full-stack web experiences.
              </span>
            </h1>

            <p
  ref={subtitleContainerRef}
  className="text-lg md:text-xl text-gray-300 flex flex-wrap gap-y-1 justify-center"
>
  {`Crafting fast, modern, and scalable web applications using Next.js, Tailwind CSS, MongoDB, and custom authentication systems.`.split("").map(
    (char, i) => (
      <span
        key={i}
        ref={(el) => (subtitleCharsRef.current[i] = el)}
        className="inline-block opacity-0"
        style={{ whiteSpace: char === " " ? "pre" : "normal" }}
      >
        {char}
      </span>
    )
  )}
</p>


            <div
              ref={buttonsRef}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            >
              <button
              onClick={() => handleScrollTo("contact")}
               className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-semibold transition">
                🚀 Hire Me
              </button>
              <button
              onClick={() => handleScrollTo("projects")}
               className="border border-purple-400 hover:bg-purple-600 px-6 py-3 rounded-full transition">
                📁 View Projects
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-6 text-center z-10">
            {[
              { label: "Projects Completed", value: "5+" },
              { label: "Years of Experience", value: "1+" },
              { label: "Tech Stack", value: "Next.js / Tailwind" },
              { label: "Database", value: "MongoDB" },
              { label: "Auth", value: "Custom / Clerk" },
              { label: "Design", value: "Tailwind UI / Custom" },
            ].map((stat, i) => (
              <div
                key={i}
                ref={(el) => (statsRef.current[i] = el)}
                className="bg-white/10 backdrop-blur-sm p-4 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
              >
                <div className="text-2xl font-bold text-purple-300">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-300 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
        <section
      id="skills"
      className="relative isolate overflow-hidden min-h-[calc(100vh-80px)] pt-32 bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-6 pb-20"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2
  ref={skillsTitleRef}
  className="text-4xl font-bold mb-10 text-center"
>
  {"My Skills".split("").map((char, i) => (
    <span
      key={i}
      ref={(el) => (skillsTitleSpansRef.current[i] = el)}
      className="inline-block opacity-0"
      style={{ whiteSpace: char === " " ? "pre" : "normal" }}
    >
      {char}
    </span>
  ))}
</h2>


        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {Object.keys(skillCategories).map((category) => (
            <button
              key={category}
              onClick={() => {
                barsRef.current = []; // reset refs
                setActiveTab(category);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeTab === category
                  ? "bg-purple-600 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Active Skills */}
        <div className="space-y-6">
          {skillCategories[activeTab].map((skill, i) => (
            <div key={i}>
              <div className="flex justify-between items-center mb-1 text-sm">
                <span>{skill.name}</span>
                <span>{skill.percent}%</span>
              </div>
              <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                <div
                  ref={(el) => (barsRef.current[i] = el)}
                  data-percent={skill.percent}
                  className="h-full bg-purple-500 rounded-full"
                  style={{ width: "0%" }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

        <section
  id="projects"
  className="relative isolate overflow-hidden min-h-[calc(100vh-80px)] pt-32 bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-4 pb-20"
>
  <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl font-bold text-center mb-12">My Projects</h2>

    {/* Safe Scrollable Container */}
    <div className="overflow-x-auto no-scrollbar -mx-4 px-4">
      <Carousel
        plugins={[autoplayPlugin.current]}
        opts={{ loop: true }}
        className="w-full relative overflow-visible"
      >
        <CarouselContent className="flex gap-4">
          {projects.map((project, i) => (
            <CarouselItem
  key={i}
  className="w-full sm:w-[90%] lg:w-[80%] px-2 flex-shrink-0"
>
  <div
    ref={(el) => (cardsRef.current[i] = el)}
    className="bg-[#1e1e2f] rounded-xl shadow-lg overflow-hidden border border-purple-600/10 transition-transform hover:scale-[1.02] duration-300 mx-auto flex flex-col md:flex-row"
  >
    {/* Image Section */}
    <div className="w-full md:w-1/2">
      <div className="w-full h-[200px] md:h-[320px] overflow-hidden">
        <img
          src={project.image.url}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>
    </div>

    {/* Content Section */}
    <div
      ref={(el) => (contentRefs.current[i] = el?.children)}
      className="w-full md:w-1/2 p-5 flex flex-col justify-between space-y-3"
    >
      <div>
        <h3 className="text-xl font-semibold text-purple-400 leading-tight">
          {project.title}
        </h3>

        <p className="text-sm text-gray-300 overflow-y-auto max-h-[160px] pr-1 custom-scroll mt-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1 mt-3">
          {project.tags
            .split(',')
            .map((tag, idx) => (
              <span
                key={idx}
                className="text-[11px] bg-purple-800/30 text-purple-200 px-2 py-0.5 rounded-full"
              >
                {tag.trim()}
              </span>
            ))}
        </div>
      </div>

      <div className="pt-4">
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-cyan-400 hover:underline inline-block"
        >
          🔗 Visit Website
        </a>
      </div>
    </div>
  </div>
</CarouselItem>







          ))}
        </CarouselContent>
      </Carousel>
    </div>
  </div>
</section>

        <section
        id="about"
      ref={sectionRef}
      className="relative isolate overflow-hidden min-h-[calc(100vh-80px)] pt-32 bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-6 pb-20 flex flex-col items-center justify-center text-center"
    >
      <div
  ref={imageRef}
  className="w-32 h-32 mb-6 perspective-[1000px]"
>
  <div
    onMouseMove={(e) => handle3DTilt(e)}
    onMouseLeave={() => resetTilt()}
    className="w-full h-full rounded-full border-4 border-purple-500 shadow-lg overflow-hidden transition-transform duration-300 ease-out bg-white"
    style={{ transformStyle: "preserve-3d" }}
    id="tiltImage"
  >
    <img
      src="/profile.jpg"
      alt="Hassnain"
      className="w-full h-full object-cover"
    />
  </div>
</div>

      <h2
        ref={titleRef}
        className="text-4xl font-bold text-purple-300 mb-4"
      >
        About Me
      </h2>

      <p
  ref={descRef}
  className="max-w-2xl text-gray-300 text-lg leading-relaxed flex flex-wrap justify-center gap-y-1"
>
  {`I am Hassnain — a dedicated full-stack web developer with a strong foundation in both front-end and back-end technologies. I specialize in creating fast, modern, and responsive web applications using HTML, CSS, JavaScript, React.js, Next.js, Tailwind CSS, Node.js, and Express. With an academic background in computer science and a passion for continuous learning, I'm currently pursuing a Bachelor's in CS. I blend functionality with design to craft seamless digital experiences.`.split("").map((char, index) => (
  <span
    key={index}
    className="inline-block opacity-0"
    style={{ whiteSpace: char === " " ? "pre" : "normal" }}
  >
    {char}
  </span>
))}

</p>
<div className="flex gap-6 mt-6 z-10">
  <a
    href="https://github.com/kaka8083"
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-300 hover:text-purple-400 transition-transform transform hover:scale-125"
  >
    <FaGithub size={28} />
  </a>

  <a
    href="https://www.linkedin.com/in/ali-hassnain-16031132b/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-300 hover:text-purple-400 transition-transform transform hover:scale-125"
  >
    <FaLinkedin size={28} />
  </a>

  <a
    href="mailto:ah0540232@gmail.com"
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-300 hover:text-purple-400 transition-transform transform hover:scale-125"
  >
    <FaEnvelope size={28} />
  </a>
</div>

    </section>
    <Contact/>
      </div>
    </>
  );
}
