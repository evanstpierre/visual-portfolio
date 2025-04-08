import TextInput from "./TextInput";

export default function Settings(){
    return(
        <div  className="absolute top-0 left-0 w-screen h-screen z-50 flex overflow-hidden">
            <div className="w-0 md:w-1/4 h-full bg-white opacity-30" />

            <div className="relative w-full xl:w-3/4 bg-[#D8C4B6] flex flex-col justify-start px-10 py-20">
                <div className="absolute top-10 left-10">
                <span className="top">Settings</span>
                </div>
                <div className="flex flex-row justify-around w-full gap-5 2xl:w-4/5 mt-5">
                    <TextInput title="Name" type="name" placeholder ="Sara Hepperle"/>
                    <TextInput title="Email" type="email" placeholder ="sara@hepperle.com"/>
                    <TextInput title="Footer" type="footer" placeholder ="Toronto, CA"/>
                </div>
                <div className="w-full 2xl:w-4/5 h-0.5 mt-5 opacity-75 bg-[#F5EFE7]"></div>
                <div></div>

               
            </div>
        </div>
  
    );
}