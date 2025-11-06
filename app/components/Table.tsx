

interface ContactItem {
  name: string;
  link: string;
}

interface ContactTableProps {
  locked: boolean;
  contactList: ContactItem[];
  setContactList: (contacts: ContactItem[]) => void;
}

export default function Table({locked, contactList, setContactList} :ContactTableProps ){
    const handleAddContact = () => {
      setContactList([...contactList, { name: '', link: '' }]);
    };
    const handleRemoveContact = (index: number) => {
      const updated = contactList.filter((_, i) => i !== index);
      setContactList(updated);
    };
      
    const handleChange = (index: number, field: keyof ContactItem, value: string) => {
      const updated = [...contactList];
      updated[index][field] = value;
      setContactList(updated);
    };
    return (
        <div className="max-w-5xl">
        {/* Header Row */}
        <div className="flex flex-row items-center gap-x-10 mb-2 mt-2">
          <div className="w-[275px] 2xl:w-[300px] libre">Name</div>
          <div className="w-[275px] 2xl:w-[300px] libre">Link</div>

          {!locked && (
            <button
              onClick={handleAddContact}
              className="flex items-center justify-center text-[32px] cursor-pointer transition-transform hover:scale-110"
              aria-label="Add Contact"
            >
              <span className="libre leading-none">+</span>
            </button>
          )}
        </div>
        {/* Dynamic Rows */}
        {contactList?.map((contact, index) => (
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

            {!locked && (
                <div
                onClick={() => handleRemoveContact(index)}
                className="h-[40px] flex items-center wiggle-on-hover cursor-pointer"
                >
                <span className="libre text-[25px]">x</span>
                </div>
            )}
            </div>
            
        ))}

        </div>
    );
    }