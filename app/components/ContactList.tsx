

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

    return (
        <div className="bg-[#D8C4B6] max-w-xl flex flex-col justify-start min-m-10  max-m-30  text-[var(--color-foreground)] font-libre">
        <h3 className="py-4 opacity-75">Contact Information</h3>
        <div className="w-full h-0.5 bg-[#F5EFE7] opacity-75" />
    
        {contactList.map((item, index) => (
            <div key={item.name}>
            <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="list-text block py-2 ml-2 transition-all duration-300  ease-in-out hover:ml-4 opacity-75 cursor-pointer"
            >
                {item.name}
            </a>
            <div className="w-full h-0.5 bg-[#F5EFE7] opacity-75" />
            </div>
        ))}
        </div>
    );
}