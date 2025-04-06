export default function Experience() {
    const experienceList = [
      {
        name: 'Hydro One',
        title: 'Intern - Communications',
        date: '24',
      },
      {
        name: 'City of Toronto',
        title: 'Swim Instructor',
        date: '19/24',
      },
    ];
  
    return (
      <div className="max-w-xl flex flex-col justify-start mx-30 text-[var(--color-foreground)] font-libre">
        <h3 className="py-4 opacity-75 text-xl font-bold">Work Experience</h3>
        <div className="w-full h-0.5 bg-[#F5EFE7] opacity-75 mb-2" />
  
        {experienceList.map((item, index) => (
          <div key={index} className="w-full py-2">
            <div className="flex justify-between items-center px-1 text-sm sm:text-base">
              <span className="opacity-75 list-text">{item.title}</span>
              <span className="opacity-75 list-text">{item.name} - {item.date}</span>
            </div>
            <div className="w-full h-0.5 bg-[#F5EFE7] opacity-75 mt-2" />
          </div>
        ))}
      </div>
    );
  }