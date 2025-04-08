import ExperienceSection from "./ExperienceTable";
import Table from "./Table";
import TextInput from "./TextInput";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Settings({ show, onClose }: { show: boolean; onClose: () => void }){
    const [activeSection, setActiveSection] = useState("about"); // "about" or "work"
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
       onClose();
      };
    return (
        <AnimatePresence>
          {show && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-0 left-0 w-screen h-screen z-50 flex overflow-hidden"
            >
              {/* Side dim */}
              <div className="w-0 xl:w-1/6 2xl:w-1/5 h-full bg-white opacity-30" />
    
              {/* Sliding panel */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="relative w-full xl:w-5/6 2xl:w-4/5 bg-[#D8C4B6] gap-3 flex flex-col justify-start px-10 py-20"
              >
                {/* Top label */}
                <div className="absolute top-10 left-10">
                  <span className="top">Settings</span>
                </div>
    
                {/* Inputs */}
                <div className="flex flex-row w-full flex-wrap gap-x-10 gap-y-7 2xl:w-4/5 mt-10 max-w-5xl ">
                  <TextInput title="Name" type="text" placeholder="Sara Hepperle" />
                  <TextInput title="Email" type="text" placeholder="sara@hepperle.com" />
                  <TextInput title="Footer" type="text" placeholder="Toronto, CA" />
                  <TextInput title="Resume" type="file" />
                  <TextInput title="Photo" type="file" />
                </div>
    
                <div className="w-full 2xl:w-4/5 h-0.5 opacity-75 bg-[#F5EFE7] max-w-5xl mt-5"></div>
    
                {/* Section Tabs */}
                <div className="flex gap-x-10 gap-y-5 cursor-pointer">
                  {["about", "work"].map((tab) => (
                    <div
                      key={tab}
                      className={`w-[275px] 2xl:w-[300px] h-[40px] rounded relative transition-all duration-300 ${
                        activeSection === tab
                          ? "bg-[#213555]"
                          : "border-2 border-[#213555] bg-transparent"
                      }`}
                      onClick={() => setActiveSection(tab)}
                    >
                      <span
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 libre opacity-75 ${
                          activeSection === tab ? "text-[#F5EFE7]" : "text-[#213555]"
                        }`}
                      >
                        {tab === "about" ? "About" : "Work"}
                      </span>
                    </div>
                  ))}
                </div>
    
                {/* About Section */}
                {activeSection === "about" && (
                  <div>
                    <div className="flex flex-row w-full flex-wrap gap-x-10 gap-y-3 2xl:w-4/5">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="relative bg-[#F5EFE7] opacity-75 w-[275px] 2xl:w-[300px] rounded-md"
                        >
                          <p className="libre p-5 text-sm">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae
                            augue ac arcu convallis varius...
                          </p>
                        </div>
                      ))}
                    </div>
                    <Table />
                  </div>
                )}
    
                {/* Work Section */}
                {activeSection === "work" && (
                  <div>
                    <div className="flex flex-row w-full flex-wrap gap-x-10 gap-y-3 2xl:w-4/5">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="relative bg-[#F5EFE7] opacity-75 w-[275px] 2xl:w-[300px] rounded-md"
                        >
                          <p className="libre p-5 text-sm">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae
                            augue ac arcu convallis varius...
                          </p>
                        </div>
                      ))}
                      <ExperienceSection />
                    </div>
                  </div>
                )}
    
                <div className="w-full 2xl:w-4/5 h-0.5 mt-5 opacity-75 bg-[#F5EFE7] max-w-5xl" />
    
                {/* Action Buttons */}
                <div className="flex flex-row w-full max-w-5xl 2xl:w-4/5 justify-center gap-x-10 gap-y-3 mt-5">
                  <span className="top border-b-1 border-transparent hover:border-[#3E5879] transition-all duration-500 cursor-pointer">
                    Apply Changes
                  </span>
                  <span
                    className="top border-b-1 border-transparent hover:border-[#3E5879] transition-all duration-500 cursor-pointer"
                    onClick={handleClose}
                  >
                    Remove Changes
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      );

}