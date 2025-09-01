'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import ContactHeader from './ContactHeader'; // Assuming ContactHeader is created

const NavbarWrapper: React.FC = () => {
  return (
    <>
      <Navbar />
    </>
  );
};

export default NavbarWrapper;
