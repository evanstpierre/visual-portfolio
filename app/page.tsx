import Image from "next/image";
import About from "./components/About";

export default function Home() {
  return (
    <div className="h-screen flex flex-col relative">
      <About/>
      {/* Centered Box + Header Wrapper */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
        {/* Centered Box */}
        <div className="w-[450px] h-[600px] bg-white shadow-lg rounded-lg"></div>

        {/* Header 20px below */}
        <h1 className="mt-[20px]  text-6xl "
        // style={{ color: '#F5EFE7' }}
        >Sara Hepperle</h1>
      </div>

      <div className="h-screen flex flex-col">
      {/* Top Half */}
      <div className="flex-1 bg-[#F5EFE7] flex items-center justify-center relative">
        <div className="absolute top-10 left-20"><span className="top">Contact</span></div>
        <div className="absolute top-10 right-20"><span className="top">About</span></div>
        
      </div>

      {/* Bottom Half */}
      <div className="flex-1 bg-[#3E5879] flex items-center justify-center  relative">
        <div className="absolute bottom-10 left-20 text-white"><span className="bottom">Resume</span>
        </div>
        <div className="absolute bottom-10 right-20 text-white"><span className="bottom">Work</span></div>
      </div>
    </div>
  </div>
  );
}
