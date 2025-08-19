'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Modal from './Modal';

const popularContentData = [
  {
    title: 'The AI Readiness Checklist',
    image: '/ai-svgrepo-com.svg',
    file: '/PeopleLead_AI_Resource_Checklists/AI_Readiness_Checklist_PeopleLeadAI.pdf',
  },
  {
    title: 'AI and Accessibility',
    image: '/accessibility-svgrepo-com.svg',
    file: '/PeopleLead_AI_Resource_Checklists/Inclusive_AI_Design_Checklist_PeopleLead.pdf',
  },
  {
    title: 'How to Talk to Your Team About AI',
    image: '/problem-process-solution-svgrepo-com.svg',
    file: '/PeopleLead_AI_Resource_Checklists/How_to_Talk_to_Your_Team_About_AI_Checklist_PeopleLead.pdf',
  },
  {
    title: 'People-Centered AI: A Beginner\'s Guide',
    image: '/discover-compass-svgrepo-com.svg',
    file: '/PeopleLead_AI_Resource_Checklists/AI_Beginners_Guide_PeopleLead.pdf',
  },
];

const PopularContent: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{ file: string; title: string; image: string } | null>(null);

  useEffect(()=> {
    if (!titleRef.current) return;

    const tlTitle = gsap.timeline();
    tlTitle.fromTo(
      titleRef.current.querySelectorAll('.char-initial'),
      { y: 0, opacity: 1 },
      { y: -20, opacity: 0, duration: 0.6, ease: "power2.out", stagger: 0.05 }
    );
    tlTitle.fromTo(
      titleRef.current.querySelectorAll('.char-incoming'),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.05 },
      "<"
    );
    
  }, [])

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (window.innerWidth < 768) return; // skip on mobile

    const image = e.currentTarget.querySelector('.content-image');
    const title = e.currentTarget.querySelector('.content-title');
    gsap.to(image, { autoAlpha: 1, y: '-90%', x: '10%', rotation: -5, scale:1.3, duration: 0.4, ease: 'power2.out' });
    gsap.to(title, { color: 'black', duration: 0.4 });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (window.innerWidth < 768) return; // skip on mobile

    const image = e.currentTarget.querySelector('.content-image');
    const title = e.currentTarget.querySelector('.content-title');
    gsap.to(image, { autoAlpha: 0, y: '-50%', x: '10%', rotation: -5, duration: 0.4, scale:1, ease: 'power2.in' });
    gsap.to(title, { color: 'var(--color-secondary)', duration: 0.4 });
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, file: string, title: string, image: string) => {
    e.preventDefault();
    setSelectedFile({ file, title, image });
    setIsModalOpen(true);
  };

  const handleConfirmDownload = () => {
    if (selectedFile) {
      const link = document.createElement('a');
      link.href = selectedFile.file;
      link.download = selectedFile.title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main ref={containerRef} className="w-full min-h-screen bg-[var(--color-background)] text-[var(--color-secondary)] mb-4 md:mb-24  md:mx-8 mt-24 md:mt-28">

      <section className="max-w-6xl mx-auto text-center mb-16">
        <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold mb-6 text-[var(--color-primary)] font-primary leading-tight flex justify-center" aria-label="Resources">
          {"Resources".split('').map((char, index) => (
            <span key={index} className="relative inline-block overflow-hidden h-[1.2em]" aria-hidden="true"> 
              <span className="char-initial inline-block">{char}</span>
              <span className="char-incoming absolute inset-0 inline-block opacity-0 transform translate-y-full">{char}</span>
            </span>
          ))}
        </h1>
        <p className="text-3xl md:text-4xl leading-relaxed font-urbanist font-thin text-gray-300 max-w-3xl mx-auto">
          Explore tools, guides, and insights designed to help you lead with people and move faster with AI.
        </p>
      </section>

      <section className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-[var(--color-primary)] font-primary text-center">Popular Content</h2>
        <div className="border-t border-[var(--color-secondary)] px-4">
          {popularContentData.map((item, index) => (
            <a
              key={index}
              href={item.file}
              className="w-screen relative left-1/2 right-1/2 -ml-[50vw] flex justify-center hover:bg-[var(--color-primary)] transition-colors duration-300 cursor-pointer"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleClick(e, item.file, item.title, item.image)}
            >
              <div
                className="content-item relative flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[var(--color-secondary)] py-8 md:py-14 w-full max-w-6xl px-4"
              >
                <h3 className="content-title text-base sm:text-xl md:text-3xl text-center md:text-left font-urbanist break-words w-full">
                  {item.title}
                </h3>
                <div
                  className="content-image hidden md:block absolute right-0 top-full transform -translate-y-1/2 mr-8 opacity-0"
                  style={{ transform: 'translateY(-50%) translateX(10%) rotate(-5deg)' }}
                  aria-hidden="true"
                >
                  <Image src={item.image} alt={item.title} width={120} height={120} className='opacity-76' />
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDownload}
        title={selectedFile?.title || ''}
        svg={selectedFile?.image || ''}
      />
    </main>
  );
};

export default PopularContent;
