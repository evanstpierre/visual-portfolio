
"use client"
import Image from "next/image";
import About from "./components/About";
import { useEffect, useState } from 'react';
import Work from "./components/Work";
import Settings from "./components/Settings";


export default function Home() {

  const [showAbout, setShowAbout] = useState(false);
  const [showWork, setShowWork] = useState(false);
  const [showSettings, setShowSettings] = useState(false)
  const [data, setData] = useState(null);
  
  const handleOpenPDF = () => {
    window.open('/resume.pdf', '_blank');
  };
  

useEffect(() => {
  fetch('/api/data')
    .then(res => res.json())
    .then(response => {
      setData(response.data);       // <-- Extract the `data` object
    })
    .catch(err => {
      console.error('Fetch error:', err);
    });
}, []);


  return (
    <div className="w-screen h-screen relative overflow-hidden">
      {/* Background layout (Top and Bottom Halves) */}
      <div className="absolute inset-0 flex flex-col z-0">
        {/* Top Half */}
        <div className="flex-1 bg-[#F5EFE7] relative">
          <div className="hidden sm:block absolute top-10 left-10  lg:left-20"  onClick={() => window.location.href = `mailto:${data?.contact.address}?subject=${data?.contact.subject}`} ><span className="top border-b-1 border-transparent hover:border-[#3E5879] transition-all duration-500 cursor-pointer">{data?.contact.title}</span></div>
          <div className="absolute top-10 right-10  lg:right-20" onClick={() => setShowAbout(true)}><span className="top border-b-1 border-transparent hover:border-[#3E5879] transition-all duration-500 cursor-pointer">{data?.about.title}</span></div>
        </div>

        {/* Bottom Half */}
        <div className="flex-1 bg-[#3E5879] relative">
          <div className="hidden sm:block absolute bottom-10 left-10 lg:left-20" onClick={handleOpenPDF}><span className="bottom border-b-1 border-transparent hover:border-[#F5EFE7] transition-all duration-500 cursor-pointer">{data?.resume.title}</span></div>
          <div className="absolute bottom-10 right-10 lg:right-20" onClick={() => setShowWork(true)}><span className="bottom border-b-1 border-transparent hover:border-[#F5EFE7] transition-all duration-500 cursor-pointer">{data?.work.title}</span></div>
        </div>
      </div>

      {/* Centered Box + Header Wrapper */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
        <div className="w-[300px] md:w-[325px] lg:w-[350px]  ration[4/3] bg-white shadow-lg rounded-lg">
            <Image
            src="/jane-doe-profile-sketch.png"
            alt={`Profile picture of ${data?.name}`} 
            width={375}
            height={400}
            className="object-contain rounded-lg "
          />
        </div>
        <h1 className="justify-center mt-[20px] text-3xl md:text-4xl lg:text-5xl ">{data?.name}</h1>
      </div>

      {/* Optional: Overlay component like <About /> if it stays within screen */}
      {showAbout && <About show={showAbout} onClose={() => setShowAbout(false)} />}
      {showWork && <Work show={showWork} settings={showSettings} onClose={() => setShowWork(false)} onLogin ={() => setShowSettings(true)}  />}
      {showSettings && <Settings show={showSettings} onClose={() =>setShowSettings(false)} /> }
    </div>
  );
}