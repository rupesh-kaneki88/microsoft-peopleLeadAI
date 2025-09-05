'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(modalRef.current, { autoAlpha: 1, duration: 0.3 });
    } else {
      gsap.to(modalRef.current, { autoAlpha: 0, duration: 0.3 });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 opacity-0"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={handleBackdropClick}
    >
      <div className="relative p-8 rounded-xl shadow-2xl bg-gradient-to-r from-[#16161A] from-55% to-transparent text-white max-w-sm w-full mx-4 overflow-hidden">
        <div className="relative z-10">
          <h2 id="modal-title" className="text-2xl md:text-3xl font-bold font-helvetica-neue mb-4 text-[var(--color-primary)]">{title}</h2>
          {children}
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-[var(--color-primary)] text-white font-helvetica-neue hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;