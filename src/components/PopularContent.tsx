'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import Modal from './Modal';
import DownloadModal from './DownloadModal';
import ComingSoonModal from './ComingSoonModal';

const popularContentData = [
  {
    title: 'The AI Readiness Checklist',
    image: '/ai-svgrepo-com.svg',
    file: '/PeopleLead_AI_Resource_Checklists/AI_Readiness_Checklist_PeopleLeadAI.pdf',
  },
  // {
  //   title: 'AI and Accessibility',
  //   image: '/accessibility-svgrepo-com.svg',
  //   file: '/PeopleLead_AI_Resource_Checklists/Inclusive_AI_Design_Checklist_PeopleLead.pdf',
  // },
  {
    title: 'How to Talk to Your Team About AI',
    image: '/problem-process-solution-svgrepo-com.svg',
    file: '/PeopleLead_AI_Resource_Checklists/How_to_Talk_to_Your_Team_About_AI_Checklist_PeopleLead.pdf',
  },
  {
    title: "People-Centered AI: A Beginner's Guide",
    image: '/discover-compass-svgrepo-com.svg',
    file: "/PeopleLead_AI_Resource_Checklists/AI_Beginners_Guide_PeopleLead.pdf",
  },
];

const PopularContent: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isComingSoonModalOpen, setIsComingSoonModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{ file: string; title: string; image: string } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Email verification is temporarily disabled.
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const response = await fetch('/api/check-auth', {
  //         method: 'GET',
  //         credentials: 'include'
  //       });
  //       const data = await response.json();
  //       setIsAuthenticated(data.isAuthenticated);
  //       console.log('PopularContent: isAuthenticated set to:', data.isAuthenticated);
  //     } catch (error) {
  //       console.error('Error checking authentication:', error);
  //     }
  //   };

  //   checkAuth();
  // }, []);

  useEffect(()=> {
    if (!titleRef.current || window.innerWidth < 768) return;

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

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (window.innerWidth < 768) return; // skip on mobile

    const image = e.currentTarget.querySelector('.content-image') as HTMLElement;
    const title = e.currentTarget.querySelector('.content-title') as HTMLElement;
    if (image) {
      gsap.to(image, {
        autoAlpha: 1,
        y: '-90%',
        x: '10%',
        rotation: -5,
        scale: 1.3,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  
    if (title) {
      gsap.to(title, {
        color: '#000000', 
        duration: 0.4,
      });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (window.innerWidth < 768) return;
  
    const image = e.currentTarget.querySelector('.content-image') as HTMLElement;
    const title = e.currentTarget.querySelector('.content-title') as HTMLElement;
  
    if (image) {
      gsap.to(image, {
        autoAlpha: 0,
        y: '-50%',
        x: '10%',
        rotation: -5,
        scale: 1,
        duration: 0.4,
        ease: 'power2.in',
      });
    }
  
    if (title) {
      gsap.to(title, {
        color: 'var(--color-secondary)',
        duration: 0.4,
      });
    }
  };

  const handleClick = (file: string, title: string, image: string) => {
    setSelectedFile({ file, title, image });
    setIsComingSoonModalOpen(true);
    // console.log('PopularContent: isAuthenticated on click:', isAuthenticated);
    // if (isAuthenticated) {
    //   setIsDownloadModalOpen(true);
    // } else {
    //   setIsModalOpen(true);
    // }
  };

  // const handleEmailSubmit = async (email: string) => {
  //   try {
  //     const response = await fetch('/api/verify-email', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ email, origin: window.location.origin }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to send verification email');
  //     }

  //     // The modal will show the "Check your inbox" message
  //   } catch (error) {
  //     console.error(error);
  //     // Optionally, you can show an error message to the user in the modal
  //   }
  // };

  const handleDownload = async (file: string, title: string) => {
    try {
      const response = await fetch(`/api/download?file=${encodeURIComponent(file)}`);

      if (response.ok) {
        const url = `/api/download?file=${encodeURIComponent(file)}`;
        window.open(url, '_blank');
      } else {
        console.error('Download failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownloadConfirm = () => {
    if (selectedFile) {
      handleDownload(selectedFile.file, selectedFile.title);
    }
    setIsDownloadModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsDownloadModalOpen(false);
    setIsComingSoonModalOpen(false);
  };

  return (
    <main ref={containerRef} className="w-full bg-[var(--color-background)] text-[var(--color-secondary)] mb-4 md:mb-24  md:mx-8 mt-14 md:mt-28">

      <section className="max-w-6xl mx-auto text-center mb-8 md:mb-16">
        <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold mb-6 text-[var(--color-primary)] font-primary leading-tight flex justify-center" aria-label="Resources">
          {"Resources".split('').map((char, index) => (
            <span key={index} className="relative inline-block overflow-hidden h-[1.2em]"> 
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
        {/* <h2 className="text-4xl md:text-5xl font-bold mb-8 text-[var(--color-primary)] font-primary text-center">Popular Content</h2> */}
        <div className="border-t border-[var(--color-secondary)] px-4">
          {popularContentData.map((item, index) => (
            <div
              key={index}
              className="w-screen relative left-1/2 right-1/2 -ml-[50vw] flex justify-center hover:bg-[var(--color-primary)] transition-colors duration-300 cursor-pointer"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(item.file, item.title, item.image)}
            >
              <div
                role='button'
                className="content-item relative flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[var(--color-secondary)] py-8 md:py-14 w-full max-w-6xl px-4"
              >
                <span 
                  className="content-title text-base sm:text-xl md:text-3xl text-center md:text-left font-urbanist break-words w-full no-tap-highlight"
                  style={{
                    color: 'var(--color-secondary)',
                    WebkitTapHighlightColor: 'transparent',
                    WebkitUserSelect: 'none',
                    userSelect: 'none',
                  }}
                >
                  {item.title}
                </span>
                <div
                  aria-hidden="true"
                  className="content-image hidden md:block absolute right-0 top-full transform -translate-y-1/2 mr-8 opacity-0"
                  style={{ transform: 'translateY(-50%) translateX(10%) rotate(-5deg)' }}
                >
                  <Image src={item.image} alt={item.title} width={120} height={120} className='opacity-76' />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        // onConfirm={handleEmailSubmit}
        title={selectedFile?.title || ''}
        svg={selectedFile?.image || ''}
      />
      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleDownloadConfirm}
        title={selectedFile?.title || ''}
        svg={selectedFile?.image || ''}
      />
      <ComingSoonModal
        isOpen={isComingSoonModalOpen}
        onClose={handleCloseModal}
      />
    </main>
  );
};

export default PopularContent;
