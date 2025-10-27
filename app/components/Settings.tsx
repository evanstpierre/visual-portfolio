'use client';
import ExperienceSection from "./ExperienceTable";
import Table from "./Table";
import TextInput from "./TextInput";
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ParagraphInput from "./ParagraphInput";
import cloneDeep from "lodash/cloneDeep";
import set from "lodash/set";
import DataInput from "./DataInput";


export default function Settings({ show, onClose }: { show: boolean; onClose: () => void }){
    const [activeSection, setActiveSection] = useState("about"); // "about" or "work"
    const [locked, setLocked] = useState(true);
    const [isConfirmed, setIsComfirmed] =useState(false)
    const [isExit, setIsExit] = useState(false)
    const [data, setData] = useState(null)
    const [contactList, setContactList] = useState(null);
    const [experience, setExperience] = useState(null);
    const [workTexts, setWorkTexts] = useState(null)
    const [aboutTexts, setAboutTexts] = useState(null)



    
    // Keep handleDataUpdate as-is (it immutably sets nested paths)
    const handleDataUpdate = (path: string, value: any) => {
      setData(prev => {
        const next = cloneDeep(prev ?? {});
        set(next, path, value);
        return next;
      });
    };

    // When editing an item, compute the next array first, then update both state and data
    const handleSetWorkTexts = (newText: string, id: number) => {
      setWorkTexts(prev => {
        const next = (prev ?? []).map(p => (p.id === id ? { ...p, content: newText } : p));
        handleDataUpdate("work.texts", next);   // use the freshly computed `next`
        return next;
      });
    };

    const handleSetAboutTexts = (newText: string, id: number) => {
      setAboutTexts(prev => {
        const next = (prev ?? []).map(p => (p.id === id ? { ...p, content: newText } : p));
        handleDataUpdate("about.texts", next);
        return next;
      });
    };


  //   const handleDataUpdate = (path: string, value: any) => {
  //     console.log(path)
  //     if(path != "resume"){
  //        setData(prev => {
  //       const next = cloneDeep(prev);
  //       set(next, path, value); // lodash set updates nested path immutably
  //       return next;
  // });
  //     }else{
  //       console.log("update resume...")
  //     }
     
  //   };




    // const handleSetWorkTexts = (newText: string, id: number) => {
    //   setWorkTexts(prev =>
    //     prev.map(p => (p.id === id ? { ...p, content: newText } : p))
    //   );
    //   handleDataUpdate("work.texts", workTexts);
    // };

    // const handleSetAboutTexts = (newText: string, id: number) => {
    //   setAboutTexts(prev =>
    //     prev.map(p => (p.id === id ? { ...p, content: newText } : p))
       
    //   );
    //   handleDataUpdate("about.texts",aboutTexts);
    // };
  


    useEffect(() => {
      fetch('/api/data')
        .then(res => res.json())
        .then(response => {
          const data = response.data;

          setData(data);
          setContactList(data.about.contact_list);
          setExperience(data.work.jobs);
          setWorkTexts(data.work.texts);
          setAboutTexts(data.about.texts);
          
        })
        .catch(err => {
          console.error('Fetch error:', err);
        });
    }, []);

    


    const handleRemove = () => {
       fetch('/api/data')
        .then(res => res.json())
        .then(response => {
          const data = response.data;

          setData(data);
          setContactList(data.about.contact_list);
          setExperience(data.work.jobs);
          setWorkTexts(data.work.texts);
          setAboutTexts(data.about.texts);
          
        })
        .catch(err => {
          console.error('Fetch error:', err);
        });
      };

      const handleLogOut = async () => {
        if (isConfirmed) {
          try {
            await fetch('/api/logout', {
              method: 'POST',
              credentials: 'include', // send cookies
            });
      
            // Optionally: clear any local UI state, redirect, etc.
            onClose(); // close modal or UI
          } catch (err) {
            console.error('Logout failed:', err);
          }
        } else {
          setIsComfirmed(true); // prompt user to confirm logout
        }
      };
    const handleExit = () =>{
      if(isExit){
          onClose();
      }else{
          setIsExit(true);
      }

  }
  // 
  
  const handleApply = async () => {
  // Compose from current state (don’t trust “just set” values)
  const next = cloneDeep(data ?? {});
  set(next, "about.contact_list", contactList ?? []);
  set(next, "work.jobs",       experience ?? []);  // <-- fix: work.jobs, not about.jobs
  set(next, "work.texts",      workTexts ?? []);
  set(next, "about.texts",     aboutTexts ?? []);

  try {
    const res = await fetch("/api/data", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),  // send the object itself
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("Update failed:", err);
      return;
    }
  } catch (e) {
    console.error("Network error:", e);
  }
};

   
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
          if (e.key === "Escape" && locked){
            handleExit();
          }
          else if (e.key === "Enter" && !locked){
            setLocked(true)
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
                <div className="flex flex-row w-full flex-wrap gap-x-10 gap-y-5 2xl:w-9/10 mt-10 ">
                  <DataInput title={"Name"} type={"text"} locked={locked} path={"name"} value={data?.name} setValue={handleDataUpdate} />
                  <DataInput title={"Email"} type={"text"} locked={locked} path={"contact.address"} value={data?.contact.address} setValue={handleDataUpdate} />
                  <DataInput title={"Email Subject"} type={"text"} locked={locked} path={"contact.subject"} value={data?.contact.subject} setValue={handleDataUpdate} />
                  <DataInput title={"Footer"} type={"text"} locked={locked} path={"footer"} value={data?.footer} setValue={handleDataUpdate} />
                  <div className={`hidden h-[35px] w-[275px] 2xl:w-[300px] bg-[#F5EFE7] rounded-md flex items-center  relative ${locked ? "opacity-50": "opacity-75"}`} >
                    <span className="absolute bottom-9 left-2 libre text-sm">Resume [PDF]</span>
                      <input 
                        disabled={locked}
                        type={"file"}
                        accept="application/pdf"
                        placeholder={"Choose Resume"}
                        className={`w-full px-2 overflow-hidden text-ellipsis whitespace-nowrap focus:outline-none libre text-md text-[#213555]`}
                      />
                  </div>
                </div>
    
                <div className="w-full 2xl:w-9/10  h-0.5 opacity-75 bg-[#F5EFE7] mt-3"></div>
    
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
                    <div className="flex flex-row w-full flex-wrap gap-x-10 gap-y-3 2xl:w-9/10">
                    {aboutTexts? (
                      aboutTexts?.map(({ content, id }) => (
                        <ParagraphInput
                          key={id}
                          id={id}
                          text={content} // Use `content`, not `text`
                          setText={handleSetAboutTexts}
                          locked ={locked}
                        />
                      ))
                    ) : (
                      ""
                    )}
                   
                    {contactList? <Table contactList={contactList} setContactList={setContactList} locked={locked} />: ""}
                    </div>

                )}
    
                {/* Work Section */}
                {activeSection === "work" && (
                  <div>
                    <div className="flex flex-row w-full flex-wrap gap-x-10 gap-y-3 2xl:w-9/10">
                    {workTexts? (
                      workTexts?.map(({ content, id }) => (
                        <ParagraphInput
                            key={id}
                            id={id}
                            text={content} // Use `content`, not `text`
                            setText={handleSetWorkTexts}
                            locked ={locked}
                          />
                        ))
                      ) : (
                        ""
                      )}
                      {experience? <ExperienceSection locked={locked} experienceList={experience} setExperienceList={setExperience} />  : ""}
                    </div>
                  </div>
                )}
    
                <div className="w-full 2xl:w-9/10 h-0.5 mt-3 opacity-75 bg-[#F5EFE7] " />
    
                {/* Action Buttons */}
                <div className={`flex flex-row w-full 2xl:w-9/10 justify-center gap-x-10 gap-y-3`}>
                  <span className={`changes border-b-1 border-transparent transition-all duration-500 ${!locked ? "opacity-50" : "cursor-pointer hover:border-[#3E5879]"}`}
                   onClick={locked? handleApply : undefined}
                   >
                    Apply Changes
                  </span>
                  <span
                    className="changes border-b-1 border-transparent hover:border-[#3E5879] transition-all duration-500 cursor-pointer"
                    onClick={handleRemove}
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