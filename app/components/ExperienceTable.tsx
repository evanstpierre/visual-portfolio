import { useState } from "react";

const ExperienceSection = ({ locked }: { locked: boolean }) => {
  const [experienceList, setExperienceList] = useState([
    {
      name: "Hydro One",
      title: "Intern - Communications",
      date: "24",
    },
    {
      name: "City of Toronto",
      title: "Swim Instructor",
      date: "19/24",
    },
  ]);

  const handleAddExperience = () => {
    setExperienceList([
      ...experienceList,
      { name: "", title: "", date: "" },
    ]);
  };

  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...experienceList];
    updated[index][field] = value;
    setExperienceList(updated);
  };

  return (
    <div className="max-w-5xl">
      {/* Header Row */}
      <div className="flex flex-row gap-x-10 mb-2 mt-2">
        <div className="w-[275px] 2xl:w-[300px] libre">Name</div>
        <div className="w-[275px] 2xl:w-[300px] libre">Title</div>
        <div className="w-[275px] 2xl:w-[300px] libre">Date</div>
      </div>

      {/* Dynamic Rows */}
      {experienceList.map((experience, index) => (
        <div
          key={index}
          className="flex flex-row gap-x-10 gap-y-3 mb-3 items-center opacity-75"
        >
          <input
            disabled={locked}
            type="text"
            value={experience.name}
            onChange={(e) => handleChange(index, "name", e.target.value)}
            className={`bg-[#F5EFE7] w-[275px] 2xl:w-[300px] h-[35px] rounded-md px-2 text-[#213555] libre focus:outline-none ${
              locked ? "opacity-50" : "opacity-75"
            }`}
            placeholder="Name"
          />
          <input
            disabled={locked}
            type="text"
            value={experience.title}
            onChange={(e) => handleChange(index, "title", e.target.value)}
            className={`bg-[#F5EFE7] w-[275px] 2xl:w-[300px] h-[35px] rounded-md px-2 text-[#213555] libre  focus:outline-none ${
              locked ? "opacity-50" : "opacity-75"
            }`}
            placeholder="Title"
          />
          <input
            disabled={locked}
            type="text"
            value={experience.date}
            onChange={(e) => handleChange(index, "date", e.target.value)}
            className={`bg-[#F5EFE7] w-[150px] h-[35px] rounded-md px-2 text-[#213555] libre focus:outline-none ${
              locked ? "opacity-50" : "opacity-75"
            }`}
            placeholder="Date"
          />

          {index === experienceList.length - 1 && !locked && (
            <div
              onClick={handleAddExperience}
              className="h-[40px] flex items-center wiggle-on-hover cursor-pointer"
            >
              <span className="libre text-[40px]">+</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ExperienceSection;