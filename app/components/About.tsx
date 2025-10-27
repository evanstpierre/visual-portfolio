
"use client"
import ContactList from "./ContactList";
import ParagraphSlider from "./Paragraph";
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';



export default function About({ show, onClose }: { show: boolean; onClose: () => void }) {

      const [isVisible, setIsVisible] = useState(true);
      const [data, setData] = useState(null);

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
      

      const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => onClose(), 500); // allow animation to finish
      };

      const handleKeyDown = useCallback((e: KeyboardEvent) => {
          if (e.key === "Escape")  {
            handleClose();
          }
        }, [handleClose]);
      
        useEffect(() => {
          document.addEventListener("keydown", handleKeyDown);
          return () => {
            document.removeEventListener("keydown", handleKeyDown);
          };
        }, [handleKeyDown]);

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
            <div className="w-0 md:w-1/4 lg:w-1/2  h-full bg-white opacity-30" />
  
            {/* Right sliding panel */}
            <motion.div
              className="relative w-full md:w-3/4 lg:w-1/2 bg-[#D8C4B6] flex flex-col px-5 sm:px-10 py-10 sm:py-20"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              {/* Top Navigation */}
             <div className="absolute top-5 sm:top-10 left-5 sm:left-10">
              <span className="top">{data?.about.title}</span>
            </div>
              {/* Close button */}
              <div className="absolute top-5 sm:top-10 right-5 sm:right-10 cursor-pointer wiggle-on-hover" onClick={handleClose}>
                <span className="top">X</span>
              </div>
  
              {/* Main content */}
              <div className="flex flex-col h-full justify-evenly items-stretch gap-10 sm:gap-20 mt-15 sm:mt-20">
              {data?.about.texts.length > 0 ? (
              <ParagraphSlider paragraphs={data?.about.texts} />
                  ) : (
                    <p>Loading...</p>)}
              { data?.about.contact_list.length > 0 ?  <ContactList contact_list={data?.about.contact_list}  heading={data?.about.heading} /> : <div>LOADING...</div>}

              </div>
  
              {/* Footer */}
              <div className="absolute bottom-10 left-10">
                <span className="footer opacity-75">{data?.footer}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }