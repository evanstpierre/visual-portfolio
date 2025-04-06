
"use client"
import Image from "next/image";
import About from "./components/About";
import { useState } from 'react';
import Work from "./components/Work";


export default function Home() {

  const [showAbout, setShowAbout] = useState(false);
  const [showWork, setShowWork] = useState(false);

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      {/* Background layout (Top and Bottom Halves) */}
      <div className="absolute inset-0 flex flex-col z-0">
        {/* Top Half */}
        <div className="flex-1 bg-[#F5EFE7] relative">
          <div className="absolute top-10 left-20  hover:underline cursor-pointer transition-all duration-500"  onClick={() => window.location.href = "mailto:sarahepperle@gmail.com"} ><span className="top">Contact</span></div>
          <div className="absolute top-10 right-20  hover:underline cursor-pointer transition-all duration-500" onClick={() => setShowAbout(true)}><span className="top">About</span></div>
        </div>

        {/* Bottom Half */}
        <div className="flex-1 bg-[#3E5879] relative">
          <div className="absolute bottom-10 left-20 hover:underline cursor-pointer transition-all duration-500"><span className="bottom text-white">Resume</span></div>
          <div className="absolute bottom-10 right-20 hover: cursor-pointer transition-all duration-500" onClick={() => setShowWork(true)}><span className="bottom text-white">Work</span></div>
        </div>underline
      </div>

      {/* Centered Box + Header Wrapper */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
        <div className="w-[450px] h-[600px] bg-white shadow-lg rounded-lg"></div>
        <h1 className="mt-[20px] text-6xl">Sara Hepperle</h1>
      </div>

      {/* Optional: Overlay component like <About /> if it stays within screen */}
      {showAbout && <About show={showAbout} onClose={() => setShowAbout(false)} />}
      {showWork && <Work show={showWork} onClose={() => setShowWork(false)} />}

    </div>
  );
}