'use client';

import { useEffect, useState } from 'react';

const paragraphs = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus fermentum justo at ex ultrices, non ultricies sapien mattis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Etiam in magna eget ipsum suscipit euismod. Nulla facilisi. Sed in lorem non ligula accumsan tincidunt non ac nulla.",
  "Curabitur convallis, metus non scelerisque iaculis, nulla ligula sodales libero, nec fermentum nisi augue in nulla. In vel fringilla neque. Morbi fringilla justo sed purus lobortis, id tempor leo finibus. Suspendisse potenti. Sed ullamcorper, arcu vitae interdum varius, tellus justo finibus dolor, a sagittis lorem lorem at libero.",
  "Praesent posuere, sapien ac pulvinar cursus, justo nibh gravida nisl, in rutrum tortor metus sed lorem. Donec vulputate risus at tellus iaculis, ac egestas tellus sagittis. Integer tincidunt semper eros, sed varius purus posuere at. Vivamus tristique gravida dolor, vitae fringilla erat dapibus at. In suscipit nisl a libero.",
];

export default function ParagraphSlider() {
  const [index, setIndex] = useState(0);

  // Auto-change every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % paragraphs.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative max-h-50  max-w-xl m-30  flex items-center justify-center text-start">
      {paragraphs.map((text, i) => (
        <p
          key={i}
          className={`absolute transition-opacity duration-1000 ease-in-out ${
            i === index ? 'opacity-100' : 'opacity-0'
          }  info-text`}
        >
          {text}
        </p>
      ))}
    </div>
  );
}