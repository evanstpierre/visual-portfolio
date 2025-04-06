import ContactList from "./ContactList";
// import ParagraphSlider from "./Paragraph";

export default function About() {
    return (
      <div className="absolute top-0 left-0 w-screen h-screen flex z-50">
        {/* Left side */}
         <div className="w-1/2 h-full bg-white opacity-30"></div>
        {/* Right side */}
        <div className="w-1/2 h-full bg-[#D8C4B6]">
            <div className="absolute top-10 left-20"><span className="top">Work</span></div>
            <div className="absolute top-10 right-20"><span className="top">X</span></div>
            <div className="absolute bottom-10 left-20"><span className="footer opacity-75">Toronto, CA</span></div>
            {/* <p className="max-w-xl text-lg info-text mx-30">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at
                turpis nec libero tristique varius. Curabitur malesuada dui sit amet
                felis luctus, sed blandit ex rhoncus. Nulla facilisi. Suspendisse
                potenti. Aliquam erat volutpat. Vivamus vulputate elit a risus
                fermentum, vel vestibulum ipsum sagittis. Donec vel bibendum justo.
            </p> */}
            
            <ContactList/>

        </div>

  
       
      </div>
    );
  }