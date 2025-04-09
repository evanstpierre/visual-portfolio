import ExperienceSection from "./ExperienceTable";
import Table from "./Table";
import TextInput from "./TextInput";
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Settings({ show, onClose }: { show: boolean; onClose: () => void }){
    const [activeSection, setActiveSection] = useState("about"); // "about" or "work"
    const [isVisible, setIsVisible] = useState(true);
    const [locked, setLocked] = useState(true);
    const [isConfirmed, setIsComfirmed] =useState(false)
    const [isExit, setIsExit] = useState(false)
    const [data, setData] = useState(null)
    const [contactList, setContactList] = useState(null);
    const [experience, setExperience] = useState(null);



    useEffect(() => {
      fetch('/api/data')
        .then(res => res.json())
        .then(response => {
          setData(response.data);       // <-- Extract the `data` object
          setContactList(response.data.about.contact_list);
          setExperience(response.data.work.jobs);
        })
        .catch(err => {
          console.error('Fetch error:', err);
        });
    }, []);

    


    const handleClose = () => {
      };

    const handleLogOut = () =>{
        if(isConfirmed){
            localStorage.removeItem('token');
            onClose();
        }else{
            setIsComfirmed(true);
        }

    }
    const handleExit = () =>{
      if(isExit){
          onClose();
      }else{
          setIsExit(true);
      }

  }
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
          if (e.key === "Escape"){
            handleExit();
          }
        }, [handleExit]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

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
                <div className="absolute top-10 right-10 cursor-pointer  wiggle-on-hover "
                    onClick={()=>setLocked(!locked)}>
                  <span className="top">{locked? "Edit ": "Confirm"}</span>
                </div>
                <div className="absolute bottom-10 left-10 " >
                         <div className="cursor-pointer wiggle-on-hover  opacity-50 hover:opacity-100 "
                         onClick={handleLogOut}
                     >
                        <motion.span
                            key={isConfirmed ? "yes" : "logout"}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.25 }}
                            className="footer block"
                            >
                            {isConfirmed ? "Yes, Log Out" : "Log Out"}
                        </motion.span>
                         {/* <span className="footer">{isConfirmed? "Yes, Log Out": "Log Out"} </span> */}
                     </div>
                
                </div>
                <div className="absolute bottom-10 right-10 " >
                         <div className="cursor-pointer wiggle-on-hover  opacity-50 hover:opacity-100 "
                         onClick={handleExit}
                     >
                        <motion.span
                            key={isExit? "yes" : "logout"}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.25 }}
                            className="footer block"
                            >
                            {isExit ? "Exit please!" : "Exit"}
                        </motion.span>
                         {/* <span className="footer">{isConfirmed? "Yes, Log Out": "Log Out"} </span> */}
                     </div>
                
                </div>

                {/* Inputs */}
                <div className="flex flex-row w-full flex-wrap gap-x-10 gap-y-7 2xl:w-4/5 mt-10 max-w-5xl ">
                  <TextInput title="Name" type="text" placeholder={data?.name} locked={locked} />
                  <TextInput title="Email" type="text" placeholder={data?.contact.address}locked={locked}/>
                  <TextInput title="Footer" type="text" placeholder={data?.footer}  locked={locked}/>
                  <TextInput title="Resume" type="file" locked={locked} />
                  <TextInput title="Photo" type="file"  locked={locked} />
                  <TextInput title="Email Subject" type="text" placeholder={data?.contact.subject} locked={locked}/>
                </div>
    
                <div className="w-full 2xl:w-4/5 h-0.5 opacity-75 bg-[#F5EFE7] max-w-5xl mt-3"></div>
    
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
                    {contactList? <Table contactList={contactList} setContactList={setContactList} locked={locked} />: ""}
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
                      {experience? <ExperienceSection locked={locked} experienceList={experience} setExperienceList={setExperience} />  : ""}
                    </div>
                  </div>
                )}
    
                <div className="w-full 2xl:w-4/5 h-0.5 mt-3 opacity-75 bg-[#F5EFE7] max-w-5xl" />
    
                {/* Action Buttons */}
                <div className={`flex flex-row w-full max-w-5xl 2xl:w-4/5 justify-center gap-x-10 gap-y-3`}>
                  <span className={`changes border-b-1 border-transparent transition-all duration-500 ${!locked ? "opacity-50" : "cursor-pointer hover:border-[#3E5879]"}`}>
                    Apply Changes
                  </span>
                  <span
                    className="changes border-b-1 border-transparent hover:border-[#3E5879] transition-all duration-500 cursor-pointer"
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