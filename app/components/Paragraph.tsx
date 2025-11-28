'use client';

import { useEffect, useState } from 'react';


// 30 word place holder

interface ParagraphItem {
  id: number;
  content: string;
}

interface ParagraphSliderProps {
  paragraphs: ParagraphItem[];
}

export default function ParagraphSlider({ paragraphs }: ParagraphSliderProps) {
  const [index, setIndex] = useState(0);

  // Auto-change every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % paragraphs.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative max-h-50  max-w-xl min-m-10 max-m-30  flex items-center justify-center text-start">
      {paragraphs.map((item, i) => (
        <p
          key={item.id}
          className={`absolute transition-opacity duration-1000 ease-in-out ${
            i === index ? 'opacity-100' : 'opacity-0'
          }  info-text`}
        >
          {item.content}
        </p>
      ))}
    </div>
  );
}