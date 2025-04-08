
"use client"
import ParagraphSlider from "./Paragraph";
import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import Experience from "./Experience";
import SettingsIcon from '@mui/icons-material/Settings';


export default function Work({ show, onClose, onGear, }: { show: boolean; onClose: () => void; onGear: () => void }) {

      const [isVisible, setIsVisible] = useState(true);

      const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => onClose(), 500); // allow animation to finish
      };

    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="absolute top-0 left-0 w-screen h-screen z-50 flex overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Left side */}
            <div className="w-0 md:w-1/4 lg:w-1/2 h-full bg-white opacity-30" />
  
            {/* Right sliding panel */}
            <motion.div
              className="relative w-full md:w-3/4 lg:w-1/2 bg-[#D8C4B6] flex flex-col px-10 py-20"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              {/* Top Navigation */}
             <div className="absolute top-10 left-10">
              <span className="top">Work</span>
            </div>
              {/* Close button */}
              <div className="absolute top-10 right-10 cursor-pointer wiggle-on-hover" onClick={handleClose}>
                <span className="top">X</span>
              </div>
  
              {/* Main content */}
              <div className="flex flex-col h-full justify-evenly items-stretch gap-10 mt-[80px]">
                <ParagraphSlider />
                <Experience />
              </div>
  
              {/* Footer */}
              <div className="absolute bottom-10 left-10">
                <span className="footer opacity-75">Toronto, CA</span>
              </div>

              <div className="absolute bottom-10 right-10 opacity-75" onClick={onGear}>
                <SettingsIcon style={{ fontSize: 20, color: '#213555', cursor: 'pointer' }} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }