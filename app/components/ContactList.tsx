

export default function ContactList(){
    const contactList = [
        {
            "name":"LinkedIn",
            "link":"https://www.linkedin.com/in/sara-hepperle/"
        },
        {
            "name":"Email",
            "link":"mailto:sarahepperle@gmail.com"
        }
    ]

    // return(  <div className="bg-[#D8C4B6] w-80 flex flex-col justify-start  mx-30 mt-60">
    //     <h3 className="py-4 opacity-75">
    //       Contact Information
    //     </h3>
    //     <div className="w-xl h-0.5 bg-[#F5EFE7] opacity-75"></div>
    //      <span className="list-text py-4 ml-2 transition-all duration-300 hover:ml-4  opacity-75 cursor-pointer">
    //         LinkedIn 
    //      </span>
    //     <div className="w-xl h-0.5 bg-[#F5EFE7] opacity-75"></div>
    //         <span className="list-text py-4 ml-2 transition-all duration-300 hover:ml-4  opacity-75 cursor-pointer">
    //             Email
    //         </span>
    //     <div className="w-xl h-0.5 bg-[#F5EFE7] opacity-75"></div>
    //   </div>
    //   )

        return (
          <div className="bg-[#D8C4B6] max-w-xl flex flex-col justify-start mx-30  text-[var(--color-foreground)] font-libre">
            <h3 className="py-4 opacity-75">Contact Information</h3>
            <div className="w-full h-0.5 bg-[#F5EFE7] opacity-75" />
      
            {contactList.map((item, index) => (
              <div key={item.name}>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="list-text block py-4 ml-2 transition-all duration-300  ease-in-out hover:ml-4 opacity-75 cursor-pointer"
                >
                  {item.name}
                </a>
                <div className="w-full h-0.5 bg-[#F5EFE7] opacity-75" />
              </div>
            ))}
          </div>
        );
}