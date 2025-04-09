
interface ExperienceItem {
  name: string;
  title: string;
  date: string;
}

interface ExperienceListProps {
  heading: string;
  experienceList: ExperienceItem[];
}

export default function Experience({ heading, experienceList }: ExperienceListProps) {
  return (
    <div className="max-w-xl flex flex-col justify-start min-m-10 max-m-30 text-[var(--color-foreground)] font-libre">
      <h3 className="py-2 opacity-75">{heading}</h3>
      <div className="w-full h-0.5 bg-[#F5EFE7] opacity-75 mb-2" />

      {experienceList.map((item, index) => (
        <div key={index} className="w-full py-2">
          <div className="flex justify-between items-center px-1 text-sm sm:text-base">
            <span className="opacity-75 list-text">{item.title}</span>
            <span className="opacity-75 list-text">
              {item.name} - {item.date}
            </span>
          </div>
          <div className="w-full h-0.5 bg-[#F5EFE7] opacity-75 mt-2" />
        </div>
      ))}
    </div>
  );
}