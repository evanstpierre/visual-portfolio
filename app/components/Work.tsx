
"use client"
import ParagraphSlider from "./Paragraph";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import Experience from "./Experience";
import SettingsIcon from '@mui/icons-material/Settings';
import LoginIcon from '@mui/icons-material/Login';
// import { serialize } from 'cookie';

export default function Work({ show, settings, onClose, onLogin, }: { show: boolean; setting:boolean; onClose: () => void; onLogin: () => void }) {

      const [isVisible, setIsVisible] = useState(true);
      const [isLogin, setIsLogin] = useState(false);
      const [rawPassword, setRawPassword] = useState('');
      const [data, setData] = useState(null)
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
        if (e.key === "Escape" && isLogin){
          setIsLogin(false);

        }
        else if (e.key === "Escape" && !settings)  {
          handleClose();
        }
      }, [handleClose]);
    
      useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
          document.removeEventListener("keydown", handleKeyDown);
        };
      }, [handleKeyDown]);
    
    
      const handleGear = async () => {
        const token = localStorage.getItem('token'); // or from cookies
      
        if (!token) {
          setIsLogin(true); // no token = prompt login
          return;
        }
      
        try {
          const res = await fetch('/api/auth/', {
            method: 'GET',
            credentials: 'include', // 🔑 allows cookies to be sent
          });
          if (res.ok) {
            const data = await res.json();
            console.log('User is valid:', data.user);
            setTimeout(() => setIsLogin(false), 500);
            onLogin();
            // Proceed normally (maybe open settings panel, etc.)
          } else {
            setIsLogin(true); // token is invalid/expired
          }
        } catch (err) {
          console.error('Error verifying token:', err);
          setIsLogin(true); // fallback to login prompt
        }
      };
      const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
      
        const res = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: rawPassword }), // ✅ fixed key
          credentials: 'include', // ✅ sends HttpOnly cookie
        });
      
        if (res.ok) {
          const data = await res.json();
          console.log('Login successful:', data);
          setRawPassword('');
          setTimeout(() => setIsLogin(false), 500);
          onLogin(); // ✅ callback to parent
        } else {
          setRawPassword('');
          console.error('Login failed');
        }
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
              <span className="top">{data?.work.title}</span>
            </div>
              {/* Close button */}
              <div className="absolute top-10 right-10 cursor-pointer wiggle-on-hover" onClick={handleClose}>
                <span className="top">X</span>
              </div>
  
              {/* Main content */}
              <div className="flex flex-col h-full justify-evenly items-stretch gap-10 mt-[80px]">
               {data?.work.texts.length > 0 ? (
                             <ParagraphSlider paragraphs={data?.work.texts} />
                                 ) : (
                                   <p>Loading...</p>)}
                { data?.work.jobs.length > 0 ?  <Experience    experienceList={data.work.jobs}  heading={data?.work.heading} /> : <div>LOADING...</div>}
               
              </div>
  
              {/* Footer */}
              <div className="absolute bottom-10 left-10">
                <span className="footer opacity-75">{data?.footer}</span>
              </div>

              <motion.div
                key={isLogin ? "login" : "gear"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-10 right-10 opacity-75"
              >
                {isLogin ? (
                  <div className="flex items-center border rounded px-2 py-1">
                    <input
                      value={rawPassword}
                       onChange={(e) => setRawPassword(e.target.value)}
                      type="password"
                      placeholder="Password"
                      className="focus:outline-none flex-1"
                    />
                    <div className="wiggle-on-hover opacity-75 hover:opacity-100">
                      <LoginIcon
                        style={{ fontSize: 20, color: '#213555', cursor: 'pointer' }}
                        onClick={handleLogin}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="wiggle-on-hover opacity-75 hover:opacity-100" onClick={handleGear}>
                    <SettingsIcon
                      style={{ fontSize: 20, color: '#213555', cursor: 'pointer' }}
                    />
                  </div>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }