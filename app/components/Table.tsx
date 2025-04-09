import { useState } from "react";
import TextInput from "./TextInput";

export default function Table({locked}:{locked:boolean}){
    const [contactList, setContactList] = useState([
        {
          name: "Email",
          link: "mailto:sarahepperle@gmail.com"
        },
        {
          name: "LinkedIn",
          link: "https://www.linkedin.com/in/sara-hepperle/"
        }
      ]);


    const handleAddContact = () => {
        setContactList([
        ...contactList,
        { name: "", link: "" } // Add blank contact
        ]);
    };
    const handleChange = (index, field, value) => {
        const updated = [...contactList];
        updated[index][field] = value;
        setContactList(updated);
      };

    return (
        <div className="max-w-5xl">
        {/* Header Row */}
        <div className="flex flex-row gap-x-10 mb-2 mt-2">
        <div className="w-[275px] 2xl:w-[300px] libre">Name</div>
        <div className="w-[275px] 2xl:w-[300px] libre">Link</div>
      </div>
        {/* Dynamic Rows */}
        {contactList.map((contact, index) => (
            <div key={index} className="flex flex-row gap-x-10 gap-y-3 mb-3 items-center opacity-75">
            <input
                type="text"
                disabled={locked}
                value={contact.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
                className= {`bg-[#F5EFE7] w-[275px] 2xl:w-[300px]  h-[35px] rounded-md px-2 text-[#213555] libre focus:outline-none ${locked? "opacity-50":"opacity-75"}`}
                placeholder="Name"
            />
            <input
                type="text"
                disabled={locked}
                value={contact.link}
                onChange={(e) => handleChange(index, "link", e.target.value)}
                className={`bg-[#F5EFE7] w-[275px] 2xl:w-[300px]  h-[35px] rounded-md px-2 text-[#213555] libre focus:outline-none  ${locked? "opacity-50":"opacity-75"}`}
                placeholder="Link"
            />

            {index === contactList.length - 1 && !locked && (
                <div
                onClick={handleAddContact}
                className="h-[40px] flex items-center wiggle-on-hover cursor-pointer"
                >
                <span className="libre text-[40px]">+</span>
                </div>
            )}
            </div>
        ))}
        </div>
    );
    }