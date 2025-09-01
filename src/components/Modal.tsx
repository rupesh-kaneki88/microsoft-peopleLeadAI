'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (email: string) => void;
  title: string;
  svg: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, title, svg }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      gsap.to(modalRef.current, { autoAlpha: 1, duration: 0.3 });
      emailInputRef.current?.focus();
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

  const handleConfirm = () => {
    if (email) {
      onConfirm(email);
      setIsSubmitted(true);
    }
  };
  
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 300);
    }
  }, [isOpen]);


  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 opacity-0"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      onClick={handleBackdropClick}
    >
      <div className="relative p-8 rounded-xl shadow-2xl bg-gradient-to-r from-[#16161A] from-55% to-transparent text-white max-w-sm w-full mx-4 overflow-hidden">
        <img
          src={svg}
          alt=""
          className="absolute bottom-0 right-0 w-40 h-40 opacity-10"
          aria-hidden="true"
        />
        <div className="relative z-10">
          {!isSubmitted ? (
            <>
              <h2 id="modal-title" className="text-2xl md:text-3xl font-bold font-helvetica-neue mb-4 text-[var(--color-primary)]">{title}</h2>
              <p id="modal-description" className="text-[var(--color-secondary)] font-helvetica-neue mb-6">Enter your email to access this.</p>
              <input
                ref={emailInputRef}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-4 py-2 mb-4 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
              <div className="flex justify-end gap-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-md bg-gray-600 text-white font-helvetica-neue hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 rounded-md bg-[var(--color-primary)] font-helvetica-neue text-white hover:bg-blue-700 transition-colors"
                >
                  Submit
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 id="modal-title" className="text-2xl md:text-3xl font-bold font-helvetica-neue mb-4 text-[var(--color-primary)]">Check your inbox!</h2>
              <p id="modal-description" className="text-[var(--color-secondary)] font-helvetica-neue mb-6">A verification link has been sent to <strong>{email}</strong>. Please check your email to download the file.</p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-md bg-[var(--color-primary)] text-white font-helvetica-neue hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;