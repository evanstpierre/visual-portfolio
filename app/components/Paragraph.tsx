'use client';

import { useEffect, useState } from 'react';

interface ParagraphItem {
  id: number;
  content: string;
}

interface ParagraphSliderProps {
  paragraphs: ParagraphItem[];
}

export default function ParagraphSlider({ paragraphs }: ParagraphSliderProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % paragraphs.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [paragraphs.length]);

  return (
    <div className="relative max-h-50  max-w-xl min-m-10 max-m-30  flex items-center justify-center text-start">
      {paragraphs.map((item, i) => (
        <p
          key={item.id}
          className={`absolute transition-opacity duration-1000 ease-in-out ${
            i === index ? 'opacity-100' : 'opacity-0'
          } info-text text-[#F5EFE7] text-[20px] sm:text-[24px]`}
        >
          {item.content}
        </p>
      ))}
    </div>
  );
}