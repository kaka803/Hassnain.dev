'use client'

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const formRef = useRef(null);
  const inputsRef = useRef([]);
  const buttonRef = useRef(null);
  const iconsRef = useRef([]);

  const [text, settext] = useState('')
  const [email, setemail] = useState('')
  const [message, setmessage] = useState('')
  const [loading, setloading] = useState(false);

  useEffect(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top 20%",     // trigger jab bottom pe aa rha ho
      end: "bottom bottom",
      once: true,          // ek hi baar chale
      delay: 0.2, // thoda delay de dete hain
      toggleActions: "play none none none", // play on enter, no actions on leave
    },
  });

  // Heading animation
  tl.fromTo(
    headingRef.current,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
  );

  // Inputs
  tl.fromTo(
    inputsRef.current,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.2,
    },
    "-=0.3"
  );

  // Button
  tl.fromTo(
    buttonRef.current,
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
    "-=0.4"
  );

  // Social Icons
  tl.fromTo(
    iconsRef.current,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.2,
      ease: "power2.out",
    },
    "-=0.3"
  );
}, []);


const handlesubmit = async (text, email, message) => {
  setloading(true);
    if (!text || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }
    
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, email, message }),
    });
    const data = await res.json()
    if(data){
      // alert('Message sent successfully!');
      console.log(data);
      
    }
    setloading(false);
    alert('Message sent successfully!');
    settext('');
    setemail('');
    setmessage('');
  };


  return (
    <section
  ref={sectionRef}
  id="contact"
  className="relative isolate overflow-hidden min-h-[calc(100vh-80px)] pt-32 bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-6 pb-20 flex flex-col items-center justify-center"
>
  <h2 ref={headingRef} className="text-4xl font-bold text-purple-300 mb-8">
    Contact Me
  </h2>

  <form
    ref={formRef}
    className="w-full max-w-xl bg-white/10 backdrop-blur-md p-8 rounded-xl space-y-6"
    onSubmit={(e) => e.preventDefault()}
  >
    {[
      {
        type: "text",
        placeholder: "Your Name",
        value: text,
        onChange: (e) => settext(e.target.value),
      },
      {
        type: "email",
        placeholder: "Your Email",
        value: email,
        onChange: (e) => setemail(e.target.value),
      },
    ].map((input, i) => (
      <input
        key={i}
        type={input.type}
        placeholder={input.placeholder}
        ref={(el) => (inputsRef.current[i] = el)}
        value={input.value}
        onChange={input.onChange}
        className="w-full p-4 rounded-md bg-white/10 text-white border border-purple-500 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
    ))}

    <textarea
      rows="5"
      placeholder="Your Message"
      ref={(el) => (inputsRef.current[2] = el)}
      value={message}
      onChange={(e) => setmessage(e.target.value)}
      className="w-full p-4 rounded-md bg-white/10 text-white border border-purple-500 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
    ></textarea>

    <button
      ref={buttonRef}
      type="submit"
      disabled={loading}
      onClick={() => handlesubmit(text, email, message)}
      className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md font-semibold transition-all duration-300"
    >
      {loading ? "Sending..." : "Send Message"}
    </button>
  </form>

  {/* Social & Contact Info */}
  <div className="flex flex-col items-center gap-4 mt-10 text-gray-300 text-sm">
    <div className="flex items-center gap-2">
      <FaEnvelope className="text-purple-400" />
      <span>ah0540232@gmail.com</span>
    </div>
    <div className="flex items-center gap-2">
      📞 <span>+92 328 0446062</span>
    </div>
  </div>

  {/* Social Icons */}
  <div className="flex gap-6 mt-6">
    {[
      {
        icon: <FaGithub size={24} />,
        href: "https://github.com/kaka803",
      },
      {
        icon: <FaLinkedin size={24} />,
        href: "https://www.linkedin.com/in/ali-hassnain-16031132b/",
      },
      {
        icon: <FaEnvelope size={24} />,
        href: "mailto:ah0540232@gmail.com",
      },
    ].map((item, i) => (
      <a
        key={i}
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        ref={(el) => (iconsRef.current[i] = el)}
        className="text-gray-300 hover:text-purple-400 hover:scale-110 transition-transform duration-300"
      >
        {item.icon}
      </a>
    ))}
  </div>
</section>

  );
};

export default Contact;
